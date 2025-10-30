"use client";
import React, { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function KapcsolatPage() {
  const [form, setForm] = useState({ nev: "", email: "", uzenet: "" });
  const [errors, setErrors] = useState<any>({});
  const [sent, setSent] = useState(false);
  function validate() {
    const errs: any = {};
    if (!form.nev.trim()) errs.nev = "Kötelező mező";
    if (!form.email.trim()) errs.email = "Kötelező mező";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(form.email)) errs.email = "Érvénytelen e-mail";
    if (!form.uzenet.trim()) errs.uzenet = "Kötelező mező";
    return errs;
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors({});
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ nev: "", email: "", uzenet: "" });
    }
  }
  return (
    <div className="container section">
      <h1 className="text-3xl sm:text-4xl font-bold text-brand mb-2">Kapcsolat</h1>
      <div className="mb-8 text-lg text-muted">Lépj velünk kapcsolatba!</div>
      <Card className="max-w-md mx-auto p-8">
        {sent ? (
          <div className="bg-brand/90 rounded p-6 text-brand-contrast font-semibold text-center">Köszönjük! Hamarosan jelentkezünk.</div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="nev" className="block text-sm font-bold">Név*</label>
              <input
                type="text"
                id="nev"
                name="nev"
                autoComplete="name"
                className={`mt-1 block w-full rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow focus-visible:ring-2 focus-visible:ring-brand ${errors.nev ? 'border-red-500' : ''}`}
                value={form.nev}
                onChange={handleChange}
                required
              />
              {errors.nev && <span className="text-xs text-red-500">{errors.nev}</span>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold">E-mail*</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className={`mt-1 block w-full rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow focus-visible:ring-2 focus-visible:ring-brand ${errors.email ? 'border-red-500' : ''}`}
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="uzenet" className="block text-sm font-bold">Üzenet*</label>
              <textarea
                id="uzenet"
                name="uzenet"
                className={`mt-1 block w-full rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow min-h-[100px] resize-y focus-visible:ring-2 focus-visible:ring-brand ${errors.uzenet ? 'border-red-500' : ''}`}
                value={form.uzenet}
                onChange={handleChange}
                required
              />
              {errors.uzenet && <span className="text-xs text-red-500">{errors.uzenet}</span>}
            </div>
            <Button type="submit" className="mt-2 w-full" variant="primary">Üzenet küldése</Button>
          </form>
        )}
      </Card>
    </div>
  );
}
