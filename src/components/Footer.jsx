import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} SlideCraft. Semua hak dilindungi.</p>
        <div className="flex gap-4 text-sm">
          <a href="#" className="text-slate-600 hover:text-slate-900">Kebijakan Privasi</a>
          <a href="#" className="text-slate-600 hover:text-slate-900">Syarat Layanan</a>
        </div>
      </div>
    </footer>
  );
}
