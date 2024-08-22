const imgs = document.getElementById("pfp");
const img = imgs.querySelectorAll("img");

let idx = 0;

function carrosel(){
    idx++;

    if(idx >= img.length){ 
        idx = 0;
    } else if(idx === 5){ 
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 359}px)`;
}

setInterval(carrosel, 2000);

var swiper = new Swiper(".slide-content", {
    effect: "cards",
    grabCursor: true,
  });