// hooks/useMovers.ts
import { useQuery } from "@tanstack/react-query";
import type { MoverMarket, MoversResponse } from "@/types/dashboard";

export function useMovers(limit?: number, category?: string) {
  return useQuery({
    queryKey: ["markets", "movers", limit, category],
    queryFn: async (): Promise<MoverMarket[]> => {
      const searchParams = new URLSearchParams();
      if (limit !== undefined) searchParams.set("limit", String(limit));
      if (category) searchParams.set("category", category);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/markets/movers?${searchParams}`
      );
      if (!res.ok) throw new Error(`Failed to fetch movers: ${res.status}`);

      const data: MoversResponse = await res.json();
      return data.movers;
    },
  });
}