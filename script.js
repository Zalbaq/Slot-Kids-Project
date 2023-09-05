const SLOT_ITEMS = {
    item1: "/icon/cherries.png",
    item2: "/icon/diamond.png",
    item3: "/icon/lemon.png",
    item4: "/icon/plum.png",
    item5: "/icon/star.png"
}
const BUTTON_SPIN = document.querySelector('#button-spin');
const ITEM1 = document.getElementById('item1').querySelectorAll('img');


BUTTON_SPIN.addEventListener('click', ()=>{
    randomItem(ITEM1);
})
let randomItem = (target)=>{
    target.forEach(element => {
        const RANDOM_ITEM = Math.floor(Math.random()*5) + 1;
        element.src = SLOT_ITEMS[`item${RANDOM_ITEM}`]
    });
} 