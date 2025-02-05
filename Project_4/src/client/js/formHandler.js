// Import URL validation function
import { checkForURL } from './nameChecker';


// Define the server API endpoint
const serverURL = 'http://localhost:8000/api';

// Select the form element and add an event listener
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

//handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('name').value;

    if (!checkForURL(formText)) {
        alert('Please enter a valid URL.');
        return;
    }

    sendDataToServer(formText);
}

//validate the URL format using regex
function isValidURL(url) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + 
        '((([a-zA-Z0-9$_.+!*\'(),;?&=-])+\\.)+([a-zA-Z]{2,}))' + 
        '(\\/[a-zA-Z0-9$_.+!*\'(),;?&=-]*)*$', // Path
        'i'
    );
    return urlPattern.test(url);
}

//send the URL to the server
async function sendDataToServer(url) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error sending data:', error);
        alert('Failed to connect to the server.');
    }
}

//update the UI with server response
function updateUI(data) {
    document.getElementById('results').innerHTML = `
        <p><strong>Sentiment:</strong> ${data.sentiment}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
        <p><strong>Extracted Text Preview:</strong></p>
        <blockquote>${data.preview}</blockquote>
    `;
}

// Export the handleSubmit function
export { handleSubmit };
