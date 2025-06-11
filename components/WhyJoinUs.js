import { Shield, Heart, Globe2 } from 'lucide-react'

export default function WhyJoinUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-primary-600 font-semibold text-lg mb-2">Why you should join us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why you should join us in fighting against climate change.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Joining the advocacy for climate change is crucial for our planet's future. By participating, 
              you can contribute to a collective effort to reduce carbon pollution, which is essential for 
              sustaining our environment. Together with friends, family, and community members, you can 
              raise awareness about the urgency of climate issues, making it more relatable and relevant to everyone.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Your voice matters; discussing climate action can inspire others to join in. Don't underestimate 
              the impact you can have—join the fight for our planet today!
            </p>
            <a href="#contact" className="btn-primary">
              Join Us
            </a>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Protect Our Future</h3>
                <p className="text-gray-600">
                  Take action today to ensure a sustainable future for generations to come.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Make a Difference</h3>
                <p className="text-gray-600">
                  Every action counts. Join a community that's making real impact on climate change.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe2 className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Impact</h3>
                <p className="text-gray-600">
                  Be part of a worldwide movement working together to combat climate change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
