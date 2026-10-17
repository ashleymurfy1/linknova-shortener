'use client';

import { useState } from 'react';

export default function Home() {
  const [destinationUrl, setDestinationUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationUrl || !customSlug) {
      alert('Mohon isi URL tujuan dan kode unik pendek terlebih dahulu!');
      return;
    }

    // Ambil data link yang sudah ada sebelumnya dari localStorage
    const existingLinks = localStorage.getItem('linknova_links');
    const linksMap = existingLinks ? JSON.parse(existingLinks) : {};

    // Simpan link baru berdasarkan slug
    linksMap[customSlug] = destinationUrl;
    localStorage.setItem('linknova_links', JSON.stringify(linksMap));

    // Buat hasil link pendek
    const baseUrl = window.location.origin;
    setShortUrl(`${baseUrl}/${customSlug}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">LinkNova Shortener</h1>
        <p className="text-gray-600 mb-6 text-center">Buat tautan safelink ber-timer 10 detik untuk monetisasi Adsterra.</p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL TUJUAN (Bisa Link Apa Saja)</label>
            <input
              type="url"
              placeholder="https://contoh.com/file-atau-video-anda"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">KODE UNIK PENDEK</label>
            <input
              type="text"
              placeholder="contoh: fileku123"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            Buat Link Safelink
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-2">Link Safelink Anda Berhasil Dibuat:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
