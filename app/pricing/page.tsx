"use client";
import { Check } from "lucide-react";
import Navigation from "@/app/components/Navigation";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6 text-black">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your research needs
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="pb-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.featured
                    ? "bg-blue-600 text-white scale-105 shadow-xl"
                    : "bg-white border border-gray-100"
                }`}
              >
                <div className="mb-8">
                  <h3
                    className={`text-2xl font-semibold tracking-tight mb-2 ${
                      !plan.featured && "text-black"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span
                      className={`text-4xl font-bold ${
                        !plan.featured && "text-black"
                      }`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={
                        plan.featured ? "text-blue-100" : "text-gray-500"
                      }
                    >
                      /month
                    </span>
                  </div>
                  <p
                    className={
                      plan.featured ? "text-blue-100" : "text-gray-600"
                    }
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 ${
                          plan.featured ? "text-blue-200" : "text-blue-600"
                        }`}
                      />
                      <span
                        className={
                          plan.featured ? "text-blue-100" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.featured
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Basic",
    price: "29",
    description: "Perfect for individual researchers",
    featured: false,
    features: [
      "Up to 100 research queries/month",
      "Basic AI analysis",
      "Standard search capabilities",
      "Email support",
      "Basic export options",
    ],
  },
  {
    name: "Professional",
    price: "79",
    description: "Ideal for serious researchers",
    featured: true,
    features: [
      "Unlimited research queries",
      "Advanced AI analysis",
      "Priority support",
      "All export formats",
      "Team collaboration",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "199",
    description: "For research teams and institutions",
    featured: false,
    features: [
      "Custom query limits",
      "Dedicated support",
      "Custom integrations",
      "Advanced security",
      "Training sessions",
      "SLA guarantees",
    ],
  },
];
