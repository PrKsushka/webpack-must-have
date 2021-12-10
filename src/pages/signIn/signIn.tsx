import React, { useState } from "react";
import Modal from "@/components/modal/modal";
import signin from "../../components/input/input.module.scss";
import { SignIn } from "@/types/types";
import Input from "@/components/input/input";
import { useDispatch, useSelector } from "react-redux";
import { signAction } from "@/redux/actions/authActions";
import { RootState } from "@/main";

const SignIn: React.FunctionComponent<SignIn> = function () {
  const [checkField, setCheckField] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  function handleClick(e: { preventDefault: () => void }) {
    e.preventDefault();
    const formData = {
      name: input.name,
      password: input.password,
    };
    dispatch(signAction(formData));
  }

  const enabled = input.name.length > 0 && input.password.length > 0 && !checkField;
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
        <button type="button" className={signin.but} onClick={handleClick} disabled={!enabled}>
          Отправить
        </button>
      </form>
    </Modal>
  );
};
export default SignIn;
