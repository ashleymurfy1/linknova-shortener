'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const SUPABASE_URL = 'https://lmyhqzouolhwqlpgqkic.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWhxem91b2xod3FscGdxa2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NjkzMTEsImV4cCI6MjEwODI0NTMxMX0.4Xe-NTtPQ8FC-fw2bkLwrc0SEvYImJNUTAuMEoH9DxY';

export default function SafelinkPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [countdown, setCountdown] = useState(10);
  const [canProceed, setCanProceed] = useState(false);
  const [targetUrl, setTargetUrl] = useState('https://google.com');

  useEffect(() => {
    async function fetchTargetUrl() {
      if (!slug) return;
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/links?slug=eq.${slug}&select=target_url`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        const data = await res.json();
        if (data && data.length > 0 && data[0].target_url) {
          setTargetUrl(data[0].target_url);
        }
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      }
    }

    fetchTargetUrl();

    const popunderScript = document.createElement('script');
    popunderScript.src = 'https://pl31879658.profitableratecpmnetwork.com/4f/bf/91/4fbf91988c1f25c795f3884bb487ee94.js';
    popunderScript.async = true;
    document.body.appendChild(popunderScript);

    const socialBarScript = document.createElement('script');
    socialBarScript.src = 'https://pl31879659.profitableratecpmnetwork.com/61/36/9f/61369f51f53aa1b77e21533250f4ac18.js';
    socialBarScript.async = true;
    document.body.appendChild(socialBarScript);

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanProceed(true);
    }
  }, [countdown, slug]);

  const handleRedirect = () => {
    window.location.href = targetUrl;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">LinkNova Safelink</h1>
        <p className="text-gray-600 mb-6">Mohon tunggu sebentar untuk melanjutkan ke tujuan Anda.</p>
        
        <div className="my-6">
          {!canProceed ? (
            <div className="text-4xl font-extrabold text-blue-600">
              {countdown} <span className="text-sm font-normal text-gray-500">detik</span>
            </div>
          ) : (
            <button
              onClick={handleRedirect}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md cursor-pointer"
            >
              Menuju Tautan
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-4">Kode Safelink: {slug}</p>
      </div>
    </main>
  );
}
