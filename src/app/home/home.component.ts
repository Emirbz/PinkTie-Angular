import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
 // username:String;
  constructor(private token: TokenStorageService,private ar:ActivatedRoute,private router:Router) {

   }



  ngOnInit() {
    document.getElementById("loader").hidden=true;

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    console.log(this.token.getAuthorities());
    //this.username = this.ar.snapshot.paramMap.get('username');
   }


   refreshPage(){
     location.replace("/home");
   }

}
