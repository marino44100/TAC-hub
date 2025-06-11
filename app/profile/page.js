'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { 
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X, 
  FileText, MessageCircle, ShoppingBag, Award, Camera 
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [userStats, setUserStats] = useState({})
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    // Load user data
    const users = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
    const currentUser = users.find(u => u.id === user.id)
    if (currentUser) {
      setFormData(currentUser)
    }

    // Calculate user statistics
    calculateUserStats()
  }, [user, router])

  const calculateUserStats = () => {
    const projects = JSON.parse(localStorage.getItem('tac-hub-projects') || '[]')
    const forumPosts = JSON.parse(localStorage.getItem('tac-hub-forum-posts') || '[]')
    const orders = JSON.parse(localStorage.getItem('tac-hub-orders') || '[]')
    const donations = JSON.parse(localStorage.getItem('tac-hub-donations') || '[]')

    const userProjects = projects.filter(p => p.submittedBy === user.name)
    const userPosts = forumPosts.filter(p => p.author === user.name)
    const userOrders = orders.filter(o => o.userId === user.id)
    const userDonations = donations.filter(d => d.userId === user.id)

    const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0)
    const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0)

    setUserStats({
      projectsSubmitted: userProjects.length,
      forumPosts: userPosts.length,
      ordersPlaced: userOrders.length,
      donationsCount: userDonations.length,
      totalDonated,
      totalSpent,
      memberSince: new Date(user.joinedAt).toLocaleDateString()
    })
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleInterestChange = (interest) => {
    const interests = formData.interests || []
    setFormData({
      ...formData,
      interests: interests.includes(interest)
        ? interests.filter(i => i !== interest)
        : [...interests, interest]
    })
  }

  const handleSave = () => {
    setLoading(true)
    
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...formData } : u
    )
    localStorage.setItem('tac-hub-users', JSON.stringify(updatedUsers))
    
    // Update current user session
    const updatedUser = { ...user, ...formData }
    localStorage.setItem('tac-hub-user', JSON.stringify(updatedUser))
    
    setTimeout(() => {
      setLoading(false)
      setIsEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      window.location.reload() // Refresh to update user context
    }, 1000)
  }

  const availableInterests = [
    'Climate Research', 'Forest Conservation', 'Renewable Energy', 
    'Sustainable Agriculture', 'Wildlife Protection', 'Carbon Trading',
    'Environmental Policy', 'Community Development', 'Green Technology'
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-max py-8">
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            Profile updated successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {formData.avatar ? (
                      <img 
                        src={formData.avatar} 
                        alt={formData.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-primary-600" />
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {formData.name || 'User Name'}
                </h1>
                <p className="text-gray-600 mb-4">
                  {formData.role === 'admin' ? 'Administrator' : 'Community Member'}
                </p>
                
                <div className="flex justify-center space-x-2 mb-6">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary-600">{userStats.projectsSubmitted}</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{userStats.forumPosts}</div>
                    <div className="text-sm text-gray-600">Forum Posts</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{userStats.donationsCount}</div>
                    <div className="text-sm text-gray-600">Donations</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-600">{userStats.ordersPlaced}</div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/submit-project"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span>Submit New Project</span>
                </a>
                <a
                  href="/forum"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span>Join Discussion</span>
                </a>
                <a
                  href="/shop"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  <span>Browse Resources</span>
                </a>
                <a
                  href="/donate"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Award className="w-5 h-5 text-purple-600" />
                  <span>Make Donation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{formData.name || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{formData.email || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{formData.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{formData.location || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <span>{formData.organization || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center space-x-2 py-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{userStats.memberSince}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us about yourself and your interest in climate action..."
                  />
                ) : (
                  <p className="text-gray-700 py-2">
                    {formData.bio || 'No bio provided yet.'}
                  </p>
                )}
              </div>

              {/* Interests */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Areas of Interest
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableInterests.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={(formData.interests || []).includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {(formData.interests || []).map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                    {(!formData.interests || formData.interests.length === 0) && (
                      <span className="text-gray-500">No interests selected</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contributions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Projects Submitted:</span>
                      <span className="font-medium">{userStats.projectsSubmitted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Forum Posts:</span>
                      <span className="font-medium">{userStats.forumPosts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Donations:</span>
                      <span className="font-medium">{userStats.totalDonated} CFA</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Engagement</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Orders Placed:</span>
                      <span className="font-medium">{userStats.ordersPlaced}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Spent:</span>
                      <span className="font-medium">{userStats.totalSpent} CFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Status:</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
