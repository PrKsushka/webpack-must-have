import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home/home";
import Product from "./pages/product/product";
import About from "./pages/about/about";
import { links } from "./constants/constants";
import Layout from "./components/layout/layout";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import Profile from "@/pages/profile/profile";
import PrivateRoute from "./components/privateRoute/privateRoute";
import Cart from "@/pages/cart/cart";

const App: React.FunctionComponent = function () {
  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <ErrorBoundary>
            <Route exact path={links.home} component={Home} />
            <PrivateRoute path={links.profile} component={Profile} />
            <PrivateRoute exact path={links.products} component={Product} />
            <PrivateRoute path={`${links.products}/:platform`} component={Product} />
            <PrivateRoute path={links.about} component={About} />
            <PrivateRoute path={links.cart} component={Cart} />
          </ErrorBoundary>
        </Switch>
      </Layout>
    </Router>
  );
};
export default App;
