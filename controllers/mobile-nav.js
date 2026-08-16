document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'mobile-toggle';
  toggleBtn.innerHTML = '☰';
  toggleBtn.setAttribute('aria-label', 'Toggle menu');
  document.body.appendChild(toggleBtn);

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  };

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', closeSidebar);

  // Close menu after tapping a nav link (mobile UX)
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
});