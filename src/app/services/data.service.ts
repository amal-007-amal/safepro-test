import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../config/constants';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http:HttpClient,
    private url:Constants
  ) { }

  getCountries():Observable<any> {
    return this.http.get(this.url.remoteEndpointUrl)
  }

}
