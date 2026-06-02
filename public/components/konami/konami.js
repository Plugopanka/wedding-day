// Konami Code Easter Egg для свадебного сайта
// Лёгкая версия: тряска + иконки + уведомление в углу

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
let isActivated = false;

// Добавляем CSS анимации
function addKonamiStyles() {
  if (document.getElementById('konami-styles')) return;

  const style = document.createElement('style');
  style.id = 'konami-styles';
  style.textContent = `
        /* Анимация тряски */
        @keyframes konamiShake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        .konami-shake {
            animation: konamiShake 0.4s ease-in-out !important;
        }

        /* Летающие иконки */
        .konami-flying-icon {
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            font-size: 24px;
            animation: konamiFloatUp 1.2s ease-out forwards;
        }

        @keyframes konamiFloatUp {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-150px) scale(1.3) rotate(15deg);
            }
        }

        /* Уведомление в углу */
        .konami-toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: linear-gradient(135deg, #FFE4C4, #FFDAB9);
            color: #C4622E;
            padding: 12px 20px;
            border-radius: 60px;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 10001;
            animation: konamiSlideIn 0.3s ease-out forwards;
            box-shadow: 0 8px 20px rgba(255, 140, 100, 0.25);
            border: 1px solid rgba(255, 179, 71, 0.5);
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(4px);
        }

        @keyframes konamiSlideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .konami-toast.fade-out {
            animation: konamiFadeOut 0.3s ease-out forwards;
        }

        @keyframes konamiFadeOut {
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }

        @media (max-width: 480px) {
            .konami-toast {
                bottom: 16px;
                right: 16px;
                left: 16px;
                padding: 10px 16px;
                font-size: 0.8rem;
                border-radius: 40px;
            }
        }
    `;
  document.head.appendChild(style);
}

// Создаём летающие иконки
function createFlyingIcons() {
  const container = document.createElement('div');
  container.id = 'konami-flying-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const icons = ['❤️', '🧡', '💛', '💖', '💕', '💗', '✨', '⭐', '🌸', '🎮', '💒'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const icon = document.createElement('div');
      icon.className = 'konami-flying-icon';
      icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];
      icon.style.left = Math.random() * 100 + '%';
      icon.style.top = Math.random() * 100 + '%';
      icon.style.fontSize = (Math.random() * 24 + 16) + 'px';
      icon.style.opacity = Math.random() * 0.5 + 0.3;
      icon.style.animationDuration = (Math.random() * 0.8 + 0.8) + 's';
      container.appendChild(icon);

      setTimeout(() => icon.remove(), 2000);
    }, i * 25);
  }

  setTimeout(() => container.remove(), 3000);
}

// Показываем уведомление в углу
function showToast() {
  const toast = document.createElement('div');
  toast.className = 'konami-toast';
  toast.innerHTML = `
        Причина тряски - секретный код активирован! 🎉💖
    `;
  document.body.appendChild(toast);

  // Автоматическое исчезновение через 3.5 секунды
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 3500);
  }, 4000);
}

// Главная функция активации пасхалки
export function activateKonami() {
  if (isActivated) return;

  isActivated = true;
  console.log('🎮 Konami Code activated!');

  addKonamiStyles();

  // Эффект тряски
  document.body.classList.add('konami-shake');
  setTimeout(() => {
    document.body.classList.remove('konami-shake');
  }, 400);

  // Летающие иконки
  createFlyingIcons();

  // Уведомление в углу
  showToast();
}

// Инициализация слушателя клавиш
export function initKonamiCode() {
  addKonamiStyles();

  const handleKeydown = (e) => {

    let key = e.key;
    if (key === 'a' || key === 'A' || key === 'а' || key === 'А' || key === 'ф' || key === 'Ф') key = 'a';
    if (key === 'b' || key === 'B' || key === 'в' || key === 'В' || key === 'И' || key === 'и') key = 'b';

    if (key === konamiCode[konamiIndex]) {
      konamiIndex++;

      if (konamiIndex === konamiCode.length) {
        activateKonami();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  };

  document.addEventListener('keydown', handleKeydown);
  return () => document.removeEventListener('keydown', handleKeydown);
}
