document.addEventListener('DOMContentLoaded', () => {
  async function loadHTML(id, file, callback) {
    try {
      const res = await fetch(`masterComponent/${file}`); 
      if (!res.ok) {
        throw new Error(`Failed to load ${file}: ${res.status} ${res.statusText}`);
      }
      const text = await res.text();
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = text;
      } else {
        console.error(`Element with id '${id}' not found for ${file}.`);
      }
      if (callback) callback();
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  }

  loadHTML("navbar", "navbar.html", () => {
    const script = document.createElement("script");
    script.src = "./js/navbar.js";
    script.onload = () => {
      if (typeof initNavbar === 'function') {
        initNavbar();
      } else {
        console.error('initNavbar function not found in navbar.js.');
      }
    };
    document.body.appendChild(script);
  });

  loadHTML("footer", "footer.html");

  const itemTitleDisplay = document.getElementById('item-title');
  const purchaseTypeDisplayElement = document.getElementById('purchase-type-display');
  const itemBasePriceDisplay = document.getElementById('item-base-price');

  const adminFeeDisplay = document.getElementById('admin-fee');
  const taxDisplay = document.getElementById('tax');
  const totalPriceDisplay = document.getElementById('total-price-display');
  const paymentMethodSelect = document.getElementById('payment-method');
  const payNowButton = document.getElementById('pay-now-btn');

  let currentItemTitle = "Selected Movie/Show"; 
  let currentPurchaseType = "N/A"; 
  let currentBasePrice = 0;    

  const urlParams = new URLSearchParams(window.location.search);
  
  currentItemTitle = urlParams.get('title') || currentItemTitle; 
  
  const purchaseInfoParam = urlParams.get('purchaseInfo');

  if (purchaseInfoParam) {
    const parts = purchaseInfoParam.split('_');
    if (parts.length === 2) {
      currentPurchaseType = parts[0];
      currentBasePrice = parseFloat(parts[1]);
      if (isNaN(currentBasePrice)) {
        console.error("Invalid price in 'purchaseInfo' parameter:", purchaseInfoParam);
        currentBasePrice = 0; 
      }
    } else {
      console.error("Invalid format for 'purchaseInfo' parameter:", purchaseInfoParam);
    }
  } else {
    console.warn("'purchaseInfo' parameter is missing from URL.");
  }

  if (itemTitleDisplay) itemTitleDisplay.textContent = currentItemTitle;
  if (purchaseTypeDisplayElement) purchaseTypeDisplayElement.textContent = `Purchase Type: ${currentPurchaseType}`;
  if (itemBasePriceDisplay) itemBasePriceDisplay.textContent = `IDR${currentBasePrice.toLocaleString('id-ID')}`;

  function getAdminFeePerItem(method) {
    switch (method.toLowerCase()) {
      case "gopay": return 4500;
      case "ovo": return 2500;
      case "dana": return 5000;
      case "bca": return 0;
      default: return 0;
    }
  }

  function updateTotal() {
    if (!paymentMethodSelect || !adminFeeDisplay || !taxDisplay || !totalPriceDisplay) {
      return;
    }

    const selectedMethod = paymentMethodSelect.value;
    const adminFee = getAdminFeePerItem(selectedMethod);
    
    const basePriceForCalc = Number(currentBasePrice);
    if (isNaN(basePriceForCalc)) {
        console.error("Cannot calculate total: Base price is not a valid number.");
        if (itemBasePriceDisplay) itemBasePriceDisplay.textContent = "Error";
        if (taxDisplay) taxDisplay.textContent = "Error";
        if (totalPriceDisplay) totalPriceDisplay.textContent = "Error";
        return;
    }

    const taxOnBase = Math.round(basePriceForCalc * 0.11); 
    const total = basePriceForCalc + taxOnBase + adminFee;

    adminFeeDisplay.textContent = "IDR" + adminFee.toLocaleString("id-ID");
    taxDisplay.textContent = "IDR" + taxOnBase.toLocaleString("id-ID");
    totalPriceDisplay.textContent = "IDR" + total.toLocaleString("id-ID");
  }

  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener("change", updateTotal);
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

  if (payNowButton) {
    payNowButton.addEventListener("click", () => {
      // alert(`Simulating payment...\nItem: ${currentItemTitle} (${currentPurchaseType})\nTotal: ${totalPriceDisplay.textContent}\nMethod: ${paymentMethodSelect.value}\n\nThank you! You will be redirected.`);
        const goToHome = () => { window.location.href = "./index.html"; };
        openPopup("./asset/success.png", "Success!", "Your Payment is Success", goToHome);
    });
  }

  updateTotal(); 
});