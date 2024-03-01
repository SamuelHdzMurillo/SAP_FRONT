import { create } from "zustand";

export interface PriorityChartApi {
  section_id: number;
  section_name: string;
  promoteds_count: number;
}

interface PriorityChartI {
  x: string;
  y: number;
} 
export interface Priority {
  id: number;
  name: string;
  promotedsByPriority: PriorityChartI[];
}
export interface PriorityForm {
  id: number;
  name: string;
  sections_id: number[];
  promoted_count?: number;
  municipal_id: number;
  section_id?: number;
  district_id?: number;
  section_name?: string;
}

interface PriorityState {
  priorities: Priority[];
  setPriorities: (priorities: Priority[]) => void;
  deletePriorities: (id: number) => void;
  addPriority: (priority: Priority) => void;
}

export const usePriorityStore = create<PriorityState>((set) => ({
  priorities: [],
  setPriorities: (priorities) => set(() => ({ priorities })),
  addPriority: (priority) =>
    set((state) => ({ priorities: [priority, ...state.priorities] })),
  deletePriorities: (id) =>
    set((state) => ({
      priorities: state.priorities.filter((priority) => priority.id !== id),
    })),
}));
