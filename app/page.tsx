'use client';
import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl || !shortCode) {
      alert('Mohon isi URL tujuan dan kode unik pendek!');
      return;
    }
    const baseUrl = window.location.origin;
    setGeneratedLink(`${baseUrl}/${shortCode}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white font-sans">
      <div className="w-full max-w-lg bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center text-indigo-400">LinkNova Shortener</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">
          Buat tautan safelink ber-timer 10 detik untuk monetisasi Adsterra.
        </p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">URL Tujuan (YouTube/Blog)</label>
            <input 
              type="url" 
              placeholder="https://youtube.com/..." 
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">Kode Unik Pendek</label>
            <input 
              type="text" 
              placeholder="contoh: video1" 
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-lg transition text-sm"
          >
            Buat Link Safelink
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 p-4 bg-slate-900 border border-indigo-500/50 rounded-lg text-center">
            <p className="text-xs text-slate-400 mb-1">Link Safelink Anda Berhasil Dibuat:</p>
            <a 
              href={generatedLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-400 font-mono font-bold underline text-sm break-all"
            >
              {generatedLink}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
