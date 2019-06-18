
export class historique {

  id:string;
  birads_0:number;
  birads_1:number;
  birads_2:number;
  date:string;
  left_b:number;
  left_m:number;
  right_b:number;
  right_m:number;


  setBirad_0(birads_0:number){
    this.birads_0=birads_0;
  }

  setBirad_1(birads_1:number){
    this.birads_1=birads_1;
  }

  setBirad_2(birads_2:number){
    this.birads_2=birads_2;
  }

  setDate(date:string){
    this.date=date;
  }

  setLeft_b(left_b:number){
    this.left_b=left_b;
  }

  setRight_b(right_b:number){
    this.right_b=right_b;
  }

  setLeft_m(left_m:number){
    this.left_m=left_m;
  }

  setRight_m(right_m:number){
    this.right_m=right_m;
  }


}
