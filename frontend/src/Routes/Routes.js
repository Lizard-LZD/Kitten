// src/Routes/Routes.js
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ScrollToTop, Navbar, Footer } from "../Components";
import { Fragment } from "react";

const Home = lazy(() => import("../Pages/Home.js"));
const Login = lazy(() => import("../Pages/auth/Login.js"));
const Register = lazy(() => import("../Pages/auth/Register.js"));
const Adoption = lazy(() => import("../Pages/Adoption.js"));
const Diary = lazy(() => import("../Pages/Diary"));
const HealthTracker = lazy(() => import("../Pages/HealthTracker.js"));
const Game = lazy(() => import("../Pages/Game.js"));
const Kitten = lazy(() => import("../Pages/Kitten.js"));
const Profile = lazy(() => import("../Pages/Profile.js"));

function Routess() {
  return (
    <ScrollToTop>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout children={<Home />} />} />
          <Route path="/login" element={<Layout children={<Login />} />} />
          <Route
            path="/register"
            element={<Layout children={<Register />} />}
          />
          <Route
            path="/adoption"
            element={<Layout children={<Adoption />} />}
          />
          <Route path="/diary" element={<Layout children={<Diary />} />} />
          <Route
            path="/healthtracker"
            element={<Layout children={<HealthTracker />} />}
          />
          <Route path="/game" element={<Layout children={<Game />} />} />
          <Route path="/kitten" element={<Layout children={<Kitten />} />} />
          <Route
            path="/healthTracker"
            element={<Layout children={<HealthTracker />} />}
          />
          <Route path="/profile" element={<Layout children={<Profile />} />} />
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
