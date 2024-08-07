document.addEventListener('DOMContentLoaded', function() {
  redirectToGithub();
  redirectToOtherPag('btn-start', './pages/game.html');
});

function redirectToGithub() {
  const githubBtn = document.getElementById('github-btn');
  if (githubBtn) {
    githubBtn.onclick = function() {
      window.open('https://github.com/NehuenBovyn/DAW-TP-FINAL', '_blank');
    };
  }
}

function redirectToOtherPag(idHtmlElement, url) {
  const element = document.getElementById(idHtmlElement);
  console.log(idHtmlElement, url);

  if (element) {
    element.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = url;
    });
  }
}
