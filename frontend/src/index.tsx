import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Redux/Store";

// Use createRoot instead of ReactDOM.render

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

