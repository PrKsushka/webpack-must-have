import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { editAddNewProductModal } from "@/components/UI/input/schemas";
import { dataForm, TopProduct } from "@/types/productsCommon.types";
import signin from "../modal.module.scss";
import Input from "@/components/UI/input/input";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import Modal from "@/components/modal/modal";
import { removeFromListOfProducts, updateProduct } from "@/store/modules/products/products.actions";
import { setModalInActive } from "@/store/modules/auth/auth.actions";
import SelectHookForm from "@/components/UI/select/selectHookForm";
import InputCheckbox from "@/components/UI/inputCheckbox/inputCheckbox";
import styles from "./editModal.module.scss";
import { RootState } from "@/main";
import { StoreState } from "@/store/types";
import { Dispatcher } from "@/types/types";
import toggleBodyOverflow from "@/utils/overflow";
import { ages, categories } from "@/constants/adminPageConstants";


interface EditModalTypes {
  openModal: Dispatcher<boolean>;
  obj: TopProduct;
}
const EditModal: React.FunctionComponent<EditModalTypes> = function ({ obj, openModal }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(editAddNewProductModal) });
  const dispatch = useDispatch();

  const onSubmit = (data: dataForm) => {
    if (data) {
      dispatch(updateProduct(data, obj.id));
      toggleBodyOverflow();
    }
    dispatch(setModalInActive());
    reset();
  };
  const deleteProduct = () => {
    const answer = window.confirm(`Are you sure? You want to delete ${obj.title}`);
    if(answer && obj.id !== undefined){
      dispatch(removeFromListOfProducts(obj.id))
    }
  };

  const isActiveEditModal = useSelector<RootState, boolean>((state: StoreState) => state.auth.editModal);
  return (
    <Modal isActive={isActiveEditModal} el={openModal}>
      <form className={signin.formData} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          text="Name"
          value={obj.title}
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
          value={obj.genres}
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
          value={String(obj.price)}
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.price ? <ErrorMessage>{errors.price.message}</ErrorMessage> : null}
        <br />
        <Input
          name="image"
          text="Image (url)"
          value={obj.image}
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
          value={obj.description}
          registerOptions={{
            required: true,
          }}
          register={register}
        />
        {errors.description ? <ErrorMessage>{errors.description.message}</ErrorMessage> : null}
        <br />
        <span className={styles.title}>Age</span>
        <SelectHookForm
          arr={ages}
          name="age"
          defaultVal={obj.age}
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
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.but}>
            Submit
          </button>
          <button type="button" className={styles.but} onClick={deleteProduct}>
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default EditModal;
