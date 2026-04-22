"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgSlug, setOrgSlug] = useState("demo-school");

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          void signIn("credentials", { email, password, orgSlug, callbackUrl: "/" });
        }}
      >
        <input className="w-full rounded border p-2" placeholder="Organization" value={orgSlug} onChange={(e) => setOrgSlug(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-primary-500 p-2 text-white" type="submit">Sign In</button>
      </form>
    </main>
  );
}
