import axios from "axios";
import { signInRegistraionPostDataTypes } from "../types/logInLogOutCommon.types";

export const signInPostData = ({ formData }: signInRegistraionPostDataTypes) =>
  axios.post("/api/auth/signIn", formData);

export const registrationPostData = ({ formData }: signInRegistraionPostDataTypes) =>
  axios.put("/api/auth/signUp", formData);

export const changePasswordPostData = ({ formData }: signInRegistraionPostDataTypes) =>
  axios.post("/api/changePassword", formData);

export const changeDataAboutUser = ({ formData }: signInRegistraionPostDataTypes) =>
  axios.post("/api/saveProfile", formData);

