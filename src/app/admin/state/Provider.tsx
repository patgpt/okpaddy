"use client";
import * as React from "react";
import { useStore } from "zustand";
import { AdminState, createAdminStore } from "./createAdminStore";

type AdminStore = ReturnType<typeof createAdminStore>;

const Ctx = React.createContext<AdminStore | null>(null);

export function AdminStoreProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: Partial<AdminState>;
}) {
  const ref = React.useRef<AdminStore | null>(null);
  if (!ref.current) ref.current = createAdminStore(initialState);
  return <Ctx.Provider value={ref.current!}>{children}</Ctx.Provider>;
}

export function useAdminStore<T>(selector: (s: AdminState) => T): T {
  const store = React.useContext(Ctx);
  if (!store)
    throw new Error("useAdminStore must be used inside AdminStoreProvider");
  return useStore(store, selector);
}
