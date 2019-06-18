import { Component, OnInit } from '@angular/core';
import { ordonnance } from './ordonnance';
import { OrdonnanceService } from '../services/ordonnance.service';
import {ActivatedRoute} from '@angular/router';
import { PatientService } from '../services/patient.service';
import { PatientInfo } from '../add-patient/add-patient-info';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-add-ordonnance',
  templateUrl: './add-ordonnance.component.html',
  styleUrls: ['./add-ordonnance.component.css']
})
export class AddOrdonnanceComponent implements OnInit {
  ordonnance: ordonnance;
  form: any = {};
  errorMessage = '';
  id:string;
  patient:any;

  constructor(private router:Router, private ordonnanceService:OrdonnanceService, private ar:ActivatedRoute,private patientService:PatientService) { }

  ngOnInit() {
    document.getElementById("loader").hidden=true;

    this.ar.queryParams.subscribe(params => {
      this.id = params["id"];
  });
  this.patientService.detailurl(this.id).subscribe(p=>{
    this.patient = p ;
   });
  }

  onSubmit() {
    console.log(this.form);
    this.ordonnance = new ordonnance();
    this.ordonnance.setItem(this.form.item);
    this.ordonnance.setDescription(this.form.description);
    this.ordonnance.setDuree(this.form.duree);
    this.ordonnance.setPatient(this.patient);


    this.ordonnanceService.add(this.ordonnance).subscribe(
        data => {
          console.log(data);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              id: this.id
            }
          };
          this.router.navigate(['detailpatient'], navigationExtras);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;

        }
      );
  }

}
