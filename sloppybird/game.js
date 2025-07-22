const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// Load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "bird.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";

const gap = 85;
let constant;

let birdX = 10;
let birdY = 150;
const gravity = 1.5;

document.addEventListener("keydown", moveUp);

function moveUp() {
    birdY -= 25;
}

// Pipes
const pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};

let score = 0;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detect collision
        if (
            birdX + bird.width >= pipe[i].x &&
            birdX <= pipe[i].x + pipeNorth.width &&
            (birdY <= pipe[i].y + pipeNorth.height ||
                birdY + bird.height >= pipe[i].y + constant) ||
            birdY + bird.height >= cvs.height - fg.height
        ) {
            location.reload(); // reload the page
        }

        if (pipe[i].x === 5) {
            score++;
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, birdX, birdY);

    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

draw();
