import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import {ActivatedRoute,Router,NavigationEnd} from '@angular/router';
import { UserService } from '../services/user.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  info:any;
  user:any;
  info2:any;
  public data:Observable<any>;

  public rdvs:any;
  constructor(private patientService:PatientService, private userService:UserService, private token: TokenStorageService,private ar:ActivatedRoute,private router:Router, private http:HttpClient) {

   }
name:string;
id:string;
lastname:string;
patient:any;
  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username:  this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.token.getAuthorities()[0]=="ROLE_PM") {
      document.getElementById("rdvD").hidden=true;
      document.getElementById("addp").hidden=true;
      document.getElementById("allp").hidden=true;

    } else {
      document.getElementById("addp").hidden = false;
      document.getElementById("patientinbox").hidden = true;


    }

    if(this.token.getUsername().indexOf(".")==-1){
      this.info = {
        token: this.token.getToken(),
        username: this.token.getUsername(),
        authorities: this.token.getAuthorities()
      };
      this.userService.getUserByUsername(this.token.getUsername()).subscribe(p=>{
        this.user = p ;
        console.log(this.user.id);
        if( this.user.speciality == null && this.user.address == null && this.user.description == null && this.user.hopital == null &&
        this.user.school == null){
          document.getElementById("inf").hidden = false;
        } else {
          document.getElementById("inf").hidden = true;
        }
        console.log(this.user.id);

        this.data = this.http.get("http://localhost:8080/api/listnotif/"+this.user.id);
        this.data.subscribe(result =>{
        this.rdvs = result;
        console.log(this.rdvs);
        })
        this.info2= {
          username: this.token.getUsername(),
        };
       });

    }
    else{




       this.id=this.token.getUsername();
       this.name = this.id.substring(0, this.id.indexOf("."));
       this.lastname = this.id.substring(
         this.id.indexOf(".") + 1,
         this.id.length
       );
       this.patientService.detailurl2(this.name, this.lastname).subscribe(p => {
         this.patient = p;
         console.log(this.patient.user.username);
         this.info2= {
           username: this.patient.user.username,
         };
       });

    }



  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  DeleteNotif(){
    this.rdvs  = null;
  }
}
