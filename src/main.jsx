import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import "./index.css";

const basename =
  import.meta.env.MODE === "production" ? "/se_project_react" : "/";

// console.log("Current NODE_ENV:", import.meta.env.MODE);
// console.log("Calculated basename:", basename);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
