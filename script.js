window.onload = function () {
  const container = document.querySelector(".main-container");
  const formData = localStorage.getItem("formData");

  const data = JSON.parse(formData);

  const card = document.createElement("div");

  card.classList.add("card");
  card.innerHTML = `
    <h1>
      Thank You <span class="fw-semibold">${data.fname}</span> 
    </h1>
    <h4 class="fw-semibold">Here are your Details</h4>

    <h3> Your Email :<span>${data.Email}</span></h3>
    <h3> Your PhoneNumber :<span>${data.Phone}</span></h3>    
    <h3> Your City :<span>${data.City}</span></h3>
    <h3> Your Password :<span>${data.Password}</span></h3>
    <h3> Your SecurityQuestion :<span>${data.SecurityQuestion}</span></h3>
  `;

  container.appendChild(card);
};
