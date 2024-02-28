import { create } from "zustand";

export interface Priority {
  id: number;
  name: string;
  value: string;
  promoted_count?: number;
  municipal_id: number;
  section_id?: number;
  district_id?: number;
  muncipal_name?: string;
  district_name?: string;
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
