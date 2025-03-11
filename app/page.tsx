import Image from "next/image";
import BusinessForm from "@/app/ui/business-form";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen pb-20 gap-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <BusinessForm/>
      </main>
    </div>
  );
}
