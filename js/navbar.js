function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }

  // Menampilkan nama user yang login
  const userDisplay = document.getElementById("navbar-user-name");
  if (userDisplay) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
      userDisplay.textContent = currentUser.name;
    } else {
      // Jika tidak ada user login, arahkan ke halaman login
      userDisplay.textContent = "Login";
      userDisplay.href = "login-register.html";
    }
  }
}