import validUrl from 'valid-url';

function checkForURL(inputText) {
    return validUrl.isUri(inputText);
}

export { checkForURL };
