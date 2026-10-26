// ==========================================
// CONSTANTES E CONFIGURAÇÕES DE LAYOUT
// ==========================================
const TOTAL_ASSENTOS_POR_COLUNA = 13;
const COLUNAS_SALA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

// Uso de Set para busca rápida O(1) de assentos desativados/invisíveis
const ASSENTOS_INVISIVEIS = new Set([
  "A10", "A11", "A12", "A13",
  "B10", "B11", "B12", "B13",
  "C10", "C11", "C12", "C13",
  "M10", "M11", "M12", "M13",
  "N10", "N11", "N12", "N13",
  "O10", "O11", "O12", "O13"
]);

// Colunas após as quais deve haver um espaço de corredor (ex: C e L)
const COLUNAS_COM_CORREDOR = new Set(['C', 'L']);

// Array global para guardar os assentos selecionados pelo usuário
let assentosSelecionados = [];

// Base de dados dos filmes
const FILMES_DATABASE = {
  1: {
    titulo: "Vingadores: Doomsday",
    poster: "caminho/para/doomsday.jpg",
    sinopse: "Os heróis se reúnem para enfrentar a maior ameaça do universo no novo capítulo da saga."
  }
};

// ==========================================
// FUNÇÕES DE GERENCIAMENTO DO FILME E ASSENTOS
// ==========================================

/**
 * Carrega as informações do filme nos elementos correspondentes no HTML.
 */
function carregarFilme(idFilme) {
  const filme = FILMES_DATABASE[idFilme];
  if (!filme) return; /*Guard Clause*/

  const elementoTitulo = document.getElementById('movie-title');
  const elementoSinopse = document.getElementById('movie-synopsis');
  const elementoPoster = document.getElementById('movie-poster');

  if (elementoTitulo) elementoTitulo.textContent = filme.titulo;
  if (elementoSinopse) elementoSinopse.textContent = filme.sinopse;
  if (elementoPoster) {
    elementoPoster.src = filme.poster; 
    elementoPoster.alt = filme.titulo; 
  }
}

/**
 * Atualiza o texto que exibe os assentos selecionados na tela.
 */
function atualizarDisplayAssentos() {
  const elementoDisplay = document.getElementById('selected-seats');
  if (!elementoDisplay) return; 

  if (assentosSelecionados.length === 0) { 
    elementoDisplay.textContent = "Nenhum assento selecionado";
  } else {
    
    elementoDisplay.textContent = assentosSelecionados.slice().sort().join(', '); 
  }
}

/**
 * Alterna a seleção de um assento (adiciona ou remove do array).
 */
function alternarSelecaoAssento(assentoButton) {
  const codigoAssento = assentoButton.textContent;
  
  // Ignora se for um assento invisível
  if (ASSENTOS_INVISIVEIS.has(codigoAssento)) return; 

  assentoButton.classList.toggle('selecionado'); 

  if (assentoButton.classList.contains('selecionado')) {
    assentosSelecionados.push(codigoAssento);
  } else {
    assentosSelecionados = assentosSelecionados.filter(codigo => codigo !== codigoAssento);
  }

  atualizarDisplayAssentos();
}

// ==========================================
// FUNÇÕES AUXILIARES DE CRIAÇÃO (DOM)
// ==========================================

/**
 * Cria um elemento de botão representando um assento individual.
 */
function criarAssento(codigoAssento) {
  const seatButton = document.createElement('button');
  seatButton.type = 'button';
  seatButton.textContent = codigoAssento;

  if (ASSENTOS_INVISIVEIS.has(codigoAssento)) {
    seatButton.classList.add('assento-apagado');
  } else {
    seatButton.addEventListener('click', function () {
      alternarSelecaoAssento(this);
    });
  }

  return seatButton;
}

/**
 * Cria uma coluna vertical com 13 assentos para a letra informada.
 */
function criarColunaAssentos(letraColuna) {
  const colunaDiv = document.createElement('div');
  colunaDiv.classList.add('row-of-seats');

  if (COLUNAS_COM_CORREDOR.has(letraColuna)) {
    colunaDiv.style.marginRight = '40px';
  }

  for (let numero = 1; numero <= TOTAL_ASSENTOS_POR_COLUNA; numero++) {
    const codigoAssento = `${letraColuna}${numero}`;
    const assentoElement = criarAssento(codigoAssento);
    colunaDiv.appendChild(assentoElement);
  }

  return colunaDiv;
}

/**
 * Renderiza todo o mapa de assentos dentro do container principal.
 */
function renderizarMapaAssentos(container) {
  container.textContent = ''; 

  COLUNAS_SALA.forEach(letra => {
    const colunaDiv = criarColunaAssentos(letra);
    container.appendChild(colunaDiv);
  });
}



// ==========================================
// EXECUÇÃO PRINCIPAL
// ==========================================
const seatsContainer = document.getElementById('seats-container');

if (seatsContainer) {
  renderizarMapaAssentos(seatsContainer);
}

// Inicializações da página
carregarFilme(1); // Carrega o filme inicial
atualizarDisplayAssentos(); // Exibe "Nenhum assento selecionado" inicialmente