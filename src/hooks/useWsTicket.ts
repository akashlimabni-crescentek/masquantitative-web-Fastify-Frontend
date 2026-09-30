import { createClient } from "@/lib/supabase/client";

export async function fetchWsTicket(): Promise<string> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ws/ticket`, {
    method: "POST",
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
  if (!res.ok) throw new Error(`Failed to get WS ticket: ${res.status}`);

  const data = await res.json();
  return data.ticket; 
}