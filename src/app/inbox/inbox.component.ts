import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from "../auth/token-storage.service";
import { UserService } from "../services/user.service";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.css"]
})
export class InboxComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    private userService: UserService
  ) {}
  listPatients: any;
  user: any;
  ngOnInit() {
    document.getElementById("loader").hidden = true;
    this.getAllPatients();
  }

  listMessages: any;
  Doctorid;
  firsttime: boolean = true;

  getAllPatients() {
    this.userService
      .getUserByUsername(this.token.getUsername())
      .subscribe((p: any) => {
        this.user = p;
        this.http
          .get(
            "http://localhost:8080/api/listpatientsbydoctor/" +
              this.user.id.toString()
          )
          .subscribe(res => {
            this.listPatients = res;

            console.log(this.listPatients);
          });
      });
  }
  subscription: Subscription;
interval;
  getAllMessages(patientid: string) {
    this.CurrentPatientId = patientid;
    this.userService
      .getUserByUsername(this.token.getUsername())
      .subscribe((p: any) => {
        this.Doctorid = p.id;
        console.log(this.Doctorid);
        this.http
          .get(
            "http://localhost:8080/api/msg/list/" +
              this.Doctorid +
              "/" +
              patientid
          )
          .subscribe((res: any) => {
            this.listMessages = res;
            console.log(this.listMessages);
            document.getElementById(
              "userchatwith"
            ).innerHTML = document.getElementById(patientid).innerHTML;
            //  const source = interval(5000);
            //this.subscription = source.subscribe(val => this.getAllMessages(this.CurrentPatientId));
             this.interval = setInterval(r => this.getAllMessages(this.CurrentPatientId), 2000);
          });
        this.firsttime = false;
      });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  isDoctor(Doctorid: string) {
    if (Doctorid == this.Doctorid) {
      return true;
    } else {
      return false;
    }
  }
  CurrentPatientId;
  sendMessage() {
    var msg = (<HTMLInputElement>document.getElementById("sendMsg")).value;
    if (msg != "") {
      var body = new HttpParams()
        .set("msg_body", msg)
        .set("sender_id", this.Doctorid)
        .set("receiver_id", this.CurrentPatientId);
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
  searchTxt;
  SearchPatient() {
    if (this.searchTxt != "") {
      this.listPatients = this.listPatients.filter(t =>
        t.name.toLowerCase().includes(this.searchTxt.toLowerCase())
      );
    } else {
      this.getAllPatients();
    }
  }
}
