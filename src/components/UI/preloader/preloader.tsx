import React from "react";
import preloader from "./preloader.module.scss";
// @ts-ignore
import imagePreloader from "../../../assets/images/Preloader.gif";

const Preloader: React.FunctionComponent = function () {
  return (
    <div className={preloader.container}>
      <img src={imagePreloader} alt="preloader" className={preloader.loader} />
    </div>
  );
};
export default Preloader;
