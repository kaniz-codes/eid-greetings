const nameInput = document.getElementById("name");
const relationSelect = document.getElementById("relation");
const toneSelect = document.getElementById("tone");
const includeSunnah = document.getElementById("includeSunnah");

const generateBtn = document.getElementById("generateBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const copyBtn = document.getElementById("copyBtn");

const cardTitle = document.getElementById("cardTitle");
const cardMessage = document.getElementById("cardMessage");
const statusText = document.getElementById("statusText");
const previewCard = document.getElementById("previewCard");

const openings = [
  "Eid Mubarak",
  "Shubho Eid",
  "Warm Eid wishes",
  "Blessed Eid",
  "Happy Eid",
  "Joyful Eid wishes",
  "Eid blessings",
  "Sending Eid joy",
  "Peaceful Eid wishes",
  "Wishing you Eid joy"
];

const relationText = {
  friend: [
    "wishing you smiles and peace.",
    "hope your Eid feels bright and happy.",
    "sending you joy and good moments.",
    "may your Eid be sweet and cheerful.",
    "wishing you a lovely Eid day.",
    "hope today feels special and calm."
  ],
  family: [
    "wishing your home peace and warmth.",
    "may your family share joy and barakah.",
    "sending love to your whole family.",
    "may your Eid feel close and peaceful.",
    "wishing your home a beautiful Eid.",
    "may togetherness fill your day."
  ],
  parents: [
    "may Allah give you peace and health.",
    "wishing you comfort and barakah.",
    "thank you for making Eid beautiful.",
    "may your Eid be calm and blessed.",
    "sending love and duas to you.",
    "praying for your happiness always."
  ],
  siblings: [
    "wishing you joy and fun today.",
    "hope your Eid is sweet and lively.",
    "sending smiles and warm wishes.",
    "may your day be happy and bright.",
    "hope Eid feels extra special today.",
    "wishing you a cheerful Eid."
  ],
  everyone: [
    "wishing everyone peace and joy.",
    "may Eid bring love to all.",
    "sending warm wishes to everyone.",
    "may this day feel blessed and bright.",
    "wishing all of you a happy Eid.",
    "may this Eid bring calm and smiles."
  ]
};

const toneText = {
  warm: [
    "May your heart feel light.",
    "Wishing you gentle happiness.",
    "May today be full of warmth.",
    "Hope your day feels peaceful.",
    "Wishing you comfort and joy.",
    "May this Eid feel soft and bright."
  ],
  playful: [
    "Enjoy every sweet moment.",
    "Hope the day is full of smiles.",
    "May your Eid be fun and lively.",
    "Wishing you a cheerful celebration.",
    "Hope today feels extra joyful.",
    "May your Eid be bright and sweet."
  ],
  heartfelt: [
    "May Allah fill your life with peace.",
    "Praying for sincere joy for you.",
    "May this Eid mean a lot to your heart.",
    "Wishing you blessings and peace.",
    "May your prayers be accepted.",
    "Praying this day feels truly special."
  ],
  dua: [
    "May Allah accept your worship.",
    "May your duas be answered.",
    "May Allah fill your home with barakah.",
    "Praying for mercy and peace for you.",
    "May your Eid be blessed with goodness.",
    "May Allah grant you joy and ease."
  ],
  short: [
    "Lots of love for Eid.",
    "Wishing you a blessed day.",
    "Peace and joy to you.",
    "Warm wishes for Eid.",
    "Have a beautiful Eid.",
    "Sending Eid blessings."
  ]
};

const bangladeshLines = [
  "With the joy of Eid in Bangladesh.",
  "With semai, prayer, and family warmth.",
  "With moon night joy and home comfort.",
  "With the warmth of Bangladeshi Eid.",
  "With sweet family moments and prayer.",
  "With festive love and togetherness."
];

const sunnahLines = [
  "May this Eid be beautiful through the sunnahs too.",
  "May the sunnahs of Eid bring extra beauty to your day.",
  "May remembrance and sunnah make your Eid brighter.",
  "May your celebration stay rooted in sunnah.",
  "May this Eid feel joyful and meaningful through sunnah.",
  "May gratitude and sunnah stay with you today."
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRecipient() {
  const typed = nameInput.value.trim();
  if (typed) return typed;

  const fallbacks = {
    friend: "My friend",
    family: "Dear family",
    parents: "Ammu and Abbu",
    siblings: "My sibling",
    everyone: "Everyone"
  };

  return fallbacks[relationSelect.value];
}

function buildGreeting() {
  const recipient = getRecipient();
  const relation = relationSelect.value;
  const tone = toneSelect.value;

  const title = randomItem(openings);
  const line1 = `${recipient}, ${randomItem(relationText[relation])}`;
  const line2 = randomItem(toneText[tone]);
  const line3 = randomItem(bangladeshLines);
  const line4 = includeSunnah.checked ? randomItem(sunnahLines) : "";

  const parts = [line1, line2, line3, line4].filter(Boolean);

  return {
    title,
    message: parts.join(" ")
  };
}

function updateGreeting() {
  const greeting = buildGreeting();
  cardTitle.textContent = greeting.title;
  cardMessage.textContent = greeting.message;
}

[nameInput, relationSelect, toneSelect, includeSunnah].forEach((element) => {
  element.addEventListener("input", updateGreeting);
  element.addEventListener("change", updateGreeting);
});

generateBtn.addEventListener("click", () => {
  updateGreeting();
  statusText.textContent = "Fresh Eid greeting generated.";
});

surpriseBtn.addEventListener("click", () => {
  const relations = ["friend", "family", "parents", "siblings", "everyone"];
  const tones = ["warm", "playful", "heartfelt", "dua", "short"];

  relationSelect.value = randomItem(relations);
  toneSelect.value = randomItem(tones);
  includeSunnah.checked = Math.random() > 0.35;

  updateGreeting();
  statusText.textContent = "Surprise greeting ready.";
});

copyBtn.addEventListener("click", async () => {
  const text = `${cardTitle.textContent}\n\n${cardMessage.textContent}`;

  try {
    await navigator.clipboard.writeText(text);
    statusText.textContent = "Greeting copied.";
  } catch (error) {
    statusText.textContent = "Copy failed. Please copy manually.";
  }
});

previewCard.addEventListener("mousemove", (e) => {
  const rect = previewCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * 6;
  const rotateX = ((y / rect.height) - 0.5) * -6;

  previewCard.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

previewCard.addEventListener("mouseleave", () => {
  previewCard.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
});

updateGreeting();