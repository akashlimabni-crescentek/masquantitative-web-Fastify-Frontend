import { create } from "zustand";

interface PriceStore {
  prices: Record<string, number[]>; // canonical_id -> prices array
  setPrice: (canonicalId: string, prices: number[]) => void;
}

export const usePriceStore = create<PriceStore>((set) => ({
  prices: {},
  setPrice: (canonicalId, newPrices) =>
    set((state) => ({
      prices: { ...state.prices, [canonicalId]: newPrices },
    })),
}));

// Components subscribe to 1 market's price slice, not the whole store —
// so a tick for market A never re-renders a card showing market B.
export function useLivePrice(canonicalId: string, fallback: number[]): number[] {
  const live = usePriceStore((state) => state.prices[canonicalId]);
  return live ?? fallback;
}