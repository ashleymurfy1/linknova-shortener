'use client';

import { useState } from 'react';

export default function Home() {
    const [targetUrl, setTargetUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleShorten = (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetUrl) {
            alert('Masukkan URL tujuan terlebih dahulu!');
            return;
        }

        // Domain Safelink Blogger Anda
        const bloggerSafelink = "https://secrtcollection.blogspot.com/p/safelink.html";
        
        // Membuat format link ala ouo.io yang dilempar ke Blogger
        const finalLink = `${bloggerSafelink}?to=${encodeURIComponent(targetUrl)}`;
        
        setShortUrl(finalLink);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f172a 1e-3%, #1e293b 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                background: '#ffffff',
                padding: '35px',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <h1 style={{ color: '#0f172a', fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
                        LinkNova Shortener
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '13px' }}>Perpendek tautan & maksimalkan pendapatan iklan Anda</p>
                </div>

                <form onSubmit={handleShorten}>
                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Masukkan URL Tujuan (Destinasi Link)
                        </label>
                        <input 
                            type="url" 
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            placeholder="https://contoh.com/file-anda" 
                            required
                            style={{ width: '100%', padding: '12px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            width: '100%',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            padding: '14px',
                            fontSize: '15px',
                            fontWeight: '700',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                        }}
                    >
                        Buat Tautan Pendek
                    </button>
                </form>

                {shortUrl && (
                    <div style={{ marginTop: '25px', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        <p style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Tautan Berhasil Dibuat:</p>
                        <input 
                            type="text" 
                            readOnly 
                            value={shortUrl} 
                            style={{ width: '100%', padding: '8px', fontSize: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(shortUrl);
                                alert('Link berhasil disalin!');
                            }}
                            style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '8px', fontSize: '13px', fontWeight: '600', borderRadius: '6px', cursor: 'pointer' }}
                        >
                            Salin Tautan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
