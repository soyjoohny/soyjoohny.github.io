const boxes = document.querySelectorAll('.box');
const sequenceContainer = document.querySelector('.sequence-container');
const startButton = document.getElementById('startButton');
let sequence = []; // Armazena a sequência a ser seguida
let playerInput = []; // Armazena as escolhas do jogador
let gameStarted = false; // Controla o estado do jogo
let blinkInterval; // Armazena o intervalo da sequência

// Função para embaralhar a sequência
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
    }
}

// Função para fazer os botões brilharem na ordem correta
function blinkSequence() {
    let index = 0; // Índice para a sequência

    // Função para piscar os botões
    blinkInterval = setInterval(() => {
        // Se todas as sequências foram mostradas, para a animação
        if (index >= sequence.length) {
            clearInterval(blinkInterval);
            return;
        }

        // Identifica o botão correspondente na sequência
        const currentValue = sequence[index];
        const boxToBlink = [...boxes].find(box => box.dataset.value == currentValue);

        // Adiciona a classe de brilho ao botão
        boxToBlink.classList.add('blink');

        // Remove a classe de brilho após 500ms
        setTimeout(() => {
            boxToBlink.classList.remove('blink');
        }, 500);

        index++;
    }, 1000); // Tempo entre os pisca-pisca
}

// Função para ativar uma caixa
function activateBox() {
    if (!gameStarted) return; // Não ativa se o jogo não começou

    this.classList.add('active'); // Adiciona a classe 'active' à caixa
    playerInput.push(parseInt(this.dataset.value)); // Adiciona o valor à entrada do jogador

    // Verifica se a sequência está correta
    checkSequence();
}

// Função para verificar se a sequência do jogador está correta
function checkSequence() {
    const currentIndex = playerInput.length - 1; // Índice atual do jogador
    if (playerInput[currentIndex] !== sequence[currentIndex]) {
        alert('Você perdeu!');
        resetGame(); // Reseta o jogo
        return;
    }
    if (playerInput.length === sequence.length) {
        alert('Parabéns, você venceu!');
        resetGame(); // Reseta o jogo
    }
}

// Função para resetar o jogo
function resetGame() {
    clearInterval(blinkInterval); // Interrompe a sequência de piscar
    boxes.forEach(box => {
        box.classList.remove('active'); // Remove a classe 'active' de todas as caixas
    });
    playerInput = []; // Limpa a entrada do jogador
    gameStarted = false; // Reseta o estado do jogo
}

// Função para iniciar o jogo e iniciar a sequência de brilho
function startGame() {
    sequence = Array.from({ length: 9 }, (_, i) => i + 1); // Define a sequência de 1 a 9
    shuffle(sequence); // Embaralha a sequência
    blinkSequence(); // Inicia o brilho na sequência
    gameStarted = true; // Começa o jogo
}

// Adiciona evento de clique ao botão de iniciar
startButton.addEventListener('click', startGame);

// Adiciona evento de clique a cada caixa
boxes.forEach(box => {
    box.addEventListener('click', activateBox);
});
