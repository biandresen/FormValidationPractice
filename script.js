//PSEUDOCODE
//All invalid fields should have red background until valid (green background)
//Provide helpful error message until valid.
//Submit button should give error message and stop submit if any fields are invalid
//If form is submitted give high five to client
//When a user leaves the form field the field should get validated

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email-error");
const country = document.querySelector("#country");
const countryError = document.querySelector(".country-error");
const zip = document.querySelector("#zip");
const zipError = document.querySelector(".zip-error");
const password = document.querySelector("#password");
const passwordError = document.querySelector(".password-error");
const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password-error");
const submitButton = document.querySelector("#submit-button");
const validationMessage = document.querySelector(".main-validation-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
});
email.addEventListener("input", validateEmail);
country.addEventListener("input", validateCountry);
zip.addEventListener("input", validateZip);
password.addEventListener("input", validatePassword);
password.addEventListener("input", handlePasswordRequirements);
password.addEventListener("focus", showRequirements);
password.addEventListener("blur", showRequirements);
confirmPassword.addEventListener("input", validateConfirmPassword);

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Checks for email pattern
  const input = email.value.trim("");
  const isValid = regex.test(input);

  if (isValid) {
    email.setCustomValidity("");
    emailError.textContent = "";
  } else if (!isValid && input === "") {
    emailError.textContent = "";
  } else {
    const errorMessage = "Not a valid email";
    email.setCustomValidity(errorMessage);
    emailError.textContent = errorMessage;
  }
  return isValid;
}

function validateCountry() {
  const regex = /[A-z]{4,}$/; //Checks for country with 4 or more letters. No country has less than 4.
  const input = country.value.trim("");
  const isValid = regex.test(input);

  if (isValid) {
    country.setCustomValidity("");
    countryError.textContent = "";
  } else if (!isValid && input === "") {
    countryError.textContent = "";
  } else {
    const errorMessage = "Not a valid country";
    country.setCustomValidity(errorMessage);
    countryError.textContent = errorMessage;
  }
  return isValid;
}

function validateZip() {
  const regex = /^[0-9]{4,4}$/; //Checks for min and max 4 only numbers.
  const input = zip.value.trim("");
  const isValid = regex.test(input);

  if (isValid) {
    zip.setCustomValidity("");
    zipError.textContent = "";
  } else if (!isValid && input === "") {
    zipError.textContent = "";
  } else {
    const errorMessage = "Not a valid zip code";
    zip.setCustomValidity(errorMessage);
    zipError.textContent = errorMessage;
  }
  return isValid;
}

function handlePasswordRequirements() {
  const uppercaseElement = document.querySelector(".uppercase");
  const lowercaseElement = document.querySelector(".lowercase");
  const numberElement = document.querySelector(".number");
  const signElement = document.querySelector(".sign");
  const lengthElement = document.querySelector(".length");

  const regexUppercase = /[A-Z]/;
  const regexLowercase = /[a-z]/;
  const regexNumber = /[0-9]/;
  const regexSign = /[^a-zA-Z0-9]/;
  const regexLength = /[A-z]{8,}|[0-9]{8,}|[\W_][^\s]{8,}/;

  const input = password.value.trim("");

  const uppercaseValid = regexUppercase.test(input);
  const lowercaseValid = regexLowercase.test(input);
  const numberValid = regexNumber.test(input);
  const signValid = regexSign.test(input);
  const lengthValid = regexLength.test(input);

  if (uppercaseValid) uppercaseElement.classList.add("fulfilled");
  else uppercaseElement.classList.remove("fulfilled");

  if (lowercaseValid) lowercaseElement.classList.add("fulfilled");
  else lowercaseElement.classList.remove("fulfilled");

  if (numberValid) numberElement.classList.add("fulfilled");
  else numberElement.classList.remove("fulfilled");

  if (signValid) signElement.classList.add("fulfilled");
  else signElement.classList.remove("fulfilled");

  if (lengthValid) lengthElement.classList.add("fulfilled");
  else lengthElement.classList.remove("fulfilled");
}

function showRequirements() {
  const passwordRequirementMessages = document.querySelector(".password-requirements");
  passwordRequirementMessages.classList.toggle("show");
}

function validatePassword() {
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])([^\s]+){8,}$/; //Checks for at least 1 number, capital letter, lower-case letter, symbol, no spaces and at least 8 characters long
  const input = password.value.trim("");
  const isValid = regex.test(input);

  if (isValid) {
    password.setCustomValidity("");
    passwordError.textContent = "";
  } else if (!isValid && input === "") {
    passwordError.textContent = "";
  } else {
    const errorMessage = "Not a valid password";
    password.setCustomValidity(errorMessage);
    passwordError.textContent = errorMessage;
  }
  return isValid;
}

function validateConfirmPassword() {
  const input = confirmPassword.value.trim("");
  let isValid = false;

  //Check if password and confirm password is equal
  if (input === password.value.trim("")) {
    isValid = true;
  }

  if (isValid) {
    confirmPassword.setCustomValidity("");
    confirmPasswordError.textContent = "";
  } else if (!isValid && input === "") {
    confirmPasswordError.textContent = "";
  } else {
    const errorMessage = "Not matching Password";
    confirmPassword.setCustomValidity(errorMessage);
    confirmPasswordError.textContent = errorMessage;
  }

  return isValid;
}

function validateForm() {
  if (
    validateEmail() &&
    validateCountry() &&
    validateZip() &&
    validatePassword() &&
    validateConfirmPassword()
  ) {
    form.submit();
    const errorMessage = "Form submitted!";
    validationMessage.textContent = errorMessage;
    validationMessage.classList.add("valid");
  } else {
    const errorMessage = "Form not correctly filled";
    validationMessage.textContent = errorMessage;
    validationMessage.classList.add("invalid");
  }
}
