"use client";
import React, { useState } from 'react';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import clsx from 'clsx';

const NAV_LINKS = [
  { href: '/funkciok', label: 'Funkciók' },
  { href: '/arazas', label: 'Árazás' },
  { href: '/gyik', label: 'GYIK' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
  { href: '/bejelentkezes', label: 'Bejelentkezés' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="w-full bg-surface border-b border-brand/20">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-brand">
          <Icon name="Home" size={26} />
          Micro-Landlord OS Lite
        </Link>
        <div className="hidden md:flex gap-4 items-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 rounded hover:bg-brand/10 focus-visible:ring-2 focus-visible:ring-brand text-text"
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
        <button
          className="md:hidden flex items-center justify-center rounded p-2 hover:bg-brand/10 focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="Menü megnyitása"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Icon name={mobileOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-bg/95 backdrop-blur flex flex-col items-center justify-center gap-6">
          <button
            className="absolute top-4 right-4 p-2 rounded hover:bg-brand/10 focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => setMobileOpen(false)}
            aria-label="Menü bezárása"
          >
            <Icon name="X" size={28} />
          </button>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-2xl text-center py-4 rounded text-brand font-bold hover:bg-surface"
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
