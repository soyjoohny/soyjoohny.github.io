// Seleciona o elemento do jogador
const player = document.querySelector('.player');

// Seleciona o container dos obstáculos
const obstaclesContainer = document.querySelector('.axteroide');

// Seleciona todos os elementos de obstáculos
const obstacles = document.querySelectorAll('.asteroides');

// Seleciona o elemento da estrada
const road = document.querySelector('.fundo');

// Seleciona o elemento de exibição da pontuação
const scoreDisplay = document.querySelector('.pontos');

// Seleciona a tela de fim de jogo
const gameOverScreen = document.querySelector('.game-over');

// Seleciona a tela de início do jogo
const startScreen = document.querySelector('.telacomeço');

// Seleciona o botão de início do jogo
const startButton = document.querySelector('.botaoiniciar');

// Define a posição inicial do jogador
let playerX = 280;
let playerY = 720;

// Define as posições iniciais dos obstáculos
let obstaclePositions = [-80, -200, -320];

// Define a velocidade inicial dos obstáculos
let speed = 5;

// Variável para armazenar o intervalo de atualização do jogo
let gameInterval;

// Variável para armazenar a pontuação do jogador
let score = 0;

// Variáveis para controlar a suavidade do movimento
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

// Adiciona um evento de clique ao botão de início do jogo
startButton.addEventListener('click', startGame);

// Função para iniciar o jogo
function startGame() {
    localStorage.clear();
    
    startScreen.style.display = 'none';
    road.style.display = 'block';
    scoreDisplay.style.display = 'block';
    score = 0; 
    scoreDisplay.textContent = 'Pontos: ' + score; 
    document.addEventListener('keydown', startMove);
    document.addEventListener('keyup', stopMove);
    gameInterval = setInterval(updateGame, 20);
}

// Funções para controlar o movimento suave
function startMove(event) {
    if (event.key === 'ArrowLeft') moveLeft = true;
    if (event.key === 'ArrowRight') moveRight = true;
    if (event.key === 'ArrowUp') moveUp = true;
    if (event.key === 'ArrowDown') moveDown = true;
}

function stopMove(event) {
    if (event.key === 'ArrowLeft') moveLeft = false;
    if (event.key === 'ArrowRight') moveRight = false;
    if (event.key === 'ArrowUp') moveUp = false;
    if (event.key === 'ArrowDown') moveDown = false;
}

// Função para mover o jogador
function movePlayer() {
    if (moveLeft && playerX > 0) {
        playerX -= 5;
    }
    if (moveRight && playerX < (road.offsetWidth - player.offsetWidth)) {
        playerX += 5; 
    }
    if (moveUp && playerY > 0) {
        playerY -= 5; 
    }
    if (moveDown && playerY < 720) {
        playerY += 5; 
    }
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
}

// Função para atualizar o estado do jogo
function updateGame() {
    movePlayer(); 
    obstacles.forEach((obstacle, index) => {
        obstaclePositions[index] += speed;
        if (obstaclePositions[index] > 800) {
            obstaclePositions[index] = -80; 
            obstacle.style.left = Math.floor(Math.random() * (560 - obstacle.offsetWidth)) + 'px'; 
            score += 10; 
            scoreDisplay.textContent = 'Pontos: ' + score; 
            speed += 0.5; 
        }
        obstacle.style.top = obstaclePositions[index] + 'px'; 
        checkCollision(obstacle); 
    });
}


// Função para verificar a colisão entre o jogador e um obstáculo
function checkCollision(obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    if (
        playerRect.left < obstacleRect.left + obstacleRect.width &&
        playerRect.left + playerRect.width > obstacleRect.left &&
        playerRect.top < obstacleRect.top + obstacleRect.height &&
        playerRect.top + playerRect.height > obstacleRect.top
    ) {
        endGame();
    }
}

// Função para terminar o jogo
function endGame() {
    clearInterval(gameInterval);
    saveScore(score); 
    displayRanking(); 
    gameOverScreen.style.visibility = 'visible';
    gameOverScreen.style.opacity = 1;
    road.style.display = 'none';
    scoreDisplay.style.display = 'none';
}

// Seleciona o botão de reinício do jogo
const restartButton = document.querySelector('.botaorestart');

// Adiciona um evento de clique ao botão de reinício
restartButton.addEventListener('click', restartGame);

// Função para reiniciar o jogo
function restartGame() {
    playerX = 280; 
    playerY = 720; 
    obstaclePositions = [-80, -200, -320]; 
    speed = 5; 
    score = 0; 
    scoreDisplay.textContent = 'Pontos: ' + score; 
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    gameOverScreen.style.opacity = 0; 
    gameOverScreen.style.visibility = 'hidden'; 
    road.style.display = 'block'; 
    scoreDisplay.style.display = 'block'; 
    gameInterval = setInterval(updateGame, 20); 
    document.addEventListener('keydown', startMove); 
    document.addEventListener('keyup', stopMove); 
}


// Função para salvar a pontuação no ranking
function saveScore(score) {
    let ranking = JSON.parse(localStorage.getItem('rank')) || [];
    ranking.push({ score }); 
    ranking.sort((a, b) => b.score - a.score);
    ranking = ranking.slice(0, 5);
    localStorage.setItem('rank', JSON.stringify(ranking));
    return ranking;
}

// Função para exibir o ranking no fim do jogo
function displayRanking() {
    const rankingList = document.querySelector('.ranklistinha');
    rankingList.innerHTML = ''; 
    const ranking = JSON.parse(localStorage.getItem('rank')) || [];
    ranking.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. Pontos: ${entry.score}`; 
        rankingList.appendChild(listItem);
    });
}

// Seleciona o botão de voltar ao início
const inicioButton = document.querySelector('.botaoinicio');

// Função do botão voltar ao ínicio
function voltarInicio() {
    localStorage.clear(); 
    playerX = 280; 
    playerY = 720; 
    score = 0; 
    obstaclePositions = [-80, -200, -320]; 
    speed = 5; 
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    gameOverScreen.style.opacity = 0;
    gameOverScreen.style.visibility = 'hidden';
    road.style.display = 'none';
    scoreDisplay.style.display = 'none';
    startScreen.style.display = 'flex';
    scoreDisplay.textContent = 'Pontos: ' + score; 
}

inicioButton.addEventListener('click', voltarInicio);
