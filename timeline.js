document.querySelectorAll("[data-timeline]").forEach(timeline => {
  const steps = timeline.querySelectorAll(".step");
  const barsContainer = timeline.parentElement.querySelector(".progress-bars");

  let index = 0;
  let interval;
  let startX = 0;

  // Create progress bars
  steps.forEach((_, i) => {
    const bar = document.createElement("div");
    bar.className = "bar" + (i === 0 ? " active" : "");
    bar.addEventListener("click", () => {
      showStep(i, i > index ? "right" : "left");
      restartAuto();
    });
    barsContainer.appendChild(bar);
  });

  const bars = barsContainer.querySelectorAll(".bar");

  function showStep(i, direction = "right") {
    steps.forEach(s => {
      s.classList.remove("active", "left");
    });
    bars.forEach(b => b.classList.remove("active"));

    if (direction === "left") {
      steps[i].classList.add("left");
    }

    steps[i].classList.add("active");
    bars[i].classList.add("active");
    index = i;
  }

  function next() {
    let nextIndex = (index + 1) % steps.length;
    showStep(nextIndex, "right");
  }

  function prev() {
    let prevIndex = (index - 1 + steps.length) % steps.length;
    showStep(prevIndex, "left");
  }

  function startAuto() {
    interval = setInterval(next, 3000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  /* Mouse drag */
  timeline.addEventListener("mousedown", e => {
    startX = e.clientX;
    stopAuto();
  });

  timeline.addEventListener("mouseup", e => {
    let diff = e.clientX - startX;
    if (diff > 50) prev();      
    if (diff < -50) next();     
    restartAuto();
  });

  /* Touch swipe */
  timeline.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    stopAuto();
  });

  timeline.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;
    if (diff > 50) prev();
    if (diff < -50) next();
    restartAuto();
  });

  /* Pause on hover */
  timeline.addEventListener("mouseenter", stopAuto);
  timeline.addEventListener("mouseleave", startAuto);

  showStep(index);
  startAuto();
});
