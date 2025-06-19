import Navigation from "./components/layout/Navigation";
import Hero from "./components/landing/Hero";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
      </main>
    </>
  );
}
