const target = document.getElementById("header");
const spans = document.querySelectorAll("h1 > span");

let gunshot = new Audio("./audio/9mm.mp3");
const holesArray = [];

target.addEventListener("mousedown", function (e) {
	if (e.button == 0) {
		gunshot.pause;
		gunshot.currentTime = 0;
		gunshot.play();
		let hit = document.createElement("div");
		if (e.target.tagName == "SPAN") {
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
				hit.remove();
			}, 300);
		} else {
			hit.classList.add("bullet-hole");
			hit.style.top = e.y - 10 + "px";
			hit.style.left = e.x - 10 + "px";
			holesArray.push(hit);
			target.appendChild(hit);
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
}

function auto_grow(element) {
	element.style.height = "17px";
	element.style.height = element.scrollHeight + "px";
}
