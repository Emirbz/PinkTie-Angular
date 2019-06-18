import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import {Router,NavigationExtras} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { EventEmitter } from 'events';
import { UserService } from '../services/user.service';


@Component({
  providers: [HomeComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  refresh = false;
  constructor(private userservice:UserService, private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router,private hc :HomeComponent) { }

  ngOnInit() {
    document.getElementById("loader").hidden=true;

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.userservice.detailurl(this.form.username).subscribe((r:any)=>{
          this.tokenStorage.saveId(r.id);
        })
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.refresh = true;
        if (this.tokenStorage.getAuthorities()[0]=="ROLE_PM"){
          let navigationExtras: NavigationExtras = {
            queryParams: {
                "name": this.tokenStorage.getUsername(),
            }
        };
          this.router.navigate(["detailpatient"], navigationExtras);
      }
      else {
        this.hc.refreshPage();
      }
       // this.router.navigate(["/home"]);
      //  this.hc.refreshPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
