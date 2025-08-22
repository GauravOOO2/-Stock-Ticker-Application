import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Stock Market, Stock Information, Trading, Investing. ',
  description: 'Stock Market Solutions and visualization tools available',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta name="description" content="Track stocks and view interactive charts." />
        <meta name="keywords" content="stocks, finance, charts, investment" />
        <meta name="author" content="Gaurav Varma" />
      </Head>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Search for a Stock</h1>
        <SearchBar />
      </div>
    </div>
  );
}
