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

  switch (inputId) {
    case "firstname":
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
    default:
      break;
  }
}

// on input form validation start here
const inputhandleKey = (e, key) => {
  const regexvalidation = {
    name: /^(?=.*[A-Z])[a-zA-Z]{1,50}$/,
    specialchars:
      /^(?=.*[A-Z])[a-zA-Z!@#$%^&*()_+={}[\]:;\"'<,>.?/~`|-]{1,50}$/,
    phone: /^\d{10}$/,
    streetname: /^[a-zA-Z\s\d]{8,200}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z]).{4,}$/,
    zipcode: /^\d{6,6}$/,
    city: /^[a-zA-Z\s]+$/,
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
};

nextBtn.disabled = true;
secondNxtBtn.disabled = true;
submitBtn.disabled = true;
checkvalidations(formone, nextBtn);
checkvalidations(formtwo, secondNxtBtn);

//submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fname = document.getElementById("name").value;
  const Email = document.getElementById("email").value;
  const Phone = document.getElementById("phone").value;
  const streetaddress = document.getElementById("streetname").value;
  let City = document.getElementById("city").value;
  let Password = document.getElementById("password").value;

  const Cpassword = document.getElementById("cpassword").value;
  const SecurityQuestion = document.getElementById("squestion").value;

  const formData = {
    fname,
    Email,
    Phone,
    City,
    Password,
    Cpassword,
    SecurityQuestion,
  };
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
