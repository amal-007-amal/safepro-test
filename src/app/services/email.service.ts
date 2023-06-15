import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http:HttpClient,
    private url:Constants,
  ) { }

  headers = {
    headers : new HttpHeaders({
      'Content-Type' :'application/json'
    })
  }

  sendDetailTomail(payload:any):Observable<any>{
    return this.http.post(this.url.serverBaseUrl +'/email',payload,this.headers)
  }
}
