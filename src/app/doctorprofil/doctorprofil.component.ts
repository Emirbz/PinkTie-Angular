import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-doctorprofil',
  templateUrl: './doctorprofil.component.html',
  styleUrls: ['./doctorprofil.component.css']
})
export class DoctorprofilComponent implements OnInit {
info:any;
user:any;
  constructor(private token: TokenStorageService, private http:HttpClient, private userService:UserService) { }

  ngOnInit() {
    document.getElementById("loader").hidden=true;

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };


    this.userService.getUserByUsername(this.token.getUsername()).subscribe(p=>{
      this.user = p ;
     });

  }

}
