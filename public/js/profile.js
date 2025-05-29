document.addEventListener('DOMContentLoaded', () => {
    // === BAGIAN 1: Mengambil Elemen dengan ID (Cara yang Benar) ===
    const inputs = {
        name: document.getElementById('profileName'),
        email: document.getElementById('profileEmail'),
        dob: document.getElementById('profileDob'),
        phone: document.getElementById('profilePhone'),
        gender: document.getElementById('profileGender'),
        address: document.getElementById('profileAddress')
    };
    const editButton = document.getElementById('editProfileBtn');
    const logoutButton = document.getElementById('logoutBtn');
    const token = localStorage.getItem('authToken');
    let editMode = false;

    // === BAGIAN 2: Popup dan Logika Callback (Agar bisa digunakan di halaman ini) ===
    const popup = document.getElementById('popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupBtn = document.getElementById('closeBtn');
    let popupCallback = null;

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


    // === BAGIAN 3: Mengisi Form dengan Data dari Server ===
    function populateProfile(user) {
        inputs.name.value = user.name || '';
        inputs.email.value = user.email || '';
        if (user.dob) {
            inputs.dob.value = new Date(user.dob).toISOString().split('T')[0];
        } else {
            inputs.dob.value = '';
        }
        inputs.phone.value = user.phone_number || '';
        inputs.gender.value = user.gender || 'male';
        inputs.address.value = user.address || '';
    }

    // Ambil data profil saat halaman dimuat
    fetch('/api/user/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            populateProfile(data.user);
        }
    });

    // === BAGIAN 4: Logika Tombol Edit/Save dengan Popup (Permintaan Anda) ===
    editButton.addEventListener('click', () => {
        editMode = !editMode;
        
        // Toggle input fields
        for (const key in inputs) {
            if (key !== 'email') { // Email tidak bisa diedit
                inputs[key].disabled = !editMode;
            }
        }
        
        editButton.textContent = editMode ? "Save Profile" : "Edit Profile";

        // Jika tombol "Save Profile" di-klik
        if (!editMode) {
            const updatedData = {
                name: inputs.name.value,
                dob: inputs.dob.value || null,
                phone_number: inputs.phone.value || null,
                gender: inputs.gender.value,
                address: inputs.address.value || null
            };

            fetch('/api/user/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success'){
                    // Ganti alert() dengan popup kustom
                    openPopup('./asset/success.png', 'Success', 'Profile updated successfully!');
                } else {
                    openPopup('./asset/error.png', 'Error', data.message);
                }
            })
            .catch(err => {
                console.error(err);
                openPopup('./asset/error.png', 'Error', 'An error occurred while updating profile.');
            });
        }
    });
    
    logoutButton.addEventListener('click', () => {
        const performLogout = () => {
            localStorage.removeItem('authToken'); 
            window.location.href = 'index.html';   
        };
        // Tampilkan popup konfirmasi, saat ditutup, jalankan fungsi performLogout
        openPopup('./asset/success.png', 'Logout', 'You have been logged out.', performLogout);
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
});