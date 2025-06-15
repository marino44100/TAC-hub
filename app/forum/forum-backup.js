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

    // Load posts from global storage (simulating a shared database)
    useEffect(() => {
        loadGlobalPosts()

        // Set up polling to check for new posts every 5 seconds
        const interval = setInterval(loadGlobalPosts, 5000)
        return () => clearInterval(interval)
    }, [])

    const loadGlobalPosts = () => {
        // Use a global key that all users share
        const globalPosts = localStorage.getItem('tac-hub-global-forum-posts')
        if (globalPosts) {
            const parsedPosts = JSON.parse(globalPosts)
            setPosts(parsedPosts)
        } else {
            // Initialize with sample posts for all users
            const samplePosts = [{
                    id: 1,
                    title: 'Welcome to TAC-HUB Forum! 🌍',
                    content: 'Welcome to our community forum! This is a space for climate advocates, researchers, and practitioners from across Africa to connect, share knowledge, and collaborate on climate action. Feel free to introduce yourself and share your climate story!',
                    author: 'TAC-HUB Team',
                    authorRole: 'Platform Administrator',
                    category: 'general',
                    createdAt: '2024-01-15T10:30:00Z',
                    likes: 45,
                    likedBy: [],
                    replies: [{
                            id: 101,
                            content: 'Excited to be part of this community! Looking forward to learning from everyone here.',
                            author: 'Emmanuel Mbeki',
                            authorRole: 'Community Leader',
                            createdAt: '2024-01-15T14:20:00Z',
                            likes: 12,
                            likedBy: []
                        },
                        {
                            id: 102,
                            content: 'Great initiative! This platform will help us share traditional knowledge and modern climate solutions.',
                            author: 'Dr. Sarah Johnson',
                            authorRole: 'Climate Researcher',
                            createdAt: '2024-01-15T16:45:00Z',
                            likes: 8,
                            likedBy: []
                        }
                    ],
                    tags: ['Welcome', 'Community', 'Introduction']
                },
                {
                    id: 2,
                    title: 'Community-Based Forest Conservation Success Story 🌳',
                    content: 'Our village in Cameroon has successfully implemented a community forest management program. We\'ve seen a 40% reduction in illegal logging and increased biodiversity. The key was combining traditional knowledge with modern monitoring techniques. Happy to share our experience and answer questions!',
                    author: 'Emmanuel Mbeki',
                    authorRole: 'Community Leader',
                    category: 'conservation',
                    createdAt: '2024-01-14T15:45:00Z',
                    likes: 67,
                    likedBy: [],
                    replies: [{
                            id: 201,
                            content: 'This is inspiring! Could you share more details about how you engaged the local community and overcame initial resistance?',
                            author: 'Dr. Sarah Johnson',
                            authorRole: 'Climate Researcher',
                            createdAt: '2024-01-14T18:30:00Z',
                            likes: 15,
                            likedBy: []
                        },
                        {
                            id: 202,
                            content: 'We would love to implement something similar in our region. What were the main challenges you faced?',
                            author: 'Maria Santos',
                            authorRole: 'NGO Coordinator',
                            createdAt: '2024-01-14T20:15:00Z',
                            likes: 9,
                            likedBy: []
                        }
                    ],
                    tags: ['Community', 'Cameroon', 'Success Story', 'Forest Management']
                },
                {
                    id: 3,
                    title: 'Traditional Weather Prediction Methods 🌦️',
                    content: 'In our community, we use traditional methods to predict weather patterns - observing animal behavior, plant changes, and celestial signs. These methods have been 85% accurate over the past decade. How do other communities predict weather? Let\'s share our traditional knowledge!',
                    author: 'Amina Kone',
                    authorRole: 'Traditional Knowledge Keeper',
                    category: 'general',
                    createdAt: '2024-01-13T09:20:00Z',
                    likes: 34,
                    likedBy: [],
                    replies: [{
                        id: 301,
                        content: 'Fascinating! In our area, we watch the behavior of certain birds and the flowering patterns of specific trees.',
                        author: 'Joseph Mwangi',
                        authorRole: 'Farmer',
                        createdAt: '2024-01-13T12:45:00Z',
                        likes: 7,
                        likedBy: []
                    }],
                    tags: ['Traditional Knowledge', 'Weather', 'Community Wisdom']
                }
            ]
            setPosts(samplePosts)
            saveGlobalPosts(samplePosts)
        }
    }

    const saveGlobalPosts = (postsToSave) => {
        localStorage.setItem('tac-hub-global-forum-posts', JSON.stringify(postsToSave))
    }

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
            likedBy: [],
            replies: [],
            tags: []
        }

        const updatedPosts = [post, ...posts]
        setPosts(updatedPosts)
        saveGlobalPosts(updatedPosts) // Use global storage so all users can see

        setNewPost({ title: '', content: '', category: 'general' })
        setShowNewPostForm(false)

        // Show success message
        alert('🎉 Your post has been shared with the community!')
    }

    const handleLike = (postId) => {
        if (!user) {
            alert('Please login to interact with posts')
            return
        }
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const hasLiked = post.likedBy ? .includes(user.email)
                if (hasLiked) {
                    // Unlike the post
                    return {
                        ...post,
                        likes: post.likes - 1,
                        likedBy: post.likedBy.filter(email => email !== user.email)
                    }
                } else {
                    // Like the post
                    return {
                        ...post,
                        likes: post.likes + 1,
                        likedBy: [...(post.likedBy || []), user.email]
                    }
                }
            }
            return post
        })

        setPosts(updatedPosts)
        saveGlobalPosts(updatedPosts) // Use global storage
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
            likes: 0,
            likedBy: []
        }

        const updatedPosts = posts.map(post =>
            post.id === postId ? {...post, replies: [...post.replies, reply] } :
            post
        )

        setPosts(updatedPosts)
        saveGlobalPosts(updatedPosts) // Use global storage
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

    return ( <
        div className = "min-h-screen bg-gray-50" >
        <
        Header / >

        <
        div className = "container-max py-8" > { /* Page Header */ } <
        div className = "text-center mb-8" >
        <
        h1 className = "text-4xl font-bold text-gray-900 mb-4" > Discussion Forum < /h1> <
        p className = "text-lg text-gray-600 max-w-2xl mx-auto" >
        Connect with climate advocates, researchers, and practitioners from across Africa <
        /p> < /
        div >

        { /* Search and Filters */ } <
        div className = "bg-white rounded-lg shadow-sm p-6 mb-6" >
        <
        div className = "flex flex-col md:flex-row gap-4 items-center justify-between" >
        <
        div className = "flex flex-col md:flex-row gap-4 flex-1" > { /* Search */ } <
        div className = "relative flex-1" >
        <
        Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" / >
        <
        input type = "text"
        placeholder = "Search discussions..."
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value)
        }
        className = "pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" /
        >
        <
        /div>

        { /* Category Filter */ } <
        select value = { selectedCategory }
        onChange = {
            (e) => setSelectedCategory(e.target.value)
        }
        className = "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" > {
            categories.map(category => ( <
                option key = { category.id }
                value = { category.id } > { category.name } <
                /option>
            ))
        } <
        /select> < /
        div >

        { /* New Post Button */ } <
        button onClick = {
            () => setShowNewPostForm(!showNewPostForm)
        }
        className = "btn-primary flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > New Discussion < /span> < /
        button > <
        /div> < /
        div >

        { /* New Post Form */ } {
            showNewPostForm && ( <
                div className = "bg-white rounded-lg shadow-sm p-6 mb-6" >
                <
                h3 className = "text-lg font-semibold mb-4" > Start a New Discussion < /h3> <
                form onSubmit = { handleCreatePost }
                className = "space-y-4" >
                <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" >
                Title <
                /label> <
                input type = "text"
                required value = { newPost.title }
                onChange = {
                    (e) => setNewPost({...newPost, title: e.target.value })
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder = "Enter discussion title" /
                >
                <
                /div>

                <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" >
                Category <
                /label> <
                select value = { newPost.category }
                onChange = {
                    (e) => setNewPost({...newPost, category: e.target.value })
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" > {
                    categories.slice(1).map(category => ( <
                        option key = { category.id }
                        value = { category.id } > { category.name } <
                        /option>
                    ))
                } <
                /select> < /
                div >

                <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" >
                Content <
                /label> <
                textarea required rows = { 4 }
                value = { newPost.content }
                onChange = {
                    (e) => setNewPost({...newPost, content: e.target.value })
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder = "Share your thoughts, questions, or insights..." /
                >
                <
                /div>

                <
                div className = "flex space-x-4" >
                <
                button type = "submit"
                className = "btn-primary" >
                Post Discussion <
                /button> <
                button type = "button"
                onClick = {
                    () => setShowNewPostForm(false)
                }
                className = "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" >
                Cancel <
                /button> < /
                div > <
                /form> < /
                div >
            )
        }

        { /* Forum Posts */ } <
        div className = "space-y-6" > {
            filteredPosts.map((post) => ( <
                div key = { post.id }
                className = "bg-white rounded-lg shadow-sm p-6" >
                <
                div className = "flex items-start justify-between mb-4" >
                <
                div className = "flex-1" >
                <
                h3 className = "text-xl font-semibold text-gray-900 mb-2" > { post.title } <
                /h3> <
                div className = "flex items-center space-x-4 text-sm text-gray-600" >
                <
                div className = "flex items-center space-x-2" >
                <
                User className = "w-4 h-4" / >
                <
                span className = "font-medium" > { post.author } < /span> < /
                div > <
                span > • < /span> <
                span > { post.authorRole } < /span> <
                span > • < /span> <
                span > { formatDate(post.createdAt) } < /span> < /
                div > <
                /div> <
                span className = "px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full" > { categories.find(c => c.id === post.category) ? .name } <
                /span> < /
                div >

                <
                p className = "text-gray-700 mb-4 leading-relaxed" > { post.content } <
                /p>

                {
                    post.tags && post.tags.length > 0 && ( <
                        div className = "flex flex-wrap gap-2 mb-4" > {
                            post.tags.map((tag, index) => ( <
                                span key = { index }
                                className = "px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded" > #{ tag } <
                                /span>
                            ))
                        } <
                        /div>
                    )
                }

                <
                div className = "flex items-center justify-between pt-4 border-t" >
                <
                div className = "flex items-center space-x-6" >
                <
                button onClick = {
                    () => handleLike(post.id)
                }
                className = "flex items-center space-x-2 text-gray-600 hover:text-primary-600" >
                <
                ThumbsUp className = "w-4 h-4" / >
                <
                span > { post.likes } < /span> < /
                button >

                <
                button onClick = {
                    () => toggleReplies(post.id)
                }
                className = "flex items-center space-x-2 text-gray-600 hover:text-primary-600" >
                <
                MessageCircle className = "w-4 h-4" / >
                <
                span > { post.replies ? .length || 0 }
                replies < /span> < /
                button > <
                /div> < /
                div >

                { /* Replies Section */ } {
                    showReplies[post.id] && ( <
                        div className = "mt-6 border-t pt-6" >
                        <
                        h4 className = "font-semibold text-gray-900 mb-4" > Replies < /h4>

                        { /* Existing Replies */ } <
                        div className = "space-y-4 mb-6" > {
                            post.replies ? .map((reply) => ( <
                                div key = { reply.id }
                                className = "bg-gray-50 rounded-lg p-4" >
                                <
                                div className = "flex items-center space-x-2 mb-2" >
                                <
                                User className = "w-4 h-4 text-gray-600" / >
                                <
                                span className = "font-medium text-gray-900" > { reply.author } < /span> <
                                span className = "text-gray-500" > • < /span> <
                                span className = "text-gray-500 text-sm" > { reply.authorRole } < /span> <
                                span className = "text-gray-500" > • < /span> <
                                span className = "text-gray-500 text-sm" > { formatDate(reply.createdAt) } < /span> < /
                                div > <
                                p className = "text-gray-700" > { reply.content } < /p> < /
                                div >
                            ))
                        } <
                        /div>

                        { /* Reply Form */ } {
                            user && ( <
                                div className = "flex space-x-3" >
                                <
                                div className = "w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center" >
                                <
                                User className = "w-4 h-4 text-primary-600" / >
                                <
                                /div> <
                                div className = "flex-1 flex space-x-2" >
                                <
                                input type = "text"
                                value = { newReply }
                                onChange = {
                                    (e) => setNewReply(e.target.value)
                                }
                                placeholder = "Write a reply..."
                                className = "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                onKeyPress = {
                                    (e) => {
                                        if (e.key === 'Enter') {
                                            handleReply(post.id)
                                        }
                                    }
                                }
                                /> <
                                button onClick = {
                                    () => handleReply(post.id)
                                }
                                className = "btn-primary flex items-center space-x-1" >
                                <
                                Send className = "w-4 h-4" / >
                                <
                                span > Reply < /span> < /
                                button > <
                                /div> < /
                                div >
                            )
                        } <
                        /div>
                    )
                } <
                /div>
            ))
        } <
        /div>

        {
            filteredPosts.length === 0 && ( <
                div className = "text-center py-12" >
                <
                MessageCircle className = "w-12 h-12 text-gray-400 mx-auto mb-4" / >
                <
                p className = "text-gray-500 text-lg" > No discussions found matching your criteria. < /p> <
                p className = "text-gray-400 mt-2" > Be the first to start a discussion! < /p> < /
                div >
            )
        } <
        /div>

        <
        Footer / >
        <
        /div>
    )
}