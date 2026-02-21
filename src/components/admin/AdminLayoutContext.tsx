"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type AdminLayoutContextValue = {
  studioCollapsed: boolean;
  toggleStudio: () => void;
  setStudioCollapsed: (value: boolean) => void;
};

const AdminLayoutContext = createContext<AdminLayoutContextValue | null>(null);

export function AdminLayoutProvider({
  value,
  children,
}: {
  value: AdminLayoutContextValue;
  children: ReactNode;
}) {
  return (
    <AdminLayoutContext.Provider value={value}>
      {children}
    </AdminLayoutContext.Provider>
  );
}

export function useAdminLayout() {
  return useContext(AdminLayoutContext);
}
