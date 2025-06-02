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

  adminFeeRow.textContent = "Rp" + adminFee.toLocaleString("id-ID");
  taxRow.textContent = "Rp" + tax.toLocaleString("id-ID");
  totalRow.textContent = "Rp" + total.toLocaleString("id-ID");

  document.getElementById("seat-price").textContent = "Rp" + totalSeatPrice.toLocaleString("id-ID");
}

function increaseQty() {
  alert("Jumlah tiket hanya bisa dipilih di halaman sebelumnya.");
}

function decreaseQty() {
  alert("Jumlah tiket hanya bisa dipilih di halaman sebelumnya.");
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
  alert("Tidak ada kursi yang dipilih. Kembali ke halaman sebelumnya.");
  window.location.href = "./ticket.html";
}

const seatClass = selectedSeats[0]?.class.toUpperCase() || 'UNKNOWN';
document.querySelector('.class-badge').textContent = seatClass;
document.getElementById('qty').value = seatQty;

const totalSeatPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
// Trigger update when payment method changes
paymentMethod.addEventListener("change", () => updateTotal());

// Initial total calculation
updateTotal();

 payNowButton.addEventListener("click", () => {
      alert(`Simulating payment...\nItem: ${currentItemTitle} (${currentPurchaseType})\nTotal: ${totalPriceDisplay.textContent}\nMethod: ${paymentMethodSelect.value}\n\nThank you! You will be redirected.`);
      window.location.href = "index.html"; 
    });
