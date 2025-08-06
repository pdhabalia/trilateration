// src/app/location.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellInfo, LocationResponse } from '../models/cell-location.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private apiUrl = 'http://localhost:8081/imei/location'; // your backend URL
  private httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      observe: 'body', 
      responseType: 'json',
      /*
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
      */
      headers:{'Access-Control-Allow-Origin':'*'}
    };
  }

  getLocation(cellInfo: CellInfo): Observable<LocationResponse> {
    return this.http.post<LocationResponse>(this.apiUrl, cellInfo);
  }
}
