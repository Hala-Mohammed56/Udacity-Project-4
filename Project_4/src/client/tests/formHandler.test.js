/**
 * @jest-environment jsdom
 */

import { handleSubmit, sendDataToServer, updateUI } from '../js/formHandler';
import { checkForURL } from '../js/nameChecker';

global.alert = jest.fn();

jest.spyOn(global, 'fetch').mockImplementation(() => 
    Promise.resolve({
        json: () => Promise.resolve({ sentiment: 'positive', subjectivity: 'neutral', preview: 'Sample text' })
    })
);

document.body.innerHTML = `
    <form id="urlForm">
        <input id="name" type="text" />
        <button type="submit">Submit</button>
    </form>
    <div id="results"></div>
`;

jest.mock('../js/formHandler', () => ({
    sendDataToServer: jest.fn(),
    updateUI: jest.fn()
}));

test('checkForURL should return true for valid URLs', () => {
    expect(checkForURL('https://www.example.com')).toBe(true);
    expect(checkForURL('http://example.com')).toBe(true);
});

test('checkForURL should return false for invalid URLs', () => {
    expect(checkForURL('example')).toBe(false);
    expect(checkForURL('www.example')).toBe(false);
});

test('handleSubmit should prevent submission if URL is invalid', () => {
    const event = { preventDefault: jest.fn() };
    document.getElementById('name').value = 'not a url';
    
    handleSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith('Please enter a valid URL.');
});

test('handleSubmit should call sendDataToServer with valid URL', () => {
    const event = { preventDefault: jest.fn() };
    document.getElementById('name').value = 'https://www.valid-url.com';

    handleSubmit(event);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api', expect.any(Object));
});

test('sendDataToServer should call updateUI on successful response', async () => {
    const mockResponse = { sentiment: 'positive', subjectivity: 'neutral', preview: 'Sample text' };
    
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
    });

    await sendDataToServer('https://www.valid-url.com');

    await expect(updateUI).toHaveBeenCalledWith({
        sentiment: 'positive',
        subjectivity: 'neutral',
        preview: 'Sample text'
    });
});

test('handleSubmit returns true for a valid URL', () => {
    expect(handleSubmit("https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80")).toBeTruthy();
});

test('handleSubmit returns false for an invalid URL', () => {
    expect(handleSubmit("Invalid URL")).toBeFalsy();
});
