import './style.css';
import { initLoader, hideLoader } from './components/loader/loader';
import { initKonamiCode } from './components/konami/konami';

async function loadComponent(componentPath, containerId) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log(`✅ Загружен компонент: ${componentPath}`);
        }
        return true;
    } catch (error) {
        console.error(`❌ Ошибка загрузки компонента ${componentPath}:`, error);
        return false;
    }
}

// Загрузка всех компонентов
async function loadAllComponents() {

    await loadComponent('/src/components/ticker/ticker.html', 'ticker-container');
    await loadComponent('/src/components/greetings/greetings.html', 'greetings-container');
    await loadComponent('/src/components/info/info.html', 'info-container');
    await loadComponent('/src/components/dresscode/dresscode.html', 'dresscode-container');
    await loadComponent('/src/components/countdown/countdown.html', 'countdown-container');
    await loadComponent('/src/components/footer/footer.html', 'footer-container');

    initializeApp();
}

// Вся логика после загрузки компонентов
function initializeApp() {
    const weddingDate = new Date(2026, 7, 2, 15, 0, 0);

    function updateCountdown() {
        const now = new Date();
        const difference = weddingDate.getTime() - now.getTime();

        if (difference <= 0) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            if (secondsEl) secondsEl.textContent = '0';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString();
        if (hoursEl) hoursEl.textContent = hours.toString();
        if (minutesEl) minutesEl.textContent = minutes.toString();
        if (secondsEl) secondsEl.textContent = seconds.toString();
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }, 100);
}

// Функция для загрузки основного HTML
async function loadMainHtml() {
    try {
        const response = await fetch('/src/main.html');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        const app = document.getElementById('app');

        if (app) {
            app.innerHTML = html;
            return true;
        }
        return false;
    } catch (error) {
        console.error('❌ Ошибка загрузки main.html:', error);
        return false;
    }
}

async function initApp() {
    // Загружаем main.html
    const mainLoaded = await loadMainHtml();

    if (!mainLoaded) {
        console.error('❌ Не удалось загрузить main.html');
        return;
    }

    // Находим контейнер лоадера
    const loaderContainer = document.getElementById('loader-overlay');
    const mainContainer = document.querySelector('.container');
    const backgroundIcons = document.querySelector('.background-icons');

    if (!loaderContainer) {
        // Если нет лоадера, сразу показываем контент
        if (mainContainer) mainContainer.style.display = 'block';
        if (backgroundIcons) backgroundIcons.style.display = 'flex';
        loadAllComponents();
        return;
    }

    // Скрываем основной контент
    if (mainContainer) mainContainer.style.display = 'none';

    // Инициализируем лоадер
    initLoader(loaderContainer, () => {
        // Этот колбэк вызывается после клика на Start
        if (loaderContainer) {
            hideLoader(loaderContainer);
        }
        if (mainContainer) mainContainer.style.display = 'block';
        if (backgroundIcons) backgroundIcons.style.display = 'flex';
        document.body.style.overflow = 'auto';

        initKonamiCode();

        // Загружаем компоненты
        loadAllComponents();
    });
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';
    initApp();
});
