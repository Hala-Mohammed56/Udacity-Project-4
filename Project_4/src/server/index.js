// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

// Apply middleware
app.use(cors()); 
app.use(bodyParser.json()); 

//scrape text from a given URL
async function scrapeTextFromURL(url) {
    try {
        console.log(`Fetching and scraping text from URL: ${url}`);

        // Fetch the webpage data
        const { data } = await axios.get(url);

        // Load the HTML
        const $ = cheerio.load(data);
        const text = $('body').text().trim();

        // Check if text content exists
        if (!text) {
            console.error('No text content found at the provided URL');
            return null;
        }

        const trimmedText = text.slice(0, 200);
        console.log(`Extracted Text (200 characters):\n${trimmedText}\n--- End of Text Preview ---`);
        return trimmedText;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
}

// Route to analyze text from a URL 
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;

    // Validate the input URL
    if (!url) {
        console.error('No URL provided in the request body');
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        //Scrape text from the provided URL
        const text = await scrapeTextFromURL(url);

        if (!text) {
            return res.status(400).json({ error: 'No text content found at the provided URL' });
        }

        //Send the extracted text to the AWS NLP API
        const NLP_API_URL = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';

        const response = await axios.post(NLP_API_URL, { text });

        //Send NLP results back to the client
        return res.json({
            sentiment: response.data.polarity,         
            subjectivity: response.data.subjectivity, 
            preview: text                              
        });
    } catch (error) {
        console.error('Error during URL processing or API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("This is the server API page. You may access its services via the client app.");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
