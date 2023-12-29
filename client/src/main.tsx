import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/styles/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
