// src/hooks/useOrderBook.ts
"use client";

import { useQuery } from "@tanstack/react-query";

interface OrderLevel {
  price: string;
  size: string;
}

interface OrderBookResponse {
  canonical_id: string;
  platform: string;
  bids: OrderLevel[];
  asks: OrderLevel[];
  timestamp: string;
}

async function fetchOrderBook(canonicalId: string): Promise<OrderBookResponse> {
  const res = await fetch(`http://localhost:4000/api/v1/markets/${canonicalId}/orderbook`);

  if (!res.ok) {
    throw new Error(`Failed to fetch order book: ${res.status}`);
  }

  return res.json();
}

export function useOrderBook(canonicalId: string) {
  return useQuery({
    queryKey: ["orderbook", canonicalId],
    queryFn: () => fetchOrderBook(canonicalId),
    enabled: !!canonicalId,
    refetchInterval: 5000, 
  });
}