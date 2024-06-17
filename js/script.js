document.addEventListener("DOMContentLoaded", function() {
  redirectToGithub();
  redirectToOtherPag('btn-start', 'pages/game.html');
});

function redirectToGithub() {
  document.getElementById("github-btn").onclick = function() {
      window.open("https://github.com/NehuenBovyn/DAW-TP-FINAL", "_blank");
  };
}

function redirectToOtherPag(idHtmlElement, url) {
  document.getElementById(idHtmlElement).addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = url;
  });
}