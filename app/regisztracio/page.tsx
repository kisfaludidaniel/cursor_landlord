"use client";
import React, { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function RegPage() {
  const [form, setForm] = useState({ email: "", password: "", passwordConfirm: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(false); setLoading(true);
    const r = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await r.json();
    setLoading(false);
    if (!r.ok) { setError(data.error || "Hiba történt!"); return; }
    setSuccess(true);
    setForm({ email: "", password: "", passwordConfirm: "" });
  }

  return (
    <div className="container section">
      <Card className="max-w-md mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-brand text-center">Regisztráció</h1>
        {success ? (
          <div className="bg-brand/90 rounded p-6 text-brand-contrast font-medium text-center mb-2">
            Sikeres regisztráció! <a href="/bejelentkezes" className="underline hover:text-accent">Lépj be most &rarr;</a>
          </div>
        ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-bold">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="w-full mt-1 rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow"
              placeholder="valami@email.hu"
              value={form.email}
              required
              onChange={e => setForm(f => ({...f, email:e.target.value}))}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-bold">Jelszó</label>
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              className="w-full mt-1 rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow pr-10"
              placeholder="Legalább 8 karakter"
              value={form.password}
              required
              minLength={8}
              onChange={e => setForm(f => ({...f, password:e.target.value}))}
            />
            <button type="button" onClick={() => setShow(s=>!s)}
              className="absolute right-3 top-[34px] text-sm text-muted focus:outline-none">
                {show ? "Elrejt" : "Mutat"}
            </button>
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-bold">Jelszó mégegyszer</label>
            <input
              type={show ? "text" : "password"}
              id="passwordConfirm"
              name="passwordConfirm"
              autoComplete="new-password"
              className="w-full mt-1 rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow"
              value={form.passwordConfirm}
              required
              minLength={8}
              onChange={e => setForm(f => ({...f, passwordConfirm:e.target.value}))}
            />
          </div>

          {error && (<div className="text-red-500 bg-red-50 rounded p-2 text-center">{error}</div>)}

          <Button type="submit" className="mt-1 w-full" disabled={loading}>
            {loading ? "Mentés..." : "Regisztráció"}
          </Button>
        </form>
        )}
      </Card>
    </div>
  )
}
