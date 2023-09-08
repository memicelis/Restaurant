import { reservationsDB } from './api.js';
import reservationsCounter from './reservationsCounter.js';

const addReservation = async (id, user, start, end) => {
  fetch(reservationsDB, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: user,
      date_start: start,
      date_end: end,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const responseReservations = await fetch(`${reservationsDB}item_id=${id}`);
  console.log('id: ' + id + 'user ' + user + ' start' + start + 'end ' + end);
  const dataReservations = await responseReservations.json();
  let reservations = document.querySelector('.reservations-list');
  reservations.innerHTML = '';
  dataReservations.forEach((item) => {
    const reserveItem = document.createElement('li');
    reserveItem.classList.add('reserve-list-item');
    reserveItem.innerHTML = `${item.date_start} - ${item.date_end} by ${item.username}`;
    reservations.appendChild(reserveItem);
  });
  reservationsCounter();
};
export default addReservation;
