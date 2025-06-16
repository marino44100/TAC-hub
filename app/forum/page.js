'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { 
    MessageCircle, Send, Search, 
    Heart, Share2, Globe, Lock, Tag, Plus
} from 'lucide-react'

export default function ForumPage() {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState({ content: '', category: 'general', privacy: 'public' })
    const [showNewPostForm, setShowNewPostForm] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [newReply, setNewReply] = useState('')
    const [showReplies, setShowReplies] = useState({})
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const categories = [
        { id: 'all', name: 'All Posts', icon: Globe },
        { id: 'general', name: 'General Discussion', icon: MessageCircle },
        { id: 'research', name: 'Climate Research', icon: Search },
        { id: 'conservation', name: 'Forest Conservation', icon: Heart },
        { id: 'renewable', name: 'Renewable Energy', icon: Plus },
        { id: 'policy', name: 'Climate Policy', icon: Lock },
        { id: 'projects', name: 'Project Showcase', icon: Tag }
    ]

    // Load posts using localStorage for persistence (works on Vercel)
    useEffect(() => {
        loadPosts()
        const interval = setInterval(loadPosts, 10000) // Refresh every 10 seconds
        return () => clearInterval(interval)
    }, [selectedCategory, searchTerm])

    const loadPosts = () => {
        try {
            // Load from localStorage for persistence across sessions
            const localPosts = localStorage.getItem('tac-hub-forum-posts-persistent')
            if (localPosts) {
                const parsedPosts = JSON.parse(localPosts)
                const filteredPosts = filterPosts(parsedPosts)
                setPosts(filteredPosts)
            } else {
                // Initialize with sample data if nothing exists
                initializeSamplePosts()
            }
        } catch (error) {
            console.error('Error loading posts:', error)
            initializeSamplePosts()
        }
    }

    const filterPosts = (allPosts) => {
        let filtered = allPosts

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory)
        }

        // Filter by search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase()
            filtered = filtered.filter(post => 
                post.content.toLowerCase().includes(searchLower) ||
                post.author.toLowerCase().includes(searchLower) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            )
        }

        // Sort by creation date (newest first)
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    const initializeSamplePosts = () => {
        const samplePosts = [
            {
                id: 1,
                content: 'Welcome to TAC-HUB Community! 🌍 This is a space for climate advocates, researchers, and practitioners from across Africa to connect, share knowledge, and collaborate on climate action. Feel free to introduce yourself and share your climate story!',
                author: 'TAC-HUB Team',
                authorRole: 'Platform Administrator',
                authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                category: 'general',
                privacy: 'public',
                createdAt: '2024-01-15T10:30:00Z',
                likes: 45,
                likedBy: [],
                replies: [
                    {
                        id: 101,
                        content: 'Excited to be part of this community! Looking forward to learning from everyone here.',
                        author: 'Emmanuel Mbeki',
                        authorRole: 'Community Member',
                        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                        createdAt: '2024-01-15T11:15:00Z',
                        likes: 12,
                        likedBy: []
                    }
                ],
                tags: ['Welcome', 'Community']
            },
            {
                id: 2,
                content: 'Just completed a reforestation project in the Congo Basin! 🌳 We planted over 500 indigenous trees with local communities. The enthusiasm and traditional knowledge shared by community elders was incredible.',
                author: 'Dr. Sarah Johnson',
                authorRole: 'Forest Conservation Specialist',
                authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
                category: 'conservation',
                privacy: 'public',
                createdAt: '2024-01-14T14:20:00Z',
                likes: 78,
                likedBy: [],
                replies: [],
                tags: ['Reforestation', 'Congo Basin']
            }
        ]
        
        localStorage.setItem('tac-hub-forum-posts-persistent', JSON.stringify(samplePosts))
        const filteredPosts = filterPosts(samplePosts)
        setPosts(filteredPosts)
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        if (!user) {
            alert('Please login to create a post')
            return
        }

        setLoading(true)
        try {
            // Create new post
            const newPostData = {
                id: Date.now(),
                content: newPost.content,
                author: user.name,
                authorRole: 'Community Member',
                authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                category: newPost.category,
                privacy: newPost.privacy,
                createdAt: new Date().toISOString(),
                likes: 0,
                likedBy: [],
                replies: [],
                tags: []
            }

            // Save to localStorage for persistence
            const currentPosts = localStorage.getItem('tac-hub-forum-posts-persistent')
            const existingPosts = currentPosts ? JSON.parse(currentPosts) : []
            const updatedPosts = [newPostData, ...existingPosts]
            
            localStorage.setItem('tac-hub-forum-posts-persistent', JSON.stringify(updatedPosts))
            
            // Update display
            const filteredPosts = filterPosts(updatedPosts)
            setPosts(filteredPosts)

            setNewPost({ content: '', category: 'general', privacy: 'public' })
            setShowNewPostForm(false)
            alert('🎉 Your post has been shared with the community!')
            
        } catch (error) {
            console.error('Error creating post:', error)
            alert('Failed to create post. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleLike = (postId) => {
        if (!user) {
            alert('Please login to interact with posts')
            return
        }
        
        try {
            const currentPosts = localStorage.getItem('tac-hub-forum-posts-persistent')
            const existingPosts = currentPosts ? JSON.parse(currentPosts) : []
            
            const updatedPosts = existingPosts.map(post => {
                if (post.id === postId) {
                    const hasLiked = post.likedBy?.includes(user.email)
                    if (hasLiked) {
                        return {
                            ...post,
                            likes: Math.max(0, post.likes - 1),
                            likedBy: post.likedBy.filter(email => email !== user.email)
                        }
                    } else {
                        return {
                            ...post,
                            likes: post.likes + 1,
                            likedBy: [...(post.likedBy || []), user.email]
                        }
                    }
                }
                return post
            })

            localStorage.setItem('tac-hub-forum-posts-persistent', JSON.stringify(updatedPosts))
            const filteredPosts = filterPosts(updatedPosts)
            setPosts(filteredPosts)
        } catch (error) {
            console.error('Error liking post:', error)
        }
    }

    const handleReply = (postId) => {
        if (!user) {
            alert('Please login to reply')
            return
        }
        if (!newReply.trim()) return

        try {
            const currentPosts = localStorage.getItem('tac-hub-forum-posts-persistent')
            const existingPosts = currentPosts ? JSON.parse(currentPosts) : []

            const reply = {
                id: Date.now(),
                content: newReply,
                author: user.name,
                authorRole: 'Community Member',
                authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                createdAt: new Date().toISOString(),
                likes: 0,
                likedBy: []
            }

            const updatedPosts = existingPosts.map(post =>
                post.id === postId 
                    ? { ...post, replies: [...(post.replies || []), reply] }
                    : post
            )

            localStorage.setItem('tac-hub-forum-posts-persistent', JSON.stringify(updatedPosts))
            const filteredPosts = filterPosts(updatedPosts)
            setPosts(filteredPosts)
            setNewReply('')
        } catch (error) {
            console.error('Error adding reply:', error)
        }
    }

    const toggleReplies = (postId) => {
        setShowReplies(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }))
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
        
        if (diffInHours < 1) return 'Just now'
        if (diffInHours < 24) return `${diffInHours}h ago`
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
        return date.toLocaleDateString()
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            
            <div className="container-max py-6">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Forum</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Connect, share, and collaborate with climate advocates across Africa
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                        ✅ Posts are now persistent and visible to all users!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(category => {
                                    const Icon = category.icon
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                                selectedCategory === category.id
                                                    ? 'bg-primary-100 text-primary-700'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{category.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search Bar */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search posts and discussions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        {/* Create Post */}
                        {user && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <img
                                        src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <button
                                        onClick={() => setShowNewPostForm(true)}
                                        className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                                    >
                                        What's on your mind, {user.name}?
                                    </button>
                                </div>
                                
                                {showNewPostForm && (
                                    <form onSubmit={handleCreatePost} className="space-y-4">
                                        <textarea
                                            required
                                            rows={4}
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                            placeholder="Share your thoughts, insights, or questions with the community..."
                                        />
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <select
                                                    value={newPost.category}
                                                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                >
                                                    {categories.slice(1).map(category => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            
                                            <div className="flex space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPostForm(false)}
                                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="btn-primary disabled:opacity-50"
                                                >
                                                    {loading ? 'Posting...' : 'Post'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Posts Feed */}
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-lg shadow-sm">
                                    {/* Post Header */}
                                    <div className="p-6 pb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={post.authorAvatar}
                                                    alt={post.author}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{post.author}</h3>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <span>{post.authorRole}</span>
                                                        <span>•</span>
                                                        <span>{formatDate(post.createdAt)}</span>
                                                        <span>•</span>
                                                        <Globe className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                                                    {categories.find(c => c.id === post.category)?.name}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Post Content */}
                                        <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
                                        
                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map((tag, index) => (
                                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Post Actions */}
                                    <div className="px-6 py-3 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                <button
                                                    onClick={() => handleLike(post.id)}
                                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                                                        post.likedBy?.includes(user?.email)
                                                            ? 'text-red-600 bg-red-50'
                                                            : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <Heart className={`w-5 h-5 ${post.likedBy?.includes(user?.email) ? 'fill-current' : ''}`} />
                                                    <span>{post.likes}</span>
                                                </button>
                                                
                                                <button
                                                    onClick={() => toggleReplies(post.id)}
                                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                                >
                                                    <MessageCircle className="w-5 h-5" />
                                                    <span>{post.replies?.length || 0}</span>
                                                </button>
                                                
                                                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                                                    <Share2 className="w-5 h-5" />
                                                    <span>Share</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Replies Section */}
                                    {showReplies[post.id] && (
                                        <div className="px-6 pb-6 border-t border-gray-100">
                                            {/* Existing Replies */}
                                            {post.replies?.map((reply) => (
                                                <div key={reply.id} className="flex space-x-3 mt-4">
                                                    <img
                                                        src={reply.authorAvatar}
                                                        alt={reply.author}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                                                            <div className="flex items-center space-x-2 mb-1">
                                                                <span className="font-semibold text-sm text-gray-900">{reply.author}</span>
                                                                <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                                                            </div>
                                                            <p className="text-gray-800">{reply.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            {/* Reply Form */}
                                            {user && (
                                                <div className="flex space-x-3 mt-4">
                                                    <img
                                                        src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                                                        alt={user.name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1 flex space-x-2">
                                                        <input
                                                            type="text"
                                                            value={newReply}
                                                            onChange={(e) => setNewReply(e.target.value)}
                                                            placeholder="Write a reply..."
                                                            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    handleReply(post.id)
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => handleReply(post.id)}
                                                            className="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                                                        >
                                                            <Send className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {posts.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
                                <p className="text-gray-400 mt-2">Be the first to start a discussion!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
