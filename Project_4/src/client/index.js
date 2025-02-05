// Import JavaScript functions
import { handleSubmit } from './js/formHandler';

// Import SCSS styles
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// Assign the handleSubmit function 
document.getElementById("urlForm").addEventListener("submit", handleSubmit);

