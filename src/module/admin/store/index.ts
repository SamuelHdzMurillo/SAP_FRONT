import { create } from "zustand";

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  profile_path?: string;
  profile_img_path?: string;
  password_confirmation?: string;
}

interface AdminState {
  admin: Admin;
  admins: Admin[];
  typeForm: "post" | "put" | "password";
  setAdmins: (admins: Admin[]) => void;
  setAdmin: (admin: Admin) => void;
  deleteAdmin: (id: number) => void;
  addAdmin: (admin: Admin) => void;
  updateAdmin: (admin: Admin) => void;
  setTypeForm: (typeForm: "post" | "put" | "password") => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: {
    id: 0,
    name: "",
    email: "",
    password: "",
    phone_number: "",
    profile_img_path: "",
  },
  typeForm: "post",
  admins: [],
  setAdmins: (admins) => set(() => ({ admins })),
  addAdmin: (admin) => set((state) => ({ admins: [admin, ...state.admins] })),
  deleteAdmin: (id) =>
    set((state) => ({
      admins: state.admins.filter((admin) => admin.id !== id),
    })),
  setTypeForm: (typeForm) => set(() => ({ typeForm })),
  updateAdmin: (admin) => {
    set((state) => ({
      admins: state.admins.map((adminMap) =>
        adminMap.id === admin.id ? admin : adminMap
      ),
    }));
  },
  setAdmin: (admin) =>
    set(() => ({
      // ...state.admin,
      admin,
    })),
}));
