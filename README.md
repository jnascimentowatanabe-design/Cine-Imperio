# 🎬 Cine Império

Projeto acadêmico de um site de cinema desenvolvido com **HTML, CSS e JavaScript puro**. O site simula o fluxo de compra de ingressos: o usuário escolhe um filme e um horário, seleciona os assentos na sala, adiciona itens da bomboniere e chega à tela de pagamento.

> Projeto de front-end, sem back-end ou banco de dados. Os dados dos filmes ficam no próprio código e o pagamento é apenas visual.

---

## 📋 Funcionalidades

### Página inicial (`index.html`)
- Lista de filmes em cartaz, com cartaz, gênero e duração.
- Campo de **pesquisa em tempo real** por título ou gênero.
- Contador de filmes exibidos e mensagem quando nada é encontrado.
- Seleção de horário com **resumo da sessão** e botão "Continuar" liberado só depois da escolha.

### Escolha de assentos (`assentos.html`)
- Mapa de assentos **gerado dinamicamente por JavaScript** (colunas de A a O, com 13 assentos cada).
- Assentos inexistentes ocultados e corredores entre as colunas C e L.
- Seleção e desseleção com um clique, com destaque visual (👑) no assento escolhido.
- Painel com cartaz, título e sinopse do filme e lista dos assentos selecionados.
- Botões **Confirmar** (segue para os ingressos) e **Cancelar** (volta ao início).

### Ingressos e pagamento (`ingressos.html`)
- Resumo do pedido: filme, horário, assentos e duração.
- **Bomboniere** com três combos (Pipoca P, Pipoca M e Combo Família) e cálculo do total conforme os cliques.
- Escolha da forma de pagamento (crédito ou débito) e formulário de dados do cartão.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| **HTML5** | Estrutura semântica das páginas (`header`, `nav`, `main`, `section`, `aside`, `form`) |
| **CSS3** | Layout com Flexbox e Grid, `position: sticky`, pseudo-elementos (`::after`), transições, `transform`, variáveis CSS (`:root`), `@media` para celular |
| **JavaScript (ES6+)** | Manipulação do DOM, eventos, `Set`, arrays, template strings e geração dinâmica dos assentos |

Nenhum framework ou biblioteca externa foi usado.

---

## 📁 Estrutura do projeto

```
cine-imperio/
├── index.html          # Página inicial (filmes e horários)
├── assentos.html       # Escolha de assentos
├── ingressos.html      # Resumo, bomboniere e pagamento
├── css/
│   ├── style_gal.css   # Estilo da página inicial
│   ├── style.css       # Estilo da escolha de assentos
│   └── style_ing.css   # Estilo de ingressos/pagamento
├── js/
│   ├── script_gal.js   # Pesquisa de filmes e seleção de horário
│   ├── script.js       # Mapa de assentos e seleção
│   └── script_ing.js   # Carrinho de combos e total
└── img/                # Logo, cartazes e imagens dos combos
```



## 👤 Autoria

Projeto acadêmico desenvolvido para fins de estudo em HTML, CSS e JavaScript.

**Autor(es):** Júlio Nascimento Watanabe, João Pedro Cavalcante, Felipe Oliveira NAscimento, Gustavo Cavalcante, Daniel Cavalcante, Jhonatas Henrique Fernandes Fonseca
**Curso / Disciplina:** _preencha aqui_
