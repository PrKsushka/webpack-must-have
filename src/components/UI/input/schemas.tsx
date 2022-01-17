import * as yup from "yup";

export const loginRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
      "Login should start with letter in uppercase and then letters lower case"
    ),
  password: yup
    .string()
    .min(4, "Password must contain at least 4 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,16}$/,
      "Password should start from number, include at least 1 number [0-9], at least one letter in lower and one in upper case and at least one symbol "
    ),
  passwordDuplicate: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  age: yup
    .string()
    .max(3, "Age should be from 0-100")
    .matches(/^\d+(?:\.\d+)?$/, "Age should include only numbers"),
  description: yup.string().matches(/^.{5,500}$/, "Your description  should include from 5 to 500 symbols"),
});

export const editAddNewProductModal=yup.object().shape({
  title: yup.string().matches(/^.{5,20}$/, "Title  should include from 5 to 20 symbols"),
  genres: yup.string().matches(/^.{4,10}$/, "Genres  should include from 4 to 10 symbols"),
  price: yup.number().min(1, "Price should include at least one symbol"),
  image: yup.string().matches(/^.{5,100}$/, "Path for image  should include from 5 to 20 symbols"),
  description: yup.string().matches(/^.{5,500}$/, "Your description  should include from 5 to 500 symbols"),
})

