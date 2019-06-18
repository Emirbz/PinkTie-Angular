import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  AfterViewInit
} from "@angular/core";
import { PatientInfo } from "./add-patient-info";
import { PatientService } from "../services/patient.service";
import { TokenStorageService } from "../auth/token-storage.service";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { ElementRef } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.css"]
})
export class AddPatientComponent implements OnInit {
  form: any = {};
  patientInfo: PatientInfo;
  errorMessage = "";
  img: any;
  user: any;

  constructor(
    private token: TokenStorageService,
    private patientService: PatientService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    document.getElementById("loader").hidden = true;
    this.userService.detailurl(this.token.getUsername()).subscribe(p => {
      this.user = p;
      console.log(this.user.id);
    });
  }

  imageSrc: string = "";
  imageSrcc: string = "";

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
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
    console.log(this.imageSrc);
  }

  AddFailed = false;

  onSubmit() {
    if (
      this.CheckNameTest &&
      this.CheckPhoneTest &&
      this.CheckEmailTest &&
      this.CheckAddressTest &&
      this.CheckDescTest &&
      this.CheckLastName
    ) {
      this.imageSrcc = document.getElementById("imageSrc").innerHTML;
      console.log(this.form);
      console.log(this.imageSrc);
      this.patientInfo = new PatientInfo();
      this.patientInfo.setLastName(this.form.lastname);
      this.patientInfo.setName(this.form.name);
      if (this.imageSrc == "") {
        this.patientInfo.setImage(this.imageSrcc);
      } else {
        this.patientInfo.setImage(this.imageSrc);
      }

      this.patientInfo.setAddress(this.form.address);
      this.patientInfo.setDescription(this.form.description);
      this.patientInfo.setEmail(this.form.email);
      this.patientInfo.setPhone(this.form.phone);
      this.patientInfo.setUser(this.user);

      this.patientService.signUp(this.patientInfo).subscribe(
        data => {
          console.log(data);
          document.getElementById("form-success").hidden = false;
          document.getElementById("form-error").hidden = true;
          this.router.navigate(["/listpatients"]);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.AddFailed = true;
          document.getElementById("form-error").hidden = false;
          document.getElementById("form-success").hidden = true;
        }
      );
    } else {
      document.getElementById("form-error").hidden = false;
      document.getElementById("form-success").hidden = true;
    }
  }
  /*onSubmit() {
    console.log(this.form);
    this.patientInfo = new PatientInfo();
    this.patientInfo.setLastName(this.form.lastname);
    this.patientInfo.setName(this.form.name);
    this.patientInfo.setImage(this.imageSrc);
    this.patientInfo.setAddress(this.form.address);
    this.patientInfo.setDescription(this.form.description);
    this.patientInfo.setEmail(this.form.email);
    this.patientInfo.setPhone(this.form.phone);
    this.patientInfo.setUser(this.user);

    this.patientService.signUp(this.patientInfo).subscribe(
      data => {
        console.log(data);
        document.getElementById("form-success").hidden = false;
        document.getElementById("form-error").hidden = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        document.getElementById("form-error").hidden = false;
        document.getElementById("form-success").hidden = true;

      }
    );
  }
*/
  CheckNameTest;
  CheckLastNameTest;
  CheckEmailTest;
  CheckDescTest;
  CheckPhoneTest;
  CheckAddressTest;

  CheckName(event) {
    if (event.length > 2) {
      document.getElementById("name").classList.add("has-success");
      document.getElementById("name").classList.remove("has-danger");
      this.CheckNameTest = true;
    } else {
      document.getElementById("name").classList.add("has-danger");
      document.getElementById("name").classList.remove("has-success");
      this.CheckNameTest = false;
    }
  }
  CheckLastName(event) {
    if (event.length > 2) {
      document.getElementById("lastname").classList.add("has-success");
      document.getElementById("lastname").classList.remove("has-danger");
      this.CheckLastNameTest = true;
    } else {
      document.getElementById("lastname").classList.add("has-danger");
      document.getElementById("lastname").classList.remove("has-success");
      this.CheckLastNameTest = false;
    }
  }
  CheckPhone(event) {
    if (event.length > 3) {
      document.getElementById("phone").classList.add("has-success");
      document.getElementById("phone").classList.remove("has-danger");
      this.CheckPhoneTest = true;
    } else {
      document.getElementById("phone").classList.add("has-danger");
      document.getElementById("phone").classList.remove("has-success");
      this.CheckPhoneTest = false;
    }
  }

  CheckEmail(event) {
    if (event.length > 3 && event.indexOf("@") != -1) {
      document.getElementById("email").classList.add("has-success");
      document.getElementById("email").classList.remove("has-danger");
      this.CheckEmailTest = true;
    } else {
      document.getElementById("email").classList.add("has-danger");
      document.getElementById("email").classList.remove("has-success");
      this.CheckEmailTest = false;
    }
  }
  CheckAddress(event) {
    if (event.length > 2) {
      document.getElementById("address").classList.add("has-success");
      document.getElementById("address").classList.remove("has-danger");
      this.CheckAddressTest = true;
    } else {
      document.getElementById("address").classList.add("has-danger");
      document.getElementById("address").classList.remove("has-success");
      this.CheckAddressTest = false;
    }
  }
  CheckDescription(event) {
    if (event.length > 10) {
      document.getElementById("description").classList.add("has-success");
      document.getElementById("description").classList.remove("has-danger");
      this.CheckDescTest = true;
    } else {
      document.getElementById("description").classList.add("has-danger");
      document.getElementById("description").classList.remove("has-success");
      this.CheckDescTest = false;
    }
  }
}
