const icons = document.querySelectorAll('.skill-icon');
const container = document.getElementById('skills-icons');
let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;

const iconSize = 40;
const iconData = [];

icons.forEach(icon => {
    let x = Math.random() * (containerWidth - iconSize);
    let y = Math.random() * (containerHeight - iconSize);
    icon.style.left = x + 'px';
    icon.style.top = y + 'px';

    iconData.push({
        el: icon,
        x: x,
        y: y,
        dx: (Math.random() * 2 - 1) * 2,
        dy: (Math.random() * 2 - 1) * 2
    });
});

// Icons Animation Function
function animateIcons() {
    for (let i = 0; i < iconData.length; i++) {
        let a = iconData[i];

        a.x += a.dx;
        a.y += a.dy;

        if (a.x <= 0 || a.x >= containerWidth - iconSize) a.dx *= -1;
        if (a.y <= 0 || a.y >= containerHeight - iconSize) a.dy *= -1;

        a.x = Math.max(0, Math.min(a.x, containerWidth - iconSize));
        a.y = Math.max(0, Math.min(a.y, containerHeight - iconSize));

        for (let j = i + 1; j < iconData.length; j++) {
            let b = iconData[j];
            let distX = a.x - b.x;
            let distY = a.y - b.y;
            let distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < iconSize) {
                [a.dx, b.dx] = [b.dx, a.dx];
                [a.dy, b.dy] = [b.dy, a.dy];

                let overlap = iconSize - distance;
                let offsetX = (distX / distance) * (overlap / 2);
                let offsetY = (distY / distance) * (overlap / 2);

                a.x += offsetX;
                a.y += offsetY;
                b.x -= offsetX;
                b.y -= offsetY;
            }
        }

        a.el.style.left = a.x + 'px';
        a.el.style.top = a.y + 'px';
    }

    requestAnimationFrame(animateIcons);
}

animateIcons();

// Responsive Icons Container
window.addEventListener('resize', () => {
    containerWidth = container.offsetWidth;
    containerHeight = container.offsetHeight;

    iconData.forEach(icon => {
        icon.x = Math.min(icon.x, containerWidth - iconSize);
        icon.y = Math.min(icon.y, containerHeight - iconSize);
    });
});

// Rain Animation
function createRain(side) {
    const container = document.querySelector(`.rain-${side}`);
    const containerWidth = container.offsetWidth;

    for (let i = 0; i < 30; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');

        drop.style.left = Math.random() * containerWidth + 'px';
        drop.style.top = -Math.random() * 100 + 'px';
        drop.style.animationDuration = (2 + Math.random() * 2) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(drop);

        setInterval(() => {
            const newDrop = drop.cloneNode();
            newDrop.style.left = Math.random() * container.offsetWidth + 'px';
            newDrop.style.top = '-100px';
            newDrop.style.animationDuration = (2 + Math.random() * 2) + 's';
            container.appendChild(newDrop);
            setTimeout(() => newDrop.remove(), 4000);
        }, 800 + Math.random() * 700);
    }
}

createRain('left');
createRain('right');

// Language Toggle Button
let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
    document.querySelector('.toggle-container').classList.add('active');
    document.getElementById('toggle-ball').textContent = 'en';
});

function toggleLanguage() {
    const toggle = document.querySelector('.toggle-container');
    const ball = document.getElementById('toggle-ball');

    if (currentLang === 'tr') {
        currentLang = 'en';
        toggle.classList.add('active');
        ball.textContent = 'en';
    } else {
        currentLang = 'tr';
        toggle.classList.remove('active');
        ball.textContent = '🇹🇷';
    }

    changeLanguage(currentLang);
}

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}