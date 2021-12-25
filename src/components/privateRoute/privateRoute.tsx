import { Route, Redirect } from "react-router-dom";
import { links } from "@/constants/constants";

type RouterPrivate = {
  component: any;
  auth: boolean;
  path: string;
};
const PrivateRoute = function ({ component: Component, auth, ...rest }: RouterPrivate) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
          <Redirect to={{ pathname: `${links.home}`,search: `signIn=${auth}`, state: { from: props.location, show: true } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
