document.addEventListener('DOMContentLoaded', ()=>{
  const signUpButton = document.getElementById("signUpForm");
  const signInButton = document.getElementById("signInForm");
  const container = document.getElementById("container");

  const mobileSignUpLink = document.getElementById("signUp-link");
  const mobileSignInLink = document.getElementById("signIn-link");

  const popup = document.getElementById("popup");
  const popupOverlay = document.getElementById("popup-overlay");

  let currentForm = 'sign-in';

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
      popupCallback(); 
    }
    popupCallback = null;
  }

  document.getElementById('popup-overlay').addEventListener('click', closePopup);
  document.getElementById('closeBtn').addEventListener('click', closePopup);

  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email-register').value.trim();
    const password = document.getElementById('password-register').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Menggunakan validasi per-field dari kode asli Anda
    if (name === "") {
        openPopup("./asset/error.png", "Error!", "Name cannot be empty");
    } else if (name.length < 5) {
        openPopup("./asset/error.png", "Error!", "Name cannot be less than 5 characters");
    } else if (email === "") {
        openPopup("./asset/error.png", "Error!", "Email cannot be empty");
    } else if (password === "") {
        openPopup("./asset/error.png", "Error!", "Password cannot be empty");
    } else if (password.length < 8) {
        openPopup("./asset/error.png", "Error!", "Password cannot be less than 8 characters");
    } else if (confirmPassword === "") {
        openPopup("./asset/error.png", "Error!", "Confirm Password cannot be empty");
    } else if (password !== confirmPassword) {
        openPopup("./asset/error.png", "Error!", "Password and Confirm Password do not match");
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === email)) {
            openPopup("./asset/error.png", "Error!", "Email is already registered.");
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            dob: '',
            phone: '',
            gender: '',
            address: ''
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        openPopup("./asset/success.png", "Success!", "Your registration is successful", showSignInForm);
        document.getElementById('register-form').reset();
    }
  });

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value;

    // Menggunakan validasi per-field dari kode asli Anda
    if (email === "") {
        openPopup("./asset/error.png", "Error!", "Email cannot be empty");
    } else if (password === "") {
        openPopup("./asset/error.png", "Error!", "Password cannot be empty");
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
            const goToHome = () => { window.location.href = "./index.html"; };
            openPopup("./asset/success.png", "Success!", "Login Successful! You will be redirected...", goToHome);
        } else {
            openPopup("./asset/error.png", "Error!", "Invalid email or password.");
        }
        document.getElementById('login-form').reset();
    }
  });
})


