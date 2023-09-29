import { SNAKE_SPEED, update as updateSnake, draw as drawSnake  , getSnakeHead ,snakeIntersection} from './snake.js';
import { update as foodUpdate, draw as foodDraw ,getScore } from './food.js';
import { outsideGrid } from './grid.js';


console.log(getScore);

const gameOverMusic = new Audio('./music/gameover.mp3');

let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');
let gameOver = false;
 
function game(currentTime) {
    
    if (gameOver) {
        gameOverMusic.play();
        let res = confirm('You lost. Press ok to restart.');
        console.log(res);
        if (res) {
            // window.location = '/SnakeGame/';
            window.location.reload();
        }
        return;
    }
    
    window.requestAnimationFrame(game);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    // console.log(secondsSinceLastRender);
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;

    //update loop which can only update the game state not drwaing anything
    update();
    
    // draw loop which can only draw the game state not updating anything
    draw();
}
window.requestAnimationFrame(game);



// Update function
function update() {
    gameBoard.innerHTML = '';
    updateSnake();
    foodUpdate();
    checkDeath();
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

// Draw function
function draw() {
    drawSnake(gameBoard);
    foodDraw(gameBoard);
}

