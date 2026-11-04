'use client';

import { useState } from 'react';

export default function Home() {
    const [targetUrl, setTargetUrl] = useState('');
    const [step, setStep] = useState(1); // Step 1: Input URL, Step 2: Tombol Human, Step 3: Timer
    const [timeLeft, setTimeLeft] = useState(10);
    const [finalLink, setFinalLink] = useState('');

    // Tahap 1: Saat user memasukkan link dan klik tombol buat
    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetUrl) {
            alert('Masukkan URL tujuan terlebih dahulu!');
            return;
        }
        setStep(2); // Pindah ke tampilan tombol "I'M A HUMAN"
    };

    // Tahap 2: Saat tombol "I'M A HUMAN" diklik, mulai timer
    const handleHumanClick = () => {
        setStep(3); // Pindah ke tampilan Timer
        let timer = 10;
        setTimeLeft(timer);

        const interval = setInterval(() => {
            timer -= 1;
            setTimeLeft(timer);
            if (timer <= 0) {
                clearInterval(interval);
                // Siapkan link tujuan akhir (bisa langsung ke target atau lewat safelink Blogger)
                const bloggerSafelink = "https://secrtcollection.blogspot.com/p/safelink.html";
                setFinalLink(`${bloggerSafelink}?to=${encodeURIComponent(targetUrl)}`);
            }
        }, 1000);
    };

    return (
        <div style={{
            backgroundColor: '#1e293b',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Segoe UI', Arial, sans-serif",
            padding: '20px'
        }}>
            <div style={{
                background: '#ffffff',
                width: '100%',
                maxWidt: '520px',
                padding: '35px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                textAlign: 'center'
            }}>
                <h2 style={{ color: '#0f172a', marginBottom: '20px', fontSize: '22px' }}>LinkNova Shortener</h2>

                {/* STEP 1: KOTAK INPUT URL */}
                {step === 1 && (
                    <form onSubmit={handleGenerate}>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>
                            Masukkan tautan tujuan Anda di bawah ini:
                        </p>
                        <input 
                            type="url" 
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            placeholder="https://contoh.com/file-anda" 
                            required
                            style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', outline: 'none' }}
                        />
                        <button 
                            type="submit" 
                            style={{ width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '12px', fontSize: '15px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            Buat Tautan Safelink
                        </button>
                    </form>
                )}

                {/* STEP 2: TOMBOL I'M A HUMAN ALA OUO.IO */}
                {step === 2 && (
                    <div>
                        <p style={{ color: '#333', fontSize: '15px', fontWeight: '600', marginBottom: '20px' }}>
                            Please click the button below to proceed to the destination page.
                        </p>
                        
                        {/* Area Iklan Dummy / Adsterra */}
                        <div style={{ margin: '15px 0', padding: '20px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', fontSize: '13px' }}>
                            [ Area Banner Iklan Adsterra ]
                        </div>

                        <button 
                            onClick={handleHumanClick}
                            style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 35px', fontSize: '15px', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)', textTransform: 'uppercase', margin: '15px 0' }}
                        >
                            I'M A HUMAN
                        </button>
                    </div>
                )}

                {/* STEP 3: TIMER & TOMBOL MENUJU TUJUAN */}
                {step === 3 && (
                    <div>
                        <p style={{ color: '#333', fontSize: '15px', fontWeight: '600', marginBottom: '15px' }}>
                            Tautan Anda hampir siap.
                        </p>

                        <div style={{ margin: '15px 0', padding: '15px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', fontSize: '12px' }}>
                            [ Area Iklan Adsterra ]
                        </div>

                        {/* Lingkaran Timer */}
                        {timeLeft > 0 ? (
                            <div style={{ margin: '25px auto', width: '75px', height: '75px', border: '3px solid #cbd5e1', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>{timeLeft}</span>
                                <span style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase' }}>Detik</span>
                            </div>
                        ) : (
                            <div style={{ marginTop: '20px' }}>
                                <a 
                                    href={finalLink} 
                                    style={{ display: 'block', background: '#10b981', color: 'white', padding: '14px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', borderRadius: '8px', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)' }}
                                >
                                    Dapatkan Tautan (Get Link)
                                </a>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
