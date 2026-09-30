export type Platform = "polymarket" | "kalshi";
import { useQuery } from "@tanstack/react-query";

import { Market, MarketsResponse, MarketsQueryParams} from "@/types/market"






export function useMarkets(params: MarketsQueryParams & { limit: number }) {
  const query = useQuery({
    queryKey: ["markets", params],
    queryFn: async (): Promise<MarketsResponse> => {
      const searchParams = new URLSearchParams();
      if (params.platform) searchParams.set("platform", params.platform);
      searchParams.set("limit", String(params.limit));
      if (params.category) searchParams.set("category", params.category);
      
      if (params.offset !== undefined) searchParams.set("offset", String(params.offset));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/markets?${searchParams}`);
      if (!res.ok) throw new Error(`Failed to fetch markets: ${res.status}`);
      return res.json();
    },
  });

  const hasNextPage = (query.data?.markets.length ?? 0) === params.limit;

  return { ...query, hasNextPage };
}