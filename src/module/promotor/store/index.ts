import { create } from "zustand";

export interface Promotor {
  id: number;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  profile_path: string;
  ine_path: string;
  municipal_id: number;
  position: string;
  password_confirmation?: string;
}

interface PromotorState {
  promotor: Promotor;
  promotors: Promotor[];
  typeForm: "post" | "put" | "password";
  setPromotors: (promotors: Promotor[]) => void;
  setPromotor: (promotor: Promotor) => void;
  deletePromotor: (id: number) => void;
  addPromotor: (promotor: Promotor) => void;
  updatePromotor: (promotor: Promotor) => void;
  setTypeForm: (typeForm: "post" | "put" | "password") => void;
}

export const usePromotorStore = create<PromotorState>((set) => ({
  promotor: {
    id: 0,
    name: "",
    email: "",
    password: "",
    phone_number: "",
    position: "",
    profile_path: "",
    ine_path: "",
    municipal_id: 0,
  },
  typeForm: "post",
  promotors: [],
  setPromotors: (promotors) => set(() => ({ promotors })),
  addPromotor: (promotor) =>
    set((state) => ({ promotors: [promotor, ...state.promotors] })),
  deletePromotor: (id) =>
    set((state) => ({
      promotors: state.promotors.filter((promotor) => promotor.id !== id),
    })),
  setTypeForm: (typeForm) => set(() => ({ typeForm })),
  updatePromotor: (promotor) => {
    set((state) => ({
      promotors: state.promotors.map((promotorMap) =>
        promotorMap.id === promotor.id ? promotor : promotorMap
      ),
    }));
  },
  setPromotor: (promotor) =>
    set(() => ({
      // ...state.promotor,
      promotor,
    })),
}));
