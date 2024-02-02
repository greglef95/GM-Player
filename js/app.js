document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey && event.key === "u") || (event.ctrlKey && event.key === "θ") || event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I") || (event.ctrlKey && event.shiftKey && event.key === "Ι")) {
    event.preventDefault();
    alert("\u00A9 2023 GIPCODE.gr | All Rights Received");
  }
});
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
var speed = 50;
var i = 0;
var txt = "";
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("nowPlaying").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
function getCurrentSong() {
  fetch("https://ec4.yesstreaming.net:2090/status-json.xsl")
    .then((response) => response.json())
    .then((data) => {
      const artist = "Now Playing";
      const title = data.icestats.source.title;
      document.getElementById("nowPlaying").innerHTML = `${title}`;
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: title });
      }
      document.title = `${title}`;
    })
    .catch((error) => {
      console.error(error);
    });
}
function googleSearch() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  window.open(`https://www.google.com/search?q=${currentSong}`);
}
function spotifySearch() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  window.open(`https://open.spotify.com/search/${currentSong}`);
}
function soundcloudSearch() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  window.open(`https://soundcloud.com/search?q=${currentSong}`);
}
function appleMusicSearch() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  window.open(`https://music.apple.com/us/search?term=${currentSong}`);
}
function facebookShare() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  const shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://deseoradio.com") + "&quote=" + encodeURIComponent(currentSong);
  window.open(shareUrl, "_blank");
}
function twitterShare() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  const tweetText = encodeURIComponent("I'm listening to " + currentSong + ".\n\n");
  const shareUrl = "https://twitter.com/intent/tweet?text=" + tweetText + encodeURIComponent("https://deseoradio.com");
  window.open(shareUrl, "_blank");
}
function linkedinShare() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  const shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://deseoradio.com") + "&title=" + encodeURIComponent(currentSong);
  window.open(shareUrl, "_blank");
}
function viberShare() {
  const currentSong = document.getElementById("nowPlaying").innerHTML;
  const shareText = encodeURIComponent("I'm listening to " + currentSong + " on Deseo Radio. Check it out!");
  const shareUrl = "viber://forward?text=" + shareText;
  window.location.href = shareUrl;
}
getCurrentSong();
setInterval(getCurrentSong, 60000);
document.addEventListener("play", function () {
  navigator.mediaSession.playbackState = "playing";
});
