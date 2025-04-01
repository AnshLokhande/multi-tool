import Header from "@/components/header"
import Hero from "@/components/hero"
import ToolsSection from "@/components/tools-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ToolsSection />
      </main>
      <Footer />
    </div>
  )
}

