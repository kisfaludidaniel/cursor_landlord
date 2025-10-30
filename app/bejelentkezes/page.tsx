"use client";
import React, { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BejelentkezesPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    // NextAuth signin
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error === "CredentialsSignin" ? "Hibás felhasználó/jelszó kombináció!" : res.error);
    } else if (res?.ok) {
      // Session validálás: onboarding vagy dashboard
      fetch("/api/auth/session").then(resp => resp.json()).then(sess => {
        if (sess?.user?.hasOnboarded) router.push("/app/dashboard");
        else router.push("/onboarding");
      });
    } else {
      setError("Ismeretlen hiba. Próbáld újra!");
    }
  }
  return (
    <div className="container section">
      <Card className="max-w-md mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-brand text-center">Bejelentkezés</h1>
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
              autoComplete="current-password"
              className="w-full mt-1 rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow pr-10"
              placeholder="Jelszó"
              value={form.password}
              required
              minLength={8}
              onChange={e => setForm(f => ({...f, password:e.target.value}))}
            />
            <button type="button" onClick={() => setShow(s=>!s)} className="absolute right-3 top-[34px] text-sm text-muted focus:outline-none">
              {show ? "Elrejt" : "Mutat"}
            </button>
          </div>
          {error && (<div className="text-red-500 bg-red-50 rounded p-2 text-center">{error}</div>)}
          <Button type="submit" className="mt-1 w-full" disabled={loading}>{loading ? "Belépés..." : "Belépés"}</Button>
        </form>
        <div className="w-full text-center mt-1">
          <a href="/regisztracio" className="underline text-brand hover:text-accent">Még nincs fiókod? Regisztráció</a>
        </div>
      </Card>
    </div>
  );
}
