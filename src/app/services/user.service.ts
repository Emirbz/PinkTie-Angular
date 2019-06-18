import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { profilInfo } from '../completeprofildoctor/profilInfo';
import { SignUpInfo } from '../auth/signup-info';


const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private detailUrl = 'http://localhost:8080/api/auth/detaildoctor/';
  private updateUrl = 'http://localhost:8080/api/auth/updatedoctor/';


  profilInfo:profilInfo;
  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
  getUserByUsername(id:string) {
    return this.http.get(this.detailUrl+id);
  }

  updateDoctor(profilInfo:profilInfo, id:string): Observable<string> {
    return this.http.put<string>(this.updateUrl+id, profilInfo, httpOptions);
  }
  detailurl(id:string){
    return this.http.get("http://localhost:8080/api/auth/detaildoctor/"+id);
  }

  private modifuser = 'http://localhost:8080/api/auth/modifuser/'
  modif(info: SignUpInfo, id:string): Observable<string> {
    return this.http.put<string>(this.modifuser+id, info, httpOptions);

  }

}
