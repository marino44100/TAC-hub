'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { 
  Users, 
  MessageSquare, 
  TreePine, 
  Camera, 
  Calendar,
  Calculator,
  BookOpen,
  Video,
  Vote,
  Handshake,
  Award,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react'

export default function CommunityDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  const quickActions = [
    {
      title: 'Submit Forest Health Report',
      description: 'Monitor and report on forest conditions',
      icon: TreePine,
      href: '/monitoring-tools',
      color: 'green'
    },
    {
      title: 'Record Weather Observation',
      description: 'Log daily weather patterns and traditional signs',
      icon: Calendar,
      href: '/monitoring-tools',
      color: 'blue'
    },
    {
      title: 'Share Traditional Knowledge',
      description: 'Contribute to the community knowledge base',
      icon: BookOpen,
      href: '/knowledge-center',
      color: 'purple'
    },
    {
      title: 'Join Forum Discussion',
      description: 'Connect with other community members',
      icon: MessageSquare,
      href: '/forum',
      color: 'orange'
    }
  ]

  const recentActivity = [
    {
      type: 'forest_health',
      title: 'Forest Health Report Submitted',
      location: 'Sector A - Primary Forest',
      time: '2 hours ago',
      icon: TreePine,
      color: 'green'
    },
    {
      type: 'weather',
      title: 'Weather Observation Recorded',
      location: 'Village Center',
      time: '1 day ago',
      icon: Calendar,
      color: 'blue'
    },
    {
      type: 'forum',
      title: 'New Discussion: Traditional Planting Methods',
      location: 'Community Forum',
      time: '2 days ago',
      icon: MessageSquare,
      color: 'orange'
    }
  ]

  const communityStats = [
    { label: 'Your Contributions', value: '12', icon: Award, color: 'text-green-600' },
    { label: 'Community Rank', value: '#47', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Knowledge Shared', value: '8', icon: BookOpen, color: 'text-purple-600' },
    { label: 'Days Active', value: '23', icon: Calendar, color: 'text-orange-600' }
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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue your climate action journey with TAC-HUB community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {communityStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(action.color)}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </a>
              ))}
            </div>

            {/* Community Features */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Community Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/community" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">Village Network</h3>
                <p className="text-sm text-gray-600">Connect with other communities</p>
              </a>
              
              <a href="/community" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
                <Video className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">Elder Teachings</h3>
                <p className="text-sm text-gray-600">Learn from traditional knowledge</p>
              </a>
              
              <a href="/community" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
                <Vote className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">Decision Making</h3>
                <p className="text-sm text-gray-600">Participate in community votes</p>
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-600">{activity.location}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a href="/profile" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View all activity →
                </a>
              </div>
            </div>

            {/* Community Impact */}
            <div className="mt-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Your Impact</h3>
              <p className="text-primary-100 text-sm mb-4">
                You've contributed to monitoring 2.3 hectares of forest and shared 8 pieces of traditional knowledge.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <TreePine className="w-4 h-4" />
                  <span>2.3 ha monitored</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>8 knowledge entries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
