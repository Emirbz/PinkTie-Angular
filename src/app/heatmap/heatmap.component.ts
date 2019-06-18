import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  constructor(private http:HttpClient, private ar:ActivatedRoute) { }
id:any;
images:string[]=[];
names:string[]=["Begnin left CC", "Begnin left MLO", "Begnin right CC", "Begnin right MLO", "Malignant left CC", "Malignant left MLO", "Malignant right CC", "Malignant right MLO"]
  ngOnInit() {
    document.getElementById("loader").hidden =false;

    this.ar.queryParams.subscribe(params => {
      this.id = params["id"];
  });


  this.http.get("http://localhost:8080/api/heatmap/"+this.id).subscribe((res:any)=>{
console.log(res);
  this.images.push("data:image/jpeg;base64,"+res.b_l_cc);
  this.images.push("data:image/jpeg;base64,"+res.b_l_mlo);
  this.images.push("data:image/jpeg;base64,"+res.b_r_cc);
  this.images.push("data:image/jpeg;base64,"+res.b_r_mlo);
  this.images.push("data:image/jpeg;base64,"+res.m_l_cc);
  this.images.push("data:image/jpeg;base64,"+res.m_l_mlo);
  this.images.push("data:image/jpeg;base64,"+res.m_r_cc);
  this.images.push("data:image/jpeg;base64,"+res.m_r_mlo);
  document.getElementById("loader").hidden =true;


  })
  }

}
