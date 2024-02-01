import { create } from "zustand";

export interface AlertI {
  type: "success" | "info" | "warning" | "error";
  message: string;
  isShow: boolean;
}

interface AlertState {
  alert: AlertI;
  setAlert: (alert: AlertI) => void;
  clearAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alert: {
    type: "success",
    message: "",
    isShow: false,
  },
  setAlert: (alert) => set(() => ({ alert })),
  clearAlert: () =>
    set(() => ({ alert: { type: "success", message: "", isShow: false } })),
}));
