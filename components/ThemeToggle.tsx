"use client";
import React, { useEffect, useState } from "react";
import Icon from "./Icon";

export default function ThemeToggle() {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('theme-light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    document.documentElement.classList.add(mode === 'dark' ? 'theme-dark' : 'theme-light');
  }, [mode]);

  return (
    <button
      type="button"
      aria-label={`Sötét/világos mód váltása (${mode === "dark" ? "sötét" : "világos"})`}
      className="rounded p-2 bg-surface border border-brand/10 flex items-center transition hover:bg-brand/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
      onClick={() => setMode(m => (m === 'dark' ? 'light' : 'dark'))}
    >
      <Icon name={mode === 'dark' ? 'Sun' : 'Moon'} size={20} />
    </button>
  );
}
