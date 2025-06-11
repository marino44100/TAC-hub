'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { MessageCircle, ThumbsUp, Reply, Plus, Search, Send, User } from 'lucide-react'

export default function ForumPage() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' })
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPost, setSelectedPost] = useState(null)
  const [newReply, setNewReply] = useState('')
  const [showReplies, setShowReplies] = useState({})
  const { user } = useAuth()

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'general', name: 'General Discussion' },
    { id: 'research', name: 'Climate Research' },
    { id: 'conservation', name: 'Forest Conservation' },
    { id: 'renewable', name: 'Renewable Energy' },
    { id: 'policy', name: 'Climate Policy' },
    { id: 'projects', name: 'Project Showcase' }
  ]

  // Load posts and replies from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('tac-hub-forum-posts')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    } else {
      // Sample forum posts with replies
      const samplePosts = [
        {
          id: 1,
          title: 'New IPCC Report on Climate Change Impacts',
          content: 'The latest IPCC report highlights critical findings about climate change impacts in Africa. What are your thoughts on the recommendations for the Congo Basin?',
          author: 'Dr. Sarah Johnson',
          authorRole: 'Climate Researcher',
          category: 'research',
          createdAt: '2024-01-15T10:30:00Z',
          likes: 24,
          replies: [
            {
              id: 101,
              content: 'This report is crucial for understanding the urgency of action needed in the Congo Basin. The recommendations for community-based conservation are particularly important.',
              author: 'Emmanuel Mbeki',
              authorRole: 'Community Leader',
              createdAt: '2024-01-15T14:20:00Z',
              likes: 8
            },
            {
              id: 102,
              content: 'I agree with the community-based approach. We\'ve seen success with similar initiatives in Cameroon.',
              author: 'Maria Santos',
              authorRole: 'NGO Coordinator',
              createdAt: '2024-01-15T16:45:00Z',
              likes: 5
            }
          ],
          tags: ['IPCC', 'Congo Basin', 'Research']
        },
        {
          id: 2,
          title: 'Community-Based Forest Conservation Success Story',
          content: 'Our village in Cameroon has successfully implemented a community forest management program. We\'ve seen a 40% reduction in illegal logging. Happy to share our experience!',
          author: 'Emmanuel Mbeki',
          authorRole: 'Community Leader',
          category: 'conservation',
          createdAt: '2024-01-14T15:45:00Z',
          likes: 45,
          replies: [
            {
              id: 201,
              content: 'This is inspiring! Could you share more details about how you engaged the local community?',
              author: 'Dr. Sarah Johnson',
              authorRole: 'Climate Researcher',
              createdAt: '2024-01-14T18:30:00Z',
              likes: 12
            }
          ],
          tags: ['Community', 'Cameroon', 'Success Story']
        }
      ]
      setPosts(samplePosts)
      localStorage.setItem('tac-hub-forum-posts', JSON.stringify(samplePosts))
    }
  }, [])

  const handleCreatePost = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please login to create a post')
      return
    }

    const post = {
      id: Date.now(),
      ...newPost,
      author: user.name,
      authorRole: 'Community Member',
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
      tags: []
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem('tac-hub-forum-posts', JSON.stringify(updatedPosts))
    
    setNewPost({ title: '', content: '', category: 'general' })
    setShowNewPostForm(false)
  }

  const handleLike = (postId) => {
    if (!user) {
      alert('Please login to interact with posts')
      return
    }
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    )
    setPosts(updatedPosts)
    localStorage.setItem('tac-hub-forum-posts', JSON.stringify(updatedPosts))
  }

  const handleReply = (postId) => {
    if (!user) {
      alert('Please login to reply')
      return
    }
    if (!newReply.trim()) return

    const reply = {
      id: Date.now(),
      content: newReply,
      author: user.name,
      authorRole: 'Community Member',
      createdAt: new Date().toISOString(),
      likes: 0
    }

    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, reply] }
        : post
    )
    
    setPosts(updatedPosts)
    localStorage.setItem('tac-hub-forum-posts', JSON.stringify(updatedPosts))
    setNewReply('')
  }

  const toggleReplies = (postId) => {
    setShowReplies(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const filteredPosts = posts.filter(post => 
    (selectedCategory === 'all' || post.category === selectedCategory) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-max py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discussion Forum</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with climate advocates, researchers, and practitioners from across Africa
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* New Post Button */}
            <button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Discussion</span>
            </button>
          </div>
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Start a New Discussion</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter discussion title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.slice(1).map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  required
                  rows={4}
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Share your thoughts, questions, or insights..."
                />
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary">
                  Post Discussion
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Forum Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <span>•</span>
                    <span>{post.authorRole}</span>
                    <span>•</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                  {categories.find(c => c.id === post.category)?.name}
                </span>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {post.content}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button 
                    onClick={() => toggleReplies(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies?.length || 0} replies</span>
                  </button>
                </div>
              </div>

              {/* Replies Section */}
              {showReplies[post.id] && (
                <div className="mt-6 border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Replies</h4>
                  
                  {/* Existing Replies */}
                  <div className="space-y-4 mb-6">
                    {post.replies?.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">{reply.author}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500 text-sm">{reply.authorRole}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500 text-sm">{formatDate(reply.createdAt)}</span>
                        </div>
                        <p className="text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  {user && (
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          placeholder="Write a reply..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleReply(post.id)
                            }
                          }}
                        />
                        <button
                          onClick={() => handleReply(post.id)}
                          className="btn-primary flex items-center space-x-1"
                        >
                          <Send className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No discussions found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Be the first to start a discussion!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
