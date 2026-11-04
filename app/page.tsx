'use client';

import { useState } from 'react';

export default function Home() {
    const [targetUrl, setTargetUrl] = useState('');

    const handleGetLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetUrl) {
            alert('Masukkan URL tujuan terlebih dahulu!');
            return;
        }

        // Domain Safelink Blogger Anda
        const bloggerSafelink = "https://secrtcollection.blogspot.com/p/safelink.html";
        
        // Alur: Lempar langsung (redirect) ke Blogger dengan membawa parameter link asli
        const finalRedirectUrl = `${bloggerSafelink}?to=${encodeURIComponent(targetUrl)}`;
        
        // Membuka halaman safelink Blogger secara otomatis
        window.location.href = finalRedirectUrl;
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
                    <p style={{ color: '#64748b', fontSize: '13px' }}>Sistem Safelink Otomatis & Cepat</p>
                </div>

                <form onSubmit={handleGetLink}>
                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Masukkan URL Tujuan
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
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                            transition: 'background 0.2s'
                        }}
                    >
                        Get Link (Menuju Safelink)
                    </button>
                </form>
            </div>
        </div>
    );
}
