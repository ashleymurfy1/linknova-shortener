'use client';

import { useState } from 'react';

export default function Home() {
  const [teraboxUrl, setTeraboxUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [linkType, setLinkType] = useState('terabox'); // Pilihan: terabox atau telegram
  const [shortUrl, setShortUrl] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSlug) {
      alert('Mohon isi kode unik pendek terlebih dahulu!');
      return;
    }

    const targetUrl = linkType === 'terabox' ? teraboxUrl : telegramUrl;
    if (!targetUrl) {
      alert(`Mohon isi URL ${linkType === 'terabox' ? 'Terabox' : 'Telegram'} terlebih dahulu!`);
      return;
    }

    // Ambil data link dari localStorage
    const existingLinks = localStorage.getItem('linknova_links');
    const linksMap = existingLinks ? JSON.parse(existingLinks) : {};

    // Simpan link berdasarkan slug
    linksMap[customSlug] = targetUrl;
    localStorage.setItem('linknova_links', JSON.stringify(linksMap));

    // Buat hasil link pendek
    const baseUrl = window.location.origin;
    setShortUrl(`${baseUrl}/${customSlug}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">LinkNova Shortener</h1>
        <p className="text-gray-600 mb-6 text-center">Buat safelink ber-timer 10 detik untuk Terabox & Bot Telegram.</p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PILIH JENIS LINK</label>
            <select
              value={linkType}
              onChange={(e) => setLinkType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black bg-white"
            >
              <option value="terabox">Link Terabox</option>
              <option value="telegram">Link Bot Telegram</option>
            </select>
          </div>

          {linkType === 'terabox' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL TERABOX</label>
              <input
                type="url"
                placeholder="https://1024terabox.com/s/..."
                value={teraboxUrl}
                onChange={(e) => setTeraboxUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL BOT TELEGRAM</label>
              <input
                type="url"
                placeholder="https://t.me/nama_bot_anda"
                value={telegramUrl}
                onChange={(e) => setTelegramUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">KODE UNIK PENDEK (SLUG)</label>
            <input
              type="text"
              placeholder="contoh: file1 atau botku"
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
