import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from "../auth/token-storage.service";
import { UserService } from "../services/user.service";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-patient-inbox",
  templateUrl: "./patient-inbox.component.html",
  styleUrls: ["./patient-inbox.component.css"]
})
export class PatientInboxComponent implements OnInit {
  Doctor: any;
  CurrentPatientId: any;
  listMessages: any;
  firsttime: boolean;
  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    private userService: UserService
  ) {}
  interval;
  ngOnInit() {
    document.getElementById("loader").hidden = true;

    this.userService
      .getUserByUsername(this.token.getUsername())
      .subscribe((p: any) => {
        this.CurrentPatientId = p.id;
        console.log(this.CurrentPatientId);
        this.http
          .get("http://localhost:8080/api/GetDoctorByPatient/" + p.id)
          .subscribe((d: any) => {
            this.Doctor = d;
            this.getAllMessages();
          });
      });
    this.interval = setInterval(r => this.getAllMessages(), 2000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  subscription: Subscription;

  getAllMessages() {
    this.http
      .get(
        "http://localhost:8080/api/msg/list/" +
          this.Doctor.id +
          "/" +
          this.CurrentPatientId
      )
      .subscribe((res: any) => {
        this.listMessages = res;
        console.log(this.listMessages);
        document.getElementById("userchatwith").innerHTML =
          this.Doctor.name + " " + this.Doctor.lastname;

      });
    this.firsttime = false;
  }



  sendMessage() {
    var msg = (<HTMLInputElement>document.getElementById("sendMsg")).value;
    if (msg != "") {
      var body = new HttpParams()
        .set("msg_body", msg)
        .set("sender_id", this.CurrentPatientId)
        .set("receiver_id", this.Doctor.id);
      this.http
        .post("http://localhost:8080/api/msg/add", body.toString(), {
          headers: new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          )
        })
        .subscribe(res => {
          console.log(res);

          (<HTMLInputElement>document.getElementById("sendMsg")).value = "";
        });
    }
  }

  isDoctor(Doctorid: string) {
    if (Doctorid == this.Doctor.id) {
      return true;
    } else {
      return false;
    }
  }
}
