// 1. Objeto global que guarda o estado atual do carrinho (começa zerado)
const carrinho = {
    'combo-pipoca-p': { nome: 'Combo Pipoca P', precoTexto: 'R$ 20,00', valor: 20.00, quantidade: 0 },
    'combo-pipoca-m': { nome: 'Combo Pipoca M', precoTexto: 'R$ 25,00', valor: 25.00, quantidade: 0 },
    'combo-pipoca-g': { nome: 'Combo Família', precoTexto: 'R$ 35,00', valor: 35.00, quantidade: 0 }
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

// 3. Adiciona o evento de clique acumulativo nos cards do seu HTML
function configurarCliquesAcumulativos() {
    // Mapeia os IDs do seu HTML exatamente como você enviou
    const IDsDosCards = ['combo-pipoca-p', 'combo-pipoca-m', 'combo-pipoca-g'];

    IDsDosCards.forEach(id => {
        const card = document.getElementById(id);
        
        if (card) {
            card.addEventListener('click', () => {
                // Adiciona +1 na quantidade do combo clicado no nosso objeto de controle
                carrinho[id].quantidade += 1;
                
                // Recalcula e atualiza tudo na tela instantaneamente
                atualizarInterfaceDoCarrinho();
            });
        }
    });
}

// Inicializa o sistema ao carregar a página
configurarCliquesAcumulativos();