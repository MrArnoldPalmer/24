import 'babel-polyfill';
import {sdZip} from './sdZip';

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.708798, lng: -117.156004},
    zoom: 12,
  });

  for(let zip of sdZip) {
    let color;
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
      map: map
    });

    let mapLabel = new MapLabel({
      text: `${748 * zip.HCF} Gallons`,
      position: new google.maps.LatLng(zip.latitude, zip.longitude),
      map: map,
      fontSize: 20,
      align: 'center',
      zIndex: 1000
    });
  }
}

const low = '#1627a3';
const mid = '#FF9000';
const high = '#FF0000';


initMap();

console.log(sdZip);
