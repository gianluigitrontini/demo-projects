var isPlaying = false;

var startReset = document.querySelector("#start-btn"),
    timeBox = document.querySelector("#time-left"),
    timer = document.querySelector("#time-left > p > span"),
    gameOver = document.querySelector("#gameover"),
    closeGameOver = document.querySelector("#gameover > button"),
    scoreText = document.querySelector("#scorevalue"),
    finalScoreText = document.querySelector("#gameover > p:nth-child(3) > span"),
    question = document.querySelector("#question>h1"),
    secondsLeft = 59,
    score = 0,
    correctAnswer;


startReset.addEventListener("click", function () {
    if (isPlaying) {
        location.reload(false);
    } else {
        startReset.textContent = 'Reset Game';
        startReset.style.background = 'rgb(255, 0, 64)';
        startGame();
    }
});

function checkTimer() {
    var myTime = setInterval(function () {
        timer.innerHTML = secondsLeft;
        secondsLeft--;
        if (secondsLeft < 0) {
            clearInterval(myTime);
            gameOver.style.display = 'flex';
            setInterval(function () {
                gameOver.style.opacity = 1;
                gameOver.style.transition = 'opacity 1s';
            }, 1);
            closeGameOver.addEventListener("click", function () {
                gameOver.style.display = 'none';
            });
        }
    }, 1000);
};

function showCorrect() {
    document.querySelector("#correct").style.opacity = "1";
    setTimeout(function () {
        document.querySelector("#correct").style.opacity = '0';
    }, 500);
}

function showWrong() {
    document.querySelector("#wrong").style.opacity = "1";
    setTimeout(function () {
        document.querySelector("#wrong").style.opacity = '0';
    }, 500);
}

function randomQA() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    question.textContent = num1 + "x" + num2;
    correctAnswer = num1 * num2;
    var correctPosition = 1 + Math.round(Math.random() * 3);
    document.getElementById("answer" + correctPosition).innerHTML = correctAnswer;
    var correctBox = 'answer' + correctPosition;

    var answers = [correctAnswer]
    for (i = 1; i < 5; i++) {
        if (i !== correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (Math.floor(Math.random() * 10)) * (Math.floor(Math.random() * 10));
            } while (answers.indexOf(wrongAnswer) > -1)

            document.getElementById("answer" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

function checkAnswer() {
    if (isPlaying) {
        if (this.innerHTML == correctAnswer) {
            score++;
            showCorrect();
            updateScore();
            randomQA();
        } else {
            if (score > 0) {
                score--;
                showWrong();
                updateScore();
                randomQA();
            } else {
                showWrong();
                randomQA();
            }
        }
    }
}

function goOn() {
    document.querySelector("#answer1").addEventListener("click", checkAnswer);
    document.querySelector("#answer2").addEventListener("click", checkAnswer);
    document.querySelector("#answer3").addEventListener("click", checkAnswer);
    document.querySelector("#answer4").addEventListener("click", checkAnswer);
}

function updateScore() {
    scoreText.textContent = score;
    finalScoreText.textContent = score;
}

function startGame() {
    isPlaying = true;
    score = 0;
    timeBox.style.display = 'flex';
    checkTimer();
    randomQA();
    goOn();
}