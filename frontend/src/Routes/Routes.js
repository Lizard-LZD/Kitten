import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  // Navbar,
  ScrollToTop,
  // Footer,
} from '../Components';
// import '../Styles/GlobalStyles.css';

const Home = lazy(() => import("../Pages/Home.js"));

function Routess() {
  return (
    <ScrollToTop>
      <Suspense fallback="">
        <Routes>
          <Route exact path="/">
            {/* <Navbar /> */}
            <Home />
            {/* <Footer /> */}
          </Route>
        </Routes>
      </Suspense>
    </ScrollToTop>
  );
}

export default Routess;
