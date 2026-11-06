const pesquisa = document.getElementById("pesquisa");
const contador = document.getElementById("contador");
const semResultado = document.getElementById("sem-resultado");
const textoFilme = document.getElementById("filme-selecionado");
const textoHorario = document.getElementById("horario-selecionado");
const confirmar = document.getElementById("confirmar");
const filmes = document.querySelectorAll(".filme");
const diasSessoes = document.getElementById("dias-sessoes");
const textoDiaSelecionado = document.getElementById("dia-selecionado");

let idFilmeSelecionado = null;
let diaSelecionado = 0;

const horariosBase = [
    ["12:30", "15:45", "18:00"],
    ["11:30", "16:45", "20:00"],
    ["14:30", "17:45", "21:30"],
    ["08:30", "18:45", "22:30"],
    ["11:30", "16:45", "20:00"]
];

function formatarDia(data) {
    return data.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit"
    }).replace(".", "");
}

function formatarDiaCompleto(data, indice) {
    if (indice === 0) {
        return "hoje";
    }

    return data.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long"
    });
}

function formatarDataParaArmazenamento(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function alterarHorario(horario, quantidadeDeMinutos) {
    const [hora, minuto] = horario.split(":").map(Number);
    const data = new Date(2000, 0, 1, hora, minuto + quantidadeDeMinutos);

    return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function criarDiasSessoes() {
    const hoje = new Date();

    for (let indice = 0; indice < 14; indice++) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() + indice);

        const botaoDia = document.createElement("button");
        botaoDia.type = "button";
        botaoDia.className = "dia-sessao";
        botaoDia.textContent = indice === 0 ? "Hoje" : formatarDia(data);
        botaoDia.dataset.indice = indice;
        botaoDia.setAttribute("aria-label", `Sessões de ${data.toLocaleDateString("pt-BR")}`);

        botaoDia.addEventListener("click", () => {
            diaSelecionado = indice;
            localStorage.setItem("dataSessao", formatarDataParaArmazenamento(data));
            document.querySelectorAll(".dia-sessao").forEach(dia => {
                dia.classList.remove("selecionado");
            });
            botaoDia.classList.add("selecionado");
            textoDiaSelecionado.textContent =
                "Horários disponíveis para " + formatarDiaCompleto(data, indice);
            atualizarHorarios();
        });

        diasSessoes.appendChild(botaoDia);
    }

    diasSessoes.querySelector(".dia-sessao").classList.add("selecionado");
    localStorage.setItem("dataSessao", formatarDataParaArmazenamento(hoje));
}

function atualizarHorarios() {
    filmes.forEach((filme, indiceFilme) => {
        const horariosDoFilme = horariosBase[indiceFilme];
        const deslocamento = (diaSelecionado * 30 + indiceFilme * 15) % 120;
        const horariosDoDia = filme.querySelector(".horarios");

        filme.classList.remove("atualizando");
        void filme.offsetWidth;
        horariosDoDia.innerHTML = "";

        horariosDoFilme.forEach(horarioBase => {
            const botaoHorario = document.createElement("button");
            botaoHorario.type = "button";
            botaoHorario.textContent = alterarHorario(horarioBase, deslocamento);
            horariosDoDia.appendChild(botaoHorario);
        });

        filme.classList.add("atualizando");
    });

    configurarSelecaoDeHorarios();
}

function configurarSelecaoDeHorarios() {
    document.querySelectorAll(".horarios button").forEach(horario => {
        horario.addEventListener("click", () => {
            const filme = horario.closest(".filme");
            idFilmeSelecionado = filme.dataset.id;

            document.querySelectorAll(".horarios button").forEach(item => {
                item.classList.remove("selecionado");
            });
            horario.classList.add("selecionado");

            textoFilme.textContent = "Filme: " + filme.dataset.titulo;
            textoHorario.textContent = "Horário: " + horario.textContent;
            localStorage.setItem("horarioSessao", horario.textContent);
            confirmar.disabled = false;
        });
    });
}

function atualizarContador(quantidade) {
    contador.textContent = quantidade + " filmes";
}

pesquisa.addEventListener("input", () => {
    const termo = pesquisa.value.toLowerCase().trim();
    let encontrados = 0;

    filmes.forEach(filme => {
        const titulo = filme.dataset.titulo.toLowerCase();
        const genero = filme.dataset.genero.toLowerCase();
        const aparece = titulo.includes(termo) || genero.includes(termo);

        if (aparece) {
            filme.style.display = "";
            encontrados++;
        } else {
            filme.style.display = "none";
        }
    });

    atualizarContador(encontrados);

    if (encontrados === 0) {
        semResultado.style.display = "block";
    } else {
        semResultado.style.display = "none";
    }
});

criarDiasSessoes();
atualizarHorarios();

/* Ao clicar em "Continuar", vai para a página de escolha de assentos */
confirmar.addEventListener("click", () => {

    if (idFilmeSelecionado === null) {
        return;
    }

    localStorage.setItem('filmeSelecionado', idFilmeSelecionado);

    window.location.href = "assentos.html";
});