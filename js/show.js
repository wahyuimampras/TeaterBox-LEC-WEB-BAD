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


  function cleanDate(text) {
    const cleaned = text.replace(/(\d+)(st|nd|rd|th)/g, "$1");
    return new Date(cleaned);
  }


  function cleanPrice(text) {
    return parseInt(text.replace(/[^\d]/g, ""), 10); 
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

    showGrid.innerHTML = "";
    sortedCards.forEach(card => showGrid.appendChild(card));
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const trailerButtons = document.querySelectorAll(".trailer-btn");

  trailerButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".show-card");
      const title = card.querySelector("h3").innerText;
      window.location.href = `trailer.html?title=${encodeURIComponent(title)}`;
    });
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll('.buy-btn');

  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.show-card');

      const title = card.querySelector('h3')?.innerText || 'Unknown Title';
      const poster = card.querySelector('img')?.src || '';

      const showData = {
        title,
        poster
      };

      localStorage.setItem('selectedMovie', JSON.stringify(showData));
      window.location.href = 'ticket.html';
    });
  });
});
