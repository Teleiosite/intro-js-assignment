"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/organizations/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setStatus(response.ok ? `Created ${data.organization.slug}` : data.error);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center p-6">
      <h1 className="mb-4 text-2xl font-bold">Register School</h1>
      <form action={onSubmit} className="grid gap-3">
        <input name="schoolName" className="rounded border p-2" placeholder="School Name" />
        <input name="schoolSlug" className="rounded border p-2" placeholder="School Code" />
        <input name="adminName" className="rounded border p-2" placeholder="Admin Name" />
        <input name="adminEmail" type="email" className="rounded border p-2" placeholder="Admin Email" />
        <input name="adminPassword" type="password" className="rounded border p-2" placeholder="Admin Password" />
        <button className="rounded bg-primary-500 p-2 text-white" type="submit">Create</button>
      </form>
      {status && <p className="mt-3 text-sm text-slate-700">{status}</p>}
    </main>
  );
}
