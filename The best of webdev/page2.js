// Matrix effect
const matrixContainer = document.querySelector('.matrix-text');
const matrixOverlay = document.querySelector('.matrix-overlay');
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
let matrixInterval;
let matrixSpeed = 50;
let matrixOpacity = 0.3;

function createMatrixEffect() {
    const columns = Math.floor(window.innerWidth / 20);
    const drops = new Array(columns).fill(0);
    
    function draw() {
        let output = '';
        for (let i = 0; i < drops.length; i++) {
            output += matrixChars[Math.floor(Math.random() * matrixChars.length)];
            drops[i] = (drops[i] + 1) % 20;
        }
        matrixContainer.textContent = output;
        matrixOverlay.style.opacity = matrixOpacity;
    }
    
    matrixInterval = setInterval(draw, matrixSpeed);
}

// Confusing circles
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    const speed = parseFloat(circle.dataset.speed);
    circle.style.animationDuration = `${speed * 2}s`;
    circle.style.left = `${Math.random() * 100}%`;
    circle.style.top = `${Math.random() * 100}%`;
    circle.style.width = `${30 + Math.random() * 40}px`;
    circle.style.height = circle.style.width;
    circle.style.background = `radial-gradient(circle, 
        rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8) 0%, 
        rgba(255,255,255,0) 70%)`;
});

// Riddle System
const riddles = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answer: "echo",
        hint: "It's something you can hear but not touch",
        feedback: "An echo is the reflection of sound waves!"
    },
    {
        question: "The more you take, the more you leave behind. What am I?",
        answer: "footsteps",
        hint: "Think about walking",
        feedback: "Footsteps leave marks as you walk!"
    },
    {
        question: "What has keys, but no locks; space, but no room; and you can enter, but not go in?",
        answer: "keyboard",
        hint: "You're using one right now",
        feedback: "A keyboard has keys but no locks!"
    },
    {
        question: "What breaks yet never falls, and what falls yet never breaks?",
        answer: "day and night",
        hint: "Think about time",
        feedback: "Day breaks and night falls!"
    },
    {
        question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
        answer: "fire",
        hint: "It's hot and bright",
        feedback: "Fire needs oxygen to grow!"
    }
];

let currentRiddleIndex = 0;
let solvedCount = 0;
let hintsUsed = 0;

function displayRiddle() {
    const riddle = riddles[currentRiddleIndex];
    document.querySelector('.riddle-text').textContent = riddle.question;
    document.querySelector('.riddle-hint').textContent = '';
    document.querySelector('.riddle-feedback').textContent = '';
    document.querySelector('.answer-input').value = '';
}

function showHint() {
    const riddle = riddles[currentRiddleIndex];
    document.querySelector('.riddle-hint').textContent = riddle.hint;
    hintsUsed++;
    document.querySelector('.hints-count').textContent = hintsUsed;
}

function checkAnswer(answer) {
    const riddle = riddles[currentRiddleIndex];
    const feedback = document.querySelector('.riddle-feedback');
    
    if (answer.toLowerCase() === riddle.answer.toLowerCase()) {
        feedback.textContent = riddle.feedback;
        feedback.style.color = '#0f0';
        solvedCount++;
        document.querySelector('.solved-count').textContent = solvedCount;
        
        setTimeout(() => {
            currentRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
            displayRiddle();
        }, 2000);
    } else {
        feedback.textContent = "That's not quite right. Try again!";
        feedback.style.color = '#f00';
    }
}

// Event Listeners
document.querySelector('.submit-button').addEventListener('click', () => {
    const answer = document.querySelector('.answer-input').value;
    checkAnswer(answer);
});

document.querySelector('.answer-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const answer = e.target.value;
        checkAnswer(answer);
    }
});

document.querySelectorAll('.control-button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        switch(action) {
            case 'matrix':
                if (matrixInterval) {
                    clearInterval(matrixInterval);
                    matrixInterval = null;
                } else {
                    createMatrixEffect();
                }
                break;
            case 'circles':
                circles.forEach(circle => {
                    circle.style.animationPlayState = 
                        circle.style.animationPlayState === 'paused' ? 'running' : 'paused';
                });
                break;
            case 'new-riddle':
                currentRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
                displayRiddle();
                break;
            case 'hint':
                showHint();
                break;
        }
    });
});

// Random background color changes
setInterval(() => {
    document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 20%, 10%)`;
}, 3000);

// Enhanced mouse movement effects
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    
    // Update matrix opacity based on mouse position
    matrixOpacity = 0.1 + (x / 100) * 0.4;
    
    // Update matrix speed based on mouse position
    matrixSpeed = 20 + (y / 100) * 80;
    if (matrixInterval) {
        clearInterval(matrixInterval);
        createMatrixEffect();
    }
    
    // Enhanced circle movement
    circles.forEach(circle => {
        const speed = parseFloat(circle.dataset.speed);
        const moveX = (x - 50) * speed * 0.1;
        const moveY = (y - 50) * speed * 0.1;
        const rotate = (x + y) * speed * 0.1;
        circle.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
    });
});

// Random circle color changes
setInterval(() => {
    circles.forEach(circle => {
        circle.style.background = `radial-gradient(circle, 
            rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8) 0%, 
            rgba(255,255,255,0) 70%)`;
    });
}, 3000);

// Easter egg: Hidden message
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 7) {
        const message = document.createElement('div');
        message.className = 'hidden-message';
        message.textContent = 'You found the secret!';
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
        clickCount = 0;
    }
});

// Initialize the first riddle
displayRiddle(); 