import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public minDate: Date = new Date ();
  public maxDate: Date = new Date ('05/27/2019');
  public value: Date = new Date ();
  form: any = {};

  constructor(private router:Router, private ar:ActivatedRoute, private http:HttpClient,private token:TokenStorageService) { }
id:string;
  ngOnInit() {
    this.ar.queryParams.subscribe(params => {
      this.id = params["id"];
    });
    //this.BookRdv();
    //this.form.date;
    document.getElementById("loader").hidden=true;


  }


  CheckRdv3(d:String,t:String){

      var body = new HttpParams()
      .set('time', t.toString())
      .set('DoctorId', this.token.getId())
      .set('date',d.toString());

      this.http.post("http://localhost:8080/api/rdv/checkrdv3",body.toString(),{
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).subscribe((res : any[])=>{
        if (res.length !=0){
         console.log("Already Booked !!");
         console.log(res);
         document.getElementById("success").hidden = true;
         document.getElementById("erreur").hidden = false;

        }
        else {
          console.log("Good");
          console.log(res);
          this.BookRdv(this.form.date,this.form.time);
          document.getElementById("success").hidden = false;
          document.getElementById("erreur").hidden = true;

          (async () => {
            // Do something before delay
            console.log('before delay')

            await this.delay(1000);

            // Do something after
            let navigationExtras: NavigationExtras = {
              queryParams: {
                name: this.id
              }
            };
            this.router.navigate(["detailpatient"], navigationExtras);
                  })();

        }

      });




  }


  BookRdv(d:String,t:String){

    var body = new HttpParams()
    .set('time', t.toString())
    .set('PatientId', this.token.getId())
    .set('date',d.toString());

    this.http.post("http://localhost:8080/api/rdv/addrdv2",body.toString(),{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).subscribe(res=>{
      console.log(res);
      console.log("good");
      //this.CheckRdv3();

    });

  }
  delay(ms: number) {

    return new Promise( resolve => setTimeout(resolve, ms) );
}

  onSubmit() {
  console.log(this.form.date);
  console.log(this.form.time);
  //this.BookRdv(this.form.date,this.form.time);
  this.CheckRdv3(this.form.date,this.form.time);

  }




}
