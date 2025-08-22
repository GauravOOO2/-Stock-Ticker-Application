import Header from "@/components/Header";
import StockInfo from "@/components/StockInfo";
import StockChartWrapper from "@/components/StockChartWrapper";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title:
    "Stock Ticker Application Graph Page, Visualization, Days filter, Weeks filter, Months Filter.",
  description:
    "Website that is capable of providing visualization of any stock data",
};

export default async function StockDetails({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <BackButton/>
        <StockInfo symbol={symbol} />
        <div className="mt-6">
          <StockChartWrapper symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
