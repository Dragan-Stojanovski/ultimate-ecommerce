import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./domain/store/store.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
      <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </BrowserRouter>
      </Provider>
);