'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdminAnalytics from '../../components/AdminAnalytics'
import {
  Users, FileText, MessageCircle, ShoppingBag, BarChart3, Settings,
  TrendingUp, AlertTriangle, Eye, Edit, Trash2, Plus, Search,
  Globe, Brain, BookOpen, Shield, Database, Activity, Calendar,
  Mail, Phone, MapPin, Award, DollarSign, Package, Star
} from 'lucide-react'

export default function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'content', name: 'Content', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  useEffect(() => {
    if (user?.role !== 'admin') {
      window.location.href = '/login'
      return
    }
    loadAdminData()
  }, [user])

  const loadAdminData = () => {
    setLoading(true)
    
    // Load users
    const usersData = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
    setUsers(usersData)
    
    // Load projects
    const projectsData = JSON.parse(localStorage.getItem('tac-hub-projects') || '[]')
    setProjects(projectsData)
    
    // Load orders
    const ordersData = JSON.parse(localStorage.getItem('tac-hub-orders') || '[]')
    setOrders(ordersData)
    
    // Calculate stats
    const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0)
    const activeProjects = projectsData.filter(p => p.status === 'active').length
    const pendingProjects = projectsData.filter(p => p.status === 'pending').length
    
    setStats({
      totalUsers: usersData.length,
      activeUsers: usersData.filter(u => u.lastLogin && 
        new Date(u.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
      totalProjects: projectsData.length,
      activeProjects,
      pendingProjects,
      totalOrders: ordersData.length,
      totalRevenue,
      avgOrderValue: ordersData.length > 0 ? totalRevenue / ordersData.length : 0
    })
    
    setLoading(false)
  }

  const deleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem('tac-hub-users', JSON.stringify(updatedUsers))
      loadAdminData()
    }
  }

  const updateUserRole = (userId, newRole) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('tac-hub-users', JSON.stringify(updatedUsers))
  }

  const updateProjectStatus = (projectId, newStatus) => {
    const updatedProjects = projects.map(p => 
      p.id === projectId ? { ...p, status: newStatus } : p
    )
    setProjects(updatedProjects)
    localStorage.setItem('tac-hub-projects', JSON.stringify(updatedProjects))
    loadAdminData()
  }

  const deleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId)
      setProjects(updatedProjects)
      localStorage.setItem('tac-hub-projects', JSON.stringify(updatedProjects))
      loadAdminData()
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container-max py-12">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You need administrator privileges to access this page.</p>
            <a href="/login" className="btn-primary">Login as Admin</a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                    <p className="text-xs text-green-600">{stats.activeUsers || 0} active this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProjects || 0}</p>
                    <p className="text-xs text-blue-600">{stats.activeProjects || 0} active, {stats.pendingProjects || 0} pending</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders || 0}</p>
                    <p className="text-xs text-green-600">${(stats.avgOrderValue || 0).toFixed(2)} avg value</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${(stats.totalRevenue || 0).toFixed(2)}</p>
                    <p className="text-xs text-green-600">Total earnings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New user registered: {users[users.length - 1]?.name || 'Unknown'}</span>
                  <span className="text-xs text-gray-400">Recently</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Project submitted: {projects[projects.length - 1]?.title || 'Unknown'}</span>
                  <span className="text-xs text-gray-400">Recently</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New order placed: Order #{orders[orders.length - 1]?.id || 'N/A'}</span>
                  <span className="text-xs text-gray-400">Recently</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'analytics':
        return <AdminAnalytics />
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                <Users className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role || 'user'}
                            onChange={(e) => updateUserRole(user.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.lastLogin && new Date(user.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.lastLogin && new Date(user.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600">Feature coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">TAC-HUB Admin Panel</h1>
            <p className="text-gray-600 mt-2">Manage your Congo Basin climate platform</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
