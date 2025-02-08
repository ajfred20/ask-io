"use client";
import {
  Brain,
  Sparkles,
  Search,
  Database,
  BookOpen,
  Share2,
} from "lucide-react";
import Navigation from "@/app/components/Navigation";

export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-600 tracking-tight text-center mb-6">
            Powerful AI Research Features
          </h1>
          <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
            Discover how our AI-powered features can transform your research
            workflow and enhance your productivity. Our comprehensive suite of
            tools helps you work smarter, not harder.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-black tracking-tight mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.capabilities.map((capability, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mainFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms that understand and process research content with human-like comprehension. Our AI system continuously learns and adapts to provide more accurate and relevant results.",
    capabilities: [
      "Natural language understanding",
      "Context-aware processing",
      "Pattern recognition",
      "Semantic analysis",
    ],
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Intelligent search capabilities that go beyond keywords to find relevant research materials. Our advanced algorithms understand context and relationships between different sources to deliver comprehensive results.",
    capabilities: [
      "Semantic search",
      "Cross-reference analysis",
      "Citation tracking",
      "Source verification",
    ],
  },
  {
    icon: Database,
    title: "Knowledge Synthesis",
    description:
      "Automatically combine and analyze information from multiple sources to generate comprehensive insights. Our system connects related concepts and identifies key patterns to provide deeper understanding.",
    capabilities: [
      "Automated summarization",
      "Key findings extraction",
      "Research gap identification",
      "Trend analysis",
    ],
  },
  {
    icon: Share2,
    title: "Collaboration Tools",
    description:
      "Powerful tools for team research and knowledge sharing. Enable seamless collaboration with colleagues worldwide, share insights instantly, and maintain complete version control of your research.",
    capabilities: [
      "Real-time collaboration",
      "Version control",
      "Comment and feedback",
      "Export and sharing",
    ],
  },
];
