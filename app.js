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

// regex validation for username
const usernamevalidation = /^(?=.*[A-Z])[a-zA-Z]{1,50}$/;

//regex validation for special characters
const specialchars =
  /^(?=.*[A-Z])[a-zA-Z!@#$%^&*()_+={}[\]:;\"'<,>.?/~`|-]{1,50}$/;

// regex validation for email
const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//regex validation for phone number
const phoneValidation = /^\d{10}$/;

let usernamevalid;
let emailvalid;
let phoneNumberValid;
let addressvalid;

//for name and email regex Validation
if (currentStep == 0) {
  const firstNameInput = document.getElementById("firstname");
  const email = document.getElementById("email");
  firstNameInput.addEventListener("keyup", (e) => {
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
  } else if (phoneInput.length != 10) {
    e.target.setAttribute("class", "failed");
    document.querySelector("#phoneerror").innerText =
      "Please enter exactly 10 digits for the phone number.";
    phoneNumberValid = false;
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
  if (e.target.value.trim() === "") {
    e.target.classList.add("failed");
    addressError.textContent = "Street address is required";
    addressvalid = false;
    console.log("in");
  } else {
    addressError.textContent = "";
    e.target.classList.remove("failed");
    e.target.classList.add("success");
    addressvalid = true;
  }
  if (!addressvalid) {
    secondnextbtn.disabled = true;
  } else {
    secondnextbtn.disabled = false;
  }
  return;
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
  let Address = document.getElementById("address").value;
  let City = document.getElementById("city").value;
  let Password = document.getElementById("password").value;

  const Cpassword = document.getElementById("cpassword").value;
  const SecurityQuestion = document.getElementById("squestion").value;

  if (fname == "") {
    document.querySelector("#firstnameerror").innerText = "Incorrect FirstName";
    document.querySelector("#firstnameerror").innerText = "";
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
    Address,
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
