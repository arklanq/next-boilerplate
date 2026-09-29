import type { DefaultToastOptions } from "react-hot-toast";

export const toastOptions: DefaultToastOptions = {
  position: "bottom-center",
  duration: 6_000,
  style: {
    //TODO: borderRadius: "10px" ?
    padding: "0.5rem 1rem"
  }
};
