let snake: number[][] = []
let dirX = 1
let dirY = 0
let foodX = 0
let foodY = 0
let score = 0
let gameOver = false
let speed = 500

// 🐍 INIT SNAKE
snake = [[2, 2], [1, 2], [0, 2]]

// 🍎 SPAWN FOOD (safe spawn)
function spawnFood() {
    while (true) {
        foodX = randint(0, 4)
        foodY = randint(0, 4)

        let ok = true
        for (let i = 0; i < snake.length; i++) {
            if (snake[i][0] == foodX && snake[i][1] == foodY) {
                ok = false
            }
        }

        if (ok) break
    }
}

// 🎮 INPUT CONTROL
input.onButtonPressed(Button.A, function () {
    // left turn
    if (dirX == 1) { dirX = 0; dirY = -1 }
    else if (dirY == -1) { dirX = -1; dirY = 0 }
    else if (dirX == -1) { dirX = 0; dirY = 1 }
    else if (dirY == 1) { dirX = 1; dirY = 0 }
})

input.onButtonPressed(Button.B, function () {
    // right turn
    if (dirX == 1) { dirX = 0; dirY = 1 }
    else if (dirY == 1) { dirX = -1; dirY = 0 }
    else if (dirX == -1) { dirX = 0; dirY = -1 }
    else if (dirY == -1) { dirX = 1; dirY = 0 }
})

// 🔁 GAME UPDATE LOOP
basic.forever(function () {
    if (gameOver) return

    let headX = snake[0][0] + dirX
    let headY = snake[0][1] + dirY

    // 💀 WALL COLLISION
    if (headX < 0 || headX > 4 || headY < 0 || headY > 4) {
        endGame()
        return
    }

    // 💀 SELF COLLISION
    for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] == headX && snake[i][1] == headY) {
            endGame()
            return
        }
    }

    // ➕ MOVE SNAKE
    snake.unshift([headX, headY])

    // 🍎 EAT FOOD
    if (headX == foodX && headY == foodY) {
        score++
        speed = Math.max(150, speed - 20) // 🔥 gets faster
        spawnFood()
    } else {
        snake.pop()
    }

    draw()

    basic.pause(speed)
})

// 🖼 RENDER SYSTEM
function draw() {
    basic.clearScreen()

    // draw snake
    for (let i = 0; i < snake.length; i++) {
        led.plot(snake[i][0], snake[i][1])
    }

    // draw food
    led.plotBrightness(foodX, foodY, 255)
}

// 💀 GAME OVER
function endGame() {
    gameOver = true
    basic.clearScreen()
    basic.showString("SCORE")
    basic.showNumber(score)
    basic.showIcon(IconNames.Skull)
}

// 🚀 START GAME
spawnFood()
draw()