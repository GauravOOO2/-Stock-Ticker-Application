"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="text-white px-2 py-2 rounded-md font-medium bg-gray-600 hover:bg-gray-700 transition"
    >
      Back
    </button>
  );
}
