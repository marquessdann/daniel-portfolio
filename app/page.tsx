import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechCloud from "@/components/TechCloud";
import HowIBuild from "@/components/HowIBuild";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import AILab from "@/components/AILab";
import GithubTerminal from "@/components/GithubTerminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechCloud />
        <HowIBuild />
        <Projects />
        <Journey />
        <AILab />
        <GithubTerminal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
