export default function StockInfo(props: {symbol: string}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-black">
      <h2 className="text-xl font-semibold">Stock Details</h2>
      <p className="mt-2 text-gray-700">Symbol: {props.symbol}</p>
    </div>
  );
}
