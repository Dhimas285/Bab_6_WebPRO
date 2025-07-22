document.addEventListener('DOMContentLoaded', () => {
    // ==================================
    // BAGIAN GLOBAL & INISIALISASI
    // ==================================

    // --- Fungsi Notifikasi (Improvisasi) ---
    const showNotification = (message, type = 'info') => {
        const container = document.getElementById('notification-container');
        if (!container) {
            console.error('Notification container not found!');
            return;
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        let icon = '';
        if (type === 'success') icon = '✔️';
        else if (type === 'error') icon = '❌';
        else icon = 'ℹ️';

        notification.innerHTML = `<span class="notification-icon">${icon}</span><span>${message}</span>`;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000); // Notifikasi akan hilang setelah 3 detik
    };


    // --- Logika Mode Gelap (Global) ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = sunIcon;
        } else {
            themeToggle.innerHTML = moonIcon;
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = sunIcon;
                showNotification('Mode Gelap Diaktifkan', 'info');
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = moonIcon;
                showNotification('Mode Terang Diaktifkan', 'info');
            }
        });
    }

    // --- Identifikasi Halaman & Navigasi Aktif (Global) ---
    const page = document.body.id;
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        // Improvisasi: Menggunakan includes untuk fleksibilitas URL
        if (link.href.includes(page + '.html')) {
            link.classList.add('active');
        }
    });

    // --- Inisialisasi Data Dummy (Global) ---
    const initialBookings = [
        // Data Riwayat (6)
        { id: 1735693200000, name: "Rina Amelia", email: "rina.a@example.com", roomType: "Suite", checkIn: "2025-01-10", checkOut: "2025-01-12", guests: 2 },
        { id: 1735779600000, name: "Joko Susilo", email: "joko.s@example.com", roomType: "Deluxe", checkIn: "2025-02-05", checkOut: "2025-02-08", guests: 1 },
        { id: 1735866000000, name: "Siti Nurhaliza", email: "siti.n@example.com", roomType: "Standard", checkIn: "2025-03-15", checkOut: "2025-03-16", guests: 2 },
        { id: 1735952400000, name: "Andi Wijaya", email: "andi.w@example.com", roomType: "Deluxe", checkIn: "2025-04-20", checkOut: "2025-04-22", guests: 3 },
        { id: 1736038800000, name: "Lia Kartika", email: "lia.k@example.com", roomType: "Suite", checkIn: "2025-05-30", checkOut: "2025-06-02", guests: 2 },
        { id: 1736125200000, name: "Bambang Pamungkas", email: "bambang.p@example.com", roomType: "Standard", checkIn: "2025-06-25", checkOut: "2025-06-28", guests: 4 },
        // Data Aktif (5)
        { id: 1672531200000, name: "Budi Santoso", email: "budi.s@example.com", roomType: "Suite", checkIn: "2025-08-01", checkOut: "2025-08-03", guests: 2 },
        { id: 1672617600000, name: "Citra Lestari", email: "citra.l@example.com", roomType: "Deluxe", checkIn: "2025-08-05", checkOut: "2025-08-07", guests: 1 },
        { id: 1672704000000, name: "Ahmad Yani", email: "ahmad.y@example.com", roomType: "Standard", checkIn: "2025-08-10", checkOut: "2025-08-11", guests: 2 },
        { id: 1672790400000, name: "Dewi Anggraini", email: "dewi.a@example.com", roomType: "Suite", checkIn: "2025-08-12", checkOut: "2025-08-15", guests: 3 },
        { id: 1672876800000, name: "Eko Prasetyo", email: "eko.p@example.com", roomType: "Deluxe", checkIn: "2025-08-20", checkOut: "2025-08-25", guests: 2 }
    ];
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify(initialBookings));
    }

    const wisataData = [
        { name: 'Penginapan Alam', location: 'Ubud, Bali', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBU0UcbuR_tzjnfT8htzz02qkkKiaD382jog&s/400x300/?cabin,jungle,view', desc: 'Nikmati ketenangan di tengah hutan tropis dengan fasilitas modern.' },
        { name: 'Air Terjun Tersembunyi', location: 'Lombok, NTB', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlhp-1qdfXGz-bbF2koDngawvlis2VtBX7Tw&s/400x300/?hidden,waterfall,bali', desc: 'Jelajahi keindahan air terjun perawan yang jarang terjamah.' },
        { name: 'Terasering Sawah', location: 'Jatiluwih, Bali', img: 'https://ik.imagekit.io/tvlk/blog/2024/11/shutterstock_2498914213.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2/400x300/?ubud,rice,field', desc: 'Pemandangan sawah terasering yang menyejukkan mata dan pikiran.' },
        { name: 'Pantai Pasir Putih', location: 'Kepulauan Derawan, Kaltim', img: 'https://media.bareksa.com/cms/media/assets/image/2019/08/15057_4bb76e8a024dd1aacf676ba4068cd370.jpg/400x300/?white,sand,beach,minimal', desc: 'Bersantai di hamparan pasir putih bersih dan air laut yang jernih.' },
        { name: 'Secangkir Kopi Lokal', location: 'Gayo, Aceh', img: 'https://i0.wp.com/amankubacoffee.com/wp-content/uploads/2022/10/Kebun-kopi-gayo.jpg?resize=750%2C500&ssl=1/400x300/?local,coffee,aesthetic', desc: 'Rasakan pengalaman otentik mencicipi kopi terbaik dari tanah Indonesia.' }
    ];

    // ==================================
    // LOGIKA SPESIFIK PER HALAMAN
    // ==================================

    // --- Logika Halaman Home ---
    if (page === 'page-home') {
        const saldoDisplay = document.getElementById('saldo-display');
        const poinDisplay = document.getElementById('poin-display');
        const membershipStatusSpan = document.querySelector('#membership-status .status-badge');
        const upcomingList = document.getElementById('upcoming-list');
        const historyChart = document.getElementById('history-chart');
        const wishlistList = document.getElementById('wishlist-list');

        let userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (!userProfile) {
            userProfile = { saldo: 10000000, poin: 0 };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }

        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const today = new Date();
        // Set time to 00:00:00 for accurate date comparison
        today.setHours(0, 0, 0, 0);

        const completedTrips = bookings.filter(b => new Date(b.checkOut) < today);
        const upcomingTrips = bookings.filter(b => new Date(b.checkIn) >= today);

        const totalCompleted = completedTrips.length;
        userProfile.poin = 150; // This seems like a fixed value, consider making it dynamic based on trips
        let status = 'Classic'; let statusClass = 'status-classic';
        if (totalCompleted >= 10) { status = 'Gold'; statusClass = 'status-gold'; }
        else if (totalCompleted >= 5) { status = 'Silver'; statusClass = 'status-silver'; }
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        saldoDisplay.textContent = `Rp ${userProfile.saldo.toLocaleString('id-ID')}`;
        poinDisplay.textContent = userProfile.poin;
        membershipStatusSpan.textContent = status;
        membershipStatusSpan.className = `status-badge ${statusClass}`;

        upcomingList.innerHTML = '';
        if (upcomingTrips.length > 0) {
            upcomingTrips.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn)).slice(0, 3).forEach(trip => {
                const d = new Date(trip.checkIn);
                const month = d.toLocaleString('id-ID', { month: 'short' });
                const day = d.getDate();
                const item = document.createElement('li');
                item.className = 'upcoming-item';
                item.innerHTML = `<div class="date-box"><span class="month">${month}</span><span class="day">${day}</span></div><div class="details"><div class="room-type">${trip.roomType} Room</div><div class="guest-info">${trip.guests} Orang, a/n ${trip.name}</div></div>`;
                upcomingList.appendChild(item);
            });
        } else {
            upcomingList.innerHTML = `<p style="text-align:center; color:#999; padding:1rem 0;">Tidak ada booking mendatang.</p>`;
        }

        const favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
        wishlistList.innerHTML = '';
        if (favorites.length > 0) {
            favorites.slice(0, 3).forEach(favName => {
                const wisataItem = wisataData.find(w => w.name === favName);
                if (wisataItem) {
                    const item = document.createElement('li');
                    item.className = 'wishlist-item';
                    item.innerHTML = `<img src="${wisataItem.img}" alt="${wisataItem.name}"><div class="wishlist-info"><div class="name">${wisataItem.name}</div><div class="location">${wisataItem.location}</div></div>`;
                    wishlistList.appendChild(item);
                }
            });
        } else {
            wishlistList.innerHTML = `<p style="text-align:center; color:#999; padding:1rem 0;">Wishlist Anda kosong.</p>`;
        }

        const monthlyData = {};
        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        monthLabels.forEach(m => monthlyData[m] = 0);
        completedTrips.forEach(trip => {
            const monthName = new Date(trip.checkOut).toLocaleString('id-ID', { month: 'short' });
            if (monthlyData.hasOwnProperty(monthName)) { monthlyData[monthName]++; }
        });
        historyChart.innerHTML = '';
        const maxTrips = Math.max(...Object.values(monthlyData), 1);
        for (const month in monthlyData) {
            const count = monthlyData[month];
            const barHeight = (count / maxTrips) * 100;
            const wrapper = document.createElement('div');
            wrapper.className = 'chart-bar-wrapper';
            wrapper.innerHTML = `<div class="chart-bar" style="height: ${barHeight}%;"><div class="tooltip">${count} perjalanan</div></div><div class="chart-label">${month}</div>`;
            historyChart.appendChild(wrapper);
        }
    }

    // --- Logika Halaman Booking ---
    if (page === 'page-booking') {
        const bookingForm = document.getElementById('booking-form');
        const bookingList = document.getElementById('booking-list');
        const bookingIdField = document.getElementById('booking-id');
        const checkInField = document.getElementById('check-in');
        const checkOutField = document.getElementById('check-out');

        const getBookings = () => JSON.parse(localStorage.getItem('bookings')) || [];
        const saveBookings = (bookings) => localStorage.setItem('bookings', JSON.stringify(bookings));

        const renderTable = () => {
            bookingList.innerHTML = '';
            const bookings = getBookings();
            if (bookings.length === 0) {
                bookingList.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#999; padding:2rem 0;">Belum ada data booking. Mulai perjalanan Anda dengan menambahkan booking baru!</td></tr>';
                return;
            }
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.roomType}</td>
                    <td>${booking.checkIn}</td>
                    <td>${booking.checkOut}</td>
                    <td>${booking.guests}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${booking.id}">Edit</button>
                        <button class="action-btn delete-btn" data-id="${booking.id}">Hapus</button>
                    </td>
                `;
                bookingList.appendChild(row);
            });
        };

        // Improvisasi: Validasi tanggal check-out setelah check-in
        const validateDates = () => {
            const checkInDate = new Date(checkInField.value);
            const checkOutDate = new Date(checkOutField.value);

            // Set min date for check-in to today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            checkInField.min = today.toISOString().split('T')[0];

            if (checkOutDate < checkInDate) {
                checkOutField.setCustomValidity('Tanggal Check-out harus setelah Tanggal Check-in.');
            } else {
                checkOutField.setCustomValidity(''); // Reset pesan kesalahan
            }
            // Set min date for check-out to check-in date
            checkOutField.min = checkInField.value;
        };

        checkInField.addEventListener('change', validateDates);
        checkOutField.addEventListener('change', validateDates);
        // Initial validation call in case dates are pre-filled (e.g., on edit)
        validateDates();


        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Panggil validasi tanggal sebelum submit
            validateDates();
            if (!bookingForm.checkValidity()) { // Memeriksa validitas form HTML5 (termasuk custom validity)
                bookingForm.reportValidity(); // Menampilkan pesan kesalahan bawaan browser
                showNotification('Harap perbaiki kesalahan pada formulir.', 'error');
                return;
            }

            const id = bookingIdField.value;
            const newBooking = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                roomType: document.getElementById('room-type').value,
                checkIn: checkInField.value,
                checkOut: checkOutField.value,
                guests: document.getElementById('guests').value
            };
            let bookings = getBookings();
            if (id) {
                bookings = bookings.map(b => b.id == id ? { ...newBooking, id: parseInt(id) } : b);
                showNotification('Booking berhasil diperbarui!', 'success');
            } else {
                newBooking.id = Date.now();
                bookings.push(newBooking);
                showNotification('Booking berhasil ditambahkan!', 'success');
            }
            saveBookings(bookings);
            renderTable();
            bookingForm.reset();
            bookingIdField.value = '';
            // Improvisasi: Reset custom validity setelah submit berhasil
            checkInField.setCustomValidity('');
            checkOutField.setCustomValidity('');
            validateDates(); // Re-validate to set min dates correctly for new entry
        });

        bookingList.addEventListener('click', (e) => {
            const bookings = getBookings();
            if (e.target.classList.contains('edit-btn')) {
                const id = e.target.dataset.id;
                const bookingToEdit = bookings.find(b => b.id == id);
                if (bookingToEdit) {
                    document.getElementById('booking-id').value = bookingToEdit.id;
                    document.getElementById('name').value = bookingToEdit.name;
                    document.getElementById('email').value = bookingToEdit.email;
                    document.getElementById('room-type').value = bookingToEdit.roomType;
                    checkInField.value = bookingToEdit.checkIn;
                    checkOutField.value = bookingToEdit.checkOut;
                    document.getElementById('guests').value = bookingToEdit.guests;
                    validateDates(); // Panggil validasi saat mengisi form edit
                    showNotification('Data booking dimuat untuk diedit.', 'info');
                }
            }
            if (e.target.classList.contains('delete-btn')) {
                const id = e.target.dataset.id;
                if (confirm('Anda yakin ingin menghapus data ini?')) {
                    const updatedBookings = bookings.filter(b => b.id != id);
                    saveBookings(updatedBookings);
                    renderTable();
                    showNotification('Booking berhasil dihapus.', 'success');
                }
            }
        });

        renderTable();
    }

    // --- Logika Halaman Wisata ---
    if (page === 'page-wisata') {
        const wisataGrid = document.querySelector('.wisata-grid');
        const favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
        wisataGrid.innerHTML = '';
        wisataData.forEach(place => {
            const card = document.createElement('div');
            card.className = 'wisata-card';
            const isFavorited = favorites.includes(place.name);
            card.innerHTML = `<button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-wisata-name="${place.name}" aria-label="Tambahkan ke favorit"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></button><div class="img-container"><img src="${place.img}" alt="${place.name}"></div><div class="wisata-info"><h3>${place.name}</h3><p><strong>Lokasi:</strong> ${place.location}</p><p>${place.desc}</p></div>`;
            wisataGrid.appendChild(card);
        });

        wisataGrid.addEventListener('click', e => {
            const favButton = e.target.closest('.favorite-btn');
            if (favButton) {
                const wisataName = favButton.dataset.wisataName;
                let currentFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
                if (currentFavorites.includes(wisataName)) {
                    currentFavorites = currentFavorites.filter(name => name !== wisataName);
                    favButton.classList.remove('favorited');
                    showNotification(`${wisataName} dihapus dari wishlist.`, 'info');
                } else {
                    currentFavorites.push(wisataName);
                    favButton.classList.add('favorited');
                    showNotification(`${wisataName} ditambahkan ke wishlist!`, 'success');
                }
                localStorage.setItem('userFavorites', JSON.stringify(currentFavorites));
            }
        });
    }

    // --- Logika Halaman Pembayaran ---
    if (page === 'page-pembayaran') {
        const bookingSelect = document.getElementById('booking-select');
        const detailsDisplay = document.getElementById('booking-details-display');
        const paymentButtons = document.querySelectorAll('.payment-methods button');
        const successModal = document.getElementById('success-modal');

        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const activeBookings = bookings.filter(b => new Date(b.checkIn) >= today);

        if (activeBookings.length > 0) {
            bookingSelect.innerHTML = '<option value="">-- Pilih Booking --</option>'; // Add default option
            activeBookings.forEach(booking => {
                const option = document.createElement('option');
                option.value = booking.id;
                option.textContent = `${booking.name} - Kamar ${booking.roomType} (${booking.checkIn})`;
                bookingSelect.appendChild(option);
            });
        } else {
            bookingSelect.innerHTML = '<option value="">Tidak ada booking aktif yang tersedia</option>';
            bookingSelect.disabled = true;
            paymentButtons.forEach(btn => btn.disabled = true); // Disable payment buttons
        }

        const displayBookingDetails = () => {
            const selectedId = bookingSelect.value;
            const selectedBooking = bookings.find(b => b.id == selectedId);
            if (selectedBooking) {
                detailsDisplay.innerHTML = `<p><strong>Nama:</strong> ${selectedBooking.name}</p><p><strong>Email:</strong> ${selectedBooking.email}</p><p><strong>Tipe Kamar:</strong> ${selectedBooking.roomType}</p><p><strong>Check-in:</strong> ${selectedBooking.checkIn}</p><p><strong>Check-out:</strong> ${selectedBooking.checkOut}</p><p><strong>Jumlah Orang:</strong> ${selectedBooking.guests}</p>`;
            } else {
                detailsDisplay.innerHTML = '<p>Pilih data booking untuk melihat detail.</p>';
            }
        };

        bookingSelect.addEventListener('change', displayBookingDetails);
        paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!bookingSelect.value) { // Check if a booking is actually selected
                    showNotification('Silakan pilih data booking aktif terlebih dahulu!', 'error');
                    return;
                }
                successModal.style.display = 'flex';
                showNotification('Pembayaran sedang diproses...', 'info');

                setTimeout(() => {
                    successModal.style.display = 'none';
                    const remainingBookings = bookings.filter(b => b.id != bookingSelect.value);
                    localStorage.setItem('bookings', JSON.stringify(remainingBookings));
                    showNotification('Pembayaran berhasil! Booking Anda telah diselesaikan.', 'success');
                    // Update user profile points (example)
                    let userProfile = JSON.parse(localStorage.getItem('userProfile')) || { saldo: 0, poin: 0 };
                    userProfile.poin += 10; // Add 10 points for each successful payment
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));

                    window.location.reload(); // Reload to update booking list and dashboard
                }, 3000);
            });
        });

        displayBookingDetails(); // Initial call to display details if a booking is pre-selected
    }
});
