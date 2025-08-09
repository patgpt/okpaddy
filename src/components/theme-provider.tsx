"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export default function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      // defaultTheme="system"
      // enableSystem
      enableColorScheme
      storageKey="okpaddy-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
