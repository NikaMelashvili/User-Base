export class SignUp {
  email!: string;
  password!: string;
  imageBase64!: string;

  constructor(email: string, password: string, base64Image: string) {
    this.email = email;
    this.password = password;
    this.imageBase64 = base64Image;
  }
}
