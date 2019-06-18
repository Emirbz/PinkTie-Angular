import { Injectable } from '@angular/core';
import { ordonnance } from '../add-ordonnance/ordonnance';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {

  private addordonnanceurl = 'http://localhost:8080/api/addordonnance';
  constructor(private http: HttpClient) { }
  add(info: ordonnance): Observable<string> {
    return this.http.post<string>(this.addordonnanceurl, info, httpOptions);
  }

}
