import { Promoted } from "@/module/promoted/store";
import { create } from "zustand";

export interface SectionA {
  id: number;
  number: number;
  section_count: number;
  municipal: string;
}

export interface Section {
  id: number;
  number: number;
  district: {
    id: number;
    number: number;
    municipal: {
      id: number;
      name: string;
    };
  };
  promoted: Promoted[];
}

interface SectionState {
  // user: User;
  section: Section;
  setSection: (section: Section) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  section: {
    id: 0,
    number: 0,
    district: {
      id: 0,
      number: 0,
      municipal: {
        id: 0,
        name: "",
      },
    },
    promoted: [],
  },
  setSection: (section) => set(() => ({ section })),
}));
