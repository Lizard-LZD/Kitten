// src/Routes/Routes.js
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '../Components';

const Home = lazy(() => import("../Pages/Home.js"));

function Routess() {
  return (
    <ScrollToTop>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here */}
        </Routes>
      </Suspense>
    </ScrollToTop>
  );
}

export default Routess;
