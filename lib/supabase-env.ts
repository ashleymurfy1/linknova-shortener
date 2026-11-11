import { createClient } from '@supabase/supabase-js'

export function getSupabaseConfig() {
    return {
        url: 'https://lmyhqzouolhwqlpgqkic.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWhxem91b2xod3FscGdxa2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NjkzMTEsImV4cCI6MjEwODI0NTMxMX0.4Xe-NTtPQ8FC-fw2bkLwrc0SEvYImJNUTAuMEoH9DxY',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWhxem91b2xod3FscGdxa2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NjkzMTEsImV4cCI6MjEwODI0NTMxMX0.4Xe-NTtPQ8FC-fw2bkLwrc0SEvYImJNUTAuMEoH9DxY',
    };
}

const supabaseUrl = 'https://lmyhqzouolhwqlpgqkic.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWhxem91b2xod3FscGdxa2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NjkzMTEsImV4cCI6MjEwODI0NTMxMX0.4Xe-NTtPQ8FC-fw2bkLwrc0SEvYImJNUTAuMEoH9DxY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
