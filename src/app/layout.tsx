import type { Metadata } from "next";
import "./globals.css";
import TickerBar from "@/components/TickerBar";

async function getTickerData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TICKER_API}`);
  return res.json();
}

export const metadata: Metadata = {
  title: "Stock Ticker Application",
  description: "Stocks, profit, loss, Trade Brains",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tickerData = await getTickerData();
  return (
    <html lang="en">
      <body>
        <TickerBar initialData={tickerData} />
        {children}
      </body>
    </html>
  );
}
