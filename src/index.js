import 'babel-polyfill';
import {sdZip} from './sdZip';
import {mapStyle} from './mapStyle';


const location = new google.maps.LatLng(32.708798, -117.156004);
const MAP_TYPE = 'Flux';
const options = {
  center: {lat: 32.708798, lng: -117.156004},
  zoom: 12,
  mapTypeControlOptions: {
     mapTypeIds: [google.maps.MapTypeId.ROADMAP, MAP_TYPE]
  },
  mapTypeId: MAP_TYPE
};

function initMap() {
  let fluxMap = new google.maps.StyledMapType({}, {
    name: 'Flux'
  });
  let map = new google.maps.Map(document.getElementById('map'), options);
  map.mapTypes.set(MAP_TYPE, fluxMap);

  for(let zip of sdZip) {
    let color;
    let gallons = 748 * zip.HCF;

    let info = `
    <h3>${gallons} Gallons = <h3>
    <ul>
      <li>${17 * gallons} Showers</li>
      <li>${7 * gallons} Toliet Flushes</li>
      <li>${gallons} Teeth Brushings</li>
    </ul>
    `;

    if(zip.HCF < 25) {
      color = low;
    } else if(zip.HCF >= 25 && zip.HCF < 45) {
      color = mid;
    } else {
      color = high;
    }

    let circle = new google.maps.Circle({
      center: {
        lat: zip.latitude,
        lng: zip.longitude
      },
      radius: zip.AREA * 150,
      strokeColor: color,
      strokeOpacity: 0.3,
      strokeWeight: zip.AREA * 50,
      fillColor: color,
      fillOpacity: 0.8,
      map: map,
      });

    let mapLabel = new MapLabel({
      text: `${gallons} Gallons`,
      position: new google.maps.LatLng(zip.latitude, zip.longitude),
      map: map,
      fontSize: 20,
      align: 'center',
      zIndex: 1000,
      strokeWeight: 0,
      fontColor: '#FFFFFF',
      minZoom: 13
    });

    let infowindow = new google.maps.InfoWindow({
      content: info,
      position: new google.maps.LatLng(zip.latitude, zip.longitude)
    });

    circle.addListener('click', function() {
      infowindow.open(map, circle);
    });
  }
}

const low = '#1627a3';
const mid = '#FF9000';
const high = '#FF0000';


initMap();

console.log(sdZip);
