//check if the input is a valid URL
function checkForURL(inputText) {
    console.log("::: Running URL Validation :::", inputText);

    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' +
        '(([a-zA-Z0-9$_.+!*\'(),;?&=-])+\\.)+([a-zA-Z]{2,})' + 
        '(\\/[a-zA-Z0-9$_.+!*\'(),;?&=-]*)*$', // Path
        'i'
    );

    return urlPattern.test(inputText); 
}

export { checkForURL };
