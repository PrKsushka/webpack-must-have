import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordModal from "@/components/modal/changePasswordModal/changePasswordModal";
import { setModalActive } from "@/store/modules/auth/auth.actions";
import profile from "./profile.module.scss";
import { RootState } from "@/main";
import InfoAboutUser from "@/pages/profile/infoAboutUser/infoAboutUser";

const RegistrationModal: React.FunctionComponent = function () {
  const [activeChangePasswordModal, setActiveChanePassword] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector<RootState, string>((state) => state.auth.userData.name);
  const showChangePasswordModal = () => {
    dispatch(setModalActive());
    setActiveChanePassword(true);
  };
  return (
    <div className={profile.profileWrapper}>
      <div className={profile.profileDescription}>{name} profile page</div>
      <div className={profile.column}>
        <img src="#" alt="user photo" />
        <button>Change profile image</button>
      </div>
      <div className={profile.column}>
        <InfoAboutUser />
      </div>
      <div className={profile.column}>
        <button onClick={showChangePasswordModal}>Change password</button>
      </div>
      {activeChangePasswordModal && <ChangePasswordModal />}
    </div>
  );
};
export default RegistrationModal;
