import { PatientInfo } from '../add-patient/add-patient-info';

export class ordonnance {

  id:string;
  item:string;
  description:string;
  duree:string;
  patient:PatientInfo;


  setItem(item:string){
    this.item=item;
  }
  setDescription(description:string){
    this.description=description
  }
  setDuree(duree:string){
    this.duree=duree;
  }
  setPatient(patient:PatientInfo){
    this.patient=patient;
  }





}
