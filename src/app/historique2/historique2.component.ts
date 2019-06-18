import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

const data = {
  chart: {
    caption: "Treatment progress",
    yaxisname: "%",
    subcaption: "",
    showhovereffect: "1",
    numbersuffix: "%",
    drawcrossline: "1",
    plottooltext: "<b>$dataValue</b> on $seriesName",
    theme: "fusion"
  },
  categories: [
    {
      category: [

      ]
    }
  ],
  dataset: [
    {
      seriesname: "Left benign",
      data: [

      ]
    },
    {
      seriesname: "Right benign",
      data: [

      ]
    },
    {
      seriesname: "Left malignant",
      data: [

      ]
    },
    {
      seriesname: "Right malignant",
      data: [

      ]
    }
  ]
};


@Component({
  selector: 'app-historique2',
  templateUrl: './historique2.component.html',
  styleUrls: ['./historique2.component.css']
})
export class Historique2Component implements OnInit {



  width = 1200;
  height = 600;
  type = "msline";
  dataFormat = "json";
  dataSource = data;




  constructor(private http:HttpClient, private ar:ActivatedRoute) { }

  public data:Observable<any>;
  public his:any[];
id:string;
  ngOnInit() {


    this.ar.queryParams.subscribe(params => {
      this.id = params["id"];
    });
    this.data = this.http.get("http://localhost:8080/api/hist/"+this.id);
    this.data.subscribe(result =>{
    this.his = result;
    console.log(this.dataSource)

      this.his.forEach(item=>{
        this.dataSource.categories[0].category.push({label:item.date})

        this.dataSource.dataset[0].data.push({value:item.left_b})

        this.dataSource.dataset[1].data.push({value:item.right_b})
        this.dataSource.dataset[2].data.push({value:item.left_m})

        this.dataSource.dataset[3].data.push({value:item.right_m})
        document.getElementById("loader").hidden=true;

      })
 });


  }

}
