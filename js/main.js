const navButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

if (navButton && navigation) {
  navButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    navButton.setAttribute('aria-expanded', String(isOpen));
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    navButton.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

const sizeMap = { minus: '15px', reset: '16px', plus: '18px' };
document.querySelectorAll('[data-size]').forEach((button) => button.addEventListener('click', () => {
  document.documentElement.style.fontSize = sizeMap[button.dataset.size];
}));

document.querySelectorAll('.search').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.querySelector('input').focus();
}));
