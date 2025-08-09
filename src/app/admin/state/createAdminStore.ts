import { TCategory, TNavItem, TPost, TService, TWork } from "@/db/zod";
import { createStore } from "zustand/vanilla";

export type AdminState = {
  navItems: (TNavItem & { order: number })[];
  posts: TPost[];
  works: TWork[];
  services: TService[];
  categories: TCategory[];
  dirty: boolean;
  setNavItems: (items: AdminState["navItems"]) => void;
  setPosts: (items: TPost[]) => void;
  setWorks: (items: TWork[]) => void;
  setServices: (items: TService[]) => void;
  setCategories: (items: TCategory[]) => void;
  markClean: () => void;
};

export const createAdminStore = (init?: Partial<AdminState>) =>
  createStore<AdminState>((set) => ({
    navItems: [],
    posts: [],
    works: [],
    services: [],
    categories: [],
    dirty: false,
    ...init,
    setNavItems: (items) => set({ navItems: items, dirty: true }),
    setPosts: (items) => set({ posts: items, dirty: true }),
    setWorks: (items) => set({ works: items, dirty: true }),
    setServices: (items) => set({ services: items, dirty: true }),
    setCategories: (items) => set({ categories: items, dirty: true }),
    markClean: () => set({ dirty: false }),
  }));
