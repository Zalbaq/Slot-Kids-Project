const ICON_WIDTH = 100,
  ICON_HEIGHT = 120,
  NUM_ICONS = 7,
  TIME_PER_ITEM = 25,
  INDEXES = [0, 0, 0, 0],
  TIME_SPIN = TIME_PER_ITEM * 10 * INDEXES.length + 200,
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
let myTimeOut;
let isButtonHeld;

const CREDIT_COMPONENT = document.querySelector(".credit");
const BTN_SPIN_ALL = [...document.querySelectorAll(".spin button")];
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

let setRupiah = (num) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(num);
};

CREDIT_COMPONENT.textContent = setRupiah(cash);
BET.textContent = setRupiah(BETS[INDEX_BET]);

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

    // INDEXES.map((index) => console.log(ICON_MAP[index]));

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
    CREDIT_COMPONENT.textContent = setRupiah(cash);
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

      CREDIT_COMPONENT.textContent = setRupiah(cash);
      count++;
    } else {
      // Jika spin telah mencapai batas maksimal
      clearInterval(myInterval);
    }
  }, TIME_SPIN);
}

let disabledButton = (totalSpin) => {
  BTN_SPIN_ALL.map((button) => {
    button.classList.toggle("button-disabled");
    button.disabled = true;
  });
  setTimeout(() => {
    BTN_SPIN_ALL.map((button) => {
      button.classList.toggle("button-disabled");
      button.disabled = false;
    });
  }, TIME_SPIN * totalSpin);
};

let countSpin = (button, totalSpin) => {
  let tmpTotalSpin = totalSpin;

  button.textContent = --tmpTotalSpin;
  let myInterval = setInterval(() => {
    button.textContent = --tmpTotalSpin;
    if (tmpTotalSpin < 0) {
      clearInterval(myInterval);
      button.textContent = totalSpin;
    }
  }, TIME_SPIN);

  // untuk mereset isi element setelah di decrement
};

BTN_SPIN.addEventListener("mousedown", (event) => {
  myTimeOut = setTimeout(() => {
    BTN_SPIN_10.style.transform = "translateY(0px)";
    BTN_SPIN_100.style.transform = "translateY(0px)";
    isButtonHeld = true;
  }, 500);
});

BTN_SPIN.addEventListener("mouseup", (event) => {
  if (isButtonHeld) {
    event.preventDefault;
  } else {
    clearTimeout(myTimeOut);

    getSpin(1);
    disabledButton(1);
  }
  isButtonHeld = false;
});

BTN_SPIN_10.addEventListener("click", (event) => {
  let totalSpin = 10;

  getSpin(10);
  disabledButton(totalSpin);
  countSpin(BTN_SPIN_10, totalSpin);

  BTN_SPIN_10.style.zIndex = 10;
  BTN_SPIN_100.style.transform = "translateY(75px)";
  BTN_SPIN_10.style.transform = "translateY(37.5px)";

  setTimeout(() => {
    BTN_SPIN_10.style.zIndex = 0;
  }, TIME_SPIN * totalSpin);
});

BTN_SPIN_100.addEventListener("click", (event) => {
  let totalSpin = 100;

  getSpin(100);
  disabledButton(totalSpin);
  countSpin(BTN_SPIN_100, totalSpin);

  BTN_SPIN_100.style.zIndex = 10;
  BTN_SPIN_100.style.transform = "translateY(75px)";
  BTN_SPIN_10.style.transform = "translateY(37.5px)";

  setTimeout(() => {
    BTN_SPIN_100.style.zIndex = 0;
  }, TIME_SPIN * totalSpin);
});

PLUS_BET.addEventListener("click", () => {
  if (INDEX_BET < BETS.length - 1) {
    INDEX_BET++;
    BET.textContent = setRupiah(BETS[INDEX_BET]);
  }
});

MIN_BET.addEventListener("click", () => {
  if (INDEX_BET > 0) {
    INDEX_BET--;
    BET.textContent = setRupiah(BETS[INDEX_BET]);
  }
});
