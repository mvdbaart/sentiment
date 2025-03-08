import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to save domain analysis to Supabase
export async function saveDomainAnalysisToDatabase(
  domain: string,
  data: any,
  userId: string,
): Promise<void> {
  const { error } = await supabase.from("domain_analyses").insert({
    user_id: userId,
    domain: domain,
    date: new Date().toISOString(),
    data: data,
  });

  if (error) throw error;
}

// Function to get previous domain analyses for a user
export async function getPreviousDomainAnalyses(
  userId: string,
): Promise<any[]> {
  const { data, error } = await supabase
    .from("domain_analyses")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Function to get a specific domain analysis
export async function getDomainAnalysis(domainId: string): Promise<any | null> {
  const { data, error } = await supabase
    .from("domain_analyses")
    .select("*")
    .eq("id", domainId)
    .single();

  if (error) return null;
  return data;
}
