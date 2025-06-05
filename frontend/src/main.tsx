import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "virtual:uno.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { BrowserRouter} from "react-router-dom";

import "./global.css";
import Router from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
