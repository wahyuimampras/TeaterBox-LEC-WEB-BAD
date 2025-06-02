// Fungsi untuk memuat Navbar dan Footer
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

// Logika utama untuk halaman trailer-watch
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");

    // Data khusus untuk film yang bisa ditonton ulang (Watch)
    // Link video disesuaikan dengan yang Anda berikan di trailer.js
    const watchMovieData = {
        "Matilda The Musical": {
            video: "https://www.youtube.com/embed/6tOk_HeD0AI?si=_nTC-Kd-E2Qc17D3",
            poster: "./asset/watchposter1.png",
            synopsis: `'Matilda the Musical' is the story of Matilda Wormwood, an extraordinarily brilliant and imaginative girl, trapped by her crass, uncaring family. At school, she finds kindness in her teacher, Miss Honey, but also faces the tyrannical, child-hating headmistress, Miss Trunchbull. Discovering she has the power of telekinesis, Matilda bravely uses her unique gifts to stand up to the cruel adults in her life and rewrite her own destiny.`
        },
        "Elements Theatre": {
            video: "https://www.youtube.com/embed/PW8tjkisOrU?si=Olf3au4P_MqgcD63",
            poster: "./asset/watchposter2.png",
            synopsis: `In a metropolis called Element City, residents of fire, water, land, and air live together. A fiery young woman, Ember Lumen, forges an unlikely friendship with a go-with-the-flow water guy, Wade Ripple. Despite their elemental opposition, they begin to realize they have more in common than they thought and discover that differences can bring them together.`
        },
        "Life Of Pi": {
            video: "https://www.youtube.com/embed/m13ntrxKrYM?si=2htbPKObeB6sxZgJ",
            poster: "./asset/watchposter3.png",
            synopsis: `After surviving a disastrous shipwreck in the middle of the Pacific Ocean, an Indian boy named Pi Patel is left stranded on a lifeboat. He begins an epic journey of survival with an unexpected companion, a fearsome Bengal tiger named Richard Parker. Together, they face the wonder and ferocity of nature, while Pi must use his wits and faith to keep them both alive.`
        },
        "Hamlet": {
            video: "https://www.youtube.com/embed/bAvteqeeBFo?si=_v49hAtyuwSXk-Wn",
            poster: "./asset/watchposter4.png",
            synopsis: `Prince Hamlet of Denmark returns home to find his father has been murdered, and his mother, Queen Gertrude, has married the murderer, his own uncle, Claudius. Haunted by his father's ghost who demands revenge, Hamlet spirals into madness, rage, and political intrigue. Amidst the threat of war from Norway, Hamlet must uncover the truth and decide on the best course of action, which will determine the fate of the entire kingdom.`
        },
        "Two Sisters and Piano": {
            video: "https://www.youtube.com/embed/4UGPlhjLiBo?si=KrR2Vi8ZBRRSM9B8",
            poster: "./asset/watchposter5.png",
            synopsis: `Two sisters, the pragmatic Elara and the free-spirited Lira, are bound by their love for music and a cherished family piano. As they navigate different life challenges—Elara with her career and Lira with her artistic dreams—the piano becomes a silent witness to their conflicts and reconciliations. They must learn to understand each other and find harmony in their differences before their conflicting dreams tear them apart forever.`
        },
        "&Juliet": { 
            video: "https://www.youtube.com/embed/Dm2k9nS3o20?si=1DlzOlXhoVTlK2_h",
            poster: "./asset/watchposter6.png",
            synopsis: `The musical '&Juliet' asks a compelling question: what if Juliet's famous tragic ending was actually the beginning of a new adventure? Instead of succumbing to her fate, Juliet decides not to end her life and runs away to Paris with her friends. On a journey packed with iconic pop anthems, she discovers a second chance at life and love, proving there is life after Romeo.`
        },
        "Mystery At Midnight": {
            video: "https://www.youtube.com/embed/9xu8JZL3un8?si=nfAS06pZrXmx4jwU",
            poster: "./asset/watchposter7.png",
            synopsis: `A group of friends on vacation in a remote cabin discover an old diary that reveals a dark secret about the property. Reading the diary accidentally awakens a vengeful spirit that begins to terrorize them one by one. They must work together to solve the long-forgotten mystery and appease the spirit before the clock strikes midnight, or they will become the next victims.`
        },
        "The Queen Warrior": {
            video: "https://www.youtube.com/embed/ei9IkGdcmPg?si=lu3LkbZ4P6wWXReg",
            poster: "./asset/watchposter8.png",
            synopsis: `In the kingdom of Aethel, the newly crowned Queen Annelise must face a threat from an ancient evil that has reawaken. Though raised for diplomacy, she must set aside her royal robes and take up a sword to become the warrior her people need. With the help of a loyal general and a small band of rebels, Annelise must lead her army in a desperate battle to save her kingdom from eternal darkness.`
        }
    };

    const movie = watchMovieData[title];

    if (movie) {
        document.querySelector(".video-container iframe").src = movie.video;
        document.querySelector(".story-detail h2").innerText = `${title} - Synopsis`;
        document.querySelector(".story-detail p").innerHTML = movie.synopsis;
    } else {
        document.querySelector(".story-detail h2").innerText = "Data not found";
        document.querySelector(".story-detail p").innerText = "Trailer or synopsis is not available for this title.";
    }

    const buyRentBtn = document.querySelector(".buy-btn");
    if (buyRentBtn) {
        buyRentBtn.addEventListener("click", () => {
            if (movie) {
                localStorage.setItem('selectedWatchMovie', JSON.stringify({
                    title: title,
                    poster: movie.poster,
                    synopsis: movie.synopsis
                }));
                window.location.href = "order-detail.html";
            } else {
                alert("Cannot proceed. Movie data not found.");
            }
        });
    }
});