const pesquisa = document.getElementById("pesquisa");
const contador = document.getElementById("contador");
const semResultado = document.getElementById("sem-resultado");
const textoFilme = document.getElementById("filme-selecionado");
const textoHorario = document.getElementById("horario-selecionado");
const confirmar = document.getElementById("confirmar");

const filmes = document.querySelectorAll(".filme");
const horarios = document.querySelectorAll(".horarios button");

function atualizarContador(quantidade) {
    contador.textContent = quantidade === 1 ? "1 filme" : `${quantidade} filmes`;
}

pesquisa.addEventListener("input", () => {
    const termo = pesquisa.value.toLowerCase().trim();
    let encontrados = 0;

    filmes.forEach(filme => {
        const titulo = filme.dataset.titulo.toLowerCase();
        const genero = filme.dataset.genero.toLowerCase();
        const aparece = titulo.includes(termo) || genero.includes(termo);

        filme.style.display = aparece ? "" : "none";
        if (aparece) encontrados++;
    });

    atualizarContador(encontrados);
    semResultado.style.display = encontrados === 0 ? "block" : "none";
});

filmes.forEach(filme => {
    const titulo = filme.dataset.titulo;

    filme.querySelectorAll(".horarios button").forEach(horario => {
        horario.addEventListener("click", () => {
            horarios.forEach(item => item.classList.remove("selecionado"));
            horario.classList.add("selecionado");

            textoFilme.textContent = `Filme: ${titulo}`;
            textoHorario.textContent = `Horário: ${horario.textContent}`;
            confirmar.disabled = false;
        });
    });
});

/* Adiciona um evento de clique ao botão "confirmar" para redirecionar para a página "index.html" */
confirmar.addEventListener("click", () => {
    window.location.href = "index.html";
});