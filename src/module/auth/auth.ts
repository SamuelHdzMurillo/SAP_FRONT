import { create } from "zustand";
import { User } from "../user/store";
export interface AuthState {
  token: string;
  user_type: string;
  user: User;
  setToken: (token: string) => void;
  setUserType: (token: string) => void;
  setUserData: (user: User) => void;
}
const token = localStorage.getItem("token");
const user_type = localStorage.getItem("user_type");
const user = JSON.parse(`${localStorage.getItem("userAuth") ?? "{}"}`);
export const useAuthStore = create<AuthState>((set) => ({
  token: token ?? "",
  user_type: user_type ?? "",
  user: user ?? {},
  setToken: (token) => set(() => ({ token })),
  setUserType: (user_type) => set(() => ({ user_type })),
  setUserData: (user) => set(() => ({ user })),
}));
