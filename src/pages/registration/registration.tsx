import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "@/components/modal/modal";
import signin from "../../components/input/input.module.scss";
import { HandleClickTypes } from "../../types/types";
import Input from "../../components/input/input";
import { useDispatch, useSelector } from "react-redux";
import { registrationAction } from "@/redux/actions/authActions";
import { RootState } from "@/main";

const Registration: React.FunctionComponent = function () {
  const [checkField, setCheckField] = useState(false);
  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  const authorized = useSelector<RootState, boolean>((state) => state.auth.authorized);
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    password: "",
    passwordDuplicate: "",
  });

  function handleClick(e: HandleClickTypes) {
    e.preventDefault();
    const formData = {
      name: input.name,
      password: input.password,
    };
    (authorized) ? history.push("/profile") : history.push("/");
    dispatch(registrationAction(formData));
  }

  const enabled =
    input.name.length > 0 && input.password.length > 0 && input.passwordDuplicate.length > 0 && !checkField;
  return (
    <Modal isActive={active}>
      <form className={signin.formData}>
        <Input
          type="text"
          name="name"
          text="Login"
          value={input.name}
          setElem={setInput}
          setCheckField={setCheckField}
          input={input}
        />
        <br />
        <Input
          type="password"
          name="password"
          text="Password"
          value={input.password}
          setElem={setInput}
          setCheckField={setCheckField}
          input={input}
        />
        <br />
        <Input
          type="password"
          name="passwordDuplicate"
          text="Repeat your password"
          value={input.passwordDuplicate}
          setElem={setInput}
          setCheckField={setCheckField}
          input={input}
        />
        <br />
        <button type="button" className={signin.but} onClick={handleClick} disabled={!enabled}>
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default Registration;
