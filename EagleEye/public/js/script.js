// creates map
var marker;
const mymap = L.map('mapid').setView([38.88, -76.9], 9.6);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const accidentIcon = L.icon({
  iconUrl: 'Icons/accident.png',
  iconSize: [40, 45],
});
const assaultIcon = L.icon({
  iconUrl: 'Icons/assault.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});

const autoIcon = L.icon({
  iconUrl: 'Icons/auto.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});

const BEIcon = L.icon({
  iconUrl: 'Icons/BE.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});
const homicideIcon = L.icon({
  iconUrl: 'Icons/homicide.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});
const robberyIcon = L.icon({
  iconUrl: 'Icons/robbery.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});
const sexoffenseIcon = L.icon({
  iconUrl: 'Icons/sexoffense.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});
const theftIcon = L.icon({
  iconUrl: 'Icons/theft.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});
const vandalismIcon = L.icon({
  iconUrl: 'Icons/vandalism.png',
  iconSize: [40, 45],
  iconAnchor: [25, 16],
});

// fetches api and adds filters
let url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json?';
let fetchUrl =
  'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json?$limit=1000';

let settings = { method: 'Get' };

async function getData() {
  // inputs being created into variables
  var crime = document.getElementById('crime').value;
  var streetNumberInput = document.getElementById('streetNumber').value;
  var streetAddressInput = document.getElementById('streetAddress').value;
    var date = document.getElementById('date').value;
  // array of inputs with their URL JSON filters
  var inputArray = new Array();

  if (crime.includes('B & ')) {
    inputArray[0] = [
      '$where=clearance_code_inc_type like',
      "'%25" + crime.substr(3) + "%25'",
    ];
    inputArray[1] = ['street_number=', streetNumberInput];
    inputArray[2] = ['street_address=', streetAddressInput];
    inputArray[3] = ['date_=', date];
  } else if (crime.includes('N & R')) {
    inputArray[0] = [
      '$where=clearance_code_inc_type like',
      "'%25" + crime.substr(14) + "%25'",
    ];
    inputArray[1] = ['street_number=', streetNumberInput];
    inputArray[2] = ['street_address=', streetAddressInput];
    inputArray[3] = ['date_=', date];
  } else {
    inputArray[0] = ['clearance_code_inc_type=', crime];
    inputArray[1] = ['street_number=', streetNumberInput];
    inputArray[2] = ['street_address=', streetAddressInput];
    inputArray[3] = ['date=', date];
  }

  //resets filters on api link
  if (fetchUrl !== url) {
    fetchUrl =
      'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json?$limit=1000';
  }
  // for loop to add the URL JSON filters to the fetchURL
  for (i = 0; i < inputArray.length; i++) {
    if (inputArray[i][1] == '') {
      fetchUrl;
    } else if (inputArray[i][1] != '' && fetchUrl.length > url.length) {
      fetchUrl += '&' + inputArray[i][0] + inputArray[i][1];
    } else {
      fetchUrl += inputArray[i][0] + inputArray[i][1];
    }
  }
  console.log(fetchUrl);
  await fetch(fetchUrl, settings)
    .then(res => res.json())
    .then(json => {
      let select = document.getElementById('policeList');
      let slt = document.getElementById("title");

      let listSize = json.length;

      var array = new Array();
      var array1 = new Array();
      var counter = 0;

      var message = '';
      var tt = '';

      // Loop to pick all the data
      for (var i = 0; i < listSize; i++) {
        let post = json[i];

        let clearanceCode = post.clearance_code_inc_type;
        let streetNumber = post.street_number;
        let streetAddress = post.street_address;
        let date = post.date;

        var d = new Date(post.date);
        var n = d.toLocaleDateString();

        console.log(date);

        array[i] = [
          'Date: ' + n,
          ' Type of Crime: ' + clearanceCode,
          ' Street Number: ' + streetNumber,
          ' Street Address: ' + streetAddress,
        ];
        tt = clearanceCode;
        message =  array[i] + '<br>';
        
        select.innerHTML += '<li>' + message + '</li>';
        
      }
      
      slt.innerHTML = array.length + " new hits were added to the list based on the info you entered";   

 

      //add data to map
      var locationArray = new Array();
      for (var i = 0; i < listSize; i++) {
        let post = json[i];

        let clearanceCode = post.clearance_code_inc_type;
        let latitude = parseFloat(post.latitude);
        let longitude = parseFloat(post.longitude);
        let streetNumber = post.street_number;
        let streetAddress = post.street_address;

        locationArray[i] = [latitude, longitude];

        // different icons depending on type of crime

        if (clearanceCode.includes('ACCIDENT')) {
          marker = L.marker(locationArray[i], { icon: accidentIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (clearanceCode.includes('ASSAULT')) {
          marker = L.marker(locationArray[i], { icon: assaultIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (clearanceCode.includes('AUTO, STOLEN')) {
          marker = L.marker(locationArray[i], { icon: autoIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (clearanceCode.includes('B & E, ')) {
          marker = L.marker(locationArray[i], { icon: BEIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (clearanceCode.includes('HOMICIDE')) {
          marker = L.marker(locationArray[i], { icon: homicideIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (
          clearanceCode.endsWith('RY, COMMERCIAL') ||
          clearanceCode.endsWith('RY, OTHER') ||
          clearanceCode.endsWith('RY, RESIDENTIAL') ||
          clearanceCode.endsWith('RY, VEHICLE')
        ) {
          marker = L.marker(locationArray[i], { icon: robberyIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (clearanceCode.includes('SEX')) {
          marker = L.marker(locationArray[i], { icon: sexoffenseIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (clearanceCode.includes('THEFT')) {
          marker = L.marker(locationArray[i], { icon: theftIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
        if (clearanceCode.includes('VANDALISM')) {
          marker = L.marker(locationArray[i], { icon: vandalismIcon })
            .addTo(mymap)
            .bindPopup(
                'Crime: ' +
                clearanceCode +
                ', Address: ' +
                streetAddress
            ).openPopup;
        }
      }
    });
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("date").setAttribute("max", today);

/** 
      if (crime != '' && streetNumberInput != '' && streetAddressInput != '') {
        message =
          array.length +
          ' cases of ' +
          crime +
          ' happened at ' +
          streetNumberInput +
          ', ' +
          streetAddressInput;
      } else if (
        crime != '' &&
        streetNumberInput != '' &&
        streetAddressInput == ''
      ) {
        message =
          array.length +
          ' cases of ' +
          crime +
          ' happened at ' +
          streetNumberInput;
      } else if (
        crime != '' &&
        streetAddressInput != '' &&
        streetNumberInput == ''
      ) {
        message =
          array.length +
          ' cases of ' +
          crime +
          ' happened at ' +
          streetAddressInput;
      } else if (
        streetNumberInput != '' &&
        streetAddressInput != '' &&
        crime == ''
      ) {
        message =
          array.length +
          ' cases happened at ' +
          streetNumberInput +
          ', ' +
          streetAddressInput;
      } else if (
        crime != '' &&
        streetAddressInput == '' &&
        streetNumberInput == ''
      ) {
        message =
          array.length + ' cases of ' + crime + ' happened in PG County';
      } else if (
        streetNumberInput != '' &&
        crime == '' &&
        streetAddressInput == ''
      ) {
        message = array.length + ' cases occurred at ' + streetNumberInput;
      } else if (
        streetAddressInput != '' &&
        crime == '' &&
        streetNumberInput == ''
      ) {
        message = array.length + ' cases occurred at ' + streetAddressInput;
      }
      */
