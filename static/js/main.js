document.querySelectorAll(".video-card").forEach((card) => {
  const video = card.querySelector("video");
  const button = card.querySelector(".video-play-button");
  const icon = button.querySelector(".play-icon");
  const label = button.querySelector(".play-label");
  let clickedToPlay = false;

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  const updateButton = () => {
    const isPlaying = !video.paused;
    icon.textContent = isPlaying ? "Ⅱ" : "▶";
    label.textContent = isPlaying ? "Pause video" : "Play video";
    button.setAttribute("aria-label", isPlaying ? "Pause video" : "Play video");
    button.classList.toggle("is-playing", isPlaying);
  };
  const togglePlayback = () => {
    clickedToPlay = true;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    updateButton();
  };
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePlayback();
  });
  video.addEventListener("click", togglePlayback);
  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("mouseenter", () => {
    if (!clickedToPlay) {
      video.play().catch(() => {});
    }
  });
  video.addEventListener("mouseleave", () => {
    if (!clickedToPlay) {
      video.pause();
      video.currentTime = 0;
    }
  });
  updateButton();
});
