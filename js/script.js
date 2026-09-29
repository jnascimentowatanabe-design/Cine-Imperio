// Selecionamos o container onde as colunas de assentos vão entrar
let seatsContainer = document.getElementById('seats-container');
// Limpa o texto "Fila A" padrão que estava escrito no HTML para não bugar o layout
seatsContainer.textContent = ''; 

// String com as colunas de A até R
const letrasColunas = "ABCDEFGHIJKLMNO";

const assentosParaApagar = [
  "A10", "A11", "A12", "A13",
  "B10", "B11", "B12", "B13",
  "C10", "C11", "C12", "C13",
  "M10", "M11", "M12", "M13",
  "N10", "N11", "N12", "N13",
  "O10", "O11", "O12", "O13"
];

// Loop principal que cria cada COLUNA de letra
for (let c = 0; c < letrasColunas.length; c++) {
    let letraAtual = letrasColunas[c];

    // Cria uma div para ser a coluna da letra atual
    let colunaDiv = document.createElement('div');
    colunaDiv.classList.add('row-of-seats'); // Aplica o estilo de coluna vertical do CSS

    if (letraAtual === 'C' || letraAtual === 'L') {
        colunaDiv.style.marginRight = '40px'; // Ajuste os '40px' para o tamanho de corredor que desejar
    }

    // Loop interno que cria os assentos de 1 a 13 para essa coluna
    for (let i = 1; i <= 13; i++) {
        let seat = document.createElement('button');
        seat.setAttribute('type', 'button');
        
        // Nomeia o assento (Ex: A1, B1, C1...)
        let nomeAssento = letraAtual + i;
        seat.textContent = nomeAssento; 

        if (assentosParaApagar.includes(nomeAssento)) {
            seat.classList.add('assento-apagado'); // Aplica o estilo invisível
        }
        
        // Coloca o botão dentro da coluna da letra
        colunaDiv.appendChild(seat);
    }

    // Coloca a coluna completa dentro do container principal (elas vão alinhar lado a lado)
    seatsContainer.appendChild(colunaDiv);
}

const assentos = document.querySelectorAll('.content-seats button');

assentos.forEach(assento => {
  assento.addEventListener('click', function() {
    this.classList.toggle('selecionado');
  });
});
/---------------------Botão de início----------------------/

const botao = document.getElementById('meuBotao');

botao.addEventListener('click', function() {
    window.location.href = "index.html";
});


const blocos = ["ABC", "DEFGHIJKL", "MNO"];

blocos.forEach(letras => {
    let blocoDiv = document.createElement('div');
    blocoDiv.classList.add('bloco');

    for (let c = 0; c < letras.length; c++) {
        let colunaDiv = document.createElement('div');
        colunaDiv.classList.add('row-of-seats');

        blocoDiv.appendChild(colunaDiv);
    }
    seatsContainer.appendChild(blocoDiv);
});