// Evento que aguarda o carregamento total do DOM antes de adicionar interações
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os links de âncora que começam com "#" e adiciona uma função de rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        
        // Adiciona um evento de clique para fazer a rolagem suave ao destino
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Evita o comportamento padrão de pular diretamente para a âncora
            
            // Realiza a rolagem suave até a seção correspondente
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // Define a rolagem suave como comportamento
            });
        });
    });
});

// Função para abrir o link do jogo ao clicar em qualquer parte do item
document.querySelectorAll('.game-item-1, .game-item-2, .game-item-3').forEach(item => {
    
    // Adiciona um evento de clique para cada item de jogo
    item.addEventListener('click', function() {
        
        // Seleciona o link do jogo correspondente ao item clicado
        const gameLink = this.querySelector('a').getAttribute('href');
        
        // Redireciona o usuário para o link do jogo na mesma guia
        window.location.href = gameLink; // Garante que o jogo abra na mesma guia
    });
});
