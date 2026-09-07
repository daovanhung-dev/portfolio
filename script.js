const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const progressBar = document.getElementById('progressBar');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.dataset.theme = savedTheme;
else if (window.matchMedia('(prefers-color-scheme: light)').matches) root.dataset.theme = 'light';

themeToggle.textContent = root.dataset.theme === 'light' ? '☾' : '☼';

themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
  themeToggle.textContent = next === 'light' ? '☾' : '☼';
});

const updateProgress = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const pct = height > 0 ? (window.scrollY / height) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const navObserver = new IntersectionObserver((entries) => {
  const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!active) return;
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${active.target.id}`;
    link.style.color = isActive ? 'var(--text)' : '';
  });
}, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
sections.forEach(section => navObserver.observe(section));
