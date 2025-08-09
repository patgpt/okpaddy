import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AppThemeProvider from "@/components/theme-provider";
import { ToastProvider } from "@/components/ToastProvider";
import { fonts } from "@/styles/fonts";
import "@/styles/globals.css";
import { cn } from "@/utils/cn";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "An opinionated Next.js starter template",
  description: "Created by Patrick Kelly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            (fonts.sans.variable, fonts.mono.variable, "antialiased"),
          )}
        >
          <AppThemeProvider>
            <ToastProvider>
              <div className="flex min-h-dvh flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ToastProvider>
          </AppThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
