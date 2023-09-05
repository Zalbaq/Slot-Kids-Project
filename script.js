const SLOT_ITEMS = {
  item1: {
    src: "/icon/cherries.png",
    diff: 13,
  },
  item2: {
    src: "/icon/diamond.png",
    diff: 8,
  },
  item3: {
    src: "/icon/lemon.png",
    diff: 5,
  },
  item4: {
    src: "/icon/plum.png",
    diff: 3,
  },
  item5: {
    src: "/icon/star.png",
    diff: 1,
  },
};

const BUTTON_SPIN = document.querySelector("#button-spin");
const SLOT1 = document.getElementById("item1").querySelectorAll("img");
const SLOT2 = document.getElementById("item2").querySelectorAll("img");
const SLOT3 = document.getElementById("item3").querySelectorAll("img");
const SLOT4 = document.getElementById("item4").querySelectorAll("img");
const SLOT5 = document.getElementById("item5").querySelectorAll("img");

let getSlotPowers = () => {
  return Math.floor(Math.random() * 5) + 1;
};

let getItemSLot = (SLOT)=>{
  SLOT.forEach(element => {
    let powerItem = getSlotPowers();
    if (powerItem >= SLOT_ITEMS.item1.diff) {
      element.src = SLOT_ITEMS.item1.src;
    } else if (powerItem >= SLOT_ITEMS.item2.diff) {
      element.src = SLOT_ITEMS.item2.src;
    }else if (powerItem >= SLOT_ITEMS.item3.diff) {
      element.src = SLOT_ITEMS.item3.src;
    }else if (powerItem >= SLOT_ITEMS.item4.diff) {
      element.src = SLOT_ITEMS.item4.src;
    } else{
      element.src = SLOT_ITEMS.item5.src;
    }
  });
}
BUTTON_SPIN.addEventListener('click', ()=>{
  getItemSLot(SLOT1);
  getItemSLot(SLOT2);
  getItemSLot(SLOT3);
  getItemSLot(SLOT4);
  getItemSLot(SLOT5);
})