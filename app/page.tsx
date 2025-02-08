"use client";
import Image from "next/image";
import {
  Search,
  Brain,
  Sparkles,
  Database,
  BookOpen,
  Share2,
  Star,
  Check,
  Users,
  Bot,
  Shield,
  Lock,
  FileCheck,
  Zap,
  ArrowRight,
  Github,
  FileText,
  Book,
  File,
  Archive,
  ChartBar,
  Twitter,
  Linkedin,
  FolderKanban,
  MessagesSquare,
  CheckCircle,
  MessageSquare,
  Mail,
} from "lucide-react";
import { GithubLogo, NotionLogo, ZoteroLogo } from "@/app/components/logos";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <Navigation />
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-transparent to-transparent" />

      {/* Main Content */}
      <main className="relative">
        {/* Decorative Elements - Updated positioning */}
        <div className="absolute top-0 left-0 right-0 h-[100vh] overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* 3D Elements with contained height */}
          <Image
            src="/assets/tube.png"
            alt="Design element"
            width={400}
            height={400}
            className="absolute top-0 right-0 w-48 md:w-80 lg:w-[400px] opacity-60 animate-float"
          />
          <Image
            src="/assets/star.png"
            alt="Design element"
            width={300}
            height={300}
            className="absolute top-40 -left-20 w-32 md:w-48 lg:w-[300px] opacity-40 animate-float-delayed"
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative z-10 mt-16">
          {/* Hero Badge with Pulse */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8">
            <div className="relative">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-600" />
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
            </div>
            <span className="text-xs sm:text-sm text-blue-700">
              Advanced Research Assistant
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6 sm:mb-8">
            Your AI Assistant for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Instant Answers
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ask any question and let our AI scan the web to find the most
            accurate answers. No more endless searching - get instant, reliable
            information.
          </p>

          {/* Add responsive buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* AI Capabilities Section */}
        <section className="relative z-10 py-16 sm:py-24 border-t border-gray-100">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Powered by Advanced{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    AI Technology
                  </span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Our AI research assistant leverages cutting-edge machine
                  learning models to provide accurate, contextual, and
                  comprehensive research support.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {aiCapabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <capability.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          {capability.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl" />
                <div className="relative bg-white p-8 rounded-2xl border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Bot className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <div className="h-2 bg-blue-200 rounded w-3/4 mb-2" />
                        <div className="h-2 bg-blue-100 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Brain className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <div className="h-2 bg-blue-200 rounded w-2/3 mb-2" />
                        <div className="h-2 bg-blue-100 rounded w-1/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-24 sm:py-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-left">
              <h2 className="text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-gray-600 text-lg">
                Advanced research capabilities powered by cutting-edge AI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="relative z-10 py-32 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold mb-4">How it Works</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Experience the power of AI-driven research in three simple steps
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -translate-y-1/2 hidden md:block" />

              <div className="grid md:grid-cols-3 gap-12 relative">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Step Number */}
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center mb-6 relative z-10">
                      <span className="text-blue-600 font-semibold">
                        {index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <step.icon className="w-6 h-6 text-blue-500 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 py-32 bg-white">
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Trusted by Researchers
              </h2>
              <p className="text-gray-600 text-lg">
                See what researchers and academics are saying about our AI
                assistant
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current text-blue-500"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">{testimonial.comment}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative z-10 py-32 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-600 text-lg">
                Choose the plan that best fits your research needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl border ${
                    plan.popular
                      ? "border-blue-500 bg-white shadow-lg"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {plan.popular && (
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Security Section */}
        <section className="relative z-10 py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="flex flex-col items-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-center">
                Enterprise-Grade Security
              </h2>
              <p className="text-gray-600 max-w-2xl text-center text-lg">
                Bank-level security with advanced encryption and compliance
                measures
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features Showcase */}
        <section className="relative z-10 py-32 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Advanced Capabilities</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Powerful features designed for serious research
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {advancedFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative z-10 py-24 sm:py-32 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Everything you need to know about our AI research assistant
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">
                      Q
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-9">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Additional Help Link */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
              >
                Contact our support team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="relative z-10 py-16 sm:py-24 rounded-xl bg-blue-600 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-blue-500 blur-3xl opacity-50" />

          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Transform Your Research?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of researchers who are already using our
                AI-powered platform
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
                  Get Started Now
                </button>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-50 pt-24 pb-12 border-t border-gray-100">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-white">A</span>
                </div>
                <span className="text-xl font-semibold">ask.io</span>
              </div>
              <p className="text-gray-500 text-sm">
                AI-powered research assistant that helps you analyze,
                synthesize, and discover insights faster.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-500 text-sm">
                © 2024 ask.io. All rights reserved.
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Search,
    title: "Intelligent Research Analysis",
    description:
      "Advanced AI that scans and analyzes research papers, academic databases, and scholarly articles to find relevant information for your research.",
  },
  {
    icon: Brain,
    title: "Smart Synthesis",
    description:
      "Automatically synthesizes information from multiple sources, identifying patterns and connections to generate comprehensive research insights.",
  },
  {
    icon: Sparkles,
    title: "Citation Generation",
    description:
      "Automatically generates properly formatted citations and bibliographies while tracking all sources used in your research.",
  },
  {
    icon: Database,
    title: "Research Database",
    description:
      "Access a vast database of academic papers, journals, and research materials, continuously updated with the latest publications.",
  },
  {
    icon: BookOpen,
    title: "Literature Review",
    description:
      "AI-powered literature review that summarizes key findings, methodologies, and conclusions from relevant research papers.",
  },
  {
    icon: Share2,
    title: "Collaboration Tools",
    description:
      "Share research findings, collaborate with team members, and manage research projects efficiently with integrated tools.",
  },
];

// Icon components with TypeScript props
interface IconProps extends React.SVGProps<SVGSVGElement> {}

function RocketIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ListIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function MessageIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const steps = [
  {
    icon: RocketIcon,
    title: "Research",
    description:
      "Start your research with a clear objective and a well-defined research question.",
  },
  {
    icon: ListIcon,
    title: "Analyze",
    description:
      "Use our advanced tools to analyze and synthesize information from various sources.",
  },
  {
    icon: MessageIcon,
    title: "Collaborate",
    description:
      "Collaborate with your team and share your research findings with ease.",
  },
];

// Add these arrays after your existing constants
const testimonials = [
  {
    comment:
      "This AI research assistant has revolutionized how I approach academic research. The speed and accuracy are unprecedented.",
    name: "Dr. Sarah Chen",
    role: "Research Scientist",
  },
  {
    comment:
      "The ability to analyze multiple sources simultaneously and generate comprehensive insights has saved me countless hours.",
    name: "Prof. Michael Roberts",
    role: "University Professor",
  },
  {
    comment:
      "An invaluable tool for any serious researcher. The citation generation and literature review features are exceptional.",
    name: "Dr. James Wilson",
    role: "PhD Researcher",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "29",
    popular: false,
    features: [
      "Basic research capabilities",
      "5 searches per day",
      "Standard support",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: "79",
    popular: true,
    features: [
      "Advanced research capabilities",
      "Unlimited searches",
      "Priority support",
      "Advanced analytics",
      "Custom exports",
      "Team collaboration",
    ],
  },
  {
    name: "Enterprise",
    price: "199",
    popular: false,
    features: [
      "All Pro features",
      "Custom API access",
      "Dedicated support",
      "Custom integrations",
      "Advanced security",
      "Training sessions",
    ],
  },
];

const aiCapabilities = [
  {
    icon: Brain,
    title: "Natural Language Processing",
    description: "Understands complex research queries and context",
  },
  {
    icon: Bot,
    title: "Adaptive Learning",
    description: "Improves results based on your research patterns",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Instant analysis and synthesis of information",
  },
  {
    icon: FileCheck,
    title: "Smart Validation",
    description: "Verifies sources and cross-references data",
  },
];

const securityFeatures = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "Your research data is encrypted at rest and in transit using industry-standard protocols",
  },
  {
    icon: Lock,
    title: "SOC 2 Compliance",
    description:
      "Adherence to strict security policies and regular third-party audits",
  },
  {
    icon: FileCheck,
    title: "Data Privacy",
    description:
      "GDPR and CCPA compliant with configurable data retention policies",
  },
];

const quickStartSteps = [
  {
    title: "Ask Your Question",
    description:
      "Type any question in natural language. Our AI understands exactly what you're looking for and begins searching.",
  },
  {
    title: "AI Scans the Web",
    description:
      "Our advanced AI instantly scans millions of sources across the internet to find the most relevant information.",
  },
  {
    title: "Get Your Answer",
    description:
      "Receive a comprehensive, accurate answer compiled from the best sources, complete with citations and references.",
  },
];

const researchFeatures = [
  "Natural language question processing",
  "Real-time web scanning",
  "Automatic source verification",
  "Cross-reference checking",
  "Smart answer synthesis",
];

const aiSupport = [
  {
    icon: Sparkles,
    text: "Instant Answers",
  },
  {
    icon: Brain,
    text: "Smart Understanding",
  },
  {
    icon: Search,
    text: "Web-wide Search",
  },
  {
    icon: FileCheck,
    text: "Verified Sources",
  },
];

const advancedFeatures = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Our AI scans the entire web to find the most relevant answers to your questions",
  },
  {
    icon: Bot,
    title: "AI Understanding",
    description:
      "Advanced natural language processing to understand any question",
  },
  {
    icon: ChartBar,
    title: "Answer Quality",
    description: "Get high-quality answers with verified sources and citations",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share answers and sources with others instantly",
  },
];

const faqs = [
  {
    question: "How does the AI research assistant work?",
    answer:
      "Our AI assistant uses advanced natural language processing to understand your questions, then scans multiple sources across the web to provide comprehensive, accurate answers with citations.",
  },
  {
    question: "Is the information reliable and up-to-date?",
    answer:
      "Yes, our AI verifies information from multiple credible sources and provides real-time results with source citations for transparency and verification.",
  },
  {
    question: "Can I use it for academic research?",
    answer:
      "Absolutely! Our platform is designed to support academic research with proper citations, peer-reviewed sources, and comprehensive analysis tools.",
  },
  {
    question: "What types of questions can I ask?",
    answer:
      "You can ask any research-related question across various fields including science, technology, humanities, and more. The AI understands complex queries and provides detailed responses.",
  },
  {
    question: "How do you ensure data privacy?",
    answer:
      "We employ end-to-end encryption and strict data protection protocols. Your research queries and data are completely private and secure.",
  },
  {
    question: "Can I export my research findings?",
    answer:
      "Yes, you can export your findings in multiple formats including PDF, Word, and structured data formats, complete with citations and references.",
  },
];
