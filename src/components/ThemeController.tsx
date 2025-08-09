"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "react-aria-components";
import { CiDark, CiDesktop, CiSun } from "react-icons/ci";

const iconClass = "w-5 h-5";

export default function ThemeController() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const current = resolvedTheme ?? theme ?? "system";

  const options: Array<{
    key: "light" | "dark" | "system";
    label: string;
    icon: ReactNode;
  }> = [
    { key: "light", label: "Light", icon: <CiSun className={iconClass} /> },
    { key: "dark", label: "Dark", icon: <CiDark className={iconClass} /> },
    {
      key: "system",
      label: "System",
      icon: <CiDesktop className={iconClass} />,
    },
  ];

  return (
    <div className="join">
      {options.map(({ key, label, icon }) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onPress={() => setTheme(key)}
            aria-pressed={current === key}
            className={`btn join-item ${current === key ? "btn-primary" : "btn-ghost"}`}
          >
            <span className="sr-only">{label}</span>
            {icon}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
