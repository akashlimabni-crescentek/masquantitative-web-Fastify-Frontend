"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = ["Sport", "Politics",  "Tech", "Crypto", "Finance"];

interface CategoryCarouselProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
  
}

export default function CategoryCarousel({ selected, onSelect }: CategoryCarouselProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 min-w-0 ">
      <div
        className="flex-1 overflow-x-auto scrollbar-hide"
        style={{ maskImage: "linear-gradient(to right, transparent, black 24px, black 90%, transparent)" }}
      >
        <div className="flex gap-1 w-max">
          <button
            onClick={() => onSelect(null)}
            className={`px-4 py-2 t-ui whitespace-nowrap ${
              selected === null ? "text-white font-bold" : ""
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`px-4 py-2 t-ui whitespace-nowrap ${
                selected === category ? "text-white font-bold" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      

      

    </div>
  );
}