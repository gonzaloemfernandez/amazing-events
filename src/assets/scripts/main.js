const cardContainer = document.getElementById("cards");
const checkboxesContainer = document.getElementById("checkboxes");
const searchBarContainer = document.getElementById("searchBar");
//Api
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let globalData = {};
let cards = "";


//* Listeners
searchBarContainer.addEventListener("input",filters);

checkboxesContainer.addEventListener("change",filters );

//*Fetch 
fetchFunction(urlApi);



// --------------------------------------------Functions--------------------------------------



//Fetch
function fetchFunction(urlApi) {
  fetch(urlApi)
    .then((response) => response.json())
    .then((dataApi) => {
      globalData = dataApi;
      let categories = filterCategories(dataApi.events);

      //Llamada a funciones para renderizar
      renderCards(dataApi.events, cardContainer);
      renderCheckboxes(categories, checkboxesContainer);
    });
}


//* Cards

function renderCards(arrayData, container) {

  if (arrayData.length === 0) {
    container.innerHTML = `<h2 class="text-center fs-2 fw-bolder">NO MATCHES FOUND<h2/>`;
    return;
  }
  
  let cardsGroup = "";

  arrayData.forEach((element) => {
    cardsGroup += createCard(element);
  });
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
                  <a href="./assets/pages/details.html?id=${card._id}" class="btn btn-hover color-7 m-0">  Details</a>
                </div>
              </div>
            </div>`;
}

//* Checkboxes

function filterCategories(arrayData) {
  return Array.from(new Set(arrayData.map((events) => events.category)));
}

//Alternative function to filter categories

// function filterCategories(arrayData) {
//   return arrayData
//     .map((elemento) => elemento.category)
//     .filter(
//       (category, indice, categories) => categories.indexOf(category) === indice
//     );
// }

function renderCheckboxes(arrayCategories, container) {
  let checkboxesGroup = "";

  arrayCategories.forEach((element) => {
    checkboxesGroup += createCheckbox(element);
  });
  container.innerHTML = checkboxesGroup;
}

function createCheckbox(checkbox) {
  return `<div class="form-check-inline">
              <input
                class="form-check-input   bg-danger"
                type="checkbox"
                value="${checkbox}"
                id="${checkbox}">
                
              <label class="form-check-label" for="${checkbox}"
                >${checkbox}</label
              >
            </div>`;
}

//*Filters
function textFilter(text, array) {
  return array.filter((elemento) =>
    elemento.name.toLowerCase().includes(text.toLowerCase().trim())
  );
}

function filterByCategories(array) {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  let checkboxesCheckeds = checkboxes.filter((check) => check.checked);
  if (checkboxesCheckeds.length == 0) {
    return array;
  }
  let values = checkboxesCheckeds.map(
    (checkboxesChecked) => checkboxesChecked.value
  );
  let arrayFilter = array.filter((elemento) =>
    values.includes(elemento.category)
  );
  return arrayFilter;
}

function filters() {
let filter = textFilter(searchBarContainer.value, globalData.events);
let filter2 = filterByCategories(filter);
renderCards(filter2, cardContainer);
}
