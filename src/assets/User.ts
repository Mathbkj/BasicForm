import { Form } from "../App";

export class User implements Form {
  firstName = "";
  surName = "";
  email = "";
  password = "";
  constructor(
    firstName: string,
    surName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.surName = surName;
    this.email = email;
    this.password = password;
  }
}
