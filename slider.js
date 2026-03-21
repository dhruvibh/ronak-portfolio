const slides = document.querySelectorAll(".slide");
const bars = document.querySelectorAll(".bar");
const sliderBox = document.getElementById("sliderBox");

let index = 0;
let paused = false;
let timer;

let startX = 0;
let currentX = 0;
let isDragging = false;

/* EXIT if elements not present (VERY IMPORTANT) */
if (slides.length === 0 || !sliderBox) {
  console.warn("Slider not initialized - elements missing");
} else {

/* Show slide */
function showSlide(i) {
  if (!slides[i] || !bars[i]) return;

  slides.forEach(s => s.classList.remove("active"));
  bars.forEach(b => b.classList.remove("active"));

  slides[i].classList.add("active");
  bars[i].classList.add("active");
  index = i;
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

/* Auto play */
function startAuto() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (!paused) nextSlide();
  }, 2500);
}
startAuto();

/* Bars click */
bars.forEach((bar, i) => {
  bar.addEventListener("click", () => {
    showSlide(i);
    paused = true;
    setTimeout(() => paused = false, 3000);
  });
});

/* Pause on click */
sliderBox.addEventListener("click", () => {
  paused = !paused;
});

/* Mouse Swipe */
sliderBox.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  paused = true;
});

sliderBox.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentX = e.clientX;
});

sliderBox.addEventListener("mouseup", () => {
  if (!isDragging) return;

  let diff = currentX - startX;

  if (diff > 70) prevSlide();
  if (diff < -70) nextSlide();

  isDragging = false;
  setTimeout(() => paused = false, 3000);
});

sliderBox.addEventListener("mouseleave", () => {
  isDragging = false;
});

/* Touch Swipe (Mobile) */
sliderBox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  paused = true;
});

sliderBox.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff > 70) prevSlide();
  if (diff < -70) nextSlide();

  setTimeout(() => paused = false, 3000);
});

}