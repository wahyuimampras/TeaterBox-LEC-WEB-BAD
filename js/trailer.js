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
      video: "https://www.youtube.com/embed/gZgUW88D15w?si=R9ozP6o3wLIYXUmg",
      synopsis: `'Mary Poppins Returns' stars Emily Blunt as the practically-perfect nanny with unique magical skills who can turn any task into an unforgettable, fantastic adventure. Accompanied by her friend Jack, an optimistic street lamplighter, she brings joy back to the streets of Depression-era London. Mary Poppins returns to help the next generation of the Banks family find the joy and wonder missing in their lives following a tragic personal loss.`
    },
    "Ordinary Days": {
      video: "https://www.youtube.com/embed/bskQ8nUCPX8?si=VhW6RYvS4oe5YQg8",
      synopsis: `'Ordinary Days' follows the mysterious disappearance of a bright, athletic college student over five tense days. The story is told from three different perspectives: her spiraling parents, the troubled detective assigned to the case, and finally, the young woman herself. As time runs out, dark secrets begin to unravel, questioning what really happened when ordinary days were interrupted by an extraordinary event.`
    },
    "Come What May": {
      video: "https://www.youtube.com/embed/UqjPgUTyQhg?si=nzwFzxeTytBcYCSF",
      synopsis: `In May 1940, to escape the imminent German invasion, the inhabitants of a small village in northern France are forced to flee their homes. Among them is Max, a German boy whose father, Hans, an opponent of the Nazi regime, has been imprisoned. After being set free, Hans embarks on a perilous journey to find his son, accompanied by a Scottish soldier who is also trying to get back to his country.`
    },
     "High Society": {
      video: "https://www.youtube.com/embed/jU9SfpVOuSQ?si=5aWN2fn-0U9cvJaa",
      synopsis: `A successful and popular jazz musician, C.K. Dexter-Haven, tries to win back the heart of his ex-wife, Tracy Lord, who is about to marry a much blander man. The situation gets even more complicated when an undercover tabloid reporter, Mike Connor, also falls for Tracy while covering her high-society wedding. Amidst the chaotic wedding preparations, Tracy must choose between the three men and discover the true meaning of love.`
    }, 
    "Drama": {
      video: "https://www.youtube.com/embed/nxSpZ9khchU?si=MEHkKwdyadK4dnuO",
      synopsis: `Devon is convinced that her sister, Simone, is trapped in an unhealthy relationship with her new boss, the enigmatic socialite Michaela Kell. Michaela's cult-ish life of luxury has become an addiction for Simone, so Devon decides it's time for an intervention during a weekend at Kell's lavish beach estate. However, Devon has no idea what a formidable and dangerous opponent Michaela will be.`
    },
     "The Three Musketeers": {
      video: "https://www.youtube.com/embed/TYic5JxgTMc?si=cMlsKXCsmpVegD8m",
      synopsis: `The hot-headed young D'Artagnan arrives in Paris with dreams of becoming a Musketeer, only to find himself in trouble with the three legendary Musketeers: Athos, Porthos, and Aramis. They must put aside their differences and unite to stop a villainous plot led by Milady de Winter and the Duke of Buckingham. This dangerous mission aims to foil a plot to seize the French throne and prevent Europe from being plunged into war.`
    },
    "The Secret of The Masks": {
      video: "https://www.youtube.com/embed/JwGAWVu9iRc?si=9gGMgfqh-7JEWrsc",
      synopsis: `Stanley Ipkiss is pulled back into the chaos when the ancient Mask of Loki resurfaces, this time with a new threat seeking to harness its power for evil. With the return of Jim Carrey, the iconic character must face an enemy with unpredictable powers also derived from the mask's mythology. The film will delve deeper into the mask's origins, introduce new wearers, and deliver a wild adventure full of signature humor and chaotic visual effects.`
    },
    "High School": {
      video: "https://www.youtube.com/embed/3vrDpTv7CQE?si=pB-MTXVd1cyHXZxE", 
      synopsis: `The 'High School' series chronicles the journey of identity-seeking twin sisters, Tegan and Sara, growing up amidst the '90s grunge and rave culture. Their struggle for self-discovery is complicated by their intensely close yet often conflicting relationship. Through parallel and sometimes discordant memories, the series explores how they forged their own identities while growing up in rooms just down the hall from one another.`
    },
    "Matilda The Musical": {
      video: "https://www.youtube.com/embed/6tOk_HeD0AI?si=_nTC-Kd-E2Qc17D3",
      synopsis: `'Matilda the Musical' is the story of Matilda Wormwood, an extraordinarily brilliant and imaginative girl, trapped by her crass, uncaring family. At school, she finds kindness in her teacher, Miss Honey, but also faces the tyrannical, child-hating headmistress, Miss Trunchbull. Discovering she has the power of telekinesis, Matilda bravely uses her unique gifts to stand up to the cruel adults in her life and rewrite her own destiny.`
    },
    "Elements Theatre": {
        video: "https://www.youtube.com/embed/PW8tjkisOrU?si=Olf3au4P_MqgcD63",
        synopsis: `In a metropolis called Element City, residents of fire, water, land, and air live together. A fiery young woman, Ember Lumen, forges an unlikely friendship with a go-with-the-flow water guy, Wade Ripple. Despite their elemental opposition, they begin to realize they have more in common than they thought and discover that differences can bring them together.`
    },
    "Life Of Pi": {
        video: "https://www.youtube.com/embed/m13ntrxKrYM?si=2htbPKObeB6sxZgJ",
        synopsis: `After surviving a disastrous shipwreck in the middle of the Pacific Ocean, an Indian boy named Pi Patel is left stranded on a lifeboat. He begins an epic journey of survival with an unexpected companion, a fearsome Bengal tiger named Richard Parker. Together, they face the wonder and ferocity of nature, while Pi must use his wits and faith to keep them both alive.`
    },
    "Hamlet": {
        video: "https://www.youtube.com/embed/bAvteqeeBFo?si=_v49hAtyuwSXk-Wn",
        synopsis: `Prince Hamlet of Denmark returns home to find his father has been murdered, and his mother, Queen Gertrude, has married the murderer, his own uncle, Claudius. Haunted by his father's ghost who demands revenge, Hamlet spirals into madness, rage, and political intrigue. Amidst the threat of war from Norway, Hamlet must uncover the truth and decide on the best course of action, which will determine the fate of the entire kingdom.`
    },
    "Two Sisters and Piano": {
        video: "https://www.youtube.com/embed/4UGPlhjLiBo?si=KrR2Vi8ZBRRSM9B8",
        synopsis: `Two sisters, the pragmatic Elara and the free-spirited Lira, are bound by their love for music and a cherished family piano. As they navigate different life challenges—Elara with her career and Lira with her artistic dreams—the piano becomes a silent witness to their conflicts and reconciliations. They must learn to understand each other and find harmony in their differences before their conflicting dreams tear them apart forever.`
    },
    "&Juliet": {
        video: "https://www.youtube.com/embed/Dm2k9nS3o20?si=1DlzOlXhoVTlK2_h",
        synopsis: `The musical '&Juliet' asks a compelling question: what if Juliet's famous tragic ending was actually the beginning of a new adventure? Instead of succumbing to her fate, Juliet decides not to end her life and runs away to Paris with her friends. On a journey packed with iconic pop anthems, she discovers a second chance at life and love, proving there is life after Romeo.`
    },
    "Mystery At Midnight": {
        video: "https://www.youtube.com/embed/9xu8JZL3un8?si=nfAS06pZrXmx4jwU",
        synopsis: `A group of friends on vacation in a remote cabin discover an old diary that reveals a dark secret about the property. Reading the diary accidentally awakens a vengeful spirit that begins to terrorize them one by one. They must work together to solve the long-forgotten mystery and appease the spirit before the clock strikes midnight, or they will become the next victims.`
    },
    "The Queen Warrior": {
        video: "https://www.youtube.com/embed/ei9IkGdcmPg?si=lu3LkbZ4P6wWXReg",
        synopsis: `In the kingdom of Aethel, the newly crowned Queen Annelise must face a threat from an ancient evil that has reawaken. Though raised for diplomacy, she must set aside her royal robes and take up a sword to become the warrior her people need. With the help of a loyal general and a small band of rebels, Annelise must lead her army in a desperate battle to save her kingdom from eternal darkness.`
    }
  };

  if (data[title]) {
    document.querySelector(".video-container iframe").src = data[title].video;
    document.querySelector(".story-detail h2").innerText = `${title} - Synopsis`;
    document.querySelector(".story-detail p").innerHTML = data[title].synopsis;
  } else {
    document.querySelector(".story-detail h2").innerText = "Data not found";
    document.querySelector(".story-detail p").innerText = "Trailer or synopsis is not available for this title.";
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
    "High School": 3,
    "Come What May": 4,
    "High Society": 5,
    "Drama": 6,
    "The Three Musketeers": 7,
    "The Secret of The Masks": 8
  };
  return map[title] || 1;
}