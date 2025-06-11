import { Lightbulb, Users, Target } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="section-padding bg-primary-600 text-white">
      <div className="container-max text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            BRING YOUR IDEAS
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Climate change is a collective fight, do you have suggestion, ideas, projects 
            that could help mitigate climate change? Bring them!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Ideas</h3>
              <p className="opacity-80">Contribute innovative solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Join Community</h3>
              <p className="opacity-80">Connect with like-minded individuals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Make Impact</h3>
              <p className="opacity-80">Turn ideas into action</p>
            </div>
          </div>
          
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Submit Your Project
          </button>
        </div>
      </div>
    </section>
  )
}
