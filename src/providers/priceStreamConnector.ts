
// Price streaming for price updates 


"use client";

import { useEffect, useRef } from "react";
import { fetchWsTicket } from "@/hooks/useWsTicket";
import { usePriceStore } from "@/stores/usePriceStore";

export function PriceStreamConnector() {
  const setPrice = usePriceStore((state) => state.setPrice);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      try {
        const ticket = await fetchWsTicket();
        if (cancelled) return;

        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/api/v1/ws?ticket=${ticket}`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          socket.send(JSON.stringify({ action: "subscribe_all" }));
        };

        socket.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg.type === "PRICE_UPDATE") {
              setPrice(msg.canonical_id, msg.prices);
            }
          } catch {
            
          }
        };

        socket.onclose = () => {
          if (!cancelled) reconnectTimeout.current = setTimeout(connect, 3000);
        };

        socket.onerror = () => socket.close();
      } catch (err) {
        console.error("[PriceStream] Failed to connect:", err);
        if (!cancelled) reconnectTimeout.current = setTimeout(connect, 5000);
      }
    }

    connect();

    return () => {
      cancelled = true;
      clearTimeout(reconnectTimeout.current);
      socketRef.current?.close();
    };
  }, [setPrice]);

  return null;
}