import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {
  id:string;
   Times : string[] = ['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'];
  ngOnInit() {
    
    this.CheckRdv(this.Times)
    this.ar.queryParams.subscribe(params => {
      this.id = params["id"];
  });
   
  }
  ngAfterContentInit() {
    this.setDay(new Date());
  }
  ngAfter
  today: Date = new Date();


  constructor(private http:HttpClient, private ar:ActivatedRoute) { }

  nextDay() {
    var date = new Date(this.today.getTime() + 24 * 60 * 60 * 1000);
    this.setDay(date);
    this.CheckRdv(this.Times);

  }
  previousDay() {
    
    var date = new Date(this.today.getTime() - 24 * 60 * 60 * 1000);
    var now = new Date();
    if(now>date){
      this.setDay(now);
    }else{
      this.setDay(date);
    }
    this.CheckRdv(this.Times);

  }
  setDay(newDate: Date) {
    this.today = newDate;
  }
  BookRdv(time:string){
    
    var body = new HttpParams()
    .set('time', time)
    .set('PatientId', this.id)
    .set('DoctorId', '1')
    .set('date',this.today.toString());
    
    this.http.post("http://localhost:8080/api/rdv/addrdv",body.toString(),{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).subscribe(res=>{console.log(res);
      this.CheckRdv(this.Times);
    
    });
    
  }

  CheckRdv(array:string[]){
    array.forEach(element => {
      var body = new HttpParams()
      .set('time', element)
      .set('DoctorId', '1')
      .set('date',this.today.toString());
      
      this.http.post("http://localhost:8080/api/rdv/checkrdv",body.toString(),{
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).subscribe((res : any[])=>{
        if (res.length !=0){
          document.getElementById(element).style.backgroundColor = "red"
          document.getElementById(element).style.pointerEvents = "none"

        }
        else {
          document.getElementById(element).style.backgroundColor = "white"
          document.getElementById(element).style.pointerEvents = "all"
        }
      
      });
      
    });
   

  }
}
