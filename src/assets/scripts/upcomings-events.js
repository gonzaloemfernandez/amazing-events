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
              <img id="img"
                src="${card.image}"
                class="card-img-top mt-3"
                alt="..." >
              <div class="card-body text-center mt-2 p-1">
                <h5 class="card-title"><strong>${card.name}</strong></h5>
                <p class="card-text">
                  ${card.description}
                </p>
                <p class=" m-0"><strong>Category: </strong>${card.category}</p>
                <p class=" m-0"><strong>Place: </strong>${card.place}</p>
                <p class=" m-0"><strong>Date: </strong>${card.date}</p>
                <p class=" m-0"><strong>Price:</strong> $${card.price}</p>
              </div>
              <div class="row mb-3  ">
                <div class="text-end">
                  <a href="./assets/pages/details.html" class="btn btn-hover color-7 m-0">  Details</a>
                </div>
              </div>
            </div>`;
}
