const multistepForm = document.querySelector("[data-multistep]");
const formsteps = [...multistepForm.querySelectorAll("[data-step]")];
const progresssteps = document.querySelectorAll(".step");

const form = document.getElementById("registration-form");
const firstNameInput = document.getElementById("firstname");
const email = document.getElementById("email");

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

//regex validation for password
const passwordregex = /^(?=.*[A-Z]).{4,}$/;

//on key press form validation start here
function validateform(event) {
  const usernamevalidation = /[^a-zA-Z\s]+/;
  const numbervalidation = /[^0-9]+/;

  const inputValue = event.key;

  const inputId = event.target.id;

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
}
// let validatearr = [];

// let currentStep = formsteps.findIndex((steps) => {
//   return steps.classList.contains("active");
// });

// if (currentStep < 0) {
//   currentStep = 0;
//   showCurrecntpage();
// }

// multistepForm.addEventListener("click", (e) => {
//   // debugger;
//   let valuechange;
//   if (e.target.matches("[nxtbtn]")) {
//     valuechange = 1;
//   } else if (e.target.matches("[prevbtn]")) {
//     valuechange = -1;
//   }

//   if (valuechange == null) return;

//   const inputs = [...formsteps[currentStep].querySelectorAll("input")];
//   console.log(inputs);

//   let allvalid = inputs.every((input) => input.reportValidity());

//   if (allvalid) {
//     currentStep += valuechange;
//     showCurrecntpage();
//   }
// });

function showCurrecntpage() {
  formsteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
  progresssteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

//for name and email regex Validation
firstNameInput.addEventListener("keydown", (e) => {
  console.log(e.target.value);
  if (usernamevalidation.test(e.target.value)) {
    document.querySelector("#firstnameerror").innerText = "";
    firstNameInput.classList.remove("failed");
    firstNameInput.classList.add("success");
  } else if (/[0-9]/.test(e.target.value)) {
    document.querySelector("#firstnameerror").innerText =
      "Do not Enter Numbers on Username Feild";
    e.target.classList.add("failed");
  } else {
    document.querySelector("#firstnameerror").innerText = "Please Enter First";
    firstNameInput.classList.add("failed");
  }
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
});

//phone validation
document.getElementById("phone").addEventListener("keyup", (e) => {
  var isphonevalid = false;
  const phoneInput = document.getElementById("phone");
  if (phoneValidation.test(phoneInput.value)) {
    document.querySelector("#phoneerror").innerText = "";
    e.target.setAttribute("class", "success");
    isphonevalid = true;
  } else {
    e.target.setAttribute("class", "failed");
    document.querySelector("#phoneerror").innerText = "Incorrect PhoneNumber";
    isphonevalid = false;
  }
});

//address validation
document.getElementById("streetname").addEventListener("keyup", (e) => {
  let addressError = document.getElementById("addresserror");
  if (addressRegex.test(e.target.value.trim())) {
    addressError.textContent = "";
    e.target.classList.remove("failed");
    e.target.classList.add("success");
  } else {
    e.target.classList.add("failed");
    addressError.textContent = "Street address is required minimum 8 letters";
  }
});

//pincode validation
document.getElementById("zipcode").addEventListener("keyup", (e) => {
  const pinCodeInput = document.getElementById("zipcode");
  const pinError = document.getElementById("codeerror");
  if (/^\d{1,6}$/.test(pinCodeInput.value.trim())) {
    pinError.textContent = "";
    pinCodeInput.classList.remove("failed");
    pinCodeInput.classList.add("success");
  } else {
    pinError.textContent = "Please enter a valid 6-digit PIN code";
    pinCodeInput.classList.add("failed");
    pinCodeInput.classList.remove("success");
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
  } else {
    cityError.textContent = "Please enter a valid city name";
    cityInput.classList.add("failed");
    cityInput.classList.remove("success");
  }
});

//password validation
document.getElementById("password").addEventListener("keydown", () => {
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("passworderror");
  if (passwordregex.test(passwordInput.value.trim())) {
    passwordError.textContent = "";
    passwordInput.classList.remove("failed");
    passwordInput.classList.add("success");
  } else {
    passwordError.textContent =
      "Password must be at least 4 characters and Contains 1 capital letter";
    passwordInput.classList.add("failed");
    passwordInput.classList.remove("success");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("in");
  const fname = document.getElementById("firstname").value;
  const Email = document.getElementById("email").value;
  const Phone = document.getElementById("phone").value;
  const streetaddress = document.getElementById("streetname").value;
  let City = document.getElementById("city").value;
  let Password = document.getElementById("password").value;

  const Cpassword = document.getElementById("cpassword").value;
  const SecurityQuestion = document.getElementById("squestion").value;

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

  if (Password !== Cpassword) {
    document.getElementById("cpassworderror").innerText =
      "Passwords do not match Please Check Your Password";
    document.getElementById("password").classList.add("failed");
    document.getElementById("cpassword").classList.add("failed");
    return false;
  } else {
    document.getElementById("password").classList.add("success");
    document.getElementById("cpassword").classList.add("success");
  }

  if (Password == "" || Cpassword == "" || SecurityQuestion == "") {
    document.getElementById("password").classList.add("failed");
    document.getElementById("cpassword").classList.add("failed");
    document.getElementById("squestion").classList.add("failed");

    document.getElementById("passworderror").innerText =
      "kindly fill this field";
    document.getElementById("cpassworderror").innerText = "This feild is empty";
    document.getElementById("questionerror").innerText = "This feild is empty";
    return false;
  } else if (Password !== "" || Cpassword !== "" || SecurityQuestion !== "") {
    document.getElementById("password").classList.add("success");
    document.getElementById("cpassword").classList.add("success");
    document.getElementById("squestion").classList.add("success");
    form.reset();
    location.href = "redirect.html";
  }
});

document.getElementById("step1NextBtn").addEventListener("click", () => {
  let name = document.getElementById("firstname").value;
  let email = document.getElementById("email").value;

  const firstNameInput = document.getElementById("firstname");
  const emailInput = document.getElementById("email");
  let usernamevalid = false;
  let emailvalid = false;

  //username
  if (usernamevalidation.test(name)) {
    document.querySelector("#firstnameerror").innerText = "";
    firstNameInput.classList.remove("failed");
    firstNameInput.classList.add("success");
    usernamevalid = true;
  } else {
    document.querySelector("#firstnameerror").innerText = "Please Enter First";
    firstNameInput.classList.add("failed");
    usernamevalid = false;
  }

  //for email
  if (emailValidation.test(email)) {
    document.querySelector("#emailerror").innerText = " ";
    emailInput.classList.add("class", "success");
    emailvalid = true;
  } else {
    document.querySelector("#emailerror").innerText =
      "Incorrect Email Please Check Your Email";
    emailInput.classList.add("class", "failed");
    emailvalid = false;
  }

  if (usernamevalid && emailvalid) {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    document.getElementById("stepIcon1").style.background = "white";
    document.getElementById("stepIcon2").style.background = "#98acef";
    document.getElementById("stepIcon1").style.border = "3px solid #98acef";
  }
});

document.getElementById("step2NextBtn").addEventListener("click", () => {
  let isphonevalid = false;
  let isaddressvalid = false;
  let ispincodevalid = false;
  const phoneInput = document.getElementById("phone");

  //phone validation
  if (phoneValidation.test(phoneInput.value)) {
    phoneInput.setAttribute("class", "success");
    isphonevalid = true;
  } else {
    phoneInput.setAttribute("class", "failed");
    document.querySelector("#phoneerror").innerText = "Incorrect PhoneNumber";
    isphonevalid = false;
  }

  //address validation
  let addressError = document.getElementById("addresserror");
  if (addressRegex.test(document.getElementById("streetname").value.trim())) {
    document.getElementById("streetname").classList.add("success");
    isaddressvalid = true;
  } else {
    document.getElementById("streetname").classList.add("failed");
    addressError.textContent = "Street address is required minimum 8 letters";
    isaddressvalid = false;
  }

  //pincode validation
  const pinCodeInput = document.getElementById("zipcode");
  const pinError = document.getElementById("codeerror");
  if (/^\d{1,6}$/.test(pinCodeInput.value.trim())) {
    pinCodeInput.classList.add("success");
    ispincodevalid = true;
  } else {
    pinError.textContent = "Please enter a valid 6-digit PIN code";
    pinCodeInput.classList.add("failed");
    ispincodevalid = false;
  }

  //city validation
  let iscityvalid = false;
  const cityInput = document.getElementById("city");
  const cityError = document.getElementById("cityerror");
  if (/^[a-zA-Z\s]+$/.test(cityInput.value.trim())) {
    cityInput.classList.add("success");
    iscityvalid = true;
  } else {
    cityError.textContent = "Please enter a valid city name";
    cityInput.classList.add("failed");
    iscityvalid = false;
  }

  if (isphonevalid && isaddressvalid && iscityvalid && ispincodevalid) {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("stepIcon3").style.background = "#98acef";
    document.getElementById("stepIcon2").style.background = "white";
    document.getElementById("stepIcon2").style.border = "3px solid #98acef";
  }
});
// step form movement
document.getElementById("step2BackBtn").addEventListener("click", () => {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
  document.getElementById("stepIcon1").style.background = "#98acef";
  document.getElementById("stepIcon2").style.background = "white";
  document.getElementById("stepIcon2").style.border = "3px solid #98acef";
});

document.getElementById("step3BackBtn").addEventListener("click", () => {
  document.getElementById("step3").style.display = "none";
  document.getElementById("step2").style.display = "block";
  document.getElementById("stepIcon3").style.background = "white";
  document.getElementById("stepIcon2").style.background = "#98acef";
  document.getElementById("stepIcon3").style.border = "3px solid #98acef";
});
