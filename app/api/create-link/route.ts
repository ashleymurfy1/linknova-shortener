import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { slug, targetUrl } = await request.json();

        if (!slug || !targetUrl) {
            return NextResponse.json({ error: 'Slug dan URL tujuan harus diisi' }, { status: 400 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({ error: 'Konfigurasi server belum lengkap' }, { status: 500 });
        }

        const res = await fetch(`${supabaseUrl}/rest/v1/links`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({ slug, target_url: targetUrl })
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: data.message || 'Gagal menyimpan ke database' }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
    }
}
