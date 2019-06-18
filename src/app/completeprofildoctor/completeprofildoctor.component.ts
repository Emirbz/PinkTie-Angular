import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { profilInfo } from './profilInfo';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-completeprofildoctor',
  templateUrl: './completeprofildoctor.component.html',
  styleUrls: ['./completeprofildoctor.component.css']
})
export class CompleteprofildoctorComponent implements OnInit {
  form: any = {};
  user:any;
  profilInfo:profilInfo;

  constructor(private userService:UserService,private token: TokenStorageService) { }

  ngOnInit() {
    document.getElementById("loader").hidden=true;

    this.userService.getUserByUsername(this.token.getUsername()).subscribe(p=>{
      this.user = p ;
      console.log(this.user.id);
     });

  }

  onSubmit() {
    console.log(this.user.id);

    this.profilInfo = new profilInfo();
    this.profilInfo.setSpeciality(this.form.speciality);
    this.profilInfo.setAddress(this.form.address);
    this.profilInfo.setDescription(this.form.description);
    this.profilInfo.setHopital(this.form.hopital);
    this.profilInfo.setSchool(this.form.school);
    this.userService.updateDoctor(this.profilInfo, this.user.id).subscribe(
        data => {
          console.log(data);
        },

      );

  }

}
