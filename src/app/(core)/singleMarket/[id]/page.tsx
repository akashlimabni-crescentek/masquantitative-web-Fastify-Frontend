"use client";

import { use } from "react";

import type { Market } from "@/types/market";
import { Card } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { MarketActionBar } from "@/components/custom/markets/ActionBar";

import { useMarket } from "@/hooks/useSingleMarket";
import { useRelatedNews } from "@/hooks/useRelatedNews";

import { SmNewsCard } from "@/components/custom/news/SmNewsCard";
import CalculatorSuite from "@/components/custom/markets/CalculatorSuite";
import { useRatios } from "@/hooks/dashboard/useMarketRatio";
import { useOrderBook } from "@/hooks/useOrderBook";
import { OrderBook } from "@/components/custom/markets/OrderBook";
import { AiSummaryCard } from "@/components/custom/markets/AiSummary";
import { MarketOutcomesList } from "@/components/custom/markets/MarketOutcomes";
import { BackButton } from "@/components/custom/nav/BackButton";

import {getTimeRemaining} from"@/helpers/TimeRemaining";


interface MarketResponse {
  market: Market;
}

export default function SingleMarketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: market, isLoading, isError } = useMarket(id);
  const { data: relatedNews, isLoading: isNewsLoading, isError: isNewsError } = useRelatedNews(id);

  const { data: relatedMarket, } = useRatios(id);
  const { data: orderBook, isLoading: isOrderBookLoading } = useOrderBook(id);

  if (isLoading) return <div className="t-body">Loading...</div>;
  if (isError || !market) return <div className="t-body text-negative">Failed to load market.</div>;

  return (
    <div className="mb-32">
    <div className="m-5 text-left md:mt-20 md:ml-10 md:mr-10 lg:mt-20 lg:ml-10 lg:mr-10 ">
      <BackButton/>
      <h1 className="t-h1">{market.title}</h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="t-ui">{market.category}</span>
        <span className="n-sm">$ {Math.round(market.volume)}</span>
        <span className="t-ui">{market.platform}</span>
        <span className="t-ui">{getTimeRemaining(market.close_time)}</span>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — 2/3 width */}
        <div className="lg:col-span-2 flex flex-col gap-6">


          <AiSummaryCard market={market} />

          <Card>
            <Tabs defaultValue="rules">
              <TabsList>
                <TabsTrigger value="rules" className="t-h4">Rules</TabsTrigger>
                <TabsTrigger value="resolution" className="t-h4">Resolution</TabsTrigger>
                <TabsTrigger value="context" className="t-h4">Context</TabsTrigger>
                
              </TabsList>
              <TabsContent value="rules" className="t-ui text-left p-5">{market.rules || "No Market Rules Avalible"}</TabsContent>
              <TabsContent value="resolution" className="t-ui text-left p-5">{market.resolution_source || "No resolution source provided."}</TabsContent>
              <TabsContent value="context" className="text-left t-ui p-5">{market.context || "No resolution Context Provided"}</TabsContent>
            </Tabs>
          </Card>


          <MarketOutcomesList market={market} />


          {orderBook ? (
            <OrderBook bids={orderBook.bids} asks={orderBook.asks} />
          ) : !isOrderBookLoading ? (
            <Card className="p-4 min-w-0">
              <h3 className="t-h3 mb-2">Order Book</h3>
              <span className="t-meta text-dim">No order book data available for this market.</span>
            </Card>
          ) : null}
          {market && <MarketActionBar market={market} />}



          <Card>
            <h3 className="t-h3 ml-5 mb-2">Cross Platform</h3>
            {relatedMarket ? (
              <div className="flex flex-col gap-1">

                <span className="t-meta ml-5">{relatedMarket.message}</span>
                < span className="n-sm pl-5">{relatedMarket.matched}</span>
              </div>
            ) : (
              <span className="t-meta">Loading comparison…</span>
            )}
          </Card>


          
        </div>

        {/* Right — 1/3 width, sidebar widgets */}
        <div className="flex flex-col gap-6">
          <CalculatorSuite />



          <div className="flex flex-col gap-2">
            <h2 className="t-h3">Related News</h2>
            {relatedNews?.length ? (
              relatedNews.slice(0, 3).map((article) => (
                <SmNewsCard key={article.article_url} article={article} />
              ))
            ) : (
              <span className="t-meta">No related news.</span>
            )}
          </div>
        </div>
      </div>

      
    </div>

    
      
    </div>

    
  );
}