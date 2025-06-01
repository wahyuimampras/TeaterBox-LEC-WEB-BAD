document.addEventListener("DOMContentLoaded", () => {
  // Fungsi load komponen HTML async
  async function loadHTML(id, file, callback) {
    const res = await fetch(`masterComponent/${file}`);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
    if (callback) callback();
  }

  // Load navbar + script navbar.js dan initNavbar()
  loadHTML("navbar", "navbar.html", () => {
    const script = document.createElement("script");
    script.src = "./js/navbar.js";
    script.onload = () => initNavbar();
    document.body.appendChild(script);
  });

  let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  // Load footer
  loadHTML("footer", "footer.html");

  const container = document.querySelector(".profile-container");
  const inputs = container.querySelectorAll(".editable");
  const editBtn = document.getElementById("editProfileBtn");
  let editMode = false;

  const fullNameInput = container.querySelector('input[type="text"]');
  const emailInput = container.querySelector('input[type="email"]');
  const dobInput = container.querySelector('input[type="date"]');
  const phoneInput = container.querySelector('input[type="tel"]');
  const genderSelect = container.querySelector('select');
  const addressTextarea = container.querySelector('textarea');

  function populateProfileForm() {
    fullNameInput.value = currentUser.name || '';
    emailInput.value = currentUser.email || '';
    dobInput.value = currentUser.dob || '';
    phoneInput.value = currentUser.phone || '';
    genderSelect.value = currentUser.gender || 'Female'; // Default jika belum diatur
    addressTextarea.value = currentUser.address || '';
  }
  
  populateProfileForm();


  editBtn.addEventListener("click", () => {
    if (editMode) {
      const updatedUser = {
        ...currentUser, 
        name: fullNameInput.value.trim(),
        email: emailInput.value.trim(), 
        dob: dobInput.value,
        phone: phoneInput.value.trim(),
        gender: genderSelect.value,
        address: addressTextarea.value.trim(),
      };

      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.email === currentUser.email);
      
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }

      const navbarUserName = document.getElementById('navbar-user-name');
      if (navbarUserName) {
        navbarUserName.textContent = updatedUser.name;
      }
      
      openPopup('./asset/success.png', 'Success', 'Profile updated successfully!');
    }

    // Toggle mode edit
    editMode = !editMode;
    container.classList.toggle("edit-mode");
    inputs.forEach(el => el.disabled = !editMode);
    editBtn.textContent = editMode ? "Save Profile" : "Edit Profile";
  });


  // Sidebar History toggle
  const toggleBtn = document.getElementById("toggleHistory");
  const sidebar = document.getElementById("sidebarHistory");
  const closeBtn = document.getElementById("closeSidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // Popup elements
  const popup = document.getElementById('popup');
  const popupOverlay = document.getElementById('popup-overlay');
  const closePopupBtn = document.getElementById('closeBtn');

  // Fungsi buka popup
  function openPopup(imageSrc, title, message, callback = null) {
    document.getElementById('popup-image').src = imageSrc;
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-message').innerText = message;
    popupCallback = callback;
    popup.classList.add("open-popup");
    popupOverlay.classList.add("active");
  }

  function closePopup() {
    popup.classList.remove("open-popup");
    popupOverlay.classList.remove("active");
    if (typeof popupCallback === 'function') {
        popupCallback();
    }
    popupCallback = null;
  }

    closePopupBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);  

  // Logout dengan popup
  document.getElementById("logoutBtn").addEventListener("click", () => {
    const goToLogin = () => { 
      sessionStorage.removeItem('currentUser');
      window.location.href = "./login-register.html"; 
    };
    openPopup("./asset/success.png", "Logout", "You have been logged out successfully.", goToLogin);
  });
});
