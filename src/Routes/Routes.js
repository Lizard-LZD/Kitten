import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  // Navbar,
  ScrollToTop,
  // Footer,
} from '../Components';
import '../Styles/GlobalStyles.css';

const Home = lazy(() => import("../Pages/"));

function Routes() {
  return (
    <ScrollToTop>
      <Suspense fallback="">
        <Switch>
          <Route exact path="/">
            {/* <Navbar /> */}
            <Home />
            {/* <Footer /> */}
          </Route>
        </Switch>
      </Suspense>
    </ScrollToTop>
  );
}

export default Routes;
