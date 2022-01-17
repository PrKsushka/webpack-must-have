import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { links } from "@/constants/routeMenuConstant";
import { RootState } from "@/main";
import { StoreState } from "@/store/types";


type RouterPrivate = {
  component: any;
  path: string;
  exact?: boolean;
};
const PrivateRoute = function ({ component: Component, ...rest }: RouterPrivate) {
  const active = useSelector<RootState, boolean>((state: StoreState) => state.auth.modalActive);
  const auth = useSelector<RootState, boolean>((state: StoreState) => state.auth.authorized);
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
