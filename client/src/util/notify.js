import { toast } from "react-toastify";

export const notify = (content, theme) => {
  if (theme === "success") {
    toast.success(content, {
      icon: "😀",
    });
  }

  if (theme === "error") {
    toast.error(content, {
      icon: "😕",
    });
  }
};
