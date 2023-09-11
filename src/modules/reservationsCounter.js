const reservationsCounter = () => {
  const reservations = document.querySelectorAll('.reserve-list-item');
  const title = document.querySelector('.title-reservations');

  const numberOfElements = reservations.length;
  title.innerHTML = `Reservations(${numberOfElements})`;
};

export default reservationsCounter;
