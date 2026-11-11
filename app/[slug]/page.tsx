import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabaseUrl = 'https://ursgprlsufossyqqmqye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Gunakan kunci supabase asli Anda
const supabase = createClient(supabaseUrl, supabaseKey);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SafelinkPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: linkData, error } = await supabase
    .from('links')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !linkData) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-xl max-w-lg w-full flex flex-col items-center">
        
        <h1 className="text-2xl font-bold mb-2">LinkNova Safelink</h1>
        <p className="text-sm text-slate-600 mb-4 text-center">
          Tautan Anda hampir siap. Silakan lihat banner iklan di bawah ini.
        </p>

        {/* BANNER ATAS */}
        <div className="w-full my-3 flex justify-center overflow-hidden">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : '3f47ef8ea331b451cd763b6d20ce265b',
                  'format' : 'iframe',
                  'height' : 90,
                  'width' : 728,
                  'params' : {}
                };
              `,
            }}
          />
          <script src="https://brijmohan.org/22/3f47ef8ea331b451cd763b6d20ce265b" async></script>
        </div>

        {/* Tombol Menuju Tautan Asli */}
        <div className="w-full my-6 flex flex-col items-center">
          <p className="text-xs text-slate-500 mb-2">Please click the button below to proceed.</p>
          <a
            href={linkData.original_url}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-center shadow-lg transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            DAPATKAN TAUTAN (GET LINK)
          </a>
        </div>

        {/* BANNER BAWAH */}
        <div className="w-full my-3 flex justify-center overflow-hidden">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : '3f47ef8ea331b451cd763b6d20ce265b',
                  'format' : 'iframe',
                  'height' : 90,
                  'width' : 728,
                  'params' : {}
                };
              `,
            }}
          />
          <script src="https://brijmohan.org/22/3f47ef8ea331b451cd763b6d20ce265b" async></script>
        </div>

        <p className="text-xs text-slate-400 mt-4">© 2026 LinkNova Shortener</p>
      </div>
    </main>
  );
}
