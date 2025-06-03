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

const qtyInput = document.getElementById("qty");
const seatPrice = 1800000;
const adminFeeRow = document.getElementById("admin-fee");
const taxRow = document.getElementById("tax");
const totalRow = document.getElementById("total");
const paymentMethod = document.getElementById("payment-method");
const payNowButton = document.getElementById('pay-now-btn');

function getAdminFeePerTicket(method) {
  switch (method.toLowerCase()) {
    case "gopay":
      return 4500;
    case "ovo":
      return 2500;
    case "dana":
      return 5000;
    case "bca":
      return 0;
    default:
      return 0;
  }
}

function updateTotal(qty = seatQty) {
  const selectedMethod = paymentMethod.value;
  const adminFeePerTicket = getAdminFeePerTicket(selectedMethod);
  const adminFee = adminFeePerTicket * qty;
  const tax = Math.round(totalSeatPrice * 0.11);
  const total = totalSeatPrice + adminFee + tax;

  adminFeeRow.textContent = "IDR" + adminFee.toLocaleString("id-ID");
  taxRow.textContent = "IDR" + tax.toLocaleString("id-ID");
  totalRow.textContent = "IDR" + total.toLocaleString("id-ID");

  document.getElementById("seat-price").textContent = "IDR" + totalSeatPrice.toLocaleString("id-ID");
}

  const popup = document.getElementById("popup");
  const popupOverlay = document.getElementById("popup-overlay");
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

  function increaseQty() {
    // alert("Jumlah tiket hanya bisa dipilih di halaman sebelumnya.");
    openPopup("./asset/error.png", "Error!", "Quantity can only be choose in the previous page");
  }

  function decreaseQty() {
    // alert("Jumlah tiket hanya bisa dipilih di halaman sebelumnya.");
    openPopup("./asset/error.png", "Error!", "Quantity can only be choose in the previous page");
  }

  function copyText() {
    const text = "OD18052025025";
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied: " + text);
    });
  }
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const seatQty = selectedSeats.length;

  if (seatQty === 0) {
    // alert("Tidak ada kursi yang dipilih. Kembali ke halaman sebelumnya.");
    const backToTicket = () => { window.location.href = "./index.html"; };
    openPopup("./asset/error.png", "Error!", "You did not choose any seats. Please back to the previous page", backToTicket);
  }

  const seatClass = selectedSeats[0]?.class.toUpperCase() || 'UNKNOWN';
  document.querySelector('.class-badge').textContent = seatClass;
  document.getElementById('qty').value = seatQty;

  const totalSeatPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  paymentMethod.addEventListener("change", () => {
  updateTotal();
  updateVANumber();
});

updateTotal();
updateVANumber();

 payNowButton.addEventListener("click", () => {
      const goToHome = () => { window.location.href = "./index.html"; };
      openPopup("./asset/success.png", "Success!", "Your Payment is Success", goToHome);
  });
const movieData = JSON.parse(localStorage.getItem('selectedMovie'));

if (movieData) {
  document.querySelector('.poster').src = movieData.poster;
  document.querySelector('.ticket-header h2').textContent = movieData.title;
}
function generateRandomVA() {
  let va = "";
  for (let i = 0; i < 10; i++) {
    va += Math.floor(Math.random() * 10);
  }
  return va;
}

function updateVANumber() {
  const vaNumber = generateRandomVA();
  document.getElementById("va-number").textContent = vaNumber;
}

function copyVA() {
  const vaText = document.getElementById("va-number").textContent;
  navigator.clipboard.writeText(vaText).then(() => {
    alert("Copied VA Number: " + vaText);
  });
}
