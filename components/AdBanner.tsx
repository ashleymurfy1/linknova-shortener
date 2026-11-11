'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    if (bannerRef.current.firstChild) return;

    const conf = document.createElement('script');
    conf.type = 'text/javascript';
    conf.innerHTML = `
      atOptions = {
        'key' : '3f47ef8ea331b451cd763b6d20ce265b',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://brijmohan.org/22/3f47ef8ea331b451cd763b6d20ce265b';
    script.async = true;

    bannerRef.current.appendChild(conf);
    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center my-2 overflow-hidden w-full max-w-[728px]">
      <div ref={bannerRef} />
    </div>
  );
}
