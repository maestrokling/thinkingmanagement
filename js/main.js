// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.mobile-toggle');
  var links = document.querySelector('.links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('open');
      });
    });
  }
});
