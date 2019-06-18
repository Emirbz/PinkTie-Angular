import { SignUpInfo } from '../auth/signup-info';

export class PatientInfo {
    id:string;
    name: string;
    lastname: string;
    image: string;
    address: string;
    phone: string;
    description: string;
    email: string;
    user:SignUpInfo;
    img1:string;
    img2:string;
    img3:string;
    img4:string;
    note:string;
    constructor() {


    }
    setId(id:string){
      this.id = id;
  }
  setNote(note:string){
    this.note = note;
  }
    setUser(user:SignUpInfo){
      this.user = user;
  }
     setImage(image:string){
        this.image = image;
    }
    setName(name:string){
        this.name = name;
    }
    setLastName(lastname:string){
        this.lastname = lastname;
    }
    setAddress(address:string){
      this.address = address;
  }
    setPhone(phone:string){
      this.phone = phone;
}
    setDescription(description:string){
  this.description = description;
}
setEmail(email:string){
  this.email = email;
}
setImg1(img1:string){
  this.img1 = img1;
}
setImg2(img2:string){
  this.img2 = img2;
}
setImg3(img3:string){
  this.img3 = img3;
}
setImg4(img4:string){
  this.img4 = img4;
}
getName(){
  return this.name;
}
getLastName(){
  return this.lastname;
}
getImage(){
  return this.image;
}
getAddress(){
  return this.address;
}
getPhone(){
  return this.phone;
}
getDescription(){
  return this.description;
}
getEmail(){
  return this.email;
}
getDoctor(){
  return this.user;
}
getImg1(){
  return this.img1;
}
getImg2(){
  return this.img2;
}
getImg3(){
  return this.img3;
}
getImg4(){
  return this.img4;
}

}
