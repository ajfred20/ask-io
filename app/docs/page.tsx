"use client";
import { BookOpen, Code, Terminal, FileText } from "lucide-react";
import Navigation from "@/app/components/Navigation";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-center mb-6 text-black">
            Documentation
          </h1>
          <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
            Everything you need to know about using our AI research assistant
          </p>
        </div>
      </div>

      {/* Documentation Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {docSections.map((section, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-4 text-black">
                  {section.title}
                </h3>
                <p className="text-gray-600 mb-6">{section.description}</p>
                <ul className="space-y-3">
                  {section.topics.map((topic, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {topic}
                      </a>
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

const docSections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of using our AI research assistant",
    topics: [
      "Quick Start Guide",
      "Basic Concepts",
      "First Research Query",
      "Understanding Results",
    ],
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Detailed documentation for our API endpoints",
    topics: [
      "Authentication",
      "Query Endpoints",
      "Analysis API",
      "Export Options",
    ],
  },
  {
    icon: Terminal,
    title: "Integration Guides",
    description: "Connect our AI with your existing tools",
    topics: [
      "REST API Integration",
      "Webhook Setup",
      "Custom Workflows",
      "Security Best Practices",
    ],
  },
  {
    icon: FileText,
    title: "Tutorials",
    description: "Step-by-step guides for common use cases",
    topics: [
      "Advanced Search Techniques",
      "Citation Management",
      "Team Collaboration",
      "Custom Exports",
    ],
  },
];
