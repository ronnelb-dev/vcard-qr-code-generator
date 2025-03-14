import BusinessForm from "@/app/ui/business-form";

export default function Home() {
  return (
    <div className="justify-items-center gap-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center pb-10 sm:items-start pt-10">
        <BusinessForm />
      </main>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          <a
            href="https://ronnelb-dev.github.io/portfolio/"
            className="hover:underline"
          >
            © 2025 DEVELOP AND DESIGN BY RONNEL
          </a>
        </span>
      </footer>
    </div>
  );
}
