import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SignUpInfo } from '../auth/signup-info';
import {ActivatedRoute} from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-modifuser',
  templateUrl: './modifuser.component.html',
  styleUrls: ['./modifuser.component.css']
})
export class ModifuserComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  id:string;
  user:any;
  constructor(private userService: UserService, private ar:ActivatedRoute,private token:TokenStorageService  ) { }

  ngOnInit() {
    document.getElementById("loader").hidden=true;


  this.userService.detailurl(this.token.getUsername()).subscribe(p=>{
    this.user = p ;
    console.log(this.user);
    this.form.name = this.user.name;
    this.form.lastname = this.user.lastname;
    this.form.username = this.user.username;
    this.form.email = this.user.email;

  })
  }
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.lastname,
      this.form.password);

    this.userService.modif(this.signupInfo,this.token.getUsername()).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
