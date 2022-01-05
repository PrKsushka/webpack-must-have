import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./pages/home/home";
import Product from "./pages/product/product";
import About from "./pages/about/about";
import { links } from "./constants/constants";
import Layout from "./components/layout/layout";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import Profile from "@/pages/profile/profile";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { RootState } from "@/main";

const App: React.FunctionComponent = function () {
  const authorized = useSelector<RootState, boolean>((state) => state.auth.authorized);
  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <ErrorBoundary>
            <Route exact path={links.home} component={() => <Home />} />
            <PrivateRoute path={links.profile} component={() => <Profile />} auth={authorized} />
            <PrivateRoute exact path={links.products} component={() => <Product />} auth={authorized} />
            <PrivateRoute path={`${links.products}/:platform`} component={() => <Product />} auth={authorized} />
            <PrivateRoute path={links.about} component={() => <About />} auth={authorized} />
          </ErrorBoundary>
        </Switch>
      </Layout>
    </Router>
  );
};
export default App;
