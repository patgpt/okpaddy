"use client";

import { ToastsContext } from "@/components/ToastProvider";
import { contactSchema } from "@/lib/validation/contact";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button as AriaButton,
  FieldError,
  Form,
  Input,
  Text,
  TextArea,
  TextField,
} from "react-aria-components";
import {
  FiLoader,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiUser,
} from "react-icons/fi";

const inputC = "input input-bordered w-full";
const textareaC = "textarea textarea-bordered w-full min-h-40";
const labelC = "label font-medium";
const btnC = "btn btn-primary";
const helpC = "text-sm opacity-70";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const startedAt = useRef<number>(Date.now());
  const token = useMemo(
    () => crypto.getRandomValues(new Uint32Array(1))[0].toString(36),
    [],
  );
  const toasts = React.useContext(ToastsContext);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPending(true);
    setOk(null);
    setErr(null);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      token: String(formData.get("token") || "").trim(),
      elapsedMs: Date.now() - startedAt.current,
    } as const;

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setPending(false);
      setErr("Please fix the highlighted fields.");
      toasts?.add({
        type: "error",
        title: "Validation failed",
        description: "Check name, email, and message.",
      });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed with ${res.status}`);
      }

      setOk("Message sent. I will get back to you soon.");
      toasts?.add({
        type: "success",
        title: "Sent",
        description: "Thanks — I’ll reply ASAP.",
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setErr(message);
      toasts?.add({
        type: "error",
        title: "Couldn’t send",
        description: message,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Form className="space-y-5" onSubmit={onSubmit} validationBehavior="native">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input type="hidden" name="token" value={token} />

      <LabeledField
        icon={<FiUser aria-hidden className="opacity-60" />}
        label="Name"
      >
        <TextField name="name" isRequired>
          <Input
            className={`${inputC} ring-primary/30 focus:ring focus:outline-none`}
            placeholder="Ada Lovelace"
          />
          <FieldError className="text-error text-sm" />
        </TextField>
      </LabeledField>

      <LabeledField
        icon={<FiMail aria-hidden className="opacity-60" />}
        label="Email"
      >
        <TextField name="email" isRequired>
          <Input
            className={`${inputC} ring-primary/30 focus:ring focus:outline-none`}
            inputMode="email"
            placeholder="you@example.com"
          />
          <FieldError className="text-error text-sm" />
        </TextField>
      </LabeledField>

      <LabeledField
        icon={<FiMessageSquare aria-hidden className="opacity-60" />}
        label="Message"
      >
        <TextField name="message" isRequired>
          <TextArea
            className={`${textareaC} ring-primary/30 focus:ring focus:outline-none`}
            placeholder="What are we building together?"
          />
          <Text slot="description" className={helpC}>
            Cmd/Ctrl + Enter to send. No secrets or credentials.
          </Text>
          <FieldError className="text-error text-sm" />
        </TextField>
      </LabeledField>

      <AriaButton
        type="submit"
        className={`${btnC} inline-flex items-center gap-2`}
        isDisabled={pending}
      >
        <AnimatePresence initial={false}>
          {pending ? (
            <motion.span
              key="spinner"
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiLoader className="animate-spin" /> Sending
            </motion.span>
          ) : (
            <motion.span
              key="send"
              className="inline-flex items-center gap-2"
              initial={{ y: 4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiSend /> Send
            </motion.span>
          )}
        </AnimatePresence>
      </AriaButton>

      <AnimatePresence>
        {ok && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="alert alert-success mt-2"
          >
            {ok}
          </motion.p>
        )}
        {err && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="alert alert-error mt-2"
          >
            {err}
          </motion.p>
        )}
      </AnimatePresence>
    </Form>
  );
}

function LabeledField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className={labelC}>
        <span className="inline-flex items-center gap-2">
          {icon} {label}
        </span>
      </label>
      {children}
    </div>
  );
}
