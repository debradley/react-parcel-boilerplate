import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import ColorChooser from "../components/color-chooser";

window.addEventListener("load", () => {
  const target = document.getElementById("root");
  if (target) {
    ReactDOM.render(<ColorChooser />, target);
  }
});
