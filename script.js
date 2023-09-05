const SLOT_ITEMS = {
    item1: "/icon/cherries.png",
    item2: "/icon/diamond.png",
    item3: "/icon/lemon.png",
    item4: "/icon/plum.png",
    item5: "/icon/star.png"
}
const BUTTON_SPIN = document.querySelector('#button-spin');
const ITEM1 = document.getElementById('item1').querySelectorAll('img');

ITEM1.forEach(x => {
    x.src = SLOT_ITEMS.item5;
});

BUTTON_SPIN.addEventListener('click', ()=>{
})