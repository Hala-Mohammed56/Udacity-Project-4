import { handleSubmit } from './js/formHandler';

// Import SCSS styles
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// Assign the handleSubmit function to button click instead of form submit
document.getElementById("processURLButton").addEventListener("click", () => {
    let URL = document.getElementById('url').value;
    handleSubmit(URL);
});
