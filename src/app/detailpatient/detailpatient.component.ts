import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { from, Observable, timer } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { UploadFileService } from "../services/upload-file.service";
import { PatientInfo } from "../add-patient/add-patient-info";
import { PatientService } from "../services/patient.service";
import { historique } from "../historique/historique";

import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
const URL = "http://192.168.171.1:3000/api";

@Component({
  selector: "app-detailpatient",
  templateUrl: "./detailpatient.component.html",
  styleUrls: ["./detailpatient.component.css"]
})
export class DetailpatientComponent implements OnInit {
  patientInfo: PatientInfo;
  form: any = {};
  form2: any = {};
  form3: any = {};
  form4: any = {};
  formnote: any = {};
  errorMessage = "";
  public ordonnances: any;
  public data: Observable<any>;

  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;
  progress: Number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ar: ActivatedRoute,
    private uploadService: UploadFileService,
    private patientService: PatientService
  ) {}

  title = "app";

  imageSrc2 = "";
  imageSrc = "";
  imageSrc3 = "";
  imageSrc4 = "";

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
  }

  handleInputChange2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded2(e) {
    let reader = e.target;
    this.imageSrc2 = reader.result;
  }

  handleInputChange3(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded3.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded3(e) {
    let reader = e.target;
    this.imageSrc3 = reader.result;
  }

  handleInputChange4(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded4.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded4(e) {
    let reader = e.target;
    this.imageSrc4 = reader.result;
  }

  id: string;
  patient: any;
  name: string;
  lastname: string;
  testresult: any;
  getresult: any;
  valincomplete: number = 12;
  valnormal: number = 35;
  valbenign: number = 48;
  left_malignant: number = 79;
  right_malignant: number = 3;
  left_benign: number = 48.9;
  right_benign: number = 7;
  h: historique;

  ngOnInit() {

    document.getElementById("loader").hidden = false;
    document.getElementById("rapport").hidden = true;
    document.getElementById(
      "datelyoum"
    ).innerHTML = new Date().toString().substring(0, 24);

    this.ar.queryParams.subscribe(params => {
      this.id = params["name"];
    });
    if (this.id != null) {
      console.log(this.id);
      console.log(this.id.substring(0, this.id.indexOf(".")));
      console.log(this.id.substring(this.id.indexOf(".") + 1, this.id.length));
      this.name = this.id.substring(0, this.id.indexOf("."));
      this.lastname = this.id.substring(
        this.id.indexOf(".") + 1,
        this.id.length
      );
      this.patientService.detailurl2(this.name, this.lastname).subscribe(p => {
        this.patient = p;
        console.log(this.patient);
        this.patientService.testresult(this.patient.id).subscribe(res => {
          this.testresult = res;
          console.log("testresult");
          if (this.testresult == 1) {
            console.log("testresult1");
            this.patientService.getresult(this.patient.id).subscribe(res => {
              this.getresult = res;
              this.valincomplete = this.getresult.birads_0 * 100;
              this.valnormal = this.getresult.birads_1 * 100;
              this.valbenign = this.getresult.birads_2 * 100;
              this.left_malignant = this.getresult.left_m;
              this.right_malignant = this.getresult.right_m;
              this.left_benign = this.getresult.left_b;
              this.right_benign = this.getresult.right_b;
              this.data = this.http.get("http://localhost:8080/api/listord/" + this.patient.id);
    this.data.subscribe(result => {
      this.ordonnances = result;
      console.log(this.ordonnances);
    });
            });
          } else {
            console.log("bbbb");
          }
        });
      });
      document.getElementById("boutons").hidden = true;
      document.getElementById("update").hidden = true;
      document.getElementById("prescription").hidden = true;
      document.getElementById("image").hidden = true;
      document.getElementById("loader").hidden = true;
    } else {
      this.ar.queryParams.subscribe(params => {
        this.id = params["id"];
      });
      this.patientService.detailurl(this.id).subscribe(p => {
        this.patient = p;
        console.log(this.patient);
        this.patientService.testresult(this.id).subscribe(res => {
          this.testresult = res;
          if (this.testresult == 1) {
            this.patientService.getresult(this.id).subscribe(res => {
              this.getresult = res;
              this.valincomplete = this.getresult.birads_0 * 100;
              this.valnormal = this.getresult.birads_1 * 100;
              this.valbenign = this.getresult.birads_2 * 100;
              this.left_malignant = this.getresult.left_m;
              this.right_malignant = this.getresult.right_m;
              this.left_benign = this.getresult.left_b;
              this.right_benign = this.getresult.right_b;
              this.data = this.http.get("http://localhost:8080/api/listord/" + this.id);
    this.data.subscribe(result => {
      this.ordonnances = result;
      console.log(this.ordonnances);
    });
            });
          } else {
            console.log("bbbb");
          }
        });
        document.getElementById("loader").hidden = true;
      });
      document.getElementById("rdv").hidden = true;
    }



  }
  onSubmit() {
    console.log("pffffff");
    this.patientInfo = new PatientInfo();
    this.patientInfo.setImg1(this.imageSrc);
    this.patientService.update(this.patientInfo, this.id).subscribe(
      data => {
        console.log(this.imageSrc);
        document.getElementById("sub2").style.pointerEvents = "all";
        document.getElementById("sub2").style.backgroundColor = "#00cfd1";
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  onSubmit2() {
    console.log("aaaaaaaaaaaaaaa");
    this.patientInfo = new PatientInfo();
    this.patientInfo.setImg2(this.imageSrc2);

    this.patientService.update2(this.patientInfo, this.id).subscribe(
      data => {
        console.log(data);
        document.getElementById("sub3").style.pointerEvents = "all";
        document.getElementById("sub3").style.backgroundColor = "#00cfd1";
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  onSubmit3() {
    console.log("aaaaaaaaaaaaaaa");
    this.patientInfo = new PatientInfo();
    this.patientInfo.setImg3(this.imageSrc3);

    this.patientService.update3(this.patientInfo, this.id).subscribe(
      data => {
        console.log(data);
        document.getElementById("sub4").style.pointerEvents = "all";
        document.getElementById("sub4").style.backgroundColor = "#00cfd1";
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  onSubmit4() {
    console.log("aaaaaaaaaaaaaaa");
    this.patientInfo = new PatientInfo();
    this.patientInfo.setImg4(this.imageSrc4);

    this.patientService.update4(this.patientInfo, this.id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
  save() {
    this.progress = 50;
    this.http
      .request("GET", "http://192.168.1.12:6969/save?id=" + this.id)
      .subscribe(res => {
        console.log(res);
        this.progress = 100;
      });
  }

  CheckResults() {
    this.progress = 50;
    this.http
      .request("GET", "http://192.168.1.12:6969/test?patient=" + this.id)
      .subscribe(res => {
        console.log(res);
        this.progress = 100;
        var c = res[0];
        this.valincomplete = c[0] * 100;
        this.valnormal = c[1] * 100;
        this.valbenign = c[2] * 100;
      });
  }
  modif() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.id
      }
    };
    this.router.navigate(["modifpatient"], navigationExtras);
  }
  addPres() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.id
      }
    };
    this.router.navigate(["addordonnance"], navigationExtras);
  }

  Note() {
    document.getElementById("noteDiv").hidden = false;
  }

  AddNote() {
    console.log(this.formnote.note);
    this.patientInfo = new PatientInfo();
    this.patientInfo.setNote(this.formnote.note);
    this.patientService.addNote(this.patientInfo, this.id).subscribe(
      data => {
        console.log(data);
        this.patientService.detailurl(this.id).subscribe(p => {
          this.patient = p;
          document.getElementById("noteDiv").hidden = true;
        });
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  goToRDV() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.id
      }
    };
    this.router.navigate(["book"], navigationExtras);
  }

  Classificate() {
    this.progress = 50;
    this.http
      .request("GET", "http://192.168.1.12:2501/run?id=" + this.id)
      .subscribe((res: any) => {
        this.progress = 100;
        console.log(res);
        this.left_malignant = res[0].left_malignant * 100;
        this.right_malignant = res[0].right_malignant * 100;
        this.left_benign = res[0].left_benign * 100;
        this.right_benign = res[0].right_benign * 100;
        this.UpdateResults();
        this.historique();
      });
  }
  testheat: any;
  Heatmap() {
    this.patientService.testheat(this.id).subscribe(res => {
      this.testheat = res;
      if (this.testheat == 1) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            id: this.id
          }
        };
        this.router.navigate(["/heatmap"], navigationExtras);
      } else {
        this.progress = 50;
        this.http
          .request("GET", "http://192.168.1.12:2503/heatmap?id=" + this.id)
          .subscribe((res: any) => {
            this.progress = 100;
            console.log(res);
            let navigationExtras: NavigationExtras = {
              queryParams: {
                id: this.id
              }
            };
            this.router.navigate(["/heatmap"], navigationExtras);
          });
      }
    });
  }

  UpdateResults() {
    var body = new HttpParams()
      .set("l_b", this.left_benign.toString())
      .set("l_m", this.left_malignant.toString())
      .set("r_b", this.right_benign.toString())
      .set("r_m", this.right_malignant.toString())
      .set("id", this.id);

    this.http
      .put("http://localhost:8080/api/updateresults", body.toString(), {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(res => {
        console.log(res);
      });
  }
  historique() {
    this.h = new historique();
    this.h.setBirad_0(this.valincomplete);
    this.h.setBirad_1(this.valnormal);
    this.h.setBirad_2(this.valbenign);
    this.h.setLeft_b(this.left_benign);
    this.h.setLeft_m(this.left_malignant);
    this.h.setRight_b(this.right_benign);
    this.h.setRight_m(this.right_malignant);

    this.patientService.addhistorique(this.h, this.id).subscribe(res => {
      console.log(res);
    });
  }
  stat() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.id
      }
    };
    this.router.navigate(["/historique2"], navigationExtras);
  }

  capture(){

//    document.getElementById("loader").hidden = false;
    document.getElementById("rapport").hidden = false;
    var data = document.getElementById('rapport');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
      document.getElementById("rapport").hidden = true;

    });

  //  document.getElementById("loader").hidden = true;
  }


}
