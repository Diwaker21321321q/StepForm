const multistepForm = document.querySelector("[data-multistep]");
const formsteps = [...multistepForm.querySelectorAll("[data-step]")];
const form = document.getElementById("registration-form");

const progresssteps = document.querySelectorAll(".step");

const nextBtn = document.querySelector(".btn-Next");
const secondnextbtn = document.querySelector(".secondbtn-Next");

let currentStep = formsteps.findIndex((steps) => {
  return steps.classList.contains("active");
});
// console.log(currentStep); it gives -1

// regex validation for username
const usernamevalidation = /^(?=.*[A-Z])[a-zA-Z]{1,50}$/;

//regex validation for special characters
const specialchars =
  /^(?=.*[A-Z])[a-zA-Z!@#$%^&*()_+={}[\]:;\"'<,>.?/~`|-]{1,50}$/;

// regex validation for email
const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//regex validation for phone number
const phoneValidation = /^\d{10}$/;

//regex validation for address
const addressRegex = /^[a-zA-Z\s\d]{8,200}$/;

if (currentStep < 0) {
  currentStep = 0;
  showCurrecntpage();
}

function isture(value) {
  if (!value) {
    nextBtn.disabled = true;
    return;
  } else {
    nextBtn.disabled = false;
  }
}

//on key press form validation start here
function validateform(event) {
  const usernamevalidation = /[^a-zA-Z\s]+/;
  const numbervalidation = /[^0-9]+/;

  const inputValue = event.key;
  console.log(inputValue);

  const inputId = event.target.id;
  console.log(inputId);

  var allValid = true;

  switch (inputId) {
    // Perform username validation
    case "firstname":
      if (usernamevalidation.test(inputValue)) {
        document.querySelector("#firstnameerror").textContent =
          "Username must not contain no numbers.";
        allValid = false;
        event.preventDefault();
      } else {
        document.querySelector("#firstnameerror").textContent = "";
      }
      break;

    // Perform phone number validation
    case "phone":
      if (numbervalidation.test(inputValue)) {
        allValid = false;
        event.preventDefault();
      } else {
        document.querySelector("#phoneerror").textContent = "";
      }
      break;

    // Perform ZIP code validation
    case "zipcode":
      if (numbervalidation.test(inputValue)) {
        event.preventDefault();
        allValid = false;
      } else {
        document.querySelector("#codeerror").textContent = "";
      }
      break;

    // Perform city name validation
    case "city":
      if (usernamevalidation.test(inputValue)) {
        event.preventDefault();
        allValid = false;
      } else {
        document.querySelector("#cityerror").textContent = "";
      }
      break;
    default:
      break;
  }

  // Enable or disable the next button based on allValid
  // const nextBtn = document.querySelector(".btn-Next");
  // nextBtn.disabled = !allValid;
}

let usernamevalid;
let emailvalid;
let phoneNumberValid;
let addressvalid;
let pincodevalid;
let citynamevalid;

//for name and email regex Validation
if (currentStep == 0) {
  const firstNameInput = document.getElementById("firstname");
  const email = document.getElementById("email");
  firstNameInput.addEventListener("keydown", (e) => {
    console.log(e.target.value);

    if (usernamevalidation.test(e.target.value)) {
      document.querySelector("#firstnameerror").innerText = "";
      firstNameInput.classList.remove("failed");
      firstNameInput.classList.add("success");
      usernamevalid = true;
    } else if (/[0-9]/.test(e.target.value)) {
      document.querySelector("#firstnameerror").innerText =
        "Do not Enter Numbers on Username Feild";
      e.target.classList.add("failed");
      usernamevalid = false;
    } else if (specialchars.test(e.target.value)) {
      document.querySelector("#firstnameerror").innerText =
        "Do not Enter SpecialCharacters on Username Feild";
      e.target.classList.add("failed");
      usernamevalid = false;
    } else {
      document.querySelector("#firstnameerror").innerText =
        "Please Enter First";
      firstNameInput.classList.add("failed");
      usernamevalid = false;
    }
    isture(usernamevalid);

    return;
  });
  email.addEventListener("keyup", (e) => {
    if (emailValidation.test(e.target.value)) {
      document.querySelector("#emailerror").innerText = " ";
      e.target.setAttribute("class", "success");
      emailvalid = true;
    } else {
      document.querySelector("#emailerror").innerText =
        "Incorrect Email Please Check Your Email";
      e.target.setAttribute("class", "failed");
      emailvalid = false;
    }
    isture(emailvalid);
    return;
  });
}

//phone validation
document.getElementById("phone").addEventListener("keyup", (e) => {
  const phoneInput = document.getElementById("phone");
  if (phoneValidation.test(phoneInput.value)) {
    document.querySelector("#phoneerror").innerText = "";
    e.target.setAttribute("class", "success");
    phoneNumberValid = true;
  } else if (phoneInput.length === 10) {
    e.target.setAttribute("class", "success");
    document.querySelector("#phoneerror").innerText =
      "You Enter a 10 digits phone number.";
    phoneNumberValid = true;
  } else {
    e.target.setAttribute("class", "failed");
    document.querySelector("#phoneerror").innerText = "Incorrect PhoneNumber";
    phoneNumberValid = false;
  }
  if (!phoneNumberValid) {
    secondnextbtn.disabled = true;
  } else {
    secondnextbtn.disabled = false;
  }
  return;
});

//address validation
document.getElementById("streetname").addEventListener("keyup", (e) => {
  let addressError = document.getElementById("addresserror");
  if (addressRegex.test(e.target.value.trim())) {
    addressError.textContent = "";
    e.target.classList.remove("failed");
    e.target.classList.add("success");
    addressvalid = true;
  } else {
    e.target.classList.add("failed");
    addressError.textContent = "Street address is required minimum 8 letters";
    addressvalid = false;
  }
  if (!addressvalid) {
    secondnextbtn.disabled = true;
  } else {
    secondnextbtn.disabled = false;
  }
  return;
});

//pincode validation
document.getElementById("zipcode").addEventListener("keyup", (e) => {
  const pinCodeInput = document.getElementById("zipcode");
  const pinError = document.getElementById("codeerror");
  if (/^\d{1,6}$/.test(pinCodeInput.value.trim())) {
    pinError.textContent = "";
    pinCodeInput.classList.remove("failed");
    pinCodeInput.classList.add("success");
    pincodevalid = true;
  } else {
    pinError.textContent = "Please enter a valid 6-digit PIN code";
    pinCodeInput.classList.add("failed");
    pinCodeInput.classList.remove("success");
    pincodevalid = false;
  }
  if (!pincodevalid) {
    secondnextbtn.disabled = true;
  } else {
    secondnextbtn.disabled = false;
  }
});

//city validation
document.getElementById("city").addEventListener("keyup", (e) => {
  const cityInput = document.getElementById("city");
  const cityError = document.getElementById("cityerror");
  if (/^[a-zA-Z\s]+$/.test(cityInput.value.trim())) {
    cityError.textContent = "";
    cityInput.classList.remove("failed");
    cityInput.classList.add("success");
    citynamevalid = true;
  } else {
    cityError.textContent = "Please enter a valid city name";
    cityInput.classList.add("failed");
    cityInput.classList.remove("success");
    citynamevalid = false;
  }
  if (!citynamevalid) {
    secondnextbtn.disabled = true;
  } else {
    secondnextbtn.disabled = false;
  }
});

multistepForm.addEventListener("click", (e) => {
  // debugger;
  let valuechange;
  if (e.target.matches("[nxtbtn]")) {
    valuechange = 1;
  } else if (e.target.matches("[prevbtn]")) {
    valuechange = -1;
  }

  if (valuechange == null) return;

  const inputs = [...formsteps[currentStep].querySelectorAll("input")];
  console.log(inputs);

  let allvalid = inputs.every((input) => input.reportValidity());

  if (allvalid) {
    currentStep += valuechange;
    showCurrecntpage();
  }
});

function showCurrecntpage() {
  formsteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
  progresssteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

form.addEventListener("submit", (e) => {
  // debugger;
  e.preventDefault();
  const fname = document.getElementById("firstname").value;
  const Email = document.getElementById("email").value;
  const Phone = document.getElementById("phone").value;
  const streetaddress = document.getElementById("streetname");
  // let Address = document.getElementById("address").value;
  let City = document.getElementById("city").value;
  let Password = document.getElementById("password").value;

  const Cpassword = document.getElementById("cpassword").value;
  const SecurityQuestion = document.getElementById("squestion").value;

  if (fname == "") {
    document.querySelector("#firstnameerror").innerText = "Incorrect FirstName";
    document.querySelector("#firstnameerror").innerText = "";
  }
  if (streetaddress.value.trim() === "") {
    let addressError = document.getElementById("addresserror");
    addressError.textContent = "Street address cant be empty";
    e.target.classList.remove("success");
  }

  // change border color of empty fields
  const emptyFields = [fname].some((field) => field.trim() === "");
  if (emptyFields) {
    const emptyFieldsArray = Array.from(
      document.querySelectorAll("input.empty")
    );
    emptyFieldsArray.forEach((field) => {
      if (field.value.trim() === "") {
        document.querySelector("#firstnameerror").innerText =
          "Incorrect FirstName";
        field.classList.add("failed");
      }
    });

    return;
  }

  //object for local field
  const formData = {
    fname,
    Email,
    Phone,
    City,
    Password,
    Cpassword,
    SecurityQuestion,
  };
  // create local stroage and store the data into it
  const stringData = JSON.stringify(formData);
  localStorage.setItem("formData", stringData);

  form.reset();
  location.href = "redirect.html";
});

//city validation
// document.getElementById("address").addEventListener("keyup", (e) => {
//   const addressInput = e.target;
//   const addressError = document.querySelector("#addresserror");

//   if (addressInput.value.trim() === "") {
//     addressError.innerText = "Please Enter Address";
//     addressInput.classList.add("failed");
//   } else {
//     addressError.innerText = "";
//     addressInput.classList.remove("failed");
//     addressInput.classList.add("success");
//   }
// });
