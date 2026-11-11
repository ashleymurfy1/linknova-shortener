import { NextResponse } from 'next/server';
import { getSupabaseConfig } from '../../../lib/supabase-env';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug tidak ditemukan' }, { status: 400 });
    }

    const { url: supabaseUrl, key: supabaseKey } = getSupabaseConfig();

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Konfigurasi server belum lengkap' }, { status: 500 });
    }

    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/links?slug=eq.${encodeURIComponent(slug)}&select=target_url`, {
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
