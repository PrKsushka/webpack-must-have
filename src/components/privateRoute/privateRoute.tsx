import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { links } from "@/constants/constants";
import { RootState } from "@/main";


type RouterPrivate = {
  component: any;
  path: string;
  exact?: boolean;
};
const PrivateRoute = function ({ component: Component, ...rest }: RouterPrivate) {
  const active = useSelector<RootState, boolean>((state) => state.auth.modalActive);
  const auth = useSelector<RootState, boolean>((state) => state.auth.authorized);
  if(!active || auth){
    window.history.replaceState(null, "", "/");
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
          <Redirect to={{ pathname: `${links.home}`, search: `signIn=${auth}`, state: { from: props.location, show: true } }}
          />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

export default PrivateRoute;
