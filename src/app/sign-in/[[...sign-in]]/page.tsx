"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-md items-center justify-center p-6">
      <SignIn routing="hash" />
    </div>
  );
}
