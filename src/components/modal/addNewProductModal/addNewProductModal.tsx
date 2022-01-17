import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { editAddNewProductModal } from "@/components/UI/input/schemas";
import { dataForm } from "@/types/productsCommon.types";
import signin from "@/components/UI/input/input.module.scss";
import Input from "@/components/UI/input/input";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import Modal from "@/components/modal/modal";
import { setModalInActive } from "@/store/modules/auth/auth.actions";
import SelectHookForm from "@/components/UI/select/selectHookForm";
import InputCheckbox from "@/components/UI/inputCheckbox/inputCheckbox";
import styles from "../editModal/editModal.module.scss";
import { addNewPositionAction } from "../../../store/modules/products/products.actions";
import { StoreState } from "@/store/types";
import { RootState } from "@/main";


const AddNewProductModal: React.FunctionComponent = function () {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(editAddNewProductModal) });
  const dispatch = useDispatch();
  const { body } = document;
  const onSubmit = (data: dataForm) => {
    console.log(data);
    if (data) {
      dispatch(addNewPositionAction(data));
      body.style.overflow = "auto";
    }
    dispatch(setModalInActive());
    reset();
  };
  const isActiveAddNewProductModal = useSelector<RootState, boolean>((state: StoreState) => state.auth.addNewProductModal);
  const ages = ["3+", "6+", "12+", "18+"];
  const categories = ["pc", "xbox", "playstation"];
  return (
    <Modal isActive={isActiveAddNewProductModal}>
      <form className={signin.formData} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          text="Name"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.title ? <ErrorMessage>{errors.title.message}</ErrorMessage> : null}
        <br />
        <Input
          name="genres"
          text="Genres"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.genres ? <ErrorMessage>{errors.genres.message}</ErrorMessage> : null}
        <br />
        <Input
          name="price"
          text="Price"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.price ? <ErrorMessage>{errors.price.message}</ErrorMessage> : null}
        <br />
        <Input
          name="image"
          text="Image"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.image ? <ErrorMessage>{errors.image.message}</ErrorMessage> : null}
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
        <Input
          name="quantity"
          text="Quantity"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.quantity ? <ErrorMessage>{errors.quantity.message}</ErrorMessage> : null}
        <br />
        <Input
          name="count"
          text="Count"
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.count ? <ErrorMessage>{errors.count.message}</ErrorMessage> : null}
        <br />
        <span className={styles.title}>Age</span>
        <SelectHookForm
          arr={ages}
          name="age"
          registerOption={{
            required: true,
          }}
          register={register}
        />
        <br />
        <span className={styles.title}>Platform</span>
        <InputCheckbox
          arr={categories}
          name="category"
          register={register}
          registerOption={{
            required: true,
          }}
        />

        <button type="submit" className={styles.but}>
          Submit
        </button>
      </form>
    </Modal>
  );
};
export default AddNewProductModal;
