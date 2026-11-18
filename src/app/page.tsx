import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Features from "@/app/_components/Features";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <div className="landing-page min-h-screen overflow-x-hidden bg-white font-sans text-zinc-950 antialiased selection:bg-orange-500/30 dark:bg-[#111111] dark:text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pt-24 md:px-8">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
