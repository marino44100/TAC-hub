'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { User, FileText, MessageCircle, ShoppingBag, Award, Calendar, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [userProjects, setUserProjects] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [userOrders, setUserOrders] = useState([])
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    // Load user data from localStorage
    const projects = JSON.parse(localStorage.getItem('tac-hub-projects') || '[]')
    const userSubmittedProjects = projects.filter(p => p.submittedBy === user.name)
    setUserProjects(userSubmittedProjects)

    // Mock user posts and orders for demo
    setUserPosts([
      {
        id: 1,
        title: 'My Experience with Solar Energy Implementation',
        category: 'renewable',
        createdAt: '2024-01-10T14:30:00Z',
        likes: 12,
        replies: 5
      }
    ])

    setUserOrders([
      {
        id: 1,
        items: ['Climate Change Simplified', 'The Green Book'],
        total: 149,
        status: 'completed',
        date: '2024-01-08T10:00:00Z'
      }
    ])
  }, [user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  const stats = [
    {
      icon: FileText,
      label: 'Projects Submitted',
      value: userProjects.length,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageCircle,
      label: 'Forum Posts',
      value: userPosts.length,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: ShoppingBag,
      label: 'Orders',
      value: userOrders.length,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Award,
      label: 'Impact Score',
      value: '85',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-max py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-primary-100 mt-2">
                Member since {new Date(user.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
              <a href="/submit-project" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Submit New Project
              </a>
            </div>
            
            {userProjects.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No projects submitted yet</p>
                <a href="/submit-project" className="btn-primary mt-4 inline-block">
                  Submit Your First Project
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {userProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{project.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{project.category}</p>
                        <p className="text-gray-500 text-xs mt-2">
                          Submitted {new Date(project.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'approved' ? 'bg-green-100 text-green-800' :
                        project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {/* Forum Posts */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Forum Posts
                </h3>
                {userPosts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No forum posts yet</p>
                ) : (
                  <div className="space-y-2">
                    {userPosts.map((post) => (
                      <div key={post.id} className="border-l-4 border-primary-500 pl-4">
                        <p className="font-medium text-sm">{post.title}</p>
                        <p className="text-gray-500 text-xs">
                          {post.likes} likes • {post.replies} replies
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Orders */}
              <div className="pt-4 border-t">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Recent Orders
                </h3>
                {userOrders.length === 0 ? (
                  <p className="text-gray-500 text-sm">No orders yet</p>
                ) : (
                  <div className="space-y-2">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border-l-4 border-green-500 pl-4">
                        <p className="font-medium text-sm">
                          {order.items.length} items • {order.total} CFA
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(order.date).toLocaleDateString()} • {order.status}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/submit-project"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-medium">Submit Project</p>
                <p className="text-gray-500 text-sm">Share your climate initiative</p>
              </div>
            </a>

            <a
              href="/forum"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-medium">Join Discussion</p>
                <p className="text-gray-500 text-sm">Connect with the community</p>
              </div>
            </a>

            <a
              href="/shop"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-medium">Browse Resources</p>
                <p className="text-gray-500 text-sm">Discover climate materials</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
