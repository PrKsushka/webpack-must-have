import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { links } from "@/constants/constants";
import { useEffect } from "react";
import {  setModalInActive } from "@/store/modules/auth/auth.actions";


type RouterPrivate = {
  component: any;
  auth: boolean;
  path: string;
};
const PrivateRoute = function ({ component: Component, auth, ...rest }: RouterPrivate) {
  const body = document.getElementsByTagName("body")[0];
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(setModalInActive());
    window.history.replaceState(null, "", "/");
    body.style.overflow="visible"
  }, []);
  window.history.replaceState(null, "", "/");
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
          <Redirect
            to={{ pathname: `${links.home}`, search: `signIn=${auth}`, state: { from: props.location, show: true } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
