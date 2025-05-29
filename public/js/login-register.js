const signUpButton = document.getElementById("signUpForm");
const signInButton = document.getElementById("signInForm");
const container = document.getElementById("container");

const mobileSignUpLink = document.getElementById("signUp-link");
const mobileSignInLink = document.getElementById("signIn-link");

const popup = document.getElementById("popup");
const popupOverlay = document.getElementById("popup-overlay");

let currentForm = 'sign-in';

let popupCallback = null;

function resetInlineStyle() {
  document.querySelector('.sign-in-container').style = "";
  document.querySelector('.sign-up-container').style = "";
}

function showSignUpForm() {
  currentForm = 'sign-up';
  if (window.innerWidth <= 768) {
    container.classList.remove("right-panel-active");
    document.querySelector('.sign-in-container').style.zIndex = 1;
    document.querySelector('.sign-in-container').style.opacity = 0;
    document.querySelector('.sign-up-container').style.zIndex = 2;
    document.querySelector('.sign-up-container').style.opacity = 1;
  } else {
    resetInlineStyle();
    container.classList.add("right-panel-active");
  }
}

function showSignInForm() {
  currentForm = 'sign-in';
  if (window.innerWidth <= 768) {
    container.classList.remove("right-panel-active");
    document.querySelector('.sign-up-container').style.zIndex = 1;
    document.querySelector('.sign-up-container').style.opacity = 0;
    document.querySelector('.sign-in-container').style.zIndex = 2;
    document.querySelector('.sign-in-container').style.opacity = 1;
  } else {
    resetInlineStyle();
    container.classList.remove("right-panel-active");
  }
}

signUpButton.addEventListener("click", showSignUpForm);
signInButton.addEventListener("click", showSignInForm);

mobileSignUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  showSignUpForm();
});

mobileSignInLink.addEventListener("click", (e) => {
  e.preventDefault();
  showSignInForm();
});

window.addEventListener("resize", () => {
  resetInlineStyle();
  if (window.innerWidth > 768) {
    if (currentForm === 'sign-up') {
      container.classList.add("right-panel-active");
    } else {
      container.classList.remove("right-panel-active");
    }
  } else {
    container.classList.remove("right-panel-active");
    if (currentForm === 'sign-up') {
      document.querySelector('.sign-in-container').style.zIndex = 1;
      document.querySelector('.sign-in-container').style.opacity = 0;
      document.querySelector('.sign-up-container').style.zIndex = 2;
      document.querySelector('.sign-up-container').style.opacity = 1;
    } else {
      document.querySelector('.sign-up-container').style.zIndex = 1;
      document.querySelector('.sign-up-container').style.opacity = 0;
      document.querySelector('.sign-in-container').style.zIndex = 2;
      document.querySelector('.sign-in-container').style.opacity = 1;
    }
  }
});

function openPopup(imageSrc, title, message, onCloseCallback = null) {
  document.getElementById('popup-image').src = imageSrc;
  document.getElementById('popup-title').innerText = title;
  document.getElementById('popup-message').innerText = message;
  popup.classList.add("open-popup");
  popupOverlay.classList.add("active");
  popupCallback = onCloseCallback;
}

function closePopup() {
  popup.classList.remove("open-popup");
  popupOverlay.classList.remove("active");

  if (typeof popupCallback === 'function') {
    popupCallback(); // Jalankan aksi yang tersimpan
  }
  popupCallback = null;
}

document.getElementById('popup-overlay').addEventListener('click', closePopup);

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  let name = document.getElementById('name').value.trim();
  let emailRegist = document.getElementById('email-register').value.trim();
  let passwordRegist = document.getElementById('password-register').value;
  let confirmPassword = document.getElementById('confirm-password').value;

  if (name === "") {
    openPopup("./asset/error.png", "Error!", "Name cannot be empty");
  } else if (name.length < 5) {
    openPopup("./asset/error.png", "Error!", "Name cannot be less than 5 characters");
  } else if (emailRegist === "") {
    openPopup("./asset/error.png", "Error!", "Email cannot be empty");
  } else if (passwordRegist === "") {
    openPopup("./asset/error.png", "Error!", "Password cannot be empty");
  } else if (passwordRegist.length < 8) {
    openPopup("./asset/error.png", "Error!", "Password cannot be less than 8 characters");
  } else if (confirmPassword === "") {
    openPopup("./asset/error.png", "Error!", "Confirm Password cannot be empty");
  } else if (passwordRegist !== confirmPassword) {
    openPopup("./asset/error.png", "Error!", "Password and Confirm Password do not match");
  } else {
    // Kirim data ke register.php
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // Kirim sebagai string JSON
        name: name,
        email: emailRegist,
        password: passwordRegist
      }),
    })
      .then(response => response.json())
      .then(data => {
      if (data.status === "success") {
        // Aksi `showSignInForm` akan dijalankan saat popup ditutup.
        openPopup("./asset/success.png", "Success!", data.message, showSignInForm);
      } else {
          openPopup("./asset/error.png", "Error!", data.message);
        }
      })
      .catch(error => {
        openPopup("./asset/error.png", "Error!", "There is error happening");
      });
  }
  // document.getElementById('register-form').reset();
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  let emailLogin = document.getElementById('email-login').value.trim();
  let passwordLogin = document.getElementById('password-login').value;

  if (emailLogin === "") {
    openPopup("./asset/error.png", "Error!", "Email cannot be empty");
  } else if (passwordLogin === "") {
    openPopup("./asset/error.png", "Error!", "Password cannot be empty");
  } else {
    // Kirim data ke login.php
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // Kirim sebagai string JSON
        email: emailLogin,
        password: passwordLogin
      }),
    })
      .then(response => response.json())
      .then(data => {
      if (data.status === "success" && data.token) {
        localStorage.setItem('authToken', data.token);
        // Buat fungsi untuk pindah halaman
        const goToHome = () => { window.location.href = "home.html"; };
        // Aksi `goToHome` akan dijalankan saat popup ditutup.
        openPopup("./asset/success.png", "Success!", data.message, goToHome);
      } else {
          openPopup("./asset/error.png", "Error!", data.message);
        }
      })
      .catch(error => {
        openPopup("./asset/error.png", "Error!", "There is error happening");
      });
  }
  // document.getElementById('login-form').reset();
});
