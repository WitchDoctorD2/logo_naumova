// FAQ toggle
const questions = document.querySelectorAll('.faq-item');

questions.forEach(item => {
  item.addEventListener('click', () => {
    const answer = item.querySelector('.answer');
    const isOpen = answer.style.display === 'block';

    document.querySelectorAll('.faq-item .answer').forEach(ans => {
      ans.style.display = 'none';
    });

    answer.style.display = isOpen ? 'none' : 'block';
  });
});

// Burger menu toggle and close on click
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });

  // Закрытие меню при клике на пункт меню
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
      burger.classList.remove('toggle');
    });
  });

  // Закрытие меню при клике вне его
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('nav-active');
      burger.classList.remove('toggle');
    }
  });
}

// --- 3D карусель для педагогов ---
const teachers = document.querySelectorAll('.teacher');
let currentIndex = 0;

function updateCarousel() {
  const total = teachers.length;
  const screenWidth = window.innerWidth;
  let offsetX = 150; // по умолчанию

  if (screenWidth <= 768) {
    offsetX = 100; // для мобильных меньше смещение
  }

  teachers.forEach((teacher, index) => {
    teacher.style.transition = 'transform 0.5s ease, opacity 0.5s ease, filter 0.5s ease';
    teacher.style.opacity = '0.5';
    teacher.style.pointerEvents = 'none';
    teacher.style.zIndex = '1';
    teacher.style.filter = 'brightness(0.6)';

    if (index === currentIndex) {
      teacher.style.transform = `translateX(0) scale(1) perspective(600px) rotateY(0deg)`;
      teacher.style.opacity = '1';
      teacher.style.pointerEvents = 'auto';
      teacher.style.zIndex = '10';
      teacher.style.filter = 'brightness(1)';
    } else if (index === (currentIndex - 1 + total) % total) {
      teacher.style.transform = `translateX(${-offsetX}px) scale(0.7) perspective(600px) rotateY(30deg)`;
    } else if (index === (currentIndex + 1) % total) {
      teacher.style.transform = `translateX(${offsetX}px) scale(0.7) perspective(600px) rotateY(-30deg)`;
    } else {
      teacher.style.transform = `translateX(${offsetX * 3}px) scale(0.5)`;
      teacher.style.opacity = '0';
      teacher.style.pointerEvents = 'none';
      teacher.style.zIndex = '0';
      teacher.style.filter = 'brightness(0)';
    }
  });
}

// Кнопки переключения
const btnLeft = document.querySelector('.left-btn');
const btnRight = document.querySelector('.right-btn');

if (btnLeft && btnRight) {
  btnLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + teachers.length) % teachers.length;
    updateCarousel();
  });

  btnRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % teachers.length;
    updateCarousel();
  });
}

// Добавляем свайп на мобильных с блокировкой горизонтального скролла страницы
const carousel = document.querySelector('.teacher-carousel');
if (carousel) {
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (Math.abs(diffX) > 10) {
      e.preventDefault(); // Блокируем скролл страницы при горизонтальном свайпе
    }

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        btnLeft?.click();
      } else {
        btnRight?.click();
      }
      isDragging = false;
    }
  }, { passive: false }); // обязательно passive: false для preventDefault

  carousel.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// Обновляем карусель при изменении размера окна
window.addEventListener('resize', updateCarousel);

// Инициализация
updateCarousel();

window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});