// Initialize random positions for floating elements
document.querySelectorAll('.floating-element').forEach(element => {
    const speed = parseFloat(element.dataset.speed);
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.animationDuration = `${speed * 5}s`;
});

// Maze rotation and manipulation
let mazeRotation = 0;
const mazeWrapper = document.querySelector('.maze-wrapper');
const maze = document.querySelector('.maze');

// Random maze cell color changes
setInterval(() => {
    const cells = document.querySelectorAll('.maze-cell');
    const randomCell = cells[Math.floor(Math.random() * cells.length)];
    randomCell.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
}, 1000);

// Button controls
document.querySelectorAll('.maze-button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        switch(action) {
            case 'rotate':
                mazeRotation += 90;
                mazeWrapper.style.transform = `rotate(${mazeRotation}deg)`;
                break;
            case 'invert':
                document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
                break;
            case 'shuffle':
                const cells = Array.from(document.querySelectorAll('.maze-cell'));
                cells.sort(() => Math.random() - 0.5);
                cells.forEach(cell => maze.appendChild(cell));
                break;
        }
    });
});

// Hidden messages
const messages = document.querySelectorAll('.message');
let currentMessageIndex = 0;

function showNextMessage() {
    messages.forEach(msg => msg.classList.remove('visible'));
    messages[currentMessageIndex].classList.add('visible');
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
}

// Random message triggers
setInterval(showNextMessage, 3000);

// Mouse movement effects
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    
    // Increased movement range (multiplied by 0.5 instead of 0.1)
    const moveX = (x - 50) * 0.5;
    const moveY = (y - 50) * 0.5;
    
    // Add perspective tilt based on mouse position
    const tiltX = (y - 50) * 0.2;
    const tiltY = (x - 50) * 0.2;
    
    // Apply multiple transforms
    mazeWrapper.style.transform = `
        rotate(${mazeRotation}deg) 
        translate(${moveX}px, ${moveY}px)
        perspective(1000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
    `;
    
    // More dramatic color shift based on mouse position
    document.body.style.backgroundColor = `hsl(${x}, ${y}%, 15%)`;
    
    // Add shadow effect based on mouse position
    maze.style.boxShadow = `
        ${moveX * 0.5}px ${moveY * 0.5}px 20px rgba(255, 255, 255, 0.3),
        ${-moveX * 0.5}px ${-moveY * 0.5}px 20px rgba(0, 0, 0, 0.3)
    `;
});

// Paradoxical text effects
const paradoxTexts = document.querySelectorAll('.paradox-text');
paradoxTexts.forEach(text => {
    text.addEventListener('mouseover', () => {
        text.style.transform = 'scale(1.2)';
        text.style.opacity = '0.5';
    });
    
    text.addEventListener('mouseout', () => {
        text.style.transform = 'scale(1)';
        text.style.opacity = '1';
    });
});

// Random element movement
setInterval(() => {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach(element => {
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
    });
}, 5000);

// Confusing scroll behavior
let lastScrollTop = 0;
document.addEventListener('scroll', (e) => {
    const currentScroll = window.pageYOffset;
    const scrollDiff = currentScroll - lastScrollTop;
    
    // Invert scroll direction randomly
    if (Math.random() > 0.5) {
        window.scrollTo(0, currentScroll - scrollDiff * 2);
    }
    
    lastScrollTop = currentScroll;
});

// Random color flashes
setInterval(() => {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9999';
    flash.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 500);
    }, 500);
}, 2000);

// Easter egg: Konami Code
let konamiIndex = 0;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Trigger special effect
            document.body.style.transition = 'transform 1s ease';
            document.body.style.transform = 'rotate(180deg) scale(1.2)';
            
            // Add rainbow effect to all elements
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                el.style.animation = 'rainbow 2s infinite';
            });
            
            setTimeout(() => {
                document.body.style.transform = 'none';
                elements.forEach(el => {
                    el.style.animation = 'none';
                });
            }, 2000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
}); 