"use client";
import { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    const resp = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: org })
    });
    const data = await resp.json();
    setLoading(false);
    if (!resp.ok) setError(data.error || "Hiba történt!");
    else {
      setSuccess(true);
      setTimeout(() => router.push("/app/dashboard"), 1500);
    }
  }

  return (
    <div className="container section">
      <div className="max-w-md mx-auto">
        <div className="mb-3 text-xs flex items-center gap-2 text-muted uppercase tracking-widest font-semibold">
          <span className="bg-brand rounded-full px-2 py-0.5 text-white">1/1</span>
          Szervezet létrehozása
        </div>
        <Card className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-brand text-center mb-2">Első lépés: szervezet létrehozása</h1>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="orgname" className="block text-sm font-bold">Szervezet neve</label>
              <input
                type="text"
                id="orgname"
                autoFocus
                className="w-full mt-1 rounded border border-brand/20 bg-surface px-4 py-2 text-text placeholder:text-muted shadow"
                placeholder="Pl. Bérbeadó Kft."
                value={org}
                required
                maxLength={50}
                onChange={e => setOrg(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 bg-red-50 rounded p-2 text-center">{error}</div>}
            <Button type="submit" disabled={loading || !org.trim()} className="w-full">
              {loading ? "Mentés..." : "Szervezet létrehozása"}
            </Button>
          </form>
          {success && (
            <div className="bg-brand/90 text-brand-contrast rounded p-4 font-semibold text-center">Sikeres onboarding!</div>
          )}
        </Card>
      </div>
    </div>
  );
}
