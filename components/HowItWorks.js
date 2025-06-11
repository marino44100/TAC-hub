import { Smartphone, Users, Building, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const userTypes = [
    {
      icon: Users,
      title: 'For Community Members',
      color: 'green',
      features: [
        'Use simple mobile app to record daily observations',
        'Access traditional knowledge in local language',
        'Get weather and climate alerts',
        'Share photos and updates with other communities'
      ]
    },
    {
      icon: Building,
      title: 'For Community Leaders',
      color: 'blue',
      features: [
        'See overall community conservation progress',
        'Manage partnerships with outside organizations',
        'Make decisions about sharing traditional knowledge',
        'Generate reports for funding and support'
      ]
    },
    {
      icon: Users,
      title: 'For External Partners',
      color: 'purple',
      features: [
        'Request permission to access community knowledge',
        'Provide funding and technical support',
        'Receive verified impact reports',
        'Follow traditional protocols for engagement'
      ]
    }
  ]

  const technologyFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      features: [
        'Works on basic smartphones',
        'Functions without internet connection',
        'Solar charging compatible',
        'Available in local languages'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Easy to Learn',
      features: [
        'Training based on traditional teaching methods',
        'Community elders help train youth',
        'Step-by-step learning process',
        'Peer-to-peer support network'
      ]
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color] || 'bg-gray-100 text-gray-600'
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            TAC-HUB is designed to serve different users in the community ecosystem, 
            from individual community members to external partners and organizations.
          </p>
        </div>

        {/* User Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {userTypes.map((userType, index) => (
            <div key={index} className="card p-6 card-hover">
              <div className={`p-3 ${getColorClasses(userType.color)} rounded-lg w-fit mb-4`}>
                <userType.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{userType.title}</h3>
              <ul className="space-y-3">
                {userType.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technology Made Simple */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Made Simple</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to be accessible and easy to use, even in remote areas with limited infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologyFeatures.map((tech, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg mr-4">
                    <tech.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{tech.title}</h4>
                </div>
                <ul className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="/register" className="btn-primary mr-4">
            Get Started Today
          </a>
          <a href="/knowledge-center" className="btn-secondary">
            Explore Knowledge Center
          </a>
        </div>
      </div>
    </section>
  )
}
