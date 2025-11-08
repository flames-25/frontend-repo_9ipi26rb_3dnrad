import React from 'react';
import { MousePointerClick, Palette, FileDown } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Pilih Template',
    desc: 'Pilih dari koleksi template profesional yang siap pakai.'
  },
  {
    icon: Palette,
    title: 'Kustomisasi Warna & Font',
    desc: 'Sesuaikan dengan brand Anda dalam satu klik theme.'
  },
  {
    icon: FileDown,
    title: 'Ekspor ke PPT',
    desc: 'Download presentasi siap tampil untuk PowerPoint atau Google Slides.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Cara Kerja</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-slate-200 p-6 bg-slate-50/50">
              <div className="h-10 w-10 rounded-lg bg-indigo-600/10 text-indigo-700 grid place-items-center mb-4">
                <Icon size={18} />
              </div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="text-slate-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
