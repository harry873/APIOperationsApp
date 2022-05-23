import React from "react";
import ReactDOM from "react-dom/client";
import ToggleColorMode from "./ThemeChange";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>
);
