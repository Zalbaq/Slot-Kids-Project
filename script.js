const ICON_WIDTH = 100,
  ICON_HEIGHT = 120,
  NUM_ICONS = 7,
  TIME_PER_ITEM = 25,
  INDEXES = [0, 0, 0, 0, 0],
  ICON_MAP = [
    "jackpot",
    "watermellon",
    "cherry",
    "plum",
    "lemon",
    "star",
    "diamond",
  ],
  BETS = [
    100000, 200000, 500000, 1000000, 2000000, 5000000, 15000000, 20000000,
  ];
let INDEX_BET = 0;
let cash = 9000000000;

const CREDIT_COMPONENT = document.querySelector(".credit");
const BTN_SPIN = document.querySelector("#button-spin");
const PLUS_BET = document.querySelector("#plus-button"),
  MIN_BET = document.querySelector("#min-button"),
  BET = document.querySelector("#bet");

let gacor = (random) => {
  if (random >= 1 && random < 6) {
    return 0;
  } else if (random >= 6 && random < 13) {
    return 1;
  } else if (random >= 13 && random < 21) {
    return 2;
  } else if (random >= 21 && random < 30) {
    return 3;
  } else if (random >= 30 && random < 41) {
    return 4;
  } else if (random >= 41 && random < 53) {
    return 5;
  } else if (random >= 53 && random < 66) {
    return 6;
  } else if (random >= 66 && random < 80) {
    return 7;
  } else {
    return 8;
  }
};

CREDIT_COMPONENT.textContent = cash;
const roll = (reel, offset = 0) => {
  let random = Math.round(Math.random() * 94);
  // const delta =
  //   (offset + 2) * NUM_ICONS + Math.round(Math.random() * NUM_ICONS);
  const delta = (offset + 2) * NUM_ICONS + gacor(random);
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
    // if (
    //   (INDEXES[0] == INDEXES[1] || INDEXES[0] == INDEXES[1]) == INDEXES[2] ||
    //   ((INDEXES[0] == INDEXES[1]) == INDEXES[2]) == INDEXES[3] ||
    //   (((INDEXES[0] == INDEXES[1]) == INDEXES[2]) == INDEXES[3]) ==
    //     INDEXES[4] ||
    //   ((((INDEXES[0] == INDEXES[1]) == INDEXES[2]) == INDEXES[3]) ==
    //     INDEXES[4]) ==
    //     INDEXES[5]
    // ) {
    //   console.log("winnnnn");
    // }
  });
};

BTN_SPIN.addEventListener("click", () => {
  cash -= BETS[INDEX_BET];
  CREDIT_COMPONENT.textContent = cash;
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
