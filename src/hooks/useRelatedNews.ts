
import { useQuery } from "@tanstack/react-query";
import type { RelatedArticle, RelatedNewsResponse } from "@/types/news";

export function useRelatedNews(marketId: string) {
console.log("useRelatedNews marketId:", marketId);
  return useQuery<RelatedArticle[]>({
    queryKey: ["related-news", marketId],
    queryFn: async () => {
        console.log("B: queryFn is actually running, about to fetch");
         const url = `${process.env.NEXT_PUBLIC_API_URL}/api/news/related-markets?marketId=${encodeURIComponent(marketId)}`;
        console.log("C: fetching URL:", url);
        const res = await fetch(url);


    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/news/related-markets?marketId=${encodeURIComponent(marketId)}`
    //   );

      if (!res.ok) {
        throw new Error(`Failed to fetch related news: ${res.status}`);
      }

      const data: RelatedNewsResponse = await res.json();
      console.log("E: response data:", data);
      return data.correlations ?? [];
    },
    enabled: Boolean(marketId),
  });
}