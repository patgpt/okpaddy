import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch. Secure contact form with validation.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Contact</h1>
      <p className="mb-6 opacity-80">
        Tell me what you are building. I read every message.
      </p>
      <ContactForm />
    </main>
  );
}
