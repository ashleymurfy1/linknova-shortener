'use client';

import { useState } from 'react';

export default function Home() {
    const [targetUrl, setTargetUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateShortLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetUrl) {
            alert('Masukkan URL tujuan terlebih dahulu!');
            return;
        }

        setLoading(true);
        const slug = customSlug.trim() || Math.random().toString(36).substring(2, 8);

        try {
            const response = await fetch('/api/create-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, targetUrl })
            });

            const data = await response.json();

            if (response.ok) {
                const domain = window.location.origin;
                setShortUrl(`${domain}/s/${slug}`);
            } else {
                alert(data.error || 'Gagal membuat tautan.');
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan koneksi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Segoe UI', Arial, sans-serif", padding: '20px' }}>
            <div style={{ background: '#ffffff', width: '100%', maxWidth: '480px', padding: '35px', borderRadius: '16px', boxShadow: '0 20px 25px rgba(0,0,0,0.3)' }}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <h1 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '800', marginBottom: '6px' }}>LinkNova Admin</h1>
                    <p style={{ color: '#64748b', fontSize: '13px' }}>Buat tautan pendek publik ala Ouo.io</p>
                </div>

                <form onSubmit={handleCreateShortLink}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '5px', textTransform: 'uppercase' }}>URL Tujuan</label>
                        <input 
                            type="url" 
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            placeholder="https://contoh.com/file-anda" 
                            required
                            style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '5px', textTransform: 'uppercase' }}>Kustom Slug (Opsional)</label>
                        <input 
                            type="text" 
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            placeholder="biarkan kosong untuk acak" 
                            style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '14px', fontSize: '15px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}
                    >
                        {loading ? 'Memproses...' : 'Buat Tautan Pendek'}
                    </button>
                </form>

                {shortUrl && (
                    <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' }}>Hasil Tautan Publik:</p>
                        <input type="text" readOnly value={shortUrl} style={{ width: '100%', padding: '8px', fontSize: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '8px' }} />
                        <button 
                            onClick={() => { navigator.clipboard.writeText(shortUrl); alert('Disalin!'); }}
                            style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '8px', fontSize: '13px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}
                        >
                            Salin Tautan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
