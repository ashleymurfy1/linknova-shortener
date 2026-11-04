import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug tidak ditemukan' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Konfigurasi server belum lengkap' }, { status: 500 });
    }

    try {
        // Menggunakan REST API langsung ke Supabase tanpa library tambahan
        const res = await fetch(`${supabaseUrl}/rest/v1/links?slug=eq.${slug}&select=target_url`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });

        const data = await res.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Link tidak ditemukan' }, { status: 404 });
        }

        return NextResponse.json({ target_url: data[0].target_url });
    } catch (err) {
        return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
    }
}
