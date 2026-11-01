// 1. Objeto global que guarda o estado atual do carrinho (começa zerado)
const carrinho = {
    'combo-pipoca-p': { nome: 'Combo Pipoca P', precoTexto: 'R$ 20,00', valor: 20.00, quantidade: 0 },
    'combo-pipoca-m': { nome: 'Combo Pipoca M', precoTexto: 'R$ 25,00', valor: 25.00, quantidade: 0 },
    'combo-pipoca-g': { nome: 'Combo Família', precoTexto: 'R$ 35,00', valor: 35.00, quantidade: 0 }
};

let comboAberto = null;
let quantidadeNova = 0;

const QUANTIDADE_MAXIMA = 10;

const modal = document.getElementById('modal');

const modalNome = document.getElementById('modal-nome');
const modalPreco = document.getElementById('modal-preco');
const modalAtual = document.getElementById('modal-atual');
const modalQtd = document.getElementById('modal-qtd');
const modalSubtotal = document.getElementById('modal-subtotal');
const modalTotal = document.getElementById('modal-total');

// 2. Função que renderiza e atualiza os elementos na tela
function atualizarInterfaceDoCarrinho() {
    const carrinhoElement = document.getElementById('carrinho-combos');
    let totalGeral = 0;
    let totalItens = 0;

    // Se houver uma área para listar os itens do carrinho, limpamos ela primeiro
    if (carrinhoElement) {
        carrinhoElement.innerHTML = '';
    }

    // Varre nosso objeto carrinho para calcular valores e renderizar os textos
    for (const id in carrinho) {
        const item = carrinho[id];

        if (item.quantidade > 0) {
            totalItens += item.quantidade;
            totalGeral += item.valor * item.quantidade;

            // Se o elemento do carrinho existir na tela, injeta o item formatado: "Nome - Preço (xQtd)"
            if (carrinhoElement) {
                const comboElement = document.createElement('div');
                comboElement.textContent = `${item.nome} - ${item.precoTexto} (x${item.quantidade})`;
                carrinhoElement.appendChild(comboElement);
            }
        }
    }

    const totalFormatado = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;

    // Atualiza o ID do total (caso use)
    const totalElement = document.getElementById('total-combos');
    if (totalElement) {
        totalElement.textContent = `Total: ${totalFormatado}`;
    }

    // Atualiza o texto dinâmico dentro do rodapé
    const resumoRodape = document.getElementById('resumo-rodape');
    if (resumoRodape) {
        // Exemplo aplicando no formato do seu carrinho:

        resumoRodape.innerHTML = `Itens: ${totalItens} <br> Total = ${totalFormatado}`;
    }
}

function calcularTotalGeral() {
    let total = 0;

    for (const id in carrinho) {
        const item = carrinho[id];

        total += item.valor * item.quantidade;
    }

    return total;
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function atualizarModal() {

    const item = carrinho[comboAberto];

    const subtotal = item.valor * quantidadeNova;

    const totalPrevisto =
        calcularTotalGeral() -
        (item.valor * item.quantidade) +
        subtotal;

    modalNome.textContent = item.nome;
    modalPreco.textContent = item.precoTexto;
    modalAtual.textContent = item.quantidade;
    modalQtd.textContent = quantidadeNova;

    modalSubtotal.textContent = formatarPreco(subtotal);
    modalTotal.textContent = formatarPreco(totalPrevisto);
}

function abrirModal(id) {
    comboAberto = id;
    quantidadeNova = carrinho[id].quantidade; // começa com a quantidade já escolhida
    atualizarModal();
    modal.classList.add('aberto');
}

function fecharModal() {
    modal.classList.remove('aberto');
}

function configurarModal() {
    document.getElementById('btn-mais').addEventListener('click', () => {
        if (quantidadeNova < QUANTIDADE_MAXIMA) {
            quantidadeNova += 1;
            atualizarModal();
        }
    });

    document.getElementById('btn-menos').addEventListener('click', () => {
        if (quantidadeNova > 0) {
            quantidadeNova -= 1;
            atualizarModal();
        }
    });

    // Confirmar: salva a quantidade no carrinho e atualiza a tela
    document.getElementById('modal-confirmar').addEventListener('click', () => {
        carrinho[comboAberto].quantidade = quantidadeNova;
        atualizarInterfaceDoCarrinho();
        fecharModal();
    });

    document.getElementById('modal-cancelar').addEventListener('click', fecharModal);

    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            fecharModal();
        }
    });
}

// Clique em cada card abre o modal
function configurarCliquesDosCards() {

    const IDsDosCards = [
        'combo-pipoca-p',
        'combo-pipoca-m',
        'combo-pipoca-g'
    ];

    IDsDosCards.forEach(id => {

        const card = document.getElementById(id);

        if (card) {
            card.addEventListener('click', () => {
                abrirModal(id);
            });
        }

    });
}

// Inicializa o sistema ao carregar a página

function carregarAssentos() {
    
    const dadosSalvos = localStorage.getItem('assentosSelecionados');
    
    const assentos = dadosSalvos
    ? JSON.parse(dadosSalvos)
    : [];
    
    const elementoAssentos = document.getElementById('assentos-pedido');
    
    if (elementoAssentos) {
        elementoAssentos.textContent = 'Assentos: ' +
        (assentos.length > 0 ? assentos.join(', ') : 'Nenhum');
    }
}

// Inicializa o sistema ao carregar a página
document.addEventListener('DOMContentLoaded', function () {

    configurarModal();

    configurarCliquesDosCards();

    carregarAssentos();

});