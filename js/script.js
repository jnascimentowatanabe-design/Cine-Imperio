let seatsContainer = document.getElementById('seats-container');

for (let i = 1; i <= 13; i++) {
    let seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i;
    seatsContainer.appendChild(seat); /* Adiciona o assento ao contêiner de assentos */
    /* A função appendChild() é usada para adicionar o elemento assento ao contêiner de assentos no DOM. */
}