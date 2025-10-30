import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-brand/20 mt-auto">
      <div className="container flex flex-col sm:flex-row justify-between items-center py-6 gap-2 text-sm text-muted">
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Adatvédelem</a>
          <a href="#" className="hover:underline">ÁSZF</a>
        </div>
        <div className="text-xs">&copy; {new Date().getFullYear()} Micro-Landlord OS Lite</div>
      </div>
    </footer>
  );
}
