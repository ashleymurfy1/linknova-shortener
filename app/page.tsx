'use client';

import { useState } from 'react';

const SUPABASE_URL = 'https://lmyhqzouolhwqlpgqkic.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWhxem91b2xod3FscGdxa2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NjkzMTEsImV4cCI6MjEwODI0NTMxMX0.4Xe-NTtPQ8FC-fw2bkLwrc0SEvYImJNUTAuMEoH9DxY';

export default function Home() {
  const [teraboxUrl, setTeraboxUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [linkType, setLinkType] = useState('terabox');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
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

    setLoading(true);
    setCopied(false);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/links`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          slug: customSlug,
          target_url: targetUrl
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan ke database. Kemungkinan kode slug sudah dipakai.');
      }

      const baseUrl = window.location.origin;
      setShortUrl(`${baseUrl}/${customSlug}`);
      alert('Link Safelink berhasil dibuat secara online!');
    } catch (err: any) {
      alert('Error: ' + err.message + '. Coba ganti kode slug lain.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">LinkNova Shortener</h1>
        <p className="text-gray-600 mb-6 text-center">Database Online (Supabase Aktif)</p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PILIH JENIS LINK</label>
            <select
              value={linkType}
              onChange={(e) => setLinkType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                required
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
                required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            {loading ? 'Menyimpan...' : 'Buat Link Safelink'}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center space-y-3">
            <p className="text-sm text-gray-600">Link Safelink Anda Berhasil Dibuat:</p>
            <div>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold underline break-all"
              >
                {shortUrl}
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-sm text-sm cursor-pointer"
            >
              {copied ? '✓ Berhasil Disalin!' : 'Salin Link'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
