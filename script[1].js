
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
};

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le serpent
    snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "green" : "lime";
        ctx.fillRect(s.x, s.y, box, box);
    });

    // Dessiner la nourriture
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Position de la tête du serpent
    let headX = snake[0].x;
    let headY = snake[0].y;

    // Mise à jour de la position de la tête
    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Vérifier la collision avec la nourriture
    if (headX === food.x && headY === food.y) {
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box,
        };
    } else {
        snake.pop();
    }

    // Ajouter la nouvelle position de la tête
    let newHead = { x: headX, y: headY };
    snake.unshift(newHead);

    // Vérifier les collisions avec les murs ou le corps
    if (
        headX < 0 || headY < 0 ||
        headX >= canvas.width || headY >= canvas.height ||
        snake.slice(1).some(s => s.x === headX && s.y === headY)
    ) {
        alert("Game Over!");
        snake = [{ x: 9 * box, y: 10 * box }];
        direction = "RIGHT";
    }
}

setInterval(draw, 100);
