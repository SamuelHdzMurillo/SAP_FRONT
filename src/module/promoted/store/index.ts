import { Problem } from "@/module/problem/store";
import { create } from "zustand";

export interface Promoted {
  id: number;
  name: string;
  last_name: string;
  adress: string;
  colony: string;
  postal_code: string;
  house_number: string;
  electoral_key: string;
  curp: string;
  phone_number: string;
  latitude: string;
  longitude: string;
  section_id: number;
  problems?: Problem[];
  promotor_id: number;
  section?: { number: number };
}

interface PromotedState {
  promoted: Promoted;
  promoteds: Promoted[];
  typeForm: "post" | "put" | "problem" | "export";
  setPromoteds: (promoteds: Promoted[]) => void;
  setPromoted: (promoted: Promoted) => void;
  deletePromoted: (id: number) => void;
  addPromoted: (promoted: Promoted) => void;
  updatePromoted: (promoted: Promoted) => void;
  setTypeForm: (typeForm: "post" | "put" | "problem" | "export") => void;
}

export const usePromotedStore = create<PromotedState>((set) => ({
  promoted: {
    id: 0,
    name: "",
    last_name: "",
    adress: "",
    electoral_key: "",
    colony: "",
    postal_code: "",
    house_number: "",
    curp: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    problems: [],
    section_id: 0,
    promotor_id: 0,
  },
  typeForm: "post",
  promoteds: [],
  setPromoteds: (promoteds) => set(() => ({ promoteds })),
  addPromoted: (promoted) =>
    set((state) => ({ promoteds: [promoted, ...state.promoteds] })),
  deletePromoted: (id) =>
    set((state) => ({
      promoteds: state.promoteds.filter((promoted) => promoted.id !== id),
    })),
  setTypeForm: (typeForm) => set(() => ({ typeForm })),
  updatePromoted: (promoted) => {
    set((state) => ({
      promoteds: state.promoteds.map((promotedMap) =>
        promotedMap.id === promoted.id ? promoted : promotedMap
      ),
    }));
  },
  setPromoted: (promoted) =>
    set(() => ({
      // ...state.user,
      promoted,
    })),
}));
