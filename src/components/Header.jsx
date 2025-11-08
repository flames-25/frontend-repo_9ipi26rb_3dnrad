import React from 'react';
import { Palette, Star } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 grid place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white">
            <Palette size={18} />
          </div>
          <div>
            <p className="text-xl font-semibold tracking-tight text-slate-900">SlideCraft</p>
            <p className="text-xs text-slate-500">Desain PPT cantik dalam hitungan menit</p>
          </div>
        </div>
        <a
          href="#templates"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
        >
          <Star size={16} className="text-amber-500" />
          <span className="text-sm">Lihat Template</span>
        </a>
      </div>
    </header>
  );
}
