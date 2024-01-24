import { create } from "zustand";

export interface Problem {
  id: number;
  title: string;
  description: string;
  problem_img_path: string;
  promoted_id: number;
}

interface ProblemState {
  problem: Problem;
  problems: Problem[];
  setProblems: (problems: Problem[]) => void;
  setProblem: (problem: Problem) => void;
  deleteProblem: (id: number) => void;
}

export const useProblemStore = create<ProblemState>((set) => ({
  problem: {
    id: 0,
    title: "",
    description: "",
    problem_img_path: "",
    promoted_id: 0,
  },
  problems: [],
  setProblems: (problems) => set(() => ({ problems })),
  deleteProblem: (id) =>
    set((state) => ({
      problems: state.problems.filter((problem) => problem.id !== id),
    })),
  setProblem: (problem) =>
    set(() => ({
      // ...state.user,
      problem,
    })),
}));
