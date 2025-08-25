import Header from "@/components/Header";
import StockInfo from "@/components/StockInfo";
import StockChartWrapper from "@/components/StockChartWrapper";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";


export async function generateMetadata(
  { params }: { params: { symbol: string } }): Promise<Metadata> {
  const { symbol } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/search?keyword=${symbol}&length=1`);
  const data = await res.json();

  const companyName = data?.[0]?.company || symbol;

  return {
    title: `${companyName} (${symbol}) Stock Chart & Analysis`,
    description: `Explore detailed price chart and analysis for ${companyName}.`,
  };
}

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
