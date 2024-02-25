import { create } from "zustand";

export interface Goal {
  id: number;
  goalName: string;
  goalValue: string;
  promoted_count?: number;
  municipal_id: number;
  section_id?: number;
  district_id?: number;
  muncipal_name?: string;
  district_name?: string;
  section_name?: string;
}

interface GoalState {
  goal: Goal;
  goals: Goal[];
  typeForm: "post";
  setGoals: (goals: Goal[]) => void;
  setGoal: (goal: Goal) => void;
  deleteGoalS: (id: number) => void;
  addGoal: (goal: Goal) => void;
  setTypeForm: (typeForm: "post") => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  goal: {
    id: 0,
    goalName: "",
    goalValue: "",
    muncipal_name: "",
    district_name: "",
    section_name: "",
    municipal_id: 0,
    district_id: null,
    section_id: null,
    promoted_count: 0,
  },
  typeForm: "post",
  goals: [],
  setGoals: (goals) => set(() => ({ goals })),
  addGoal: (goal) => set((state) => ({ goals: [goal, ...state.goals] })),
  deleteGoalS: (id) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    })),
  setTypeForm: (typeForm) => set(() => ({ typeForm })),
  setGoal: (goal) => set(() => ({ goal })),
}));