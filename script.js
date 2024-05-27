document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById('gameArea');
    const startBtn = document.getElementById('startBtn');
    const difficultySelect = document.getElementById('difficultySelect');
    const colorSelect = document.getElementById('colorSelect');
    const header = document.getElementById('header');
    const menu = document.getElementById('menu');
    let score = 0;
    let timer;
    let timeLeft;
    function startGame() {
        const selectedDifficulty = difficultySelect.value;
        const selectedColor = colorSelect.value;
        if (selectedDifficulty === '' || selectedColor === '') {
            alert('Please select difficulty and color before starting the game.');
            return;
        }
        if (timeLeft <= 0) {
            score = 0;
        }
        timeLeft = getTimeLimit(selectedDifficulty);
        updateScoreDisplay();
        updateTimerDisplay();

        gameArea.innerHTML = '';
        generateSquare(selectedColor);

     
        timer = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }
    
    function generateSquare(color) {
        const squareSize = getSquareSize();
        const margin = getMargin();

        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = squareSize + 'px';
        square.style.height = squareSize + 'px';
        square.style.backgroundColor = color;
        square.style.top = Math.random() * (gameArea.clientHeight - squareSize) + 'px';
        square.style.left = Math.random() * (gameArea.clientWidth - squareSize) + 'px';

        square.addEventListener('click', function() {
            score++;
            updateScoreDisplay();
            timeLeft = getTimeLimit(difficultySelect.value);
            updateTimerDisplay(); 
            gameArea.removeChild(square);
            generateSquare(color);
        });

        gameArea.appendChild(square);
    }

    function updateScoreDisplay() {
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = 'Score: ' + score;
    }

    function updateTimerDisplay() {
        const timeLeftDisplay = document.getElementById('timeLeftDisplay');
        timeLeftDisplay.textContent = 'Time: ' + timeLeft + 's';
    }
    function endGame() {
        clearInterval(timer);
        alert('Game over! Your score: ' + score);
    }
    function getSquareSize() {
        const selectedDifficulty = difficultySelect.value;
        if (selectedDifficulty === 'easy') {
            return 60;
        } 
        if (selectedDifficulty === 'medium') {
            return 50;
        } 
        else if (selectedDifficulty === 'hard') {
            return 40;
        } else {
            return 30;
        }
    }
    function getMargin() {
        return 10;
    }
    function getTimeLimit(difficulty) {
        if (difficulty === 'easy') {
            return 4;
        } 
        if (difficulty === 'medium') {
            return 4;
        }
        else if (difficulty === 'hard') {
            return 2;
        } else {
            return 0;
        }
    }
    startBtn.addEventListener('click', startGame);
});
