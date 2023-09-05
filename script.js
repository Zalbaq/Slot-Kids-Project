const SLOT_ITEMS = {
  item1: {
    src: "/icon/cherries.png",
    diff: 5,
  },
  item2: {
    src: "/icon/diamond.png",
    diff: 4,
  },
  item3: {
    src: "/icon/lemon.png.png",
    diff: 3,
  },
  item4: {
    src: "/icon/plum.png",
    diff: 2,
  },
  item5: {
    src: "/icon/star.png",
    diff: 1,
  },
};

const BUTTON_SPIN = document.querySelector("#button-spin");
const ITEM1 = document.getElementById("item1").querySelectorAll("img");
const ITEM2 = document.getElementById("item2").querySelectorAll("img");
const ITEM3 = document.getElementById("item3").querySelectorAll("img");
const ITEM4 = document.getElementById("item4").querySelectorAll("img");

let getRandom = () => {
  const RANDOM = Math.floor(Math.random() * 5) + 1;
  return RANDOM;
};
let checkRandomItem = () => {
    if (getRandom) {
        
    }
};
