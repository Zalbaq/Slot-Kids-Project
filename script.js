const ICON_WIDTH = 100,
  ICON_HEIGHT = 120,
  NUM_ICONS = 7,
  TIME_PER_ITEM = 25,
  INDEXES = [0, 0, 0, 0],
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
let cash = 9000000000000;
let price = 0;

const CREDIT_COMPONENT = document.querySelector(".credit");
const BTN_SPIN = document.querySelector("#button-spin"),
  BTN_SPIN_10 = document.querySelector("#button-spin-10"),
  BTN_SPIN_100 = document.querySelector("#button-spin-100");

const PLUS_BET = document.querySelector("#plus-button"),
  MIN_BET = document.querySelector("#min-button"),
  BET = document.querySelector("#bet");

function randomItems() {
  const randomNumber = Math.random() * 100;
  let digit;

  if (randomNumber < 15) {
    digit = 6;
  } else if (randomNumber < 30) {
    digit = 5;
  } else if (randomNumber < 55) {
    digit = 4;
  } else if (randomNumber < 80) {
    digit = 3;
  } else if (randomNumber < 100) {
    digit = 2;
  } else {
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
BET.textContent = convertRupiah(BETS[INDEX_BET]);

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

const rollAll = (bet) => {
  const REEL_LIST = document.querySelectorAll(".main-container > .reel");

  Promise.all([...REEL_LIST].map((reel, i) => roll(reel, i))).then((deltas) => {
    deltas.forEach((delta, i) => {
      INDEXES[i] = (INDEXES[i] + delta) % NUM_ICONS;
    });

    INDEXES.map((index) => console.log(ICON_MAP[index]));

    // Checking winning condition
    if (
      INDEXES[0] == INDEXES[1] &&
      INDEXES[1] == INDEXES[2] &&
      INDEXES[2] == INDEXES[3]
    ) {
      price = bet * (INDEXES[0] + 1) * 1.5;
    } else if (INDEXES[0] == INDEXES[1] && INDEXES[1] == INDEXES[2]) {
      price = bet * (INDEXES[0] + 1) * 1.1;
    } else if (INDEXES[0] == INDEXES[1]) {
      price = bet * (INDEXES[0] + 1) * 0.7;
    } else {
      price = 0;
    }
    cash += price;
    CREDIT_COMPONENT.textContent = convertRupiah(cash);
  });
};

function getSpin(total) {
  let count = 0;

  // Langsung melakukan spin ketika function dijalankan
  cash -= BETS[INDEX_BET];
  rollAll(BETS[INDEX_BET]);
  count++;
  let myInterval = setInterval(() => {
    if (count < total) {
      cash -= BETS[INDEX_BET];
      rollAll(BETS[INDEX_BET]);

      CREDIT_COMPONENT.textContent = convertRupiah(cash);
      count++;
    } else {
      // Jika spin telah mencapai batas maksimal
      clearInterval(myInterval);
    }
  }, 1500);
}

BTN_SPIN.addEventListener("click", (event) => {
  let button = event.target;

  getSpin(1);
  disabledButton(button, 1);
});

BTN_SPIN_10.addEventListener("click", (event) => {
  let button = event.target;

  getSpin(10);
});

BTN_SPIN_100.addEventListener("click", (event) => {
  let button = event.target;

  getSpin(100);
});

PLUS_BET.addEventListener("click", () => {
  if (INDEX_BET < BETS.length - 1) {
    INDEX_BET++;
    BET.textContent = convertRupiah(BETS[INDEX_BET]);
  }
});

MIN_BET.addEventListener("click", () => {
  if (INDEX_BET > 0) {
    INDEX_BET--;
    BET.textContent = convertRupiah(BETS[INDEX_BET]);
  }
});
