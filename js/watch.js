document.addEventListener('DOMContentLoaded', () => {
    const watchData = {
        "Matilda The Musical": {
            poster: "./asset/watchposter1.png",
            details: "Genre: Musical | Year: 2022 | Duration: 1h 57min",
            synopsis: `"Matilda the Musical" tells the story of Matilda Wormwood, an exceptionally brilliant and imaginative girl trapped by her crass, uncaring family. Upon attending school, she finds a kind-hearted ally in her teacher, Miss Honey, but also faces the tyrannical and child-hating headmistress, Miss Trunchbull. Discovering she has the power of telekinesis, Matilda bravely uses her unique gifts to stand up to the cruel adults in her life and rewrite her own destiny.`
        },
        "Elements Theatre": {
            poster: "./asset/watchposter2.png",
            details: "Genre: Romance | Year: 2023 | Duration: 1h 45min",
            synopsis: "In a city where fire, water, land, and air residents live together, a fiery young woman and a go-with-the-flow guy are about to discover something elemental: how much they actually have in common."
        },
        "Life Of Pi": {
            poster: "./asset/watchposter3.png",
            details: "Genre: Adventure | Year: 2012 | Duration: 2h 7min",
            synopsis: "A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery. While cast away, he forms an unexpected connection with another survivor: a fearsome Bengal tiger."
        },
        "Hamlet": {
            poster: "./asset/watchposter4.png",
            details: "Genre: Drama | Year: 2024 | Duration: 1h 55min",
            synopsis: "The prince of Denmark returns home to find his father murdered and his mother remarrying the murderer, his uncle. Meanwhile, war is brewing."
        },
        "Two Sisters and Piano": {
            poster: "./asset/watchposter5.png",
            details: "Genre: Drama | Year: 2024 | Duration: 1h 25min",
            synopsis: "Two sisters, bound by love and music, navigate the challenges of life and their own conflicting dreams, all centered around a beloved family piano."
        },
        "&Juliet": {
            poster: "./asset/watchposter6.png",
            details: "Genre: Musical | Year: 2019 | Duration: 2h 30min",
            synopsis: "What if Juliet's famous ending was really just her beginning? What if she decided to choose her own fate? This is Juliet's story, on her terms."
        },
        "Mystery At Midnight": {
            poster: "./asset/watchposter7.png",
            details: "Genre: Horror | Year: 2023 | Duration: 1h 47min",
            synopsis: "A group of friends staying in a remote cabin uncover a dark secret that awakens a malevolent spirit, forcing them to solve a long-forgotten mystery before midnight."
        },
        "The Queen Warrior": {
            poster: "./asset/watchposter8.png",
            details: "Genre: Action | Year: 2023 | Duration: 1h 31min",
            synopsis: "In a realm threatened by darkness, a young queen must embrace her destiny as a warrior to lead her people against an ancient evil."
        }
    };

    const watchGrid = document.querySelector('.watch-grid');
    if (watchGrid) {
        watchGrid.innerHTML = ''; // Membersihkan grid sebelum diisi

        for (const title in watchData) {
            const movie = watchData[title];
            const card = document.createElement('div');
            card.classList.add('watch-card');
            card.innerHTML = `
                <img src="${movie.poster}" alt="${title}" />
                <h3>${title}</h3>
                <p class="details">${movie.details}</p>
                <div class="card-buttons">
                    <button class="trailer-btn">Watch Trailer</button>
                    <button class="buy-btn">Buy/Rent</button>
                </div>
            `;
            watchGrid.appendChild(card);
        }

        watchGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.watch-card');
            if (!card) return;

            const title = card.querySelector('h3').textContent;

            if (e.target.classList.contains('trailer-btn')) {
                if (title) {
                    // PERBAIKAN: Arahkan ke trailer-watch.html
                    window.location.href = `trailer-watch.html?title=${encodeURIComponent(title)}`;
                }
            }

            if (e.target.classList.contains('buy-btn')) {
                if (title && watchData[title]) {
                    const movie = watchData[title];
                    localStorage.setItem('selectedWatchMovie', JSON.stringify({
                        title: title,
                        poster: movie.poster,
                        synopsis: movie.synopsis
                    }));
                    // Ini sudah benar mengarah ke order-detail.html
                    window.location.href = 'order-detail.html';
                }
            }
        });
    }
});