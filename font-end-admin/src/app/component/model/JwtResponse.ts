export class JwtResponse{
  public  token: string;
  public  type: string;
  public  userName: string;
  public  role: string;
  public  code: string;
  public  phone: string;
  public  email: string;

  constructor(token: string, type: string, userName: string, role: string, code: string, phone: string, email: string) {
    this.token = token;
    this.type = type;
    this.userName = userName;
    this.role = role;
    this.code = code;
    this.phone = phone;
    this.email = email;
  }
}
