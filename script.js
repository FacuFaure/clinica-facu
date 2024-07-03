document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    const reservationsList = document.getElementById('reservationsList');

    // Load existing reservations from localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    const renderReservations = () => {
        reservationsList.innerHTML = '';
        reservations.forEach((reservation, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${reservation.name} - ${reservation.date} - ${reservation.time}
                <button class="delete" data-index="${index}">Eliminar</button>
            `;
            reservationsList.appendChild(li);
        });

        // Add delete event listeners
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                reservations.splice(index, 1);
                localStorage.setItem('reservations', JSON.stringify(reservations));
                renderReservations();
            });
        });
    };

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        const reservation = { name, date, time };
        reservations.push(reservation);

        // Save reservations to localStorage
        localStorage.setItem('reservations', JSON.stringify(reservations));

        renderReservations();

        // Clear the form
        reservationForm.reset();
    });

    renderReservations();
});
