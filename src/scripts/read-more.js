document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.read-more-button').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.previousElementSibling;
      if (content) {
        content.classList.toggle('expanded');
        if (content.classList.contains('expanded')) {
          button.textContent = 'Read Less';
        } else {
          button.textContent = 'Read More';
        }
      }
    });
  });
});
