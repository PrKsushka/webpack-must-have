import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useHistory } from "react-router-dom";
import Input from "../../../UI/input/input";
import ErrorMessage from "../../../errorMessage/errorMessage";
import SelectHookForm from "../../../UI/select/selectHookForm";
import { StoreState } from "../../../../store/types";
import { productsInShoppingCart, totalPrice } from "../../../../store/modules/products/product.selectors";
import { loginRegisterSchema } from "../../../UI/input/schemas";
import { setModalActive } from "../../../../store/modules/auth/auth.actions";
import { logOutFromCartAction } from "../../../../store/modules/products/products.actions";
import { links } from "../../../../constants/routeMenuConstant";
import { FormForOrderTypes, UserDataOrder } from "./formForOrder.types";
import styles from "./formForOrder.module.scss";

const FormForOrder: React.FunctionComponent<FormForOrderTypes> = function ({ funcForModal }) {
  const result = useSelector((state: StoreState) => totalPrice(state));
  const cart = useSelector((state: StoreState) => productsInShoppingCart(state));
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(loginRegisterSchema) });
  const paymentMethods = ["Cash", "Credit card", "Web money", "Bitcoin"];
  const history = useHistory();
  const finishShopping = (data: UserDataOrder) => {
    if (cart.length) {
      console.log(data);
      dispatch(setModalActive());
      funcForModal(true);
      dispatch(logOutFromCartAction());
      reset();
    } else {
      history.push(links.products);
    }
  };

  return (
    <form onSubmit={handleSubmit(finishShopping)} className={styles.formData}>
      <Input
        name="description"
        text="Enter your location (city, street, etc)"
        registerOptions={{
          required: true,
        }}
        register={register}
      />
      {errors.description ? <ErrorMessage>{errors.description.message}</ErrorMessage> : null}
      <br />
      <Input
        name="code"
        text="Enter your city code"
        registerOptions={{
          required: true,
        }}
        register={register}
      />
      {errors.code ? <ErrorMessage>{errors.code.message}</ErrorMessage> : null}
      <br />
      <span className={styles.title}>Add your payment method</span>
      <SelectHookForm
        arr={paymentMethods}
        name="payment"
        defaultVal={paymentMethods[0]}
        registerOption={{
          required: true,
        }}
        register={register}
      />
      <br />
      <p className={styles.title}>Total: {result}$</p>
      <button type="submit" className={styles.but}>
        Order
      </button>
    </form>
  );
};
export default FormForOrder;
