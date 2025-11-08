import React from 'react';

const templates = [
  { id: 1, name: 'Minimal Clean', colors: 'from-slate-700 to-slate-900' },
  { id: 2, name: 'Indigo Wave', colors: 'from-indigo-500 to-fuchsia-500' },
  { id: 3, name: 'Sunset Glow', colors: 'from-amber-500 to-rose-500' },
  { id: 4, name: 'Emerald Rise', colors: 'from-emerald-500 to-teal-600' },
];

export default function TemplateGallery() {
  return (
    <section id="templates" className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Template Siap Pakai</h3>
          <p className="text-slate-600">Pilih gaya yang sesuai, tinggal ganti konten.</p>
        </div>
        <a href="#builder" className="text-indigo-700 font-medium hover:underline">Mulai dari template →</a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {templates.map((t) => (
          <div key={t.id} className="group">
            <div className={`aspect-[4/3] rounded-xl border border-slate-200 overflow-hidden bg-gradient-to-br ${t.colors} relative`}></div>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-medium text-slate-800">{t.name}</p>
              <button className="text-sm text-indigo-700 hover:underline">Pakai</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
