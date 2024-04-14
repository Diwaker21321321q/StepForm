const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-Next");

const progresssteps = document.querySelectorAll(".step");

const formsteps = document.querySelectorAll(".stepForm");

const form = document.getElementById("registration-form");

let currentStep = 1;

// regex validation for username
const usernamevalidation = /^(?=.*[A-Z])[a-zA-Z]{1,50}$/;

//regex validation for special characters
const specialchars =
  /^(?=.*[A-Z])[a-zA-Z!@#$%^&*()_+={}[\]:;\"'<,>.?/~`|-]{1,50}$/;

// regex validation for email
const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

nextBtn.addEventListener("click", () => {
  // debugger;
  const firstNameInput = document.getElementById("firstname");
  if (firstNameInput.value.trim() === "") {
    document.querySelector("#firstnameerror").innerText = "Please Enter First";
    firstNameInput.classList.add("failed");
    return; // Prevent proceeding to the next step
  }

  if (!usernamevalidation.test(firstNameInput.value.trim())) {
    document.querySelector("#firstnameerror").innerText =
      "Invalid first name. Please enter a valid first name with at least one capital letter, no numbers, and maximum 50 characters.";
    firstNameInput.classList.add("failed");
    return;
  }

  // const emailInput = document.getElementById("email");
  // if (emailInput.value.trim() === "") {
  //   emailInput.classList.add("failed");
  //   document.querySelector("#emailerror").innerText = "Please Enter First";
  //   return; // Prevent proceeding to the next step
  // } else {
  //   document.querySelector("#emailerror").innerText = "";
  //   emailInput.classList.remove("failed");
  //   emailInput.classList.add("success");
  // }

  currentStep++;
  if (currentStep > progresssteps.length) {
    currentStep = progresssteps.length;
  }
  updateProgress();
});

prevBtn.addEventListener("click", () => {
  currentStep--;
  if (currentStep < 0) {
    currentStep = 1;
  }
  updateProgress();
});

const updateProgress = () => {
  progresssteps.forEach((steps, i) => {
    if (i == currentStep - 1) {
      steps.classList.add("active");
      formsteps[i].classList.add("active");
    } else {
      steps.classList.remove("active");
      formsteps[i].classList.remove("active");
    }
  });

  if (currentStep == 1) {
    prevBtn.disabled = true;
  } else if (currentStep == progresssteps.length) {
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
};

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

// code for Live regex Validation

//for name regex Validation
document.querySelector("#firstname").addEventListener("keyup", (e) => {
  if (usernamevalidation.test(e.target.value)) {
    document.querySelector("#firstnameerror").innerText = " ";
    e.target.setAttribute("class", "success");
  } else if (/[0-9]/.test(e.target.value)) {
    document.querySelector("#firstnameerror").innerText =
      "Do not Enter Numbers on Username Feild";
    e.target.setAttribute("class", "failed");
  } else if (specialchars.test(e.target.value)) {
    document.querySelector("#firstnameerror").innerText =
      "Do not Enter SpecialCharacters on Username Feild";
    e.target.setAttribute("class", "failed");
  } else {
    document.querySelector("#firstnameerror").innerText = "Incorrect FirstName";
    e.target.setAttribute("class", "failed");
  }
});
