import { NextResponse } from 'next/server'

// Vercel KV database keys
const POSTS_KEY = 'tac-hub-forum-posts'
const POSTS_COUNTER_KEY = 'tac-hub-forum-posts-counter'

// Check if KV is available (has required environment variables)
const isKVAvailable = () => {
    return process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
}

// Import KV only if environment variables are available
let kv = null
if (isKVAvailable()) {
    try {
        const { kv: kvClient } = require('@vercel/kv')
        kv = kvClient
        console.log('✅ Vercel KV database connected')
    } catch (error) {
        console.log('⚠️ Vercel KV not available, using fallback storage')
    }
} else {
    console.log('⚠️ KV environment variables not found, using fallback storage for development')
}

// Fallback in-memory storage for development
let fallbackStorage = {
    posts: [],
    counter: 0,
    initialized: false
}

// Helper functions for storage operations
const getPosts = async () => {
    if (kv) {
        return await kv.get(POSTS_KEY) || []
    } else {
        if (!fallbackStorage.initialized) {
            await initializeSampleData()
        }
        return fallbackStorage.posts
    }
}

const setPosts = async (posts) => {
    if (kv) {
        await kv.set(POSTS_KEY, posts)
    } else {
        fallbackStorage.posts = posts
    }
}

const getCounter = async () => {
    if (kv) {
        return await kv.get(POSTS_COUNTER_KEY) || 0
    } else {
        return fallbackStorage.counter
    }
}

const setCounter = async (counter) => {
    if (kv) {
        await kv.set(POSTS_COUNTER_KEY, counter)
    } else {
        fallbackStorage.counter = counter
    }
}

// Initialize sample data if database is empty
const initializeSampleData = async () => {
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
            updatedAt: '2024-01-15T10:30:00Z',
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
            tags: ['Welcome', 'Community', 'Climate Action']
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
            updatedAt: '2024-01-14T14:20:00Z',
            likes: 78,
            likedBy: [],
            replies: [],
            tags: ['Reforestation', 'Congo Basin', 'Community']
        }
    ]
    
    // Initialize storage
    await setPosts(samplePosts)
    await setCounter(2)
    fallbackStorage.initialized = true
    
    return samplePosts
}

// GET - Fetch all posts
export async function GET(request) {
    try {
        console.log('GET /api/forum-kv - Fetching posts from storage')
        
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const search = searchParams.get('search')
        
        // Get posts from storage (KV or fallback)
        let posts = await getPosts()
        
        // Initialize with sample data if no posts exist
        if (!posts || posts.length === 0) {
            console.log('No posts found, initializing sample data')
            posts = await initializeSampleData()
        }
        
        console.log(`Found ${posts.length} posts in storage`)
        
        // Filter by category if specified
        if (category && category !== 'all') {
            posts = posts.filter(post => post.category === category)
        }
        
        // Filter by search term if specified
        if (search) {
            const searchLower = search.toLowerCase()
            posts = posts.filter(post => 
                post.content.toLowerCase().includes(searchLower) ||
                post.author.toLowerCase().includes(searchLower) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            )
        }
        
        // Sort by creation date (newest first)
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        
        const storageType = kv ? 'Vercel KV Database' : 'Development Storage'
        
        return NextResponse.json({
            success: true,
            posts,
            total: posts.length,
            lastUpdated: new Date().toISOString(),
            storageType,
            message: `Posts fetched successfully from ${storageType}`
        })
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch posts from storage' },
            { status: 500 }
        )
    }
}

// POST - Create new post
export async function POST(request) {
    try {
        console.log('POST /api/forum-kv - Creating new post')
        
        const body = await request.json()
        console.log('Request body:', body)
        
        const { content, author, authorRole, authorAvatar, category, privacy, tags } = body
        
        if (!content || !author) {
            console.log('Missing required fields:', { content: !!content, author: !!author })
            return NextResponse.json(
                { success: false, error: 'Content and author are required' },
                { status: 400 }
            )
        }
        
        // Get current posts and counter
        const currentPosts = await getPosts() || []
        const currentCounter = await getCounter() || 0
        const newId = currentCounter + 1
        
        console.log(`Current storage has ${currentPosts.length} posts, new ID will be ${newId}`)
        
        // Create new post
        const newPost = {
            id: newId,
            content,
            author,
            authorRole: authorRole || 'Community Member',
            authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            category: category || 'general',
            privacy: privacy || 'public',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            likes: 0,
            likedBy: [],
            replies: [],
            tags: tags || []
        }
        
        console.log('Created new post:', newPost)
        
        // Add new post to the beginning of the array
        const updatedPosts = [newPost, ...currentPosts]
        
        // Save to storage
        await setPosts(updatedPosts)
        await setCounter(newId)
        
        const storageType = kv ? 'Vercel KV Database' : 'Development Storage'
        console.log(`Post saved successfully to ${storageType}. Storage now has ${updatedPosts.length} posts`)
        
        return NextResponse.json({
            success: true,
            post: newPost,
            message: `Post created successfully and saved to ${storageType}`,
            totalPosts: updatedPosts.length,
            storageType
        })
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json(
            { success: false, error: `Failed to create post: ${error.message}` },
            { status: 500 }
        )
    }
}

// PUT - Update post (like/unlike, add reply)
export async function PUT(request) {
    try {
        console.log('PUT /api/forum-kv - Updating post')
        
        const body = await request.json()
        const { postId, action, data } = body
        
        if (!postId || !action) {
            return NextResponse.json(
                { success: false, error: 'Post ID and action are required' },
                { status: 400 }
            )
        }
        
        // Get current posts
        const currentPosts = await getPosts() || []
        const postIndex = currentPosts.findIndex(post => post.id === postId)
        
        if (postIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            )
        }
        
        let updatedPost = { ...currentPosts[postIndex] }
        
        switch (action) {
            case 'like':
                const { userEmail } = data
                if (!userEmail) {
                    return NextResponse.json(
                        { success: false, error: 'User email required for like action' },
                        { status: 400 }
                    )
                }
                
                const hasLiked = updatedPost.likedBy.includes(userEmail)
                if (hasLiked) {
                    updatedPost.likes = Math.max(0, updatedPost.likes - 1)
                    updatedPost.likedBy = updatedPost.likedBy.filter(email => email !== userEmail)
                } else {
                    updatedPost.likes += 1
                    updatedPost.likedBy.push(userEmail)
                }
                break
                
            case 'reply':
                const { reply } = data
                if (!reply || !reply.content || !reply.author) {
                    return NextResponse.json(
                        { success: false, error: 'Reply content and author are required' },
                        { status: 400 }
                    )
                }
                
                const currentCounter = await getCounter() || 0
                const newReplyId = currentCounter + 1000 // Use different range for replies
                
                const newReply = {
                    id: newReplyId,
                    content: reply.content,
                    author: reply.author,
                    authorRole: reply.authorRole || 'Community Member',
                    authorAvatar: reply.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    likedBy: []
                }
                
                updatedPost.replies = [...(updatedPost.replies || []), newReply]
                break
                
            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action' },
                    { status: 400 }
                )
        }
        
        updatedPost.updatedAt = new Date().toISOString()
        currentPosts[postIndex] = updatedPost
        
        // Save updated posts to storage
        await setPosts(currentPosts)
        
        const storageType = kv ? 'Vercel KV Database' : 'Development Storage'
        console.log(`Post ${action} successful for post ID ${postId} in ${storageType}`)
        
        return NextResponse.json({
            success: true,
            post: updatedPost,
            message: `Post ${action} successful`,
            storageType
        })
    } catch (error) {
        console.error('Error updating post:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update post' },
            { status: 500 }
        )
    }
}
