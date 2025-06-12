'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { 
  User, Edit, Save, X, Camera, Mail, Phone, MapPin, 
  Calendar, FileText, MessageCircle, ShoppingBag, Award 
} from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userStats, setUserStats] = useState({})
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    organization: '',
    bio: '',
    interests: [],
    avatar: ''
  })

  const availableInterests = [
    'Climate Change',
    'Forest Conservation',
    'Renewable Energy',
    'Sustainable Agriculture',
    'Water Conservation',
    'Wildlife Protection',
    'Community Development',
    'Traditional Knowledge',
    'Carbon Trading',
    'Environmental Education'
  ]

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        organization: user.organization || '',
        bio: user.bio || '',
        interests: user.interests || [],
        avatar: user.avatar || ''
      })

      // Load user stats
      setUserStats({
        projectsSubmitted: user.projectsSubmitted || 0,
        forumPosts: user.forumPosts || 0,
        donationsCount: user.donationsCount || 0,
        totalDonated: user.totalDonated || 0,
        ordersPlaced: user.ordersPlaced || 0,
        totalSpent: user.totalSpent || 0,
        memberSince: user.memberSince || new Date().toLocaleDateString()
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploadingAvatar(true)

    // Convert to base64 for storage
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64Image = e.target.result
      setFormData(prev => ({
        ...prev,
        avatar: base64Image
      }))
      setUploadingAvatar(false)
    }
    reader.onerror = () => {
      alert('Error reading file')
      setUploadingAvatar(false)
    }
    reader.readAsDataURL(file)
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container-max py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h1>
            <a href="/login" className="btn-primary">Login</a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-max py-8">
        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Profile updated successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="relative inline-block mb-4">
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
                <div className="absolute bottom-0 right-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 cursor-pointer flex items-center justify-center"
                  >
                    {uploadingAvatar ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </label>
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.name || 'User Name'}</h1>
            <p className="text-gray-600 mb-4">{user.role === 'admin' ? 'Administrator' : 'Community Member'}</p>

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

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a href="/submit-project" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-primary-600" />
                <span>Submit New Project</span>
              </a>
              <a href="/forum" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span>Join Discussion</span>
              </a>
              <a href="/shop" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                <span>Browse Resources</span>
              </a>
              <a href="/donate" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Make Donation</span>
              </a>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
