import { useQuery } from "@tanstack/react-query";
import type { NewsResponse } from "@/types/news";

export function useNews(category: string | null) {
  return useQuery({
    queryKey: ["news", category], // category is part of the key so switching
                                   // categories triggers a fresh fetch + its own cache entry
    queryFn: async (): Promise<NewsResponse["articles"]> => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/workspace/news`);
      if (category) url.searchParams.set("category", category);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);

      const data: NewsResponse = await res.json();
      return data.articles;
    },
  });
}