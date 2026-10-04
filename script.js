const pages = [
  { img: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b3JtOHFxc3g5YWgwMjBlZDM3anQ2OGZxdnJ4NHhyMmdhNDA5czlrYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pzBzwe1QHLo2eX53VN/giphy.gif",  title: "Do you love me? 🤗",                                 sub: "nitish is all yours" },
  { img: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZXhnOW0ybGIwaTdzbWpiYTVjNWk3cmNiMWF5dWxkdW03ejJ4ZWZnbyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/uTfX8vuuKVgLQVxORn/giphy.gif", title: "Please think again! 🙄",                              sub: "itni jaldi na matt bolo😥" },
  { img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXNpbmo2NWwxeHZld2lkZTU5a3B3OXQ4ajZhbnRjMDQyYjI5N2gzYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/431s7a9mcXWGJxgYWw/giphy.gif", title: "Ek aur baar Soch lo! 😣",                             sub: "kyu aisa kar rahi ho Pls Maan jao😣" },
  { img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXNpbmo2NWwxeHZld2lkZTU5a3B3OXQ4ajZhbnRjMDQyYjI5N2gzYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P00UJ92KxwMmCPANJC/giphy.gif", title: "beautiful pls Man jao na! Kitna code likh waogi😭",   sub: "bhut glt baat hai yrr😭" }
];
const yesPage = { img: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3d5NzUxYTczeWRpMXJtcGZqZm1zbHd6ajltZDJxYjZmdjRzeDJ2eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2QDVRtezEHN3PgiI/giphy.gif", title: "I knew it! You Love me a lot 😘" };

const content = document.getElementById("content");
const pic = document.getElementById("pic");
const title = document.getElementById("title");
const sub = document.getElementById("sub");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let step = 0;
let floating = false;

function setImage(src) {
  pic.style.display = "block";
  pic.onerror = () => { pic.style.display = "none"; };
  pic.src = src;
}

function fadeIn() {
  content.classList.remove("fade");
  void content.offsetWidth;
  content.classList.add("fade");
}

function render() {
  const p = pages[step];
  setImage(p.img);
  title.textContent = p.title;
  sub.textContent = p.sub;
  fadeIn();
  if (step === pages.length - 1) startFloating();
}

// true if a box at (x, y) of size w x h would sit on top of rect r
function overlaps(x, y, w, h, r) {
  const m = 14;
  return x < r.right + m && x + w > r.left - m && y < r.bottom + m && y + h > r.top - m;
}

// jump the No button to a new spot, never on top of Yes
function moveNo() {
  const pad = 12;
  const w = noBtn.offsetWidth;
  const h = noBtn.offsetHeight;
  const maxX = Math.max(pad, window.innerWidth - w - pad);
  const maxY = Math.max(pad, window.innerHeight - h - pad);
  const yes = yesBtn.getBoundingClientRect();
  const cx = parseFloat(noBtn.style.left) || 0;
  const cy = parseFloat(noBtn.style.top) || 0;
  let x, y, tries = 0;
  do {
    x = pad + Math.random() * (maxX - pad);
    y = pad + Math.random() * (maxY - pad);
    tries++;
  } while (tries < 30 && (overlaps(x, y, w, h, yes) || (Math.abs(x - cx) < 60 && Math.abs(y - cy) < 60)));
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

function startFloating() {
  if (floating) return;
  floating = true;
  // lock its current size and spot, then let it fly
  const r = noBtn.getBoundingClientRect();
  noBtn.style.width = r.width + "px";
  noBtn.style.left = r.left + "px";
  noBtn.style.top = r.top + "px";
  noBtn.classList.add("floating");
  void noBtn.offsetWidth;
  moveNo();
}

function onNo() {
  if (floating) { moveNo(); return; }
  step++;
  render();
}

noBtn.addEventListener("click", onNo);
// On the last page the button runs away before the tap can land
noBtn.addEventListener("touchstart", (e) => {
  if (!floating) return;
  e.preventDefault();
  moveNo();
}, { passive: false });
noBtn.addEventListener("mouseenter", () => { if (floating) moveNo(); });
window.addEventListener("resize", () => { if (floating) moveNo(); });

yesBtn.addEventListener("click", () => {
  floating = false;
  setImage(yesPage.img);
  title.textContent = yesPage.title;
  sub.style.display = "none";
  buttons.style.display = "none";
  fadeIn();
});

render();
