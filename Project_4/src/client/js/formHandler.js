// Import URL validation function
import { checkForURL } from './nameChecker';

// Define the server API endpoint
const serverURL = 'http://localhost:8080/test/';

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const URL = document.getElementById('url').value;

    if (!URL || !checkForURL(URL)) {
        let resultElement = document.getElementById('results');
        if (resultElement) {
            resultElement.innerHTML = "Please enter a valid URL";
        }
        console.log("Please enter a valid URL");
        return false;
    }

    fetch(serverURL + encodeURIComponent(URL))
        .then(res => res.json())
        .then(function (res) {
            let response = res.message;
            console.log(response);
            document.querySelector('section.url-results #polarity').innerHTML = response.polarity;
            document.querySelector('section.url-results #subjectivity').innerHTML = response.subjectivity;
            document.querySelector('section.url-results #polarity_confidence').innerHTML = response.polarity_confidence;
            document.querySelector('section.url-results #subjectivity_confidence').innerHTML = response.subjectivity_confidence;
            document.querySelector('section.url-results #excerpt').innerHTML = response.text;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data from the server.');
        });

    return true;
}

export { handleSubmit };
