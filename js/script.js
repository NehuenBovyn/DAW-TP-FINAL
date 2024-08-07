document.addEventListener('DOMContentLoaded', function() {
  redirectToGithub();
  redirectToOtherPag('btn-start', './pages/game.html');
  const contactoBtn = document.getElementById('contacto-btn');
  if (contactoBtn) {
      contactoBtn.addEventListener('click', function(event) {
          const currentPath = window.location.pathname;
          const contactPath = '/pages/contacto.html';
  
          if (currentPath !== contactPath) {
              event.preventDefault(); 
              window.location.href = contactPath; 
          }
      });
  }
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