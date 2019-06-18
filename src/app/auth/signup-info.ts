export class SignUpInfo {
  name: string;
  lastname: string;
  username: string;
  email: string;
  role: string[];
  password: string;

  constructor(name: string, username: string, email: string,lastname:string, password: string) {
      this.name = name;
      this.lastname = lastname;
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = ['user'];
  }
}
