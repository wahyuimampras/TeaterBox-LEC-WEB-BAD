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

  // Load footer
  loadHTML("footer", "footer.html");

  // Edit Profile
  const container = document.querySelector(".profile-container");
  const inputs = container.querySelectorAll(".editable");
  const editBtn = document.getElementById("editProfileBtn");
  let editMode = false;

  editBtn.addEventListener("click", () => {
    editMode = !editMode;
    container.classList.toggle("edit-mode");
    inputs.forEach(el => el.disabled = !editMode);
    editBtn.textContent = editMode ? "Save Profile" : "Edit Profile";
    if(!editMode){
      openPopup('./asset/success.png', 'Success', 'Profile updated successfully!');
    }

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
    const goToLogin = () => { window.location.href = "./login-register.html"; };
    openPopup("./asset/success.png", "Logout", "You have been logged out successfully.", goToLogin);
  });
});
