import { onSnake, expandSnake } from './snake.js';
const foodMusic = new Audio('./music/food.mp3');
import { randomGridPosition } from './grid.js';

let food = randomGridPosition();
const EXPANSION_RATE = 1;
let score = 0;

let scoreElement = document.getElementById('score');
console.log(scoreElement);

export function update() {
    if (onSnake(food)) {
        score++;
        scoreElement.innerHTML ="Score: "+ score;
        foodMusic.play();
        
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }

}

export function draw(gameBoard) {
    
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);

}

function getRandomFoodPosition() {
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

export function getScore() {
    return score;
}



