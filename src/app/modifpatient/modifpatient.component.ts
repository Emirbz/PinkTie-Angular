import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import {PatientInfo} from '../add-patient/add-patient-info'
import { PatientService } from '../services/patient.service';
import {Router,NavigationExtras} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-modifpatient',
  templateUrl: './modifpatient.component.html',
  styleUrls: ['./modifpatient.component.css']
})
export class ModifpatientComponent implements OnInit {

  constructor(private token:TokenStorageService,private http:HttpClient, private patientService:PatientService,private router:Router,private ar:ActivatedRoute) { }
  form: any = {};
  patientInfo:PatientInfo;
  errorMessage = '';
  id:string;
  patient:any;
  imageSrc: string = '';


  ngOnInit() {
    this.ar.queryParams.subscribe(params => {
      this.id = params["id"];
  });
    this.patientService.detailurl(this.id).subscribe(p=>{
      this.patient = p ;
      this.form.name = this.patient.name;
      this.form.lastname = this.patient.lastname;
      this.form.phone = this.patient.phone;
      this.form.address = this.patient.address;
      this.form.email = this.patient.email;
      this.form.description = this.patient.description;
      document.getElementById("loader").hidden=true;

    })

  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }
  onSubmit() {
    console.log(this.form);
    this.patientInfo = new PatientInfo();
    this.patientInfo.setLastName(this.form.lastname);
    this.patientInfo.setName(this.form.name);
    this.patientInfo.setImage(this.imageSrc);
    this.patientInfo.setAddress(this.form.address);
    this.patientInfo.setDescription(this.form.description);
    this.patientInfo.setEmail(this.form.email);
    this.patientInfo.setPhone(this.form.phone);
    //this.patientInfo.setDoctor(this.token.getUsername());

    this.patientService.modif(this.patientInfo,this.id).subscribe(
        data => {
          console.log(data);
          let navigationExtras: NavigationExtras = {
            queryParams: {
                "id": this.patient.id,
            }
        };
          this.router.navigate(["detailpatient"], navigationExtras);

        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;

        }
      );
  }





}
