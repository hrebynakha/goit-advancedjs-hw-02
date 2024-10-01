const STORAGE_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};
const feedbackForm = document.querySelector('.feedback-form');
fillForm(feedbackForm);

feedbackForm.addEventListener('input', handleFormInput);
feedbackForm.addEventListener('submit', handleFormSubmit);

function fillForm(form) {
  const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (localData === null) {
    return;
  }

  for (const key in localData) {
    form.elements[key].value = localData[key];
    formData[key] = localData[key];
  }
}

function handleFormInput(e) {
  const name = e.target.name;
  const value = e.target.value;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleFormSubmit(e) {
  e.preventDefault();
  const isEmpty = Object.values(formData).some(item => item === '');
  if (isEmpty) {
    displayAlert();
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  for (const key in formData) {
    formData[key] = '';
  }
  e.target.reset();
}

function displayAlert() {
  alert('Fill please all fields');
}
