import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

interface UserState {
  user: User;
  users: User[];
  typeForm: "post" | "put" | "password";
  setUsers: (users: User[]) => void;
  setUser: (user: User) => void;
  deleteUser: (id: number) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  setTypeForm: (typeForm: "post" | "put" | "password") => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: 0,
    name: "",
    email: "",
    password: "",
    phone_number: "",
  },
  typeForm: "post",
  users: [],
  setUsers: (users) => set(() => ({ users })),
  addUser: (user) => set((state) => ({ users: [user, ...state.users] })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  setTypeForm: (typeForm) => set(() => ({ typeForm })),
  updateUser: (user) => {
    set((state) => ({
      users: state.users.map((userMap) =>
        userMap.id === user.id ? user : userMap
      ),
    }));
  },
  setUser: (user) =>
    set(() => ({
      // ...state.user,
      user,
    })),
}));
