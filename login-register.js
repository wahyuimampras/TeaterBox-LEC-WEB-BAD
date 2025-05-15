const signUpButton = document.getElementById("signUpForm");
const signInButton = document.getElementById("signInForm");
const container = document.getElementById("container");

const mobileSignUpLink = document.getElementById("signUp-link");
const mobileSignInLink = document.getElementById("signIn-link");

// 👉 Simpan status form yang terakhir aktif
let currentForm = 'sign-in'; // default

function showSignUpForm() {
  currentForm = 'sign-up';
  if (window.innerWidth <= 768) {
    container.classList.remove("right-panel-active");
    document.querySelector('.sign-in-container').style.zIndex = 1;
    document.querySelector('.sign-in-container').style.opacity = 0;
    document.querySelector('.sign-up-container').style.zIndex = 2;
    document.querySelector('.sign-up-container').style.opacity = 1;
  } else {
    resetInlineStyle(); // bersihkan style mobile
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
    resetInlineStyle(); // bersihkan style mobile
    container.classList.remove("right-panel-active");
  }
}

function resetInlineStyle() {
  document.querySelector('.sign-in-container').style = "";
  document.querySelector('.sign-up-container').style = "";
}

// Event listener untuk tombol desktop
signUpButton.addEventListener("click", showSignUpForm);
signInButton.addEventListener("click", showSignInForm);

// Event listener untuk link mobile
mobileSignUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  showSignUpForm();
});
mobileSignInLink.addEventListener("click", (e) => {
  e.preventDefault();
  showSignInForm();
});

// ✅ Fix: Jaga state saat resize
window.addEventListener("resize", () => {
  resetInlineStyle(); // bersihin dulu

  if (window.innerWidth > 768) {
    // Desktop mode
    if (currentForm === 'sign-up') {
      container.classList.add("right-panel-active");
    } else {
      container.classList.remove("right-panel-active");
    }
  } else {
    // Mobile mode
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
