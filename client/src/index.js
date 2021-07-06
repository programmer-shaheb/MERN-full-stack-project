import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { SnackbarProvider } from "notistack";
import Zoom from "@material-ui/core/Zoom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      TransitionComponent={Zoom}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
