import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) {}
  private addpatienturl = 'http://localhost:8080/api/post';

  upload(file: File): Observable<string> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    return this.http.post<string>(this.addpatienturl, formdata, httpOptions);
  }


 /* pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8080/api/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });


    return this.http.request(req);



  }*/

  getFiles(): Observable<any> {
    return this.http.get('/api/getallfiles')
  }
}
