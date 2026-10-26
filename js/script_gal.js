const pesquisa = document.getElementById("pesquisa");
const contador = document.getElementById("contador");
const semResultado = document.getElementById("sem-resultado");
const textoFilme = document.getElementById("filme-selecionado");
const textoHorario = document.getElementById("horario-selecionado");
const confirmar = document.getElementById("confirmar");
const filmes = document.querySelectorAll(".filme");
const horarios = document.querySelectorAll(".horarios button");

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

filmes.forEach(filme => {
    const titulo = filme.dataset.titulo;

    filme.querySelectorAll(".horarios button").forEach(horario => {
        horario.addEventListener("click", () => {
            horarios.forEach(item => item.classList.remove("selecionado"));
            horario.classList.add("selecionado");

            textoFilme.textContent = "Filme: " + titulo;
            textoHorario.textContent = "Horário: " + horario.textContent;
            confirmar.disabled = false;
        });
    });
});

/* Ao clicar em "Continuar", vai para a página de escolha de assentos */
confirmar.addEventListener("click", () => {
    window.location.href = "assentos.html";
});