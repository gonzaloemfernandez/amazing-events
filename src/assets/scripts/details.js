const cardContainer = document.getElementById("cardMain");

let params = new URLSearchParams(window.location.search);
let id = params.get("id");
let eventData = searchEvent(id);
renderCard(eventData, cardContainer);

function renderCard(data, container) {
  container.innerHTML = createCard(data);
}

function createCard(data) {
  return `<div class="row p-5 ">
          <div
            class="card bg-transparent bg-gradient border-3 border-dark text-white">
            <div class="row g-0 p-1 p-sm-3 ">
              <div class=" col-12 mt-3 col-xl-6 mt-sm-0 d-flex justify-content-center  ">
                <img id="imgDetails"
                  src="${data.image}" >
              </div>
              <div class="col-xl-6">
                <div class="card-body">
                  <h2 class="card-title fw-bolder">${data.name}</h2>
                  <p class="card-text ">
                    ${data.description}
                  </p>

                  <div class="row">
                  <div class="col-sm-6">
                  
                  <p><strong>Category: </strong>${data.category}</p>
                  <p><strong>Place: </strong>${data.place}</p>
                  <p><strong>Date: </strong>${data.date}</p>
                  </div>

                  <div class="col-sm-6">
                  <p><strong>Assistance: </strong>${data.assistance}</p>
                  <p><strong>Capacity: </strong>${data.capacity}</p>
                  <p><strong>Price:</strong> $${data.price}</p>
                  </div>
                  

                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>`;
}

function searchEvent(id) {
  return data.events.find((evento) => evento._id == id);
}
