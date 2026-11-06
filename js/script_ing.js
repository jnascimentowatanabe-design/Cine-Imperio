// 1. Objeto global que guarda o estado atual do carrinho (começa zerado)
const carrinho = {
    'combo-pipoca-p': { nome: 'Combo Pipoca P', precoTexto: 'R$ 20,00', valor: 20.00, quantidade: 0 },
    'combo-pipoca-m': { nome: 'Combo Pipoca M', precoTexto: 'R$ 25,00', valor: 25.00, quantidade: 0 },
    'combo-pipoca-g': { nome: 'Combo Família', precoTexto: 'R$ 35,00', valor: 35.00, quantidade: 0 },
    'pipoca-pequena': { nome: 'Pipoca Pequena', precoTexto: 'R$ 10,00', valor: 10.00, quantidade: 0 },
    'pipoca-media': { nome: 'Pipoca Média', precoTexto: 'R$ 13,00', valor: 13.00, quantidade: 0 },
    'pipoca-grande': { nome: 'Pipoca Grande', precoTexto: 'R$ 15,00', valor: 15.00, quantidade: 0 },
    'refrigerante': { nome: 'Refrigerante', precoTexto: 'R$ 5,00', valor: 5.00, quantidade: 0 },
    'suco': { nome: 'Suco', precoTexto: 'R$ 5,00', valor: 5.00, quantidade: 0 },
    'chocolate': { nome: 'Chocolate', precoTexto: 'R$ 5,00', valor: 5.00, quantidade: 0 }
};

let comboAberto = null;
let quantidadeNova = 0;

const QUANTIDADE_MAXIMA = 10;

const modal = document.getElementById('modal');

const modalNome = document.getElementById('modal-nome');
const modalProdutoImagem = document.getElementById('modal-produto-imagem');
const modalPreco = document.getElementById('modal-preco');
const modalAtual = document.getElementById('modal-atual');
const modalQtd = document.getElementById('modal-qtd');
const modalSubtotal = document.getElementById('modal-subtotal');
const modalTotal = document.getElementById('modal-total');
const PRECO_INGRESSO = 20;

const FILMES_DATABASE = {
    1: {
        titulo: "A paixão de Cristo",
        poster: "img/Paixão de Cristo Vertical.jpg"
    },
    2: {
        titulo: "Interstellar",
        poster: "img/Interestellar-vertical.jpg"
    },
    3: {
        titulo: "Crônicas de Nárnia: O sobrinho do Mago",
        poster: "img/cartaz vertical cronicas de narnia.jpg"
    },
    4: {
        titulo: "Vingadores: Doomsday",
        poster: "img/Cartaz Doom.jpg"
    },
    5: {
        titulo: "Resident Evil: O Capítulo Final",
        poster: "img/resident-evil-cartaz-vertical.jpg"
    }
};

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

    const dadosSalvos = localStorage.getItem('assentosSelecionados');
    const quantidadeAssentos = dadosSalvos ? JSON.parse(dadosSalvos).length : 0;
    const totalIngressos = quantidadeAssentos * PRECO_INGRESSO;
    const totalPedido = totalIngressos + totalGeral;
    const totalFormatado = formatarPreco(totalPedido);

    // Atualiza o ID do total (caso use)
    const totalElement = document.getElementById('total-combos');
    if (totalElement) {
        totalElement.textContent = `Total: ${totalFormatado}`;
    }

    // Atualiza o texto dinâmico dentro do rodapé
    const resumoRodape = document.getElementById('resumo-rodape');
    if (resumoRodape) {
        resumoRodape.innerHTML =
            `Ingressos: ${quantidadeAssentos} x ${formatarPreco(PRECO_INGRESSO)}<br>` +
            `Combos: ${totalItens}<br> Total = ${totalFormatado}`;
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
    const card = document.getElementById(id);
    const imagemProduto = card ? card.querySelector('img') : null;

    if (imagemProduto) {
        modalProdutoImagem.src = imagemProduto.src;
        modalProdutoImagem.alt = `Imagem de ${carrinho[id].nome}`;
    }

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
        'combo-pipoca-g',
        'pipoca-pequena',
        'pipoca-media',
        'pipoca-grande',
        'refrigerante',
        'suco',
        'chocolate'
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

    atualizarInterfaceDoCarrinho();
}

function carregarDadosDaSessao() {
    const elementoHorario = document.getElementById('horario-pedido');
    const elementoData = document.getElementById('data-pedido');
    const horario = localStorage.getItem('horarioSessao');
    const dataArmazenada = localStorage.getItem('dataSessao');

    if (elementoHorario && horario) {
        elementoHorario.textContent = 'Horário: ' + horario;
    }

    if (elementoData && dataArmazenada) {
        const [ano, mes, dia] = dataArmazenada.split('-').map(Number);
        const data = new Date(ano, mes - 1, dia);
        const dataFormatada = data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        elementoData.textContent = 'Dia: ' + dataFormatada;
    }
}

function finalizarCompra() {
    const dadosSelecionados = localStorage.getItem('assentosSelecionados');
    const assentosDaCompra = dadosSelecionados
        ? JSON.parse(dadosSelecionados)
        : [];
    const dadosOcupados = localStorage.getItem('assentosOcupados');
    const assentosOcupados = dadosOcupados
        ? JSON.parse(dadosOcupados)
        : [];
    const todosAssentosOcupados = new Set([
        ...assentosOcupados,
        ...assentosDaCompra
    ]);

    localStorage.setItem(
        'assentosOcupados',
        JSON.stringify([...todosAssentosOcupados])
    );
    localStorage.setItem('assentosSelecionados', JSON.stringify([]));

    const email = document.getElementById('email_usuario').value;
    document.getElementById('email-compra-finalizada').textContent = email;
    document.getElementById('modal-compra-finalizada').classList.add('aberto');
}

function confirmarCompra() {
    const formulario = document.querySelector('.dados-do-pagamento');
    const campoEmail = document.getElementById('email_usuario');

    if (!formulario || !campoEmail) {
        return;
    }

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    document.getElementById('email-para-confirmar').textContent = campoEmail.value;
    document.getElementById('modal-confirmacao-email').classList.add('aberto');
}

function configurarModaisDeCompra() {
    const modalConfirmacao = document.getElementById('modal-confirmacao-email');
    const modalFinalizada = document.getElementById('modal-compra-finalizada');

    document.getElementById('confirmar-email').addEventListener('click', () => {
        modalConfirmacao.classList.remove('aberto');
        finalizarCompra();
    });

    document.getElementById('cancelar-email').addEventListener('click', () => {
        modalConfirmacao.classList.remove('aberto');
    });

    document.getElementById('fechar-compra-finalizada').addEventListener('click', () => {
        modalFinalizada.classList.remove('aberto');
        window.location.href = 'index.html';
    });

    [modalConfirmacao, modalFinalizada].forEach(modal => {
        modal.addEventListener('click', evento => {
            if (evento.target === modal) {
                modal.classList.remove('aberto');
            }
        });
    });
}

function configurarFinalizacaoCompra() {
    const formulario = document.querySelector('.dados-do-pagamento');
    const botaoFinalizar = document.getElementById('finalizar-compra');
    const botoesMetodo = document.querySelectorAll('.metodo');
    let metodoSelecionado = null;

    if (!formulario || !botaoFinalizar) {
        return;
    }

    const atualizarEstadoBotao = () => {
        botaoFinalizar.disabled = !formulario.checkValidity() || metodoSelecionado === null;
    };

    botoesMetodo.forEach(botao => {
        botao.addEventListener('click', () => {
            metodoSelecionado = botao.id;
            botoesMetodo.forEach(item => item.classList.remove('selecionado'));
            botao.classList.add('selecionado');
            atualizarEstadoBotao();
        });
    });

    formulario.addEventListener('input', atualizarEstadoBotao);
    atualizarEstadoBotao();
}

// Inicializa o sistema ao carregar a página
document.addEventListener('DOMContentLoaded', function () {

    configurarModal();

    configurarCliquesDosCards();

    carregarAssentos();

    carregarDadosDaSessao();

    carregarFilmeSelecionado();

    configurarFinalizacaoCompra();

    configurarModaisDeCompra();
});

function carregarFilmeSelecionado() {
    const idFilme = Number(localStorage.getItem('filmeSelecionado'));
    const filme = FILMES_DATABASE[idFilme];

    if (!filme) {
        console.error('Filme selecionado não encontrado.');
        return;
    }

    const poster = document.getElementById('movie-poster');
    const titulo = document.getElementById('movie-title');

    poster.src = filme.poster;
    poster.alt = `Cartaz de ${filme.titulo}`;
    titulo.textContent = filme.titulo;
}