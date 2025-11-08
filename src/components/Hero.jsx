import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-sky-50 to-rose-50" />
      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
            Desain presentasi profesional tanpa pusing layout
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Pilih template, atur warna, dan ekspor ke PPT. Semudah drag & drop.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#builder" className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
              Mulai Mendesain
            </a>
            <a href="#how" className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-white transition">
              Lihat Cara Kerja
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="h-10 border-b border-slate-200 bg-slate-50 flex items-center px-3 gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="p-6 grid gap-4">
              <div className="h-6 w-1/3 bg-slate-200 rounded" />
              <div className="h-4 w-2/3 bg-slate-200 rounded" />
              <div className="h-64 rounded-lg bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 border border-dashed border-indigo-300 grid place-items-center text-indigo-600 font-medium">
                Area Slide Preview
              </div>
              <div className="flex gap-3">
                <div className="h-10 flex-1 rounded-md bg-indigo-600/10 border border-indigo-200 grid place-items-center text-indigo-700 text-sm">Tambah Teks</div>
                <div className="h-10 flex-1 rounded-md bg-fuchsia-600/10 border border-fuchsia-200 grid place-items-center text-fuchsia-700 text-sm">Tambah Gambar</div>
                <div className="h-10 flex-1 rounded-md bg-emerald-600/10 border border-emerald-200 grid place-items-center text-emerald-700 text-sm">Duplikasi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
