import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { User } from "./assets/User";
import axios, { AxiosResponse } from "axios";
import UserIcon from "./assets/Icons/UserIcon";
import PassTextArea from "./assets/PassTextArea";
import Toggler from "./assets/Icons/Toggler";
import { useContext } from "react";
import { PassContext } from "./assets/Icons/Context/ContextProvider";

const numbers: number = 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9;

export const FormSchema = z
  .object({
    firstName: z.coerce
      .string()
      .min(1, { message: "At least one char" })
      .max(255, { message: "LIMIT REACHED FOR FIRST NAME" })
      .trim()
      .refine(
        (value) => {
          return !value.includes(numbers.toString());
        },
        { message: "Name cannot contain numbers" }
      ),
    surName: z.coerce
      .string()
      .min(1, { message: "At least one char" })
      .max(255, { message: "LIMIT REACHED FOR SECOND NAME" })
      .trim()
      .superRefine((field, ctx) => {
        if (field.includes(numbers.toString())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Name cannot contain numbers",
          });
        }
      }),
    email: z.string().email({ message: "Invalid Email" }).trim(),
    password: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: "Invalid Password Format",
      }),
  })
  .required();

export type Form = z.infer<typeof FormSchema>;

function App(): JSX.Element {
  const context = useContext(PassContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<Form> = (data) => {
    const register__USER = async () => {
      try {
        const created = new User(
          data.firstName,
          data.surName,
          data.email,
          data.password
        );
        const sent: AxiosResponse<User, User> = await axios.post(
          "http://localhost:3000/users",
          {
            user: created,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (sent.status !== 200) {
          throw new Error(`STATUS ERROR:${sent.status}`);
        }

        console.log(`User Added:${created}`);
      } catch (err: unknown) {
        console.log(err);
      }
    };
    register__USER();
  };
  return (
    <>
      <form title="REG__USER__FORM" onSubmit={handleSubmit(onSubmit)}>
        <UserIcon />

        <input
          type="text"
          {...register("firstName")}
          id="name"
          placeholder="Firstname"
        />
        {errors.firstName && (
          <span className="error-class">{errors.firstName?.message}</span>
        )}
        <input
          type="text"
          {...register("surName")}
          id="surname"
          placeholder="Surname"
        />
        {errors.surName && (
          <span className="error-class">{errors.surName?.message}</span>
        )}
        <input
          {...register("email")}
          type="text"
          id="email"
          placeholder="Mail Address"
        />
        {errors.email && (
          <span className="error-class">{errors.email?.message}</span>
        )}
        <input
          type={context?.Type}
          {...register("password")}
          id="pass"
          placeholder="Password"
        />
        <div className="container relative">
          <Toggler />
        </div>

        {errors.password && (
          <span className="error-class">{errors.password?.message}</span>
        )}

        <PassTextArea
          requirements={{
            firstReq: "Must match exactly 8 chars",
            secondReq: "At least 1 Uppercase letter",
            thirdReq: "At least 1 Lowercase letter",
            fourthReq: "At least 1 Number",
            fifthReq: "At least 1 Special Char(@,$,etc)",
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
