// Declaração de variáveis para o jogo
const boxes = document.querySelectorAll('.box');
const sequenceContainer = document.querySelector('.sequence-container');
const startButton = document.getElementById('startButton');
let sequence = []; 
let playerInput = []; 
let gameStarted = false; 
let blinkInterval; 

// Função para embaralhar a sequência
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

// Função para fazer os botões brilharem na ordem correta
function blinkSequence() {
    let index = 0; 

    // Função para piscar os botões
    blinkInterval = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(blinkInterval);
            return;
        }
        const currentValue = sequence[index];
        const boxToBlink = [...boxes].find(box => box.dataset.value == currentValue);
        boxToBlink.classList.add('blink');
        setTimeout(() => {
            boxToBlink.classList.remove('blink');
        }, 500);

        index++;
    }, 1000); 
}

// Função para ativar uma caixa
function activateBox() {
    if (!gameStarted) return; 

    this.classList.add('active'); 
    playerInput.push(parseInt(this.dataset.value)); 
    checkSequence();
}

// Função para verificar se a sequência do jogador está correta
function checkSequence() {
    const currentIndex = playerInput.length - 1; 
    if (playerInput[currentIndex] !== sequence[currentIndex]) {
        alert('Você perdeu!');
        resetGame(); 
        return;
    }
    if (playerInput.length === sequence.length) {
        alert('Parabéns, você venceu!');
        resetGame(); 
    }
}

// Função para resetar o jogo
function resetGame() {
    clearInterval(blinkInterval); 
    boxes.forEach(box => {
        box.classList.remove('active'); 
    });
    playerInput = []; 
    gameStarted = false; 
}

// Função para iniciar o jogo e iniciar a sequência de brilho
function startGame() {
    sequence = Array.from({ length: 9 }, (_, i) => i + 1); 
    shuffle(sequence); 
    blinkSequence(); 
    gameStarted = true; 
}

// Adiciona evento de clique ao botão de iniciar
startButton.addEventListener('click', startGame);

// Adiciona evento de clique a cada caixa
boxes.forEach(box => {
    box.addEventListener('click', activateBox);
});
