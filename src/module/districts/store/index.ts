import { Promoted } from "@/module/promoted/store";
import { create } from "zustand";

export interface DistrictA {
  id: number;
  number: number;
  section_count: number;
  municipal: string;
}

export interface District {
  id: number;
  number: number;
  municipal: {
    id: number;
    name: string;
  };
  promoted: Promoted[];
}

interface DistrictState {
  // user: User;
  district: District;
  districts: DistrictA[];
  setDistricts: (districts: DistrictA[]) => void;
  setDistrict: (user: District) => void;
}

export const useDistrictStore = create<DistrictState>((set) => ({
  district: {
    id: 0,
    number: 0,
    municipal: {
      id: 0,
      name: "",
    },
    promoted: [],
  },
  setDistrict: (district) => set(() => ({ district })),
  districts: [],
  setDistricts: (districts) => set(() => ({ districts })),
}));
