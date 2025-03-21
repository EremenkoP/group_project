import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import "./normalize.scss";
import { Provider } from "react-redux";
import { store } from "./services/store/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";
import { BrowserRouter } from "react-router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"ru"}
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <App />
        </LocalizationProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
