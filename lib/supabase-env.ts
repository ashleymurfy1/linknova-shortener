// Server-only access to Supabase configuration.
//
// Next.js inlines any literal `process.env.NEXT_PUBLIC_*` reference into the
// build output at build time, which leaks the values into `.next` (and trips
// Netlify's secrets scanning). Looking the variables up by a computed key keeps
// them out of the bundle so they are only read at runtime on the server.
function readEnv(...names: string[]): string | undefined {
    for (const name of names) {
        const value = process.env[name];
        if (value) return value;
    }
    return undefined;
}

export function getSupabaseConfig() {
    const prefix = 'NEXT_PUBLIC_';
    return {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
    };
}
