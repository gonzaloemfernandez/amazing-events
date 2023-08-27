const cardContainer = document.getElementById("cards");
let cards = "";

renderCards(data.events, cardContainer);

function renderCards(arrayData, container) {
  let cardsGroup = "";

  for (element of arrayData) {
    if (element.date > data.currentDate) {
      cardsGroup += createCard(element);
    }
  }
  container.innerHTML = cardsGroup;
}

function createCard(card) {
  return `<div
              class="card bg-dark bg-opacity-10 text-white border-5 border-white border-opacity-50 m-2" 
              style="width: 16rem">
              <img
                src="${card.image}"
                class="card-img-top mt-3"
                alt="..." >
              <div class="card-body text-center mt-0">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">
                  ${card.description}
                </p>
              </div>
              <div class="row pb-0 mt-0 ">
                <div class="col-12 mt-0 col-sm-6 mt-sm-4 ">
                  <p class="text-center m-0"><strong>Price:</strong> $${card.price}</p>
                </div>
                <div class="col-12 m-1 text-center col-sm-6 m-sm-0">
                 <a href="./assets/pages/details.html" class="btn btn-hover color-7">  Details</a>
                </div>
              </div>
            </div>`;
}
