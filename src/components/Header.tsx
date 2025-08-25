import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex flex-row justify-between">
      <h1 className="text-xl font-bold">Stock Ticker App</h1>
      <Link href={"/favStocks"} ><button className="border-2 text-black" > Fav Stocks Page </button></Link>
    </header>
  );
}
