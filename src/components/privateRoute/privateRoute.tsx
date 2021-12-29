import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { links } from "@/constants/constants";
import { RootState } from "@/main";


type RouterPrivate = {
  component: any;
  auth: boolean;
  path: string;
};
const PrivateRoute = function ({ component: Component, auth, ...rest }: RouterPrivate) {
  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  if (!active || auth) {
    window.history.replaceState(null, "", "/");
  }

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
