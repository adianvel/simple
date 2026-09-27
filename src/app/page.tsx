import Experience from "@/components/portfolio/Experience";
import Footer from "@/components/portfolio/Footer";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import Writing from "@/components/portfolio/Writing";

export default function Home() {
  return (
    <>
      <Header />
      <main className="site-root relative flex w-full flex-col items-center bg-background text-foreground">
        <Hero />
        <Experience />
        <Projects />
        <Writing />
        <Footer />
      </main>
    </>
  );
}
