import { StockMover, tickerType } from "@/types/ApplicationTypes";
import Link from "next/link";
export default function TickerBar({ initialData }: { initialData: tickerType }) {
  const movers: StockMover[] = [
    ...(initialData.gainers || []),
    ...(initialData.losers || []),
    ...(initialData.volume_movers || []),
  ];

  if (!movers.length) return null;

  return (
    <div className="w-full bg-gray-900 text-white overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {movers.map((stock, i) => (
         <Link key={i} href={`/stock/${stock.symbol}`} >
          <div key={i} className="flex items-center mx-6">
            <span className="font-bold">{stock.symbol}</span>
            <span className="ml-2">{stock.close.toFixed(2)}</span>
            <span
              className={`ml-2 ${
                stock.percent >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {stock.percent.toFixed(2)}%
            </span>
          </div>
         </Link>
        ))}
      </div>
    </div>
  );
}
