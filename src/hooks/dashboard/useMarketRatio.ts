import { useQuery } from "@tanstack/react-query";
import type { MarketCross } from "@/types/ratios";

export function useRatios(marketId: string | null) {
  return useQuery({
    queryKey: ["ratios", marketId],
    queryFn: async (): Promise<MarketCross> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ratios/${marketId}`);
      if (!res.ok) throw new Error(`Failed to fetch ratios: ${res.status}`);
      return res.json();
    },
    enabled: !!marketId, // don't fire the request until a marketId actually exists
  });
}