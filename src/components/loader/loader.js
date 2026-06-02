// Логика для загрузочного экрана

// Функция для анимации сердечек
export function animateHearts(onComplete) {
    const hearts = document.querySelectorAll('.heart-icon');
    const loaderContent = document.getElementById('loaderContent');
    const startBtn = document.getElementById('startBtn');

    if (!hearts.length) {
        console.log('Сердечки не найдены');
        onComplete();
        return;
    }

    let currentIndex = 0;
    const redHeartSrc = '/src/assets/heart.png'; // путь к красному сердцу

    function changeNextHeart() {
        if (currentIndex < hearts.length) {
            const currentHeart = hearts[currentIndex];
            const img = currentHeart.querySelector('.heart-img');

            if (img) {
                // Меняем изображение на красное сердце
                img.src = redHeartSrc;
                img.classList.add('red');

                // Удаляем класс анимации, оставляя красное сердце
                setTimeout(() => {
                    img.classList.remove('red');
                }, 600);
            }

            currentIndex++;

            setTimeout(changeNextHeart, 200);
        } else {
            if (loaderContent) {
                loaderContent.classList.add('hide');
            }

            setTimeout(() => {
                if (startBtn) {
                    startBtn.style.display = 'block';
                    setTimeout(() => {
                      startBtn.classList.add('show');
                    }, 50);
                }

                // Вызываем колбэк
                if (onComplete) {
                    onComplete();
                }
            }, 500);
        }
    }

    // Запускаем анимацию через 0.5 секунды после загрузки
    setTimeout(changeNextHeart, 500);
}

// Функция для загрузки HTML лоадера
export async function loadLoader() {
    try {
        const response = await fetch('/src/components/loader/loader.html');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        return html;
    } catch (error) {
        console.error('❌ Ошибка загрузки лоадера:', error);
        return null;
    }
}

// Функция для инициализации лоадера
export function initLoader(
    loaderContainer,
    onStartClick,
) {
    if (!loaderContainer) {
        console.error('❌ Контейнер лоадера не найден');
        onStartClick();
        return;
    }

    // Загружаем HTML лоадера
    loadLoader().then(loaderHtml => {
        if (loaderHtml) {
            loaderContainer.innerHTML = loaderHtml;

            // Запускаем анимацию сердечек
            animateHearts(() => {
                console.log('✅ Анимация завершена, сердца красные, кнопка Start появилась');
            });

            // Находим кнопку Start
            const startBtn = document.getElementById('startBtn');

            if (startBtn) {
                startBtn.addEventListener('click', () => {

                    // Добавляем анимацию закрытия
                    loaderContainer.classList.add('closing');

                    // Через 500ms вызываем колбэк
                    setTimeout(() => {
                        onStartClick();
                    }, 500);
                });
            } else {
                console.error('❌ startBtn не найден');
                onStartClick();
            }
        } else {
            console.error('❌ Не удалось загрузить HTML лоадера');
            onStartClick();
        }
    });
}

// Функция для скрытия лоадера
export function hideLoader(loaderContainer) {
    if (loaderContainer) {
        loaderContainer.style.display = 'none';
    }
}
