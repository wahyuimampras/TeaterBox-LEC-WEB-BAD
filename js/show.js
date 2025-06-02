    async function loadHTML(id, file, callback) {
    const res = await fetch(`masterComponent/${file}`);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
    if (callback) callback();
  }

  loadHTML("navbar", "navbar.html", () => {
    const script = document.createElement("script");
    script.src = "./js/navbar.js";
    script.onload = () => initNavbar();
    document.body.appendChild(script);
  });

  loadHTML("footer", "footer.html");
window.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.getElementById("sort");
  const showGrid = document.querySelector(".show-grid");

  // Fungsi untuk membersihkan teks tanggal dari "18th", "21st", dsb
  function cleanDate(text) {
    const cleaned = text.replace(/(\d+)(st|nd|rd|th)/g, "$1"); // hapus st, nd, rd, th
    return new Date(cleaned);
  }

  // Fungsi untuk membersihkan teks harga seperti "IDR100.000"
  function cleanPrice(text) {
    return parseInt(text.replace(/[^\d]/g, ""), 10); // hilangkan semua non-digit
  }

  sortSelect.addEventListener("change", () => {
    const cards = Array.from(document.querySelectorAll(".show-card"));
    const sortBy = sortSelect.value;

    let sortedCards = [...cards];

    if (sortBy === "Name") {
      sortedCards.sort((a, b) => {
        const nameA = a.querySelector("h3").textContent.toLowerCase();
        const nameB = b.querySelector("h3").textContent.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (sortBy === "Price") {
      sortedCards.sort((a, b) => {
        const priceA = cleanPrice(a.querySelector(".price").textContent);
        const priceB = cleanPrice(b.querySelector(".price").textContent);
        return priceA - priceB;
      });
    } else if (sortBy === "Date") {
      sortedCards.sort((a, b) => {
        const dateA = cleanDate(a.querySelector(".date").textContent);
        const dateB = cleanDate(b.querySelector(".date").textContent);
        return dateA - dateB;
      });
    }

    // Render ulang kartu yang sudah diurutkan
    showGrid.innerHTML = "";
    sortedCards.forEach(card => showGrid.appendChild(card));
  });
});
