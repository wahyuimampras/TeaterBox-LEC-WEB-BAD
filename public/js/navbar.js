function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const profileLink = document.querySelector('.profile .nav-link.user');

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      Us
    });

    // Highlight aktif menu
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }

    // Ambil data user untuk ditampilkan di navbar
    const token = localStorage.getItem('authToken');
    if (token) {
        fetch('/api/user/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.user) {
                profileLink.textContent = data.user.name; // Ganti nama di navbar
            }
        })
        .catch(console.error);
    } else {
        // Jika tidak ada token, sembunyikan nama user
        profileLink.style.display = 'none';
    }
}
