import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

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
