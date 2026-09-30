
import { useQuery } from "@tanstack/react-query";
import type { EndingSoonMarket, EndingSoonResponse } from "@/types/dashboard";

export function useEndingSoon(limit?: number, category?: string) {
  return useQuery({
    queryKey: ["markets", "ending-soon", limit, category],
    queryFn: async (): Promise<EndingSoonMarket[]> => {
      const searchParams = new URLSearchParams();
      if (limit !== undefined) searchParams.set("limit", String(limit));
      if (category) searchParams.set("category", category);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/markets/ending-soon?${searchParams}`
      );
      if (!res.ok) throw new Error(`Failed to fetch ending-soon markets: ${res.status}`);

      const data: EndingSoonResponse = await res.json();
      return data.ending_soon;
    },
  });
}