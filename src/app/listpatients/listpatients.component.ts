import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Router,NavigationExtras} from '@angular/router';
import{HttpClient} from '@angular/common/http';
import { PatientInfo } from '../add-patient/add-patient-info';
import { TokenStorageService } from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {PatientService} from '../services/patient.service';
@Component({
  selector: 'app-listpatients',
  templateUrl: './listpatients.component.html',
  styleUrls: ['./listpatients.component.css'],
})
export class ListpatientsComponent implements OnInit {
  form: any = {};
  user:any;

  public data:Observable<any>;
  public patients:any;
  constructor(private http:HttpClient,private userService:UserService, private router:Router,private patientService:PatientService,private token:TokenStorageService) { }

  ngOnInit() {
    this.userService.detailurl(this.token.getUsername()).subscribe(p=>{
      this.user = p ;
      console.log(this.user.id);
      this.data = this.http.get("http://localhost:8080/api/listP/"+this.user.id);
      this.data.subscribe(result =>{
      this.patients = result;
      document.getElementById("loader").hidden =true;

      })
     });




  }
  onSubmitSearch(name:string){
    console.log(this.form.name);
    this.data = this.http.get("http://localhost:8080/api/searchpatient/"+this.user.id+"/"+name);
    this.data.subscribe(result =>{
      this.patients = result;
      console.log(result);
    })
  }
  goToDetails(id:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": id,
      }
  };
    this.router.navigate(["detailpatient"], navigationExtras);

  }
  getRxcui(event){

    var inputValue = event.target.value;
    console.log(inputValue);
    this.onSubmitSearch(inputValue);
    if (inputValue == ""){
      this.data = this.http.get("http://localhost:8080/api/listP/"+this.user.id);
      this.data.subscribe(result =>{
      this.patients = result;
      })
    }

 }

}
