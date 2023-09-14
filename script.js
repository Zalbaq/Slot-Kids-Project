const ICON_WIDTH = 100,
  ICON_HEIGHT = 120,
  NUM_ICONS = 7,
  TIME_PER_ITEM = 25,
  INDEXES = [0, 0, 0, 0, 0],
  ICON_MAP = [
    "watermellon",
    "cherry",
    "plum",
    "lemon",
    "star",
    "diamond",
    "jackpot",
  ],
  BETS = [
    100000, 200000, 500000, 1000000, 2000000, 5000000, 15000000, 20000000,
  ];
let INDEX_BET = 0;
let cash = 9000000;

const CREDIT_COMPONENT = document.querySelector(".credit");
const BTN_SPIN = document.querySelector("#button-spin");
const PLUS_BET = document.querySelector("#plus-button"),
  MIN_BET = document.querySelector("#min-button"),
  BET = document.querySelector("#bet");

function randomItems() {
  const randomNumber = Math.random() * 100; // Angka acak dari 1 hingga 100
  let digit;

  if (randomNumber < 10) {
    // 10% peluang untuk mendapatkan angka 6
    digit = 6;
  } else if (randomNumber < 25) {
    // 15% peluang untuk mendapatkan angka 5
    digit = 5;
  } else if (randomNumber < 45) {
    // 20% peluang untuk mendapatkan angka 4
    digit = 4;
  } else if (randomNumber < 70) {
    // 25% peluang untuk mendapatkan angka 3
    digit = 3;
  } else if (randomNumber < 90) {
    // 20% peluang untuk mendapatkan angka 2
    digit = 2;
  } else {
    // 10% peluang untuk mendapatkan angka 0 atau 1
    digit = Math.floor(Math.random() * 2);
  }

  return digit;
}

let convertRupiah = (num) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(num);
};
CREDIT_COMPONENT.textContent = convertRupiah(cash);
// CREDIT_COMPONENT.textContent = cash;
const roll = (reel, offset = 0) => {
  const delta = (offset + 2) * NUM_ICONS + randomItems();
  const style = getComputedStyle(reel),
    backgroundPositionY = parseFloat(style["background-position-y"]),
    targetBackgroundPositionY = backgroundPositionY + delta * ICON_HEIGHT,
    normTargetBackgroundPositionY =
      targetBackgroundPositionY % (NUM_ICONS * ICON_HEIGHT);

  return new Promise((resolve, reject) => {
    reel.style.transition = `background-position-y ${
      6 + delta * TIME_PER_ITEM
    }ms`;
    reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

    setTimeout(() => {
      reel.style.transition = `none`;
      reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
      resolve(delta % NUM_ICONS);
    }, 6 + delta * TIME_PER_ITEM);
  });
};

const rollAll = () => {
  const REEL_LIST = document.querySelectorAll(".main-container > .reel");

  Promise.all([...REEL_LIST].map((reel, i) => roll(reel, i))).then((deltas) => {
    deltas.forEach(
      (delta, i) => (INDEXES[i] = (INDEXES[i] + delta) % NUM_ICONS)
    );
    INDEXES.map((index) => console.log(ICON_MAP[index]));
  });
};

BTN_SPIN.addEventListener("click", () => {
  cash -= BETS[INDEX_BET];
  CREDIT_COMPONENT.textContent = convertRupiah(cash);
  rollAll();

  BTN_SPIN.disabled = true;
  BTN_SPIN.classList.remove("button-active");
  BTN_SPIN.classList.add("button-disabled");
  setTimeout(() => {
    BTN_SPIN.disabled = false;
    BTN_SPIN.classList.add("button-active");
    BTN_SPIN.classList.remove("button-disabled");
  }, 1500);
});

PLUS_BET.addEventListener("click", () => {
  if (INDEX_BET < BETS.length - 1) {
    INDEX_BET++;
    BET.textContent = BETS[INDEX_BET];
  }
});

MIN_BET.addEventListener("click", () => {
  if (INDEX_BET > 0) {
    INDEX_BET--;
    BET.textContent = BETS[INDEX_BET];
  }
});

// window.addEventListener("resize", () => {
//   let width = window.innerWidth;
//   let height = window.innerHeight;
//   document.querySelector("#width-device").textContent = width;
//   document.querySelector("#height-device").textContent = height;
// });
