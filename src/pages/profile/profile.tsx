import React, { useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordModal from "@/components/modal/changePasswordModal/changePasswordModal";
import { setModalActive } from "@/store/modules/auth/auth.actions";
import profile from "./profile.module.scss";
import { RootState } from "@/main";
import profileImage from "../../assets/images/noPictureLeft.png";
import { StoreState } from "@/store/types";
import Preloader from "@/components/UI/preloader/preloader";

const InfoAboutUser=React.lazy(()=>import("@/components/modules/profile/infoAboutUser"));

const RegistrationModal: React.FunctionComponent = function () {
  const [activeChangePasswordModal, setActiveChanePassword] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector<RootState, string>((state: StoreState) => state.auth.userData.name);
  const showChangePasswordModal = () => {
    dispatch(setModalActive());
    setActiveChanePassword(true);
  };
  return (
    <div className={profile.profileWrapper}>
      <div className={profile.profileDescription}>{name} profile page</div>
      <div className={profile.profileWrapperColumn}>
        <div className={profile.column}>
          <img src={profileImage} alt="profile image" className={profile.profileImage} />
          <button>Change profile image</button>
        </div>
        <div className={profile.column}>
          <Suspense fallback={<Preloader />}>
            <InfoAboutUser />
          </Suspense>
        </div>
        <div className={profile.column}>
          <button onClick={showChangePasswordModal}>Change password</button>
        </div>
        {activeChangePasswordModal && <ChangePasswordModal />}
      </div>
    </div>
  );
};
export default RegistrationModal;
