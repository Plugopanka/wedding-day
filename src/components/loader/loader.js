// Логика для загрузочного экрана

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
    const redHeartSrc = '/src/assets/heart.png';

    function changeNextHeart() {
        if (currentIndex < hearts.length) {
            const currentHeart = hearts[currentIndex];
            const img = currentHeart.querySelector('.heart-img');

            if (img) {
                img.src = redHeartSrc;
                img.classList.add('red');
                setTimeout(() => img.classList.remove('red'), 600);
            }

            currentIndex++;
            setTimeout(changeNextHeart, 200);
        } else {
            if (loaderContent) loaderContent.classList.add('hide');
            setTimeout(() => {
                if (startBtn) {
                    startBtn.style.display = 'block';
                    setTimeout(() => startBtn.classList.add('show'), 50);
                }
                if (onComplete) onComplete();
            }, 500);
        }
    }

    setTimeout(changeNextHeart, 500);
}

export function initLoader(loaderContainer, onStartClick) {
    if (!loaderContainer) {
        console.error('❌ Контейнер лоадера не найден');
        onStartClick();
        return;
    }

    // Лоадер уже встроен в HTML, просто запускаем анимацию
    animateHearts(() => {
        console.log('✅ Анимация завершена');
    });

    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            loaderContainer.classList.add('closing');
            setTimeout(() => onStartClick(), 500);
        });
    } else {
        console.error('❌ startBtn не найден');
        onStartClick();
    }
}

export function hideLoader(loaderContainer) {
    if (loaderContainer) {
        loaderContainer.style.display = 'none';
    }
}
