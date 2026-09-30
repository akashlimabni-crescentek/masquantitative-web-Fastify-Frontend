"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderLevel {
  price: string;
  size: string;
}

interface OrderBookProps {
  bids: OrderLevel[];
  asks: OrderLevel[];
}

export function OrderBook({ bids, asks }: OrderBookProps) {

  const safeBids = bids ?? [];
  const safeAsks = asks ?? [];

  const sortedAsks = [...safeAsks].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  const sortedBids = [...safeBids].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

  const bestAsk = sortedAsks[0] ? parseFloat(sortedAsks[0].price) : null;
  const bestBid = sortedBids[0] ? parseFloat(sortedBids[0].price) : null;
  const spread = bestAsk != null && bestBid != null ? (bestAsk - bestBid) : null;

  if (!safeBids.length && !safeAsks.length) {
    return (
      <Card className="p-4 min-w-0">
        <h3 className="t-h3 mb-2">Order Book</h3>
        <span className="t-meta text-dim">No open orders for this market.</span>
      </Card>
    );
  }

  return (
    <Card className="p-4 min-w-0">
      <h3 className="t-h3 mb-3">Order Book</h3>

      {/* Best bid / ask / spread summary — the "so what" at a glance */}
      <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-divider">
        <div className="flex flex-col">
          <span className="t-label text-dim">Best Bid</span>
          <span className="n text-positive">
            {bestBid != null ? `$${bestBid.toFixed(3)}` : "—"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="t-label text-dim">Best Ask</span>
          <span className="n text-negative">
            {bestAsk != null ? `$${bestAsk.toFixed(3)}` : "—"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="t-label text-dim">Spread</span>
          <span className="n text-foreground">
            {spread != null ? `$${spread.toFixed(3)}` : "—"}
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-2 t-label text-dim pb-2">
        <span>Price (¢ per share)</span>
        <span className="text-right">Size (shares)</span>
      </div>

      {/* Asks — sells, red, best (lowest) closest to the middle */}
      <div className="max-h-40 overflow-y-auto min-w-0">
        {sortedAsks.length ? (
          sortedAsks.map((ask, i) => (
            <div key={i} className="grid grid-cols-2 n-sm py-1">
              <span className="text-negative">${parseFloat(ask.price).toFixed(3)}</span>
              <span className="text-right text-text-dim">
                {parseFloat(ask.size).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          ))
        ) : (
          <span className="t-meta text-dim">No sell orders.</span>
        )}
      </div>

      <Separator className="my-2" />

      {/* Bids — buys, green, best (highest) closest to the middle */}
      <div className="max-h-40 overflow-y-auto min-w-0">
        {sortedBids.length ? (
          sortedBids.map((bid, i) => (
            <div key={i} className="grid grid-cols-2 n-sm py-1">
              <span className="text-positive">${parseFloat(bid.price).toFixed(3)}</span>
              <span className="text-right text-text-dim">
                {parseFloat(bid.size).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          ))
        ) : (
          <span className="t-meta text-dim">No buy orders.</span>
        )}
      </div>
    </Card>
  );
}