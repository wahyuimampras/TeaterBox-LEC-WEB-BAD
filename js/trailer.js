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
  
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  const data = {
    "Mary Poppins": {
      video: "https://www.youtube.com/embed/vEtR7S7zMmI?si=nQhUOxU9vaZ-qzHZ",
      synopsis: `
      “Mary Poppins Returns” stars: Emily Blunt as the practically-perfect nanny with unique magical skills who can turn any task into an unforgettable, fantastic adventure; Lin-Manuel Miranda as her friend Jack, an optimistic street lamplighter who helps bring light—and life—to the streets of London; Ben Whishaw as Michael Banks; Emily Mortimer as Jane Banks; and Julie Walters as the Banks’ housekeeper Ellen; with Colin Firth as Fidelity Fiduciary Bank’s William Weatherall Wilkins; and Meryl Streep as Mary’s eccentric cousin, Topsy. The film also introduces three new Banks’ children played by Pixie Davies, Nathanael Saleh and newcomer Joel Dawson. Angela Lansbury appears as the Balloon Lady, a treasured character from the PL Travers books and Dick Van Dyke is Mr. Dawes Jr., the retired chairman of the bank now run by Firth’s character.  
      `
    },
    "Ordinary Days": {
      video: "https://www.youtube.com/embed/bskQ8nUCPX8?si=xNdmjdWKKPpazEVc",
      synopsis: "Ordinary Days follows the mysterious disappearance of a bright, athletic college student over five tense days, played from three different perspectives: her spiraling parents, the troubled detective assigned to the case and finally, the young woman herself. What happens when ordinary days are interrupted by an extraordinary event?"
    },
    "Come What May": {
      video: "https://www.youtube.com/embed/UqjPgUTyQhg?si=nzwFzxeTytBcYCSF",
      synopsis: "To escape the imminent German invasion, the inhabitants of a small village in northern France flee their homes, like so many millions of their compatriots. Max, a German boy, travels with them. His father, Hans, opposed the Nazi regime and was imprisoned in Arras for having lied about his nationality. Hans is eventually set free and sets off to find his son, accompanied by a Scottish soldier who is trying to get back home."
    },
     "High Society": {
      video: "https://www.youtube.com/embed/jU9SfpVOuSQ?si=5aWN2fn-0U9cvJaa",
      synopsis: "a successful popular jazz musician, lives in a mansion near his ex-wife's Tracy Lord's family estate. She is on the verge of marrying a man blander and safer than Dex, who tries to win Tracy's heart again. Mike Connor, an undercover tabloid reporter, also falls for Tracy while covering the nuptials for Spy magazine. Tracy must choose between the three men as she discovers that safe can mean deadly dull when it comes to husbands and life"
    }, 
    "Drama": {
      video: "https://www.youtube.com/embed/nxSpZ9khchU?si=MEHkKwdyadK4dnuO",
      synopsis: "Devon (played by Meghann Fahy) thinks her sister Simone (Milly Alcock) has a really creepy relationship with her new boss, the enigmatic socialite Michaela Kell (Julianne Moore). Michaelas cult-ish life of luxury is like a drug to Simone, and Devon has decided its time for an intervention. But she has no idea what a formidable opponent Michaela will be. Told over the course of one explosive weekend at The Kells lavish beach estate"
    },
     "The Three Musketeers": {
      video: "https://www.youtube.com/embed/TYic5JxgTMc?si=cMlsKXCsmpVegD8m",
      synopsis: "The hot-headed young D'Artagnan along with three former legendary but now down on their luck Musketeers must unite and defeat a beautiful double agent and her villainous employer from seizing the French throne and engulfing Europe in war."
    },
    "The Secret of The Masks": {
      video: "https://www.youtube.com/embed/JwGAWVu9iRc?si=9gGMgfqh-7JEWrsc",
      synopsis: "Speculation is swirling around a potential return of Jim Carrey in The Mask 3, a project that could revive one of the wildest and most unpredictable characters in comic-to-film history. With Hollywood embracing nostalgic comebacks, fans are hopeful for a new chapter that dives deeper into the mythology of the mask—possibly introducing new wearers or enemies with powers just as chaotic."
    },
    "High Schoool": {
      video: "https://www.youtube.com/embed/3vrDpTv7CQE?si=pB-MTXVd1cyHXZxE", 
      synopsis: "High School is a story about finding your own identity—a journey made even more complicated when you have a twin whose own struggle and self-discovery so closely mimic your own. Told through a backdrop of 90s grunge and rave culture, the series weaves between parallel and discordant memories of twin sisters growing up down the hall from one another.."
    }
  };

  if (data[title]) {
    document.querySelector(".video-container iframe").src = data[title].video;
    document.querySelector(".story-detail h2").innerText = `${title} - Sinopsis`;
    document.querySelector(".story-detail p").innerHTML = data[title].synopsis;
  } else {
    document.querySelector(".story-detail h2").innerText = "Data tidak ditemukan";
    document.querySelector(".story-detail p").innerText = "Trailer atau sinopsis tidak tersedia untuk judul ini.";
  }
  const buyBtn = document.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      const showData = {
        title: title,
        poster: `./asset/poster${getPosterNumber(title)}.png`
      };

      localStorage.setItem("selectedMovie", JSON.stringify(showData));
      window.location.href = "ticket.html";
    });
});
function getPosterNumber(title) {
  const map = {
    "Mary Poppins": 1,
    "Ordinary Days": 2,
    "High Schoool": 3,
    "Come What May": 4,
    "High Society": 5,
    "Drama": 6,
    "The Three Musketeers": 7,
    "The Secret of The Masks": 8
  };
  return map[title] || 1;
}
