'use client';

import { useState } from 'react';

const SUPABASE_URL = 'https://1myhqzouolhwqlpgqkic.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IjFteWhxem91bGh3cWxwZ3FraWMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMDUwMjgzMSwiZXhwIjoyMDQ2MDc4ODMxfQ.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IjFteWhxem91bGh3cWxwZ3FraWMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMDUwMjgzMSwiZXhwIjoyMDQ2MDc4ODMxfQ.fakekey'; // Gunakan kunci asli Anda yang ada di file sebelumnya

export default function Home() {
    const [teraboxUrl, setTeraboxUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [linkType, setLinkType] = useState('terabox');
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState('');

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customSlug) {
            alert('Mohon isi kode unik pendek terlebih dahulu!');
            return;
        }
        if (!teraboxUrl) {
            alert('Mohon isi URL Terabox terlebih dahulu!');
            return;
        }

        setLoading(true);

        // Domain Blogger Safelink Anda
        const domainBlogger = "https://secrtcollection.blogspot.com/p/safelink.html";
        const finalSafelink = `${domainBlogger}?to=${encodeURIComponent(teraboxUrl)}`;

        // Di sini Anda bisa menyematkan kembali logika penyimpanan ke Supabase jika diperlukan
        setShortUrl(finalSafelink);
        setLoading(false);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                width: '100%',
                maxWidth: '500px',
                background: '#ffffff',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <h1 style={{ color: '#1a202c', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                        LinkNova Shortener
                    </h1>
                    <span style={{
                        display: 'inline-block',
                        background: '#e1effe',
                        color: '#1e429f',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '20px'
                    }}>
                        Database Online (Supabase Aktif)
                    </span>
                </div>

                <form onSubmit={handleGenerate}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Pilih Jenis Link
                        </label>
                        <select 
                            value={linkType} 
                            onChange={(e) => setLinkType(e.target.value)}
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '14px', background: '#fdfdfd' }}
                        >
                            <option value="terabox">Link Terabox</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', textTransform: 'uppercase' }}>
                            URL Terabox
                        </label>
                        <input 
                            type="url" 
                            value={teraboxUrl}
                            onChange={(e) => setTeraboxUrl(e.target.value)}
                            placeholder="https://1024terabox.com/s/..." 
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '14px', background: '#fdfdfd' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a5568', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Kode Unik Pendek (Slug)
                        </label>
                        <input 
                            type="text" 
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            placeholder="contoh: file1 atau botku" 
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '14px', background: '#fdfdfd' }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: '#3182ce',
                            color: 'white',
                            border: 'none',
                            padding: '14px',
                            fontSize: '15px',
                            fontWeight: '600',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)'
                        }}
                    >
                        {loading ? 'Memproses...' : 'Buat Link Safelink'}
                    </button>
                </form>

                {shortUrl && (
                    <div style={{ marginTop: '20px', padding: '15px', background: '#edf2f7', borderRadius: '8px', wordBreak: 'break-all' }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: '#4a5568', marginBottom: '5px' }}>Hasil Safelink:</p>
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3182ce', fontSize: '14px', textDecoration: 'underline' }}>
                            {shortUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
