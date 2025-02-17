const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const NLP_API_URL = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';

app.get('/test/:testURL', async (req, res) => {
    const testURL = req.params.testURL;

    if (!testURL) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const response = await axios.post(NLP_API_URL, { url: testURL });

        return res.json({
            message: response.data
        });
    } catch (error) {
        console.error('Error fetching analysis:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

app.get('/', (req, res) => {
    res.send("This is the server API page. You may access its services via the client app.");
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
