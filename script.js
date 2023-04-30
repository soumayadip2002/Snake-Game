const gameBoard = document.querySelector("#gameboard");
const ctx = gameBoard.getContext("2d");

const scoreText = document.querySelector('#score');
const reset_btn = document.querySelector('#reset');

const game_width = gameBoard.width;
const game_height = gameBoard.height;

const boardBackground = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let Match_Score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },

];

window.addEventListener("keydown", changeDirection);
reset_btn.addEventListener("click", resetGame);

gameStart();


function gameStart() {
    running = true;
    scoreText.textContent = `Score: ${Match_Score}`;
    createFood();
    drawFood();
    nextTick();
};

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
        }, 100);
    } else {
        displayGameover();
    }
};

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, game_width, game_height);
};

function createFood() {
    function randomFood(min, max) {
        const random = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return random;
    }

    foodX = randomFood(0, game_width - unitSize);
    foodY = randomFood(0, game_width - unitSize);
};

function drawFood() {
    ctx.fillStyle = "red";

    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    snake.unshift(head);

    if (snake[0].x == foodX && snake[0].y == foodY) {
        Match_Score += 1;
        scoreText.textContent = `Score: ${Match_Score}`;
        createFood();
    } else {
        snake.pop();
    }
};

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    snake.forEach(snakepart => {
        ctx.fillRect(snakepart.x, snakepart.y, unitSize, unitSize);
        ctx.strokeRect(snakepart.x, snakepart.y, unitSize, unitSize);
    })
};

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const Left = 37;
    const Up = 38;
    const Right = 39;
    const Down = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);


    switch (true) {
        case (keyPressed == Left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == Up && !goingDown):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;

        case (keyPressed == Right && !goingLeft):
            yVelocity = 0;
            xVelocity = unitSize;
            break;

        case (keyPressed == Down && !goingUp):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
    }
};

function checkGameover() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= game_width):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= game_height):
            running = false;
            break;
    }

    for (let i = 1; i < snake.length; i++) {
        if ((snake[i].x == snake[0].x) && (snake[i].y == snake[0].y)) {
            running = false;
        }
    }
};

function displayGameover() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over 🙁", game_width / 2, game_height / 2);
    running = false;
};

function resetGame() {
    Match_Score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 },

    ];

    gameStart();
};