import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Type, Square, Trash2, MousePointer2, Move, Palette } from 'lucide-react';

// Simple slide builder with draggable items (text and rectangle)
export default function Builder() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [theme, setTheme] = useState('indigo');
  const canvasRef = useRef(null);
  const dragState = useRef({ id: null, offsetX: 0, offsetY: 0 });

  const themeColor = useMemo(() => {
    switch (theme) {
      case 'fuchsia':
        return 'rgb(217 70 239)';
      case 'emerald':
        return 'rgb(16 185 129)';
      case 'amber':
        return 'rgb(245 158 11)';
      case 'indigo':
      default:
        return 'rgb(79 70 229)';
    }
  }, [theme]);

  const addText = () => {
    const id = crypto.randomUUID();
    setItems((prev) => [
      ...prev,
      {
        id,
        type: 'text',
        x: 40,
        y: 40,
        w: 360,
        h: 48,
        text: 'Judul Slide',
        color: '#0f172a',
        size: 28,
        weight: 700,
      },
    ]);
    setSelectedId(id);
  };

  const addRect = () => {
    const id = crypto.randomUUID();
    setItems((prev) => [
      ...prev,
      {
        id,
        type: 'rect',
        x: 80,
        y: 160,
        w: 320,
        h: 120,
        fill: themeColor,
        radius: 12,
        opacity: 0.15,
      },
    ]);
    setSelectedId(id);
  };

  const onMouseDown = (e, id) => {
    e.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    const item = items.find((it) => it.id === id);
    if (!item) return;
    setSelectedId(id);
    dragState.current = {
      id,
      offsetX: e.clientX - rect.left - item.x,
      offsetY: e.clientY - rect.top - item.y,
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = useCallback((e) => {
    const { id, offsetX, offsetY } = dragState.current;
    if (!id) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, x: Math.max(0, Math.min(x, rect.width - (it.w || 0))), y: Math.max(0, Math.min(y, rect.height - (it.h || 0))) } : it)));
  }, []);

  const onMouseUp = useCallback(() => {
    dragState.current = { id: null, offsetX: 0, offsetY: 0 };
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const removeSelected = () => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((it) => it.id !== selectedId));
    setSelectedId(null);
  };

  const bringForward = () => {
    if (!selectedId) return;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === selectedId);
      if (idx === -1 || idx === prev.length - 1) return prev;
      const newArr = [...prev];
      const [el] = newArr.splice(idx, 1);
      newArr.splice(idx + 1, 0, el);
      return newArr;
    });
  };

  const sendBackward = () => {
    if (!selectedId) return;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === selectedId);
      if (idx <= 0) return prev;
      const newArr = [...prev];
      const [el] = newArr.splice(idx, 1);
      newArr.splice(idx - 1, 0, el);
      return newArr;
    });
  };

  const updateTextInline = (id, newText) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, text: newText } : it)));
  };

  const selected = items.find((it) => it.id === selectedId) || null;

  return (
    <section id="builder" className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-slate-900">Editor Slide</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Tema:</span>
            <select
              className="text-sm rounded-md border border-slate-300 px-2 py-1 bg-white"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="indigo">Indigo</option>
              <option value="fuchsia">Fuchsia</option>
              <option value="emerald">Emerald</option>
              <option value="amber">Amber</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr_220px] gap-4">
          {/* Left toolbar */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 h-fit sticky top-20">
            <p className="text-sm font-medium text-slate-700 mb-2">Alat</p>
            <div className="grid gap-2">
              <button onClick={addText} className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">
                <Type size={16} /> Tambah Teks
              </button>
              <button onClick={addRect} className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 text-slate-700 text-sm hover:bg-slate-50">
                <Square size={16} /> Tambah Bentuk
              </button>
              <button onClick={removeSelected} className="flex items-center gap-2 px-3 py-2 rounded-md border border-rose-200 text-rose-700 text-sm hover:bg-rose-50 disabled:opacity-50" disabled={!selectedId}>
                <Trash2 size={16} /> Hapus Terpilih
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="aspect-video bg-white rounded-lg border border-slate-200 relative overflow-hidden" ref={canvasRef} onMouseDown={() => setSelectedId(null)}>
              {/* background guide */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              {/* items */}
              {items.map((it) => (
                <ItemView
                  key={it.id}
                  item={it}
                  selected={selectedId === it.id}
                  onMouseDown={(e) => onMouseDown(e, it.id)}
                  onDoubleClick={() => {
                    if (it.type === 'text') {
                      const t = prompt('Ubah teks:', it.text || '');
                      if (typeof t === 'string') updateTextInline(it.id, t);
                    }
                  }}
                />
              ))}
              {/* selection hint */}
              {selected && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: selected.x - 6,
                    top: selected.y - 6,
                    width: (selected.w || 0) + 12,
                    height: (selected.h || 0) + 12,
                    border: '2px dashed rgba(79,70,229,0.7)',
                    borderRadius: 12,
                  }}
                />
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 text-slate-500 text-xs">
              <MousePointer2 size={14} />
              <span>Tips: Seret elemen di kanvas untuk memindahkan. Klik dua kali teks untuk mengedit.</span>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 h-fit sticky top-20">
            <p className="text-sm font-medium text-slate-700 mb-2">Properti</p>
            {!selected && <p className="text-sm text-slate-500">Pilih elemen untuk mengubah properti.</p>}
            {selected && selected.type === 'text' && (
              <div className="grid gap-3 text-sm">
                <div>
                  <label className="block text-slate-600 mb-1">Isi Teks</label>
                  <input
                    className="w-full rounded-md border border-slate-300 px-2 py-1"
                    value={selected.text}
                    onChange={(e) => updateTextInline(selected.id, e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1">Ukuran</label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                      value={selected.size}
                      onChange={(e) =>
                        setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, size: Number(e.target.value) } : it)))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Tebal</label>
                    <select
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                      value={selected.weight}
                      onChange={(e) =>
                        setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, weight: Number(e.target.value) } : it)))
                      }
                    >
                      <option value={400}>Normal</option>
                      <option value={600}>Semi</option>
                      <option value={700}>Bold</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Warna</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-8 w-10 rounded border border-slate-300"
                      value={selected.color}
                      onChange={(e) =>
                        setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, color: e.target.value } : it)))
                      }
                    />
                    <div className="text-slate-700 flex items-center gap-1">
                      <Palette size={14} />
                      <span>{selected.color}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={bringForward} className="flex-1 px-2 py-1.5 rounded-md border border-slate-300 text-slate-700">Naikkan</button>
                  <button onClick={sendBackward} className="flex-1 px-2 py-1.5 rounded-md border border-slate-300 text-slate-700">Turunkan</button>
                </div>
              </div>
            )}

            {selected && selected.type === 'rect' && (
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1">Lebar</label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                      value={selected.w}
                      onChange={(e) =>
                        setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, w: Number(e.target.value) } : it)))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Tinggi</label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-slate-300 px-2 py-1"
                      value={selected.h}
                      onChange={(e) =>
                        setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, h: Number(e.target.value) } : it)))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Radius</label>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    className="w-full"
                    value={selected.radius}
                    onChange={(e) =>
                      setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, radius: Number(e.target.value) } : it)))
                    }
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Opacity</label>
                  <input
                    type="range"
                    min={0.05}
                    max={1}
                    step={0.05}
                    className="w-full"
                    value={selected.opacity}
                    onChange={(e) =>
                      setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, opacity: Number(e.target.value) } : it)))
                    }
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Warna Isi</label>
                  <input
                    type="color"
                    className="h-8 w-10 rounded border border-slate-300"
                    value={rgbToHex(selected.fill)}
                    onChange={(e) =>
                      setItems((prev) => prev.map((it) => (it.id === selected.id ? { ...it, fill: e.target.value } : it)))
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={bringForward} className="flex-1 px-2 py-1.5 rounded-md border border-slate-300 text-slate-700">Naikkan</button>
                  <button onClick={sendBackward} className="flex-1 px-2 py-1.5 rounded-md border border-slate-300 text-slate-700">Turunkan</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ItemView({ item, selected, onMouseDown, onDoubleClick }) {
  if (item.type === 'text') {
    return (
      <div
        className={`absolute select-none cursor-move ${selected ? 'ring-2 ring-indigo-500/70 rounded-md' : ''}`}
        style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        <div
          style={{
            color: item.color,
            fontWeight: item.weight,
            fontSize: item.size,
            lineHeight: 1.2,
          }}
        >
          {item.text}
        </div>
      </div>
    );
  }
  if (item.type === 'rect') {
    return (
      <div
        className={`absolute select-none cursor-move ${selected ? 'ring-2 ring-indigo-500/70' : ''}`}
        style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
        onMouseDown={onMouseDown}
      >
        <div
          className="w-full h-full"
          style={{ background: item.fill, opacity: item.opacity, borderRadius: item.radius }}
        />
      </div>
    );
  }
  return null;
}

function rgbToHex(rgb) {
  if (!rgb) return '#000000';
  if (rgb.startsWith('#')) return rgb;
  const res = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(rgb);
  if (!res) return '#000000';
  const r = Number(res[1]).toString(16).padStart(2, '0');
  const g = Number(res[2]).toString(16).padStart(2, '0');
  const b = Number(res[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}
