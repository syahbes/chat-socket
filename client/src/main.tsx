import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={defaultTheme}>
      <Router />
    </ThemeProvider>
  </QueryClientProvider>
);
