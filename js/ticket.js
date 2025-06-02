const seatData = [
  { class: 'vip', price: 1200000 },
  { class: 'vip', price: 1200000 },
  { class: 'gold', price: 900000 },
  { class: 'gold', price: 900000 },
  { class: 'silver', price: 650000 },
  { class: 'silver', price: 650000 },
];

const seatLayout = {
  left: 5,
  center: 7,
  right: 5
};

const MAX_SELECTION = 5;

const leftContainer = document.getElementById('leftSeats');
const centerContainer = document.getElementById('centerSeats');
const rightContainer = document.getElementById('rightSeats');
const totalSection = document.getElementById('totalSection');
const totalInfo = document.getElementById('totalInfo');
const checkoutBtn = document.getElementById('checkoutBtn');

function createSeats(container, position, count) {
  seatData.forEach((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === 2 || rowIndex === 4) {
      const label = document.createElement('div');
      label.classList.add('seat-label');
      label.textContent = row.class.toUpperCase();
      container.appendChild(label);
    }

    const seatRow = document.createElement('div');
    seatRow.classList.add('seat-row');

    for (let i = 0; i < count; i++) {
      const seat = document.createElement('div');
      seat.classList.add('dot');
      seat.classList.add(row.class); // Tambahkan baris ini agar dapat styling per kelas
      seat.dataset.class = row.class;
      seat.dataset.price = row.price;

      seat.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.dot.selected');
        if (!seat.classList.contains('selected') && selectedSeats.length >= MAX_SELECTION) {
          alert(`Maksimal memilih ${MAX_SELECTION} kursi`);
          return;
        }
        seat.classList.toggle('selected');
        updateUI();
      });

      seatRow.appendChild(seat);
    }

    container.appendChild(seatRow);
  });
}

function updateUI() {
  const selectedSeats = document.querySelectorAll('.dot.selected');
  if (selectedSeats.length > 0) {
    checkoutBtn.style.display = 'block';
    totalSection.style.display = 'block';

    let total = 0;
    selectedSeats.forEach(seat => {
      total += parseInt(seat.dataset.price);
    });

    totalInfo.textContent = `Total: Rp${total.toLocaleString('id-ID')}`;
  } else {
    checkoutBtn.style.display = 'none';
    totalSection.style.display = 'none';
  }
}

checkoutBtn.addEventListener('click', () => {
 const selectedSeats = document.querySelectorAll('.dot.selected');
  const seatInfo = [];

  selectedSeats.forEach(seat => {
    seatInfo.push({
      class: seat.dataset.class,
      price: parseInt(seat.dataset.price)
    });
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatInfo));
});
// Generate all seats
createSeats(leftContainer, 'left', seatLayout.left);
createSeats(centerContainer, 'center', seatLayout.center);
createSeats(rightContainer, 'right', seatLayout.right);

// Load navbar & footer
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
const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (movie) {
    console.log("Selected movie:", movie.title);
   
  }
