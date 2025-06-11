'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ClimateInfo() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "What is climate Change?",
      content: "Climate change refers to long-term shifts in global or regional climate patterns. It's primarily attributed to increased levels of greenhouse gases produced by human activities, particularly the burning of fossil fuels."
    },
    {
      title: "Evidence",
      content: "Evidence of climate change includes rising global temperatures, melting ice caps, rising sea levels, changing precipitation patterns, and more frequent extreme weather events."
    },
    {
      title: "Causes",
      content: "The primary causes include greenhouse gas emissions from burning fossil fuels, deforestation, industrial processes, agriculture, and transportation."
    },
    {
      title: "Effects",
      content: "Effects include global warming, sea level rise, extreme weather events, ecosystem disruption, food security threats, and impacts on human health and livelihoods."
    },
    {
      title: "Solution",
      content: "Solutions include transitioning to renewable energy, improving energy efficiency, protecting and restoring forests, sustainable agriculture, and international cooperation on climate policies."
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {tabs.map((tab, index) => (
              <div key={index} className="card">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tab.title}
                  </h3>
                  {activeTab === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {activeTab === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {tab.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
