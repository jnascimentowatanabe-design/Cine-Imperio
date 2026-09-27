let seatsContainer = document.getElementById('seats-container');

for (let i = 1; i <= 13; i++) {
    let seat = document.createElement('button'); /* Cria um elemento de botão para cada assento */
    seat.classList.add('content-seats'); /* Adiciona a classe 'content-seats' ao botão */
    seat.setAttribute('type', 'button'); /* Define o tipo do botão como 'button' */
    seat.textContent = 'A' + i;
    seatsContainer.appendChild(seat); /* Adiciona o assento ao contêiner de assentos */
    /* A função appendChild() é usada para adicionar o elemento assento ao contêiner de assentos no DOM. */
}