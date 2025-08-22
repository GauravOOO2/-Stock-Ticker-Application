"use client";

import { useState, useEffect } from "react";
import { SearchResult } from "@/types/ApplicationTypes";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const searchResult = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/search?keyword=${query}&length=15`
        );
        const data = await res.json();
        setResults(data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchResult();
    }, 300);

    return () => clearInterval(timeoutId);
  }, [query]);

  const handleClick = (stock: SearchResult) => {
    router.push(`/stock/${stock.symbol}`);
  };

  return (
    <div className="text-black w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for stock..."
        className="w-full p-2 border rounded-lg shadow-sm"
        onClick={() => setOpenDropdown((value) => !value)}
      />

      {openDropdown && (
        <div>
          {loading ? (
            <p className="mt-1 text-sm text-gray-500">Searching...</p>
          ) : (
            <ul className=" h-90 overflow-scroll rounded-lg mt-2 p-4  ">
              <div className="flex justify-end">
                <button
                  onClick={() => setOpenDropdown((value) => !value)}
                  className=" font-bold hover:cursor-pointer hover:text-gray-500"
                >
                  X
                </button>
              </div>

              {results.map((stock, index) => (
                <li
                  key={index}
                  className=" border-1 rounded p-2"
                  onClick={() => handleClick(stock)}
                >
                  <div className="flex flex-row justify-between">
                    <div>
                      <div>{stock.company}</div>
                      <div>{stock.symbol}</div>
                    </div>
                    <div> {stock.type} </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
