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
//check next button
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

// regex validation
const usernamevalidation = /^(?=.*[A-Z])[a-zA-Z]{1,50}$/;
const specialchars =
  /^(?=.*[A-Z])[a-zA-Z!@#$%^&*()_+={}[\]:;\"'<,>.?/~`|-]{1,50}$/;
const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneValidation = /^\d{10}$/;
const addressRegex = /^[a-zA-Z\s\d]{8,200}$/;
const passwordregex = /^(?=.*[A-Z]).{4,}$/;

//on key press form validation start here
function validateform(event) {
  const usernamevalidation = /[^a-zA-Z\s]+/;
  const numbervalidation = /[^0-9]+/;

  const inputValue = event.key;

  const inputId = event.target.id;
  console.log(inputId);

  switch (inputId) {
    case "name":
      if (usernamevalidation.test(inputValue)) {
        event.preventDefault();
      }
      break;

    case "phone":
      if (numbervalidation.test(inputValue)) {
        event.preventDefault();
      }
      break;

    case "zipcode":
      if (numbervalidation.test(inputValue)) {
        event.preventDefault();
      }
      break;

    case "city":
      if (usernamevalidation.test(inputValue)) {
        event.preventDefault();
      }
      break;
    case "sanswer":
      if (usernamevalidation.test(inputValue)) {
        event.preventDefault();
      }
    default:
      break;
  }
}

// on input form validation start here
const inputhandleKey = (e, key) => {
  debugger;
  const Password = document.getElementById("password").value;
  const Cpassword = document.getElementById("cpassword").value;
  const regexvalidation = {
    name: /^(?=.*[A-Z])[a-zA-Z]{1,50}$/,
    specialchars:
      /^(?=.*[A-Z])[a-zA-Z!@#$%^&*()_+={}[\]:;\"'<,>.?/~`|-]{1,50}$/,
    phone: /^\d{10}$/,
    streetname: /^[a-zA-Z\s\d]{8,200}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z]).{1,}$/,
    zipcode: /^\d{6,6}$/,
    city: /^[a-zA-Z\s]+$/,
    sanswer: /^(?=.*[A-Z])[a-zA-Z]{1,50}$/,
    error: "",
  };
  let value = e.target.value;
  let tag = e.target;

  if (regexvalidation[key].test(value)) {
    document.querySelector(`#${key}error`).innerText = regexvalidation["error"];
    tag.setAttribute("class", "success");
  } else if (value === "") {
    tag.classList.remove("failed");
    tag.classList.remove("success");
    document.querySelector(`#${key}error`).innerText = regexvalidation["error"];
  } else {
    document.querySelector(`#${key}error`).innerText = regexvalidation["error"];
    tag.classList.add("failed");
  }

  if (Password == "" || Cpassword == "") {
    document.getElementById("cpassworderror").innerText = "";
  } else {
    document.getElementById("cpassworderror").innerText = "";
  }
};

nextBtn.disabled = true;
secondNxtBtn.disabled = true;
submitBtn.disabled = true;
checkvalidations(formone, nextBtn);
checkvalidations(formtwo, secondNxtBtn);

//submit
form.addEventListener("submit", (e) => {
  debugger;
  e.preventDefault();

  const fname = document.getElementById("name").value;
  const Email = document.getElementById("email").value;
  const Phone = document.getElementById("phone").value;
  const streetaddress = document.getElementById("streetname").value;
  const City = document.getElementById("city").value;
  const Password = document.getElementById("password").value;
  const Cpassword = document.getElementById("cpassword").value;
  const security_question = document.getElementById("security_question").value;
  const SecurityAnswer = document.getElementById("sanswer").value;

  const passwordRegex = /^(?=.*[A-Z]).{4,}$/;

  const isPasswordValid = passwordRegex.test(Password);
  const doPasswordsMatch = Password === Cpassword;

  const isFormValid = isPasswordValid && doPasswordsMatch;

  if (isFormValid) {
    const formData = {
      fname,
      Email,
      Phone,
      streetaddress,
      City,
      Password,
      Cpassword,
      security_question,
      SecurityAnswer,
    };
    const stringData = JSON.stringify(formData);
    localStorage.setItem("formData", stringData);
    form.reset();
    location.href = "redirect.html";
  } else {
    if (!isPasswordValid) {
      document.getElementById("passworderror").innerText =
        "Password must be at least 4 characters and contain at least one capital letter";
    } else {
      document.getElementById("cpassworderror").innerText =
        "Passwords do not match. Please check your password.";
    }
  }
});

//check condition for next button disabled
checkvalidations(formthree, submitBtn);

//check validation before clicking next button
const handleValidation = (validation, regexvalidation, validationStatus) => {
  validation.forEach((item, index) => {
    let inputElement = document.getElementById(item);
    if (
      regexvalidation[Object.keys(regexvalidation)[index]].test(
        inputElement.value
      )
    ) {
      inputElement.classList.remove("failed");
      inputElement.classList.add("success");
      validationStatus[`${item}valid`] = true;
    } else {
      document.getElementById(
        `${item}error`
      ).innerText = `${regexvalidation.error} Your ${item}`;
      inputElement.classList.add("failed");
      validationStatus[`${item}valid`] = false;
    }
  });
};

// step form movement
const stepform = (id1, icon1, id2, icon2) => {
  document.getElementById(id1).style.display = "block";
  document.getElementById(id2).style.display = "none";
  document.getElementById(icon1).style.background = "#98acef";
  document.getElementById(icon2).style.background = "white";
  document.getElementById(icon2).style.border = "3px solid #98acef";
};

const handleFirstNextButton = (event) => {
  const regexvalidation = {
    name: /^(?=.*[A-Z])[a-zA-Z]{1,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    error: "Invalid Please Check",
  };
  let validation = ["name", "email"];
  let validationStatus = {
    namevalid: false,
    emailvalid: false,
  };
  handleValidation(validation, regexvalidation, validationStatus);
  if (validationStatus.namevalid && validationStatus.emailvalid) {
    stepform("step2", "stepIcon2", "step1", "stepIcon1");
  }
};

const handleSecondNextButton = (event) => {
  const regexvalidation = {
    phone: /^\d{10}$/,
    streetname: /^[a-zA-Z\s\d]{8,200}$/,
    zipcode: /^\d{6,6}$/,
    city: /^[a-zA-Z\s]+$/,
    error: "Invalid Please Check",
  };
  let validation = ["phone", "streetname", "zipcode", "city"];
  let validationStatus = {
    phonevalid: false,
    streetnamevalid: false,
    zipcodevalid: false,
    cityvalid: false,
  };
  handleValidation(validation, regexvalidation, validationStatus);

  if (
    validationStatus.phonevalid &&
    validationStatus.cityvalid &&
    validationStatus.zipcodevalid &&
    validationStatus.streetnamevalid
  ) {
    stepform("step3", "stepIcon3", "step2", "stepIcon2");
  }
};

document.getElementById("step2BackBtn").addEventListener("click", () => {
  stepform("step1", "stepIcon1", "step2", "stepIcon2");
});

document.getElementById("step3BackBtn").addEventListener("click", () => {
  stepform("step2", "stepIcon2", "step3", "stepIcon3");
});
