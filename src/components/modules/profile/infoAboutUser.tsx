import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginRegisterSchema } from "@/components/UI/input/schemas";
import { dataForm } from "@/types/productsCommon.types";
import { changeDataAboutUserAction } from "@/store/modules/auth/auth.actions";
import signin from "@/components/UI/input/input.module.scss";
import Input from "@/components/UI/input/input";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import info from "./infoAboutUser.module.scss";
import { StoreState } from "@/store/types";

const InfoAboutUser: React.FunctionComponent = function () {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(loginRegisterSchema) });
  const [submitForm, setSubmitForm]=useState(false);
  const dispatch = useDispatch();
  const onSubmit = (dataAboutUser: dataForm) => {
    if (dataAboutUser) {
      dispatch(changeDataAboutUserAction(dataAboutUser));
    }
    setSubmitForm(true);
    reset();
  };
  const changedInfo = [info.commonInfo, info.changedInfo].join(" ");
  const notChangedInfo = [info.commonInfo, info.notChangedInfo].join(" ");
  const name=useSelector((state: StoreState)=>state.auth.userData.name);
  return (
    <form className={signin.formData} onSubmit={handleSubmit(onSubmit)} id="formElem">
      {submitForm ? (
        <span className={changedInfo}>You have changed information about yourself</span>
      ) : (
        <span className={notChangedInfo}>Let's change data about you</span>)}
      <Input
        name="name"
        text="User name"
        registerOptions={{
          required: true,
        }}
        register={register}
        value={name}
      />
      {errors.name ? <ErrorMessage>{errors.name.message}</ErrorMessage> : null}
      <br />
      <Input
        name="age"
        text="Age"
        registerOptions={{
          required: true,
        }}
        register={register}
      />
      {errors.age ? <ErrorMessage>{errors.age.message}</ErrorMessage> : null}
      <br />
      <Input
        name="description"
        text="Description"
        registerOptions={{
          required: true,
        }}
        register={register}
      />
      {errors.description ? <ErrorMessage>{errors.description.message}</ErrorMessage> : null}
      <br />
      <button type="submit" className={signin.but}>
        Submit
      </button>
    </form>
  );
};
export default InfoAboutUser;
