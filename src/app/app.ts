import { Component, signal } from '@angular/core'
import { CellInfo, LocationResponse } from './models/cell-location.model'
import { LocationService } from './service/location.service'
import { FormsModule } from '@angular/forms'
import { GoogleMap } from '@angular/google-maps'
import { MapMarker } from '@angular/google-maps'
import { CommonModule, NgForOf } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [FormsModule, GoogleMap, MapMarker, CommonModule, NgForOf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('trilateration-map')

  cellInfo: CellInfo = { mcc: 404, mnc: 5, lac: 59929, cid: 227936287 };
  location: LocationResponse = { lat: 0, lng: 0 };

  center: google.maps.LatLngLiteral = { lat: 22.699186, lng: 22.699186 };
  display: any;
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor (private locationService: LocationService) {}
 
  findLocation () {
    console.log("calling find location");
    this.locationService.getLocation(this.cellInfo).subscribe(
      data => {
        console.log("data : ", data);
        this.markerPositions.length = 0;
        this.location.lat = Number(data.lat);
        this.location.lng = Number(data.lng);
        this.center = this.location;
        this.markerPositions.push(this.location);
      },
      error => {
        console.error('Error fetching location:', error)
      }
    )
  }

  moveMap (event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON()
  }

  move (event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON()
  }

  addMarker (event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON())
  }
}
