
import { useQuery } from "@tanstack/react-query";
import type { MarketMetrics, MarketMetricsResponse } from "@/types/dashboard";

export function useMarketMetrics() {
  return useQuery({
    queryKey: ["markets", "metrics"],
    queryFn: async (): Promise<MarketMetrics> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/markets/metrics`);
      if (!res.ok) throw new Error(`Failed to fetch market metrics: ${res.status}`);

      const data: MarketMetricsResponse = await res.json();
      return data.metrics;
    },
  });
}