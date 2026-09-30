// hooks/useMarket.ts
"use client";

import { Market } from "@/types/market";

interface MarketResponse {
  market: Market;
}

import { useQuery } from "@tanstack/react-query";


export function useMarket(id: string) {
  return useQuery({
    queryKey: ["markets", id],
    queryFn: async (): Promise<Market> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/markets/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch market: ${res.status}`);
      const data: MarketResponse = await res.json();
      return data.market;
    },
    enabled: !!id,
  });
}

