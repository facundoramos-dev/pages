window.addEventListener("DOMContentLoaded", () => {
  const audioEl = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  let isPlaying = localStorage.getItem("music-playing") === "true";

  function updateIcon() {
    toggleBtn.textContent = isPlaying ? "🔊" : "🔇";
  }

  function playMusic() {
    return audioEl
      .play()
      .then(() => {
        isPlaying = true;
        localStorage.setItem("music-playing", "true");
        updateIcon();
      })
      .catch((err) => {
        console.log("No se pudo reproducir automáticamente:", err);
      });
  }

  function pauseMusic() {
    if (!isPlaying) return;
    audioEl.pause();
    isPlaying = false;
    localStorage.setItem("music-playing", "false");
    updateIcon();
  }

  // Expose so another script can trigger play with user interaction
  window.playBgMusic = async () => {
    if (localStorage.getItem("music-playing") === "false") return;
    await playMusic();
  };

  toggleBtn.addEventListener("click", () => {
    if (isPlaying) pauseMusic();
    else playMusic();
  });

  updateIcon();
});
