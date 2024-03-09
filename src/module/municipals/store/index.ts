import { Promoted } from "@/module/promoted/store";
import { create } from "zustand";

export interface Municipal {
  id: number;
  name: string;
  promoted: Promoted[];
}

interface MunicipalState {
  municipal: Municipal;
  setMunicipal: (user: Municipal) => void;
}

export const useMunicipalStore = create<MunicipalState>((set) => ({
  municipal: {
    id: 0,
    name: "",
    promoted: [],
  },
  setMunicipal: (municipal) => set(() => ({ municipal })),
}));
