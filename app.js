window.onload = function() {
  getCoronaVirusStats();
}

function getCoronaVirusStats() {
  //fetches data with United States set as default
  fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/249')
  .then(function(resp) { return resp.json() })
  .then(function(data) {
    let population = data.location.country_population;
    let update = data.location.last_updated;
    let confirmedCases = data.location.latest.confirmed;
    let deaths = data.location.latest.deaths;

   //loads data to HTML
    document.getElementById('population').innerHTML = population.toLocaleString('en');
    document.getElementById('update').innerHTML = update.substr(0, 10);
    document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
    document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
    document.getElementById('percent').innerHTML = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
    

  })
  .catch(function() {
    console.log("error");
  })

  //refreshes data once every 12 hours, or 43200000 ms
  setTimeout(getCoronaVirusStats, 43200000)
}
