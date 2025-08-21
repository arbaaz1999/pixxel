import Features from "@/components/Features";
import HeroSection from "@/components/hero";
import Pricing from "@/components/pricing";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const stats = [
    { id: 1, label: "Images Processed", value: 10000, suffix: "+" },
    { id: 2, label: "Active Users", value: 500, suffix: "+" },
    { id: 3, label: "AI Transformations", value: 45000, suffix: "+" },
    { id: 4, label: "User Stisfaction", value: 300, suffix: "+" },
  ]

  return (
    <>
      <div className="pt-36">
        {/* Hero */}
        <HeroSection />
        {/* Stats */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map(stat => (
                <div key={stat.id} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Features Section */}
        <Features />

        {/* Pricing */}
        <Pricing />


        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Create Something Amazing?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already using AI to transform
              their images and bring their vision to life.
            </p>
            <Link href="/dashboard">
              <Button variant="primary" size="xl">
                🌟 Start Creating Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
