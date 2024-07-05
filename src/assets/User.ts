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
    this.firstName = firstName[0].toUpperCase().concat(firstName.slice(1));
    this.surName = surName[0].toUpperCase().concat(surName.slice(1));
    this.email = email;
    this.password = password;
  }
}
