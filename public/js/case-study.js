document.querySelectorAll('.case-study-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('aria-controls');
    const target = document.getElementById(targetId);

    target.classList.toggle('active');
    const isOpen = target.classList.contains('active');
    btn.textContent = isOpen ? 'Close Goal Section' : 'Show Goal Section';
    btn.setAttribute('aria-expanded', isOpen);
  });
});
