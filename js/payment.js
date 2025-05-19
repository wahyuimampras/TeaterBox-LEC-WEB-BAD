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

function updateTotal(qty = parseInt(qtyInput.value)) {
  const selectedMethod = paymentMethod.value;
  const adminFeePerTicket = getAdminFeePerTicket(selectedMethod);
  const totalTicketPrice = seatPrice * qty;
  const tax = Math.round(totalTicketPrice * 0.11);
  const adminFee = adminFeePerTicket * qty;
  const total = totalTicketPrice + tax + adminFee;

  adminFeeRow.textContent = "Rp" + adminFee.toLocaleString("id-ID");
  taxRow.textContent = "Rp" + tax.toLocaleString("id-ID");
  totalRow.textContent = "Rp" + total.toLocaleString("id-ID");
}

function increaseQty() {
  let qty = parseInt(qtyInput.value);
  if (qty < 5) {
    qty++;
    qtyInput.value = qty;
    updateTotal(qty);
  } else {
    alert("Maksimal pembelian 5 tiket.");
  }
}

function decreaseQty() {
  let qty = parseInt(qtyInput.value);
  if (qty > 1) {
    qty--;
    qtyInput.value = qty;
    updateTotal(qty);
  }
}

function copyText() {
  const text = "OD18052025025";
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied: " + text);
  });
}

// Trigger update when payment method changes
paymentMethod.addEventListener("change", () => updateTotal());

// Initial total calculation
updateTotal();
