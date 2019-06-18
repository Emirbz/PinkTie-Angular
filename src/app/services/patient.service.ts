import { Injectable } from '@angular/core';
import { PatientInfo } from '../add-patient/add-patient-info';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { historique  } from '../historique/historique';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private addpatienturl = 'http://localhost:8080/api/addpatient';
  constructor(private http: HttpClient) { }
  signUp(info: PatientInfo): Observable<string> {
    return this.http.post<string>(this.addpatienturl, info, httpOptions);
  }

  private updatepatienturl = 'http://localhost:8080/api/updatepatient/'
  update(info: PatientInfo, id:string): Observable<string> {
    console.log(info);
    return this.http.put<string>(this.updatepatienturl+id, info, httpOptions);
  }

  private updatepatienturl2 = 'http://localhost:8080/api/updatepatient2/'
  update2(info: PatientInfo, id:string): Observable<string> {
    return this.http.put<string>(this.updatepatienturl2+id, info, httpOptions);
  }


  private updatepatienturl3 = 'http://localhost:8080/api/updatepatient3/'
  update3(info: PatientInfo, id:string): Observable<string> {
    return this.http.put<string>(this.updatepatienturl3+id, info, httpOptions);
  }

  private updatepatienturl4 = 'http://localhost:8080/api/updatepatient4/'
  update4(info: PatientInfo, id:string): Observable<string> {
    return this.http.put<string>(this.updatepatienturl4+id, info, httpOptions);

  }

  private saveurl = '192.168.1.14:6969/save?id='
  save(id:string): Observable<string> {
    return this.http.get<string>(this.saveurl+id);
  }

   detailurl(id:string){
    return this.http.get("http://localhost:8080/api/detailpatient/"+id);
  }
  private addnoteurl = 'http://localhost:8080/api/addnote/'
  addNote(info: PatientInfo, id:string): Observable<string>{
    return this.http.put<string> (this.addnoteurl+id, info, httpOptions);
  }
  private modifpatient = 'http://localhost:8080/api/modifpatient/'
  modif(info: PatientInfo, id:string): Observable<string> {
    return this.http.put<string>(this.modifpatient+id, info, httpOptions);

  }
  detailurl2(name:string,lastname:string){
    return this.http.get("http://localhost:8080/api/detailpatientionic/"+name+"/"+lastname);
  }

  testresult(id:string){
    return this.http.get("http://localhost:8080/api/testresult/"+id);
  }
  getresult(id:string){
    return this.http.get("http://localhost:8080/api/getresult/"+id);
  }

  testheat(id:string){
    return this.http.get("http://localhost:8080/api/testheat/"+id);
  }
  addhistorique(his:historique, id:string): Observable<string> {
    return this.http.post<string>("http://localhost:8080/api/ajouthistorique/"+id, his, httpOptions);
  }


}
