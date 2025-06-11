import { DollarSign, TrendingUp, Database, Lightbulb, GraduationCap, Heart } from 'lucide-react'

export default function ClimateServices() {
  const services = [
    {
      icon: DollarSign,
      title: "Climate Finance",
      description: "Access funding and financial resources for climate projects and initiatives."
    },
    {
      icon: TrendingUp,
      title: "Carbon Market",
      description: "Navigate carbon trading and offset opportunities for sustainable development."
    },
    {
      icon: Database,
      title: "Climate Data",
      description: "Comprehensive climate data and analytics for informed decision making."
    },
    {
      icon: Lightbulb,
      title: "Climate Innovations",
      description: "Read about the latest climate innovations, news and events from our website."
    },
    {
      icon: GraduationCap,
      title: "Education and Awareness",
      description: "We educate people about climate change and conservation of flora and fauna."
    },
    {
      icon: Heart,
      title: "Support Us",
      description: "Donate to fund climate innovations around Africa."
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Climate Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            THE AFRICAN CLIMATE HUB (TAC-HUB)<br />
            Connecting Communities, Conserving Forests, and Combating Climate Change
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card p-6 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              {service.title === "Support Us" && (
                <a href="/donate" className="btn-primary text-sm inline-block">
                  Donate to Save Earth
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Free Resources</h3>
          <a href="/shop" className="btn-primary">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}
