'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function SafelinkPage() {
    const params = useParams();
    const slug = params?.slug;

    const [targetUrl, setTargetUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1); // 1: Tombol Human, 2: Timer
    const [timeLeft, setTimeLeft] = useState(10);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!slug) return;

        // Mengambil data link asli dari Supabase berdasarkan slug
        fetch(`/api/get-link?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.target_url) {
                    setTargetUrl(data.target_url);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    const handleHumanClick = () => {
        setStep(2);
        let timer = 10;
        setTimeLeft(timer);

        const interval = setInterval(() => {
            timer -= 1;
            setTimeLeft(timer);
            if (timer <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    if (loading) {
        return <div style={{ background: '#1e293b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontFamily: 'sans-serif' }}>Memuat tautan...</div>;
    }

    if (error || !targetUrl) {
        return <div style={{ background: '#1e293b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ef4444', fontFamily: 'sans-serif', fontSize: '18px' }}>Maaf, tautan tidak ditemukan atau sudah kadaluarsa.</div>;
    }

    return (
        <div style={{ backgroundColor: '#1e293b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Segoe UI', Arial, sans-serif", padding: '20px' }}>
            <div style={{ background: '#ffffff', width: '100%', maxWidth: '520px', padding: '35px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', textAlign: 'center' }}>
                <h2 style={{ color: '#0f172a', marginBottom: '20px', fontSize: '22px' }}>LinkNova Safelink</h2>

                {step === 1 && (
                    <div>
                        <p style={{ color: '#333', fontSize: '15px', fontWeight: '600', marginBottom: '20px' }}>
                            Please click the button below to proceed to the destination page.
                        </p>
                        
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

                {step === 2 && (
                    <div>
                        <p style={{ color: '#333', fontSize: '15px', fontWeight: '600', marginBottom: '15px' }}>
                            Tautan Anda hampir siap.
                        </p>

                        <div style={{ margin: '15px 0', padding: '15px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#94a3b8', fontSize: '12px' }}>
                           <div style={{ margin: '20px 0', minHeight: '90px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
    <div style={{ textAlign: 'center' }}>
        <script dangerouslySetInnerHTML={{ __html: `
            atOptions = {
                'key' : '3f47ef8ea331b451cd763b6d20ce265b',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
        ` }} />
        <script type="text/javascript" src="https://brijmohan.org/22/3f47ef8ea331b451cd763b6d20ce265b" async />
    </div>
</div>
                        </div>

                        {timeLeft > 0 ? (
                            <div style={{ margin: '25px auto', width: '75px', height: '75px', border: '3px solid #cbd5e1', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>{timeLeft}</span>
                                <span style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase' }}>Detik</span>
                            </div>
                        ) : (
                            <div style={{ marginTop: '20px' }}>
                                <a 
                                    href={targetUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
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
