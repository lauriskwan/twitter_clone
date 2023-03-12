import { atom } from "recoil";

export const modalState = atom({
  key: "modalState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value) // initial value of state
});

export const postIDState = atom({
  key: "postIDState", // unique ID (with respect to other atoms/selectors)
  default: "id", // default value (aka initial value) // initial value of state
});
