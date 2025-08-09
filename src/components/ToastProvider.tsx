"use client";

import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useToast, useToastRegion } from "react-aria";
import { createPortal } from "react-dom";
import { FiAlertTriangle, FiCheckCircle, FiX } from "react-icons/fi";
import {
  useToastState,
  type QueuedToast,
  type ToastState,
} from "react-stately";

export type AppToast =
  | { type: "success"; title: string; description?: string; timeout?: number }
  | { type: "error"; title: string; description?: string; timeout?: number }
  | { type: "info"; title: string; description?: string; timeout?: number };

export const ToastsContext = React.createContext<ToastState<AppToast> | null>(
  null,
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const state = useToastState<AppToast>({ maxVisibleToasts: 4 });
  return (
    <ToastsContext.Provider value={state}>
      {children}
      {typeof document !== "undefined" &&
        state.visibleToasts.length > 0 &&
        createPortal(<ToastRegion state={state} />, document.body)}
    </ToastsContext.Provider>
  );
}

function ToastRegion({ state }: { state: ToastState<AppToast> }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { regionProps } = useToastRegion(
    { "aria-label": "Notifications" },
    state,
    ref,
  );

  return (
    <div
      {...regionProps}
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-3 z-[100] flex justify-center"
    >
      <ul className="w-full max-w-sm space-y-2">
        <AnimatePresence initial={false}>
          {state.visibleToasts.map((t) => (
            <Toast key={t.key} toast={t} state={state} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function Toast({
  toast,
  state,
}: {
  toast: QueuedToast<AppToast>;
  state: ToastState<AppToast>;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } =
    useToast({ toast }, state, ref);

  const Icon =
    toast.content.type === "success"
      ? FiCheckCircle
      : toast.content.type === "error"
        ? FiAlertTriangle
        : FiCheckCircle;
  const intent =
    toast.content.type === "error"
      ? "alert"
      : toast.content.type === "success"
        ? "success"
        : "info";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="pointer-events-auto"
    >
      <div
        {...toastProps}
        ref={ref}
        className={`alert shadow-lg ${intent === "alert" ? "alert-error" : intent === "success" ? "alert-success" : "alert-info"}`}
      >
        <Icon className="h-5 w-5" aria-hidden />
        <div className="flex-1">
          <div {...titleProps} className="font-semibold">
            {toast.content.title}
          </div>
          {toast.content.description && (
            <div {...descriptionProps} className="text-sm opacity-80">
              {toast.content.description}
            </div>
          )}
        </div>
        <button
          {...closeButtonProps}
          className="btn btn-ghost btn-sm"
          aria-label="Close"
        >
          <FiX />
        </button>
      </div>
    </motion.li>
  );
}
