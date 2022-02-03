import React from "react";
import { ToastContainer } from "react-toastify";

const ToastNotification = () => {
  return (
    <ToastContainer
      theme="dark"
      position="top-center"
      autoClose={2000}
      closeOnClick
    />
  );
};

export default ToastNotification;
