// @ts-check

const answer = Math.floor(Math.random() * 100) + 1;
// alert(answer);

const el = /**
 * @type {{
 *   container: HTMLDivElement;
 *   low: HTMLDivElement;
 *   num: HTMLInputElement;
 *   guess: HTMLButtonElement;
 *   high: HTMLDivElement;
 * }}
 */ (Object.fromEntries(["container", "low", "num", "guess", "high"].map(id => [id, document.getElementById(id)])));

el.num.addEventListener("input", () => {
  if (el.num.value === "") {
    return;
  }
  const val = +el.num.value;
  if (val !== val || val < 1) {
    el.num.value = "1";
  } else if (val > 100) {
    el.num.value = "100";
  }
});

el.num.addEventListener("keydown", ev => {
  if (ev.key === "Enter") {
    el.guess.click();
  }
});

let currentContainerPos = "";

/** @param {"left" | "right"} direction */
function moveContainer(direction) {
  if (direction === currentContainerPos) {
    return;
  }
  currentContainerPos = direction;
  let i = 10;
  setTimeout(function f() {
    if (i >= 0) {
      el.container.style.gridTemplateColumns =
        direction === "left" ? `${i / 10}fr 3fr ${1 - i / 10}fr` : `${1 - i / 10}fr 3fr ${i / 10}fr`;
      setTimeout(f);
    }
    i--;
  });
}

el.guess.addEventListener("click", function f() {
  const val = +el.num.value;
  if (el.num.value === "" || val !== val || val < 1 || val > 100) {
    return alert("Type your guess between 1-100.");
  }
  if (val === answer) {
    el.guess.removeEventListener("click", f);
    el.guess.classList.add("correct");
    el.low.textContent = "";
    el.high.textContent = "";
    el.container.style.gridTemplateColumns = "";
  } else if (val < answer) {
    el.low.textContent = val + "";
    el.high.textContent = "";
    el.guess.textContent = "Higher!";
    el.guess.classList.add("higher");
    setTimeout(() => {
      el.guess.textContent = "Guess";
      el.guess.classList.remove("higher");
    }, 3000);
    moveContainer("right");
  } else {
    el.low.textContent = "";
    el.high.textContent = val + "";
    el.guess.textContent = "Lower!";
    el.guess.classList.add("lower");
    setTimeout(() => {
      el.guess.textContent = "Guess";
      el.guess.classList.remove("lower");
    }, 3000);
    moveContainer("left");
  }
  el.num.select();
});
