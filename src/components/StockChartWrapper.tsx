"use client";

import { useCallback, useEffect, useState } from "react";
import StockChart from "./StockChart";
import { CompanyDetails } from "@/types/ApplicationTypes";


const dayConfigs = {
  "1W": { days: 7, type: "DAILY", limit: 7 },
  "1M": { days: 30, type: "DAILY", limit: 30 },
  "3M": { days: 90, type: "DAILY", limit: 90 },
  "6M": { days: 180, type: "DAILY", limit: 180 },
  "1Y": { days: 365, type: "DAILY", limit: 365 },
};

type DayRange = keyof typeof dayConfigs;

export default function StockChartWrapper({ symbol }: { symbol: string }) {
  const [prices, setPrices] = useState<CompanyDetails[]>([]);
  const [favStocksList, setFavStockList] = useState<string[]>(()=>{
    const getAllFavStocksList = localStorage.getItem("favStocks")
    return getAllFavStocksList ? JSON.parse(getAllFavStocksList) : []
  })
  const [selected, setSelected] = useState<DayRange>("1W");
  const [loading, setLoading] = useState(false);

  const graphLoad = useCallback(async (range: DayRange) => {
    try {
      setLoading(true);
      const filterVal = dayConfigs[range];
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/stock/${symbol}/prices?days=${filterVal.days}&type=${filterVal.type}&limit=${filterVal.limit}`
      );
      const data = await res.json();
      setPrices(data);
    } catch {
      setPrices([]);
    } finally {
      setLoading(false);
    }
  },[symbol]);

  useEffect(() => {
    graphLoad(selected);
    
  },[selected, graphLoad]);


  const handleFavIconClick = (symbol: string)=>{
    setFavStockList([...favStocksList, symbol])
  }

useEffect(()=>{
  localStorage.setItem("favStocks", JSON.stringify(favStocksList) )
}, [favStocksList])





  return (
    <div>
      <button className="border-2 rounded-2xl text-black" onClick={()=>handleFavIconClick(symbol)}  >Fav Stock</button>
      {loading ? (
        <p className="text-gray-500">Loading chart...</p>
      ) : (
        <div>
          
          <StockChart symbol={symbol} prices={prices} />
        </div>
      )}

      <div className="flex gap-2 mt-4 ">
        {(Object.keys(dayConfigs) as DayRange[]).map((range) => (
          <button
            key={range}
            onClick={() => {
              setSelected(range);
              graphLoad(range);
            }}
            className={`px-2 py-2 rounded-md font-medium ${selected === range ? "bg-blue-600 text-white " : "bg-gray-600 text-gray-200 "} // inactive
      `}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}
