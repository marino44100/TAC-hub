'use client'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Calendar, Camera, Users, Shield, BookOpen, MessageCircle, TreePine, Smartphone, ArrowRight, CheckCircle } from 'lucide-react'

export default function FeaturesPage() {
  const mainFeatures = [
    {
      title: 'Community Knowledge Center',
      icon: BookOpen,
      color: 'green',
      description: 'Digital repository of traditional knowledge combined with modern data',
      features: [
        {
          name: 'Traditional Calendar',
          description: 'Digital version of seasonal patterns and climate signs',
          icon: Calendar
        },
        {
          name: 'Species Guide',
          description: 'Photos and information about local plants and animals',
          icon: TreePine
        },
        {
          name: 'Weather Wisdom',
          description: 'Combine traditional forecasting with modern weather data',
          icon: BookOpen
        },
        {
          name: 'Conservation Stories',
          description: 'Share success stories and lessons learned',
          icon: MessageCircle
        }
      ],
      link: '/knowledge-center'
    },
    {
      title: 'Simple Monitoring Tools',
      icon: Camera,
      color: 'blue',
      description: 'Easy-to-use tools for community-based environmental monitoring',
      features: [
        {
          name: 'Forest Health Checker',
          description: 'Easy photo-based forest monitoring',
          icon: Camera
        },
        {
          name: 'Weather Tracker',
          description: 'Record daily observations and patterns',
          icon: Calendar
        },
        {
          name: 'Wildlife Counter',
          description: 'Track animal sightings and migration patterns',
          icon: TreePine
        },
        {
          name: 'Carbon Calculator',
          description: 'Measure forest carbon storage progress',
          icon: BookOpen
        }
      ],
      link: '/monitoring'
    },
    {
      title: 'Community Communication',
      icon: Users,
      color: 'purple',
      description: 'Connect communities and facilitate knowledge sharing',
      features: [
        {
          name: 'Village Network',
          description: 'Connect with other communities doing similar work',
          icon: Users
        },
        {
          name: 'Elder Teachings',
          description: 'Video and audio recordings of traditional knowledge',
          icon: BookOpen
        },
        {
          name: 'Decision Making',
          description: 'Digital voting for community conservation decisions',
          icon: MessageCircle
        },
        {
          name: 'External Partners',
          description: 'Manage relationships with NGOs and government',
          icon: Users
        }
      ],
      link: '/community'
    },
    {
      title: 'Data Protection',
      icon: Shield,
      color: 'orange',
      description: 'Comprehensive security and privacy controls for community data',
      features: [
        {
          name: 'Community Ownership',
          description: 'All data belongs to the community',
          icon: Shield
        },
        {
          name: 'Privacy Controls',
          description: 'Choose what to share and with whom',
          icon: Shield
        },
        {
          name: 'Local Storage',
          description: 'Important information stored locally, not just in the cloud',
          icon: Smartphone
        },
        {
          name: 'Simple Permissions',
          description: 'Easy controls for who can access what information',
          icon: Shield
        }
      ],
      link: '/data-protection'
    }
  ]

  const technologyFeatures = [
    {
      title: 'Mobile-First Design',
      icon: Smartphone,
      description: 'Designed for basic smartphones with offline capabilities',
      benefits: [
        'Works on basic smartphones',
        'Functions without internet connection',
        'Solar charging compatible',
        'Available in local languages'
      ]
    },
    {
      title: 'Easy to Learn',
      icon: CheckCircle,
      description: 'Training based on traditional teaching methods',
      benefits: [
        'Training based on traditional teaching methods',
        'Community elders help train youth',
        'Step-by-step learning process',
        'Peer-to-peer support network'
      ]
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600 border-green-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200'
    }
    return colors[color] || 'bg-gray-100 text-gray-600 border-gray-200'
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-max py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TAC-HUB Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive platform features designed to empower Congo Basin communities in their conservation efforts
          </p>
        </div>

        {/* Main Features */}
        <div className="space-y-12 mb-16">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className={`p-4 ${getColorClasses(feature.color)} rounded-xl mr-6`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h2>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </div>
                <a 
                  href={feature.link}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {feature.features.map((subFeature, subIndex) => (
                  <div key={subIndex} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <subFeature.icon className="w-5 h-5 text-gray-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">{subFeature.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{subFeature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Features */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Made Simple</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to be accessible and easy to use, even in remote areas with limited infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologyFeatures.map((tech, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg mr-4">
                    <tech.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tech.title}</h3>
                    <p className="text-gray-600">{tech.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {tech.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* User Types */}
        <div className="bg-primary-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Designed for Everyone</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TAC-HUB serves different users in the community ecosystem with tailored features and interfaces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <Users className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Community Members</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Record daily observations</li>
                <li>• Access traditional knowledge</li>
                <li>• Get weather alerts</li>
                <li>• Share with other communities</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <Users className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Community Leaders</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Monitor conservation progress</li>
                <li>• Manage partnerships</li>
                <li>• Control knowledge sharing</li>
                <li>• Generate reports</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <Users className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">External Partners</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Request data access</li>
                <li>• Provide funding support</li>
                <li>• Receive impact reports</li>
                <li>• Follow traditional protocols</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the growing network of Congo Basin communities using TAC-HUB to protect their forests and preserve their traditional knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
              Join Our Community
            </a>
            <a href="/knowledge-center" className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
              Explore Knowledge Center
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
