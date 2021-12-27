import * as yup from "yup";

export const loginRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Login is required!")
    .matches(
      /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
      "Login should start with letter in uppercase and then letters lower case"
    ),
  password: yup
    .string()
    .min(4, "Password must contain at least 4 characters")
    .required("Password is required please !")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,16}$/,
      "Password should start from number, include at least 1 number [0-9], at least one letter in lower and one in upper case and at least one symbol "
    ),
  passwordDuplicate: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});
