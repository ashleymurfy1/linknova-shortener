'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function SafelinkPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [countdown, setCountdown] = useState(10);
  const [canProceed, setCanProceed] = useState(false);
  const [targetUrl, setTargetUrl] = useState('https://google.com');

  useEffect(() => {
    if (slug) {
      const savedLinks = localStorage.getItem('linknova_links');
      if (savedLinks) {
        const linksMap = JSON.parse(savedLinks);
        if (linksMap[slug]) {
          setTargetUrl(linksMap[slug]);
        }
      }
    }

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
