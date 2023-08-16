// src/Routes/Routes.js
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ScrollToTop, Navbar, Footer } from "../Components";
import { Fragment } from "react";

const Home = lazy(() => import("../Pages/Home.js"));

function Routess() {
  return (
    <ScrollToTop>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout children={<Home/>}/>} />
        </Routes>
      </Suspense>
    </ScrollToTop>
  );
}

function Layout(props) {
  return (
    <Fragment>
      <Navbar />
       {props.children}
      <Footer />
    </Fragment>
  );
}

export default Routess;
