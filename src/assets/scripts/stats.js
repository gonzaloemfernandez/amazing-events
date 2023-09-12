const tableContainer = document.getElementById("statsTable");

//Fetch Data
const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";
let globalData = null;
let pastEvents;
let upcomingEvents;

fetchFunction(apiUrl);

// --------------------------------------------Functions--------------------------------------

//Fetch function
function fetchFunction(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;

      filterFutureAndPastEvents(globalData);

      renderTable(tableContainer);
    });
}

//Future and past events
function filterFutureAndPastEvents(dataApi) {
  pastEvents = dataApi.events.filter(
    (event) => event.date <= dataApi.currentDate
  );
  upcomingEvents = dataApi.events.filter(
    (event) => event.date > dataApi.currentDate
  );
}

//First table

//Event with highest percentage of assistance
function eventWithHighestAssistance(pastEvents) {
  return pastEvents.sort(
    (a, b) =>
      (b.assistance * 100) / b.capacity - (a.assistance * 100) / a.capacity
  )[0];
}

//Event with lowest percentage of assistance
function eventWithLowestAssistance(pastEvents) {
  return pastEvents.sort(
    (a, b) =>
      (a.assistance * 100) / a.capacity - (b.assistance * 100) / b.capacity
  )[0];
}

//Event with largest capacity
function eventWithLargestCapacity(dataApi) {
  return dataApi.events.sort((a, b) => b.capacity - a.capacity)[0];
}

//Events statistics by categories

function eventsStatistics(events) {

  console.log(events);
  let categories = new Set(events.map((event) => event.category));
  let categoriesStatistics = [];

  categories.forEach((category) => {
    let eventOfThisCategory = events.filter(
      (event) => category == event.category
    );

    let revenues = eventOfThisCategory.reduce(
      (acum, event) =>
        acum + event.price * (event.estimate || event.assistance),
      0
    );
    let attendance = eventOfThisCategory.reduce(
      (acum, event) =>
        acum +
        (((event.assistance || event.estimate) / event.capacity) * 100) /
          eventOfThisCategory.length,
      0
    );

    //Condition to avoid whole numbers to decimals
    if (!Number.isInteger(attendance)) {
      attendance = attendance.toFixed(2);
    }

    categoriesStatistics.push({
      category,
      revenues,
      attendance,
    });
  });
  return categoriesStatistics;
}

// Create Tables

function createFirstTable() {
  return `<table>
            <tbody>
              <tr>
                <th colspan="3" class = "text-center fs-4">
                <strong>Events Statistics</strong>
                </th>
              
              </tr>

              <tr>
                <th>Event with highest % of assistance.</th>
                <th>Event with lowest % of assistance.</th>
                <th>Event with larger capacity.</th>
              
              </tr>

              <tr>
                <td>

                  ${eventWithHighestAssistance(pastEvents).name} 
                 
                 </td>
                <td>
                

                

                  ${eventWithLowestAssistance(pastEvents).name}
                  </td>
                <td> 
                
                
                ${eventWithLargestCapacity(globalData).name} </td>
              </tr>                         
            </tbody>
          </table>`;
}

//./assets/pages/details.html?id=${card._id}

function createSecondTable() {
  return `
            <table>
            <tbody>
              <tr>
                <th colspan="3" class = "text-center fs-4">
                <strong>Upcoming Events Statistics by Category</strong>
                </th>
              
              </tr>

              <tr>
                <th>Categories</th>
                <th>Revenues</th>
                <th>Percentage of assistance</th>
              
              </tr>
  
            ${renderRows(upcomingEvents)}

                                  
            </tbody>
          </table>
  
              `;
}

function createThirdTable(params) {
  return `
  
              <table>
            <tbody>
              <tr>
                <th colspan="3" class = "text-center fs-4">
                <strong>Past Events Statistics by Category</strong>
                </th>
              
              </tr>

              <tr>
                <th>Categories</th>
                <th>Revenues</th>
                <th>Percentage of assistance</th>
              
              </tr>
  
            ${renderRows(pastEvents)}

                                  
            </tbody>
          </table>
              `;
}

//Render rows (events statistics by category)
function renderRows(event) {
  let html = "";

  eventsStatistics(event)
    //Sort by attendance
    .sort((a, b) => b.attendance - a.attendance)
    //Render rows
    .forEach((row) => {
      html += `<tr >
                <td>${row.category}</td>
                <td>$${row.revenues.toLocaleString("en-US")}</td>
                <td>${row.attendance}%</td>
                </tr>`;
    });
  return html;
}

//Render Table

function renderTable(container) {
  container.innerHTML =
    createFirstTable() + createSecondTable() + createThirdTable();
}
