const target = document.getElementById("header");
const contextMenu = document.getElementById("contextMenu");
const spans = document.querySelectorAll("h1 > span");

let guntype = "pistol";
let gunshot = new Audio("./audio/9mm.mp3");
const holesArray = [];

target.addEventListener("mousedown", function (e) {
  if (e.button == 0) {
    //let gunshot = new Audio("./audio/9mm.mp3");
    gunshot.pause;
    gunshot.currentTime = 0;
    gunshot.play();
    let hit = document.createElement("div");
    if (e.target.tagName == "SPAN" || e.target.tagName == "IMG") {
      hit.classList.add("spark");
      target.appendChild(hit);
      hit.style.top = e.y - 25 + "px";
      hit.style.left = e.x - 15 + "px";

      e.target.classList.add("fall");
      e.target.addEventListener("animationend", function removeAnimation() {
        checkHits();

        e.target.removeEventListener("animationend", removeAnimation);
      });

      setTimeout(() => {
        //gunshot.pause;
        //gunshot.src = "";
        //gunshot = null;
        hit.remove();
      }, 300);
    } else {
      hit.classList.add("bullet-hole");
      hit.style.top = e.y - 10 + "px";
      hit.style.left = e.x - 10 + "px";
      holesArray.push(hit);
      target.appendChild(hit);
      // setTimeout(() => {
      //   // gunshot.pause;
      //   // gunshot.src = "";
      //   // gunshot = null;
      // }, 300);
    }
  }
});

async function checkHits() {
  let hits = 0;
  for (let index = 0; index < spans.length; index++) {
    const element = spans[index];
    if (!element.classList.contains("fall")) {
      hits++;
    }
  }
  if (hits == 0) {
    spans.forEach((element, i) => {
      holesArray.forEach((hole) => hole.remove());
      setTimeout(() => {
        element.classList.add("rise");
        element.addEventListener("animationend", function removeAnimation() {
          element.classList.remove("fall");
          element.classList.remove("rise");
          element.removeEventListener("animationend", removeAnimation);
        });
      }, i * 200);
    });
  }

  //element.classList.add("rise");

  //element.classList.remove("fall");
}

function auto_grow(element) {
  console.log(element.clientHeight);
  console.log("Grow");
  element.style.height = "17px";

  //element.setAttribute("rows", Math.floor(element.scrollHeight / 5));
  element.style.height = element.scrollHeight + "px";
  console.log(element.clientHeight);
}
// target.onclick = hideMenu;
// target.oncontextmenu = rightClick;
// contextMenu.onmouseleave = hideMenu;

// function hideMenu() {
//   console.log("leave");
//   contextMenu.style.display = "none";
// }

// function rightClick(e) {
//   e.preventDefault();

//   if (contextMenu.style.display == "block") {
//     hideMenu();
//   } else {
//     var menu = document.getElementById("contextMenu");
//     menu.style.display = "block";
//     menu.style.left = e.pageX + "px";
//     menu.style.top = e.pageY + "px";
//   }
//   contextMenu.onclick = function (ev) {
//     guntype = ev.target.getAttribute("data-guntype");
//     hideMenu();
//   };
//   contextMenu.oncontextmenu = function (event) {
//     event.preventDefault();
//   };
// }
