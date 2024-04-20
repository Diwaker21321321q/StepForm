const multistepForm = document.querySelector("[data-multistep]");
const formsteps = [...multistepForm.querySelectorAll("[data-step]")];
const progresssteps = document.querySelectorAll(".step");
const form1input = document.querySelectorAll("#step1  input");
const form2input = document.querySelectorAll("#step2 input");
const form3input = document.querySelectorAll("#step3 input");
const nextBtn = document.querySelector(".btn-Next");
const secondNxtBtn = document.querySelector(".secondbtn-Next");
const submitBtn = document.querySelector(".btn-Submit");
const form = document.getElementById("registration-form");
const firstNameInput = document.getElementById("firstname");
const email = document.getElementById("email");
const formarr = [form1input, form2input, form3input];

var a;
function pass(event) {
  if (a == 1) {
    console.log(event.target);
    document.getElementById("password").type = "password";
    document.getElementById("eyeicon").src = "./Images/eye-close.png";
    a = 0;
  } else {
    document.getElementById("password").type = "text";
    document.getElementById("eyeicon").src = "./Images/eye-open.png";
    a = 1;
  }
}

function checkvalidations(value, btn) {
  value.forEach((inputs) => {
    inputs.addEventListener("input", () => {
      const isempty = value.some((input) => {
        return !input.value;
      });
      btn.classList.toggle("disabled", isempty);
      btn.disabled = isempty;
    });
  });
}
const formone = [...form1input];
const formtwo = [...form2input];
const formthree = [...form3input];

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
        event.preventDefault();
      }
      break;

    // Perform phone number validation
    case "phone":
      if (numbervalidation.test(inputValue)) {
        event.preventDefault();
      }
      break;

    // Perform ZIP code validation
    case "zipcode":
      if (numbervalidation.test(inputValue)) {
        event.preventDefault();
      }
      break;

    // Perform city name validation
    case "city":
      if (usernamevalidation.test(inputValue)) {
        event.preventDefault();
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

// function showCurrecntpage() {
//   formsteps.forEach((step, index) => {
//     step.classList.toggle("active", index === currentStep);
//   });
//   progresssteps.forEach((step, index) => {
//     step.classList.toggle("active", index === currentStep);
//   });
// }

nextBtn.disabled = true;
secondNxtBtn.disabled = true;
submitBtn.disabled = true;

firstNameInput.addEventListener("input", (e) => {
  const isNameValid = usernamevalidation.test(e.target.value);
  if (isNameValid) {
    document.querySelector("#firstnameerror").innerText = "";
    firstNameInput.classList.remove("failed");
    firstNameInput.classList.add("success");
  } else if (firstNameInput.value === "") {
    firstNameInput.classList.remove("failed");
    firstNameInput.classList.remove("success");
  } else {
    document.querySelector("#firstnameerror").innerText = "";
    firstNameInput.classList.add("failed");
  }
});
email.addEventListener("input", (e) => {
  const isEmailValid = emailValidation.test(e.target.value);
  if (isEmailValid) {
    document.querySelector("#firstnameerror").innerText = "";
    e.target.setAttribute("class", "success");
  } else if (e.target.value === "") {
    e.target.classList.remove("failed");
    e.target.classList.remove("success");
  } else {
    document.querySelector("#emailerror").innerText = "";
    e.target.setAttribute("class", "failed");
  }
});

checkvalidations(formone, nextBtn);

//phone validation
document.getElementById("phone").addEventListener("input", (e) => {
  const phoneInput = document.getElementById("phone");
  if (phoneValidation.test(phoneInput.value)) {
    document.querySelector("#phoneerror").innerText = "";
    e.target.setAttribute("class", "success");
  } else if (phoneInput.value === "") {
    phoneInput.classList.remove("failed");
    phoneInput.classList.remove("success");
  } else {
    e.target.setAttribute("class", "failed");
    document.querySelector("#phoneerror").innerText = "";
  }
});

//address validation
document.getElementById("streetname").addEventListener("keyup", (e) => {
  let addressError = document.getElementById("addresserror");
  if (addressRegex.test(e.target.value.trim())) {
    addressError.textContent = "";
    e.target.classList.remove("failed");
    e.target.classList.add("success");
  } else if (e.target.value === "") {
    e.target.classList.remove("failed");
    e.target.classList.remove("success");
  } else {
    addressError.textContent = "";
    e.target.classList.add("failed");
    // addressError.textContent = "Street address is required minimum 8 letters";
  }
});

//pincode validation
document.getElementById("zipcode").addEventListener("keyup", (e) => {
  const pinCodeInput = document.getElementById("zipcode");
  const pinError = document.getElementById("codeerror");
  if (/^\d{6,6}$/.test(pinCodeInput.value.trim())) {
    pinError.textContent = "";
    pinCodeInput.classList.remove("failed");
    pinCodeInput.classList.add("success");
  } else if (pinCodeInput.value === "") {
    pinCodeInput.classList.remove("failed");
    pinCodeInput.classList.remove("success");
  } else {
    pinError.textContent = "";
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
  } else if (cityInput.value === "") {
    cityInput.classList.remove("failed");
    cityInput.classList.remove("success");
  } else {
    cityError.textContent = "";
    // cityError.textContent = "Please enter a valid city name";
    cityInput.classList.add("failed");
    cityInput.classList.remove("success");
  }
});

checkvalidations(formtwo, secondNxtBtn);

//password validation
document.getElementById("password").addEventListener("keydown", () => {
  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("passworderror");
  if (passwordregex.test(passwordInput.value.trim())) {
    passwordError.textContent = "";
    passwordInput.classList.remove("failed");
    passwordInput.classList.add("success");
  } else if (passwordInput.value === "") {
    passwordInput.classList.remove("failed");
    passwordInput.classList.remove("success");
  } else {
    passwordError.textContent = "";
    // passwordError.textContent =
    //   "";
    passwordInput.classList.add("failed");
    passwordInput.classList.remove("success");
  }
});

//submit
form.addEventListener("submit", (e) => {
  debugger;
  e.preventDefault();
  // console.log("in");
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

  let arrPass = ["password", "cpassword", "squestion"];

  if (Password !== Cpassword) {
    document.getElementById("cpassworderror").innerText =
      "Passwords do not match Please Check Your Password";
    arrPass.forEach((value, i) => {
      if (i < 2) {
        document.getElementById(`${value}`).classList.add("failed");
      }
    });
    return false;
  } else {
    arrPass.forEach((value, i) => {
      if (i < 2) {
        document.getElementById(`${value}`).classList.add("success");
      }
    });
    document.getElementById("cpassword").classList.add("success");
    document.getElementById("passworderror").innerText = "";
    document.getElementById("cpassworderror").innerText = "";
  }

  if (Password == "" || Cpassword == "" || SecurityQuestion == "") {
    arrPass.forEach((value) => {
      document.getElementById(`${value}`).classList.add("failed");
    });

    document.getElementById("passworderror").innerText =
      "Password must be at least 4 characters and Contains 1 capital letter";
    document.getElementById("cpassworderror").innerText = "This feild is empty";
    document.getElementById("questionerror").innerText = "This feild is empty";
    return false;
  } else if (Password !== "" || Cpassword !== "" || SecurityQuestion !== "") {
    arrPass.forEach((value) => {
      document.getElementById(`${value}`).classList.add("success");
    });
    form.reset();
    location.href = "redirect.html";
  }
});

checkvalidations(formthree, submitBtn);

document.getElementById("step1NextBtn").addEventListener("click", () => {
  // debugger;
  let name = document.getElementById("firstname").value;
  let email = document.getElementById("email").value;

  const firstNameInput = document.getElementById("firstname");
  const emailInput = document.getElementById("email");
  let usernamevalid = false;
  let emailvalid = false;

  //username
  if (usernamevalidation.test(name)) {
    firstNameInput.classList.remove("failed");
    firstNameInput.classList.add("success");
    usernamevalid = true;
  } else if (firstNameInput.value == "") {
    document.querySelector("#firstnameerror").innerText =
      "Please Enter The Correct Name";
    // firstNameInput.classList.remove("failed");
    // firstNameInput.classList.remove("success");
  } else {
    document.querySelector("#firstnameerror").innerText =
      "Invalid Username Please Check";

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
    // emailInput.classList.add("class", "failed");
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
    document.querySelector("#phoneerror").innerText =
      "PhoneNumber Contains 10 Digit Numbers";
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
  if (/^\d{6,6}$/.test(pinCodeInput.value.trim())) {
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
