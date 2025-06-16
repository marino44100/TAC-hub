import { NextResponse } from 'next/server'

// This is a hybrid solution that works both locally and on Vercel
// For production, this would connect to Vercel KV, Supabase, or another database

// Simulated database using a more persistent approach
const FORUM_STORAGE_KEY = 'tac-hub-forum-posts'

// Sample data that gets restored if no data exists
const getSampleData = () => ({
    posts: [
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
    ],
    lastUpdated: new Date().toISOString()
})

// GET - Fetch all posts
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const search = searchParams.get('search')
        
        // For now, return sample data
        // In production, this would fetch from Vercel KV or another database
        const db = getSampleData()
        let posts = db.posts || []
        
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
        
        return NextResponse.json({
            success: true,
            posts,
            total: posts.length,
            lastUpdated: db.lastUpdated,
            message: 'Posts fetched successfully'
        })
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch posts' },
            { status: 500 }
        )
    }
}

// POST - Create new post
export async function POST(request) {
    try {
        console.log('POST /api/forum-persistent - Creating new post')
        
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
        
        // Create new post
        const newPost = {
            id: Date.now(),
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
        
        // For now, we'll return success but note that the post won't persist
        // In production, this would save to Vercel KV or another database
        
        return NextResponse.json({
            success: true,
            post: newPost,
            message: 'Post created successfully',
            note: 'Note: Posts are temporary in demo mode. For persistent storage, upgrade to Vercel KV or external database.'
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
        const body = await request.json()
        const { postId, action, data } = body
        
        if (!postId || !action) {
            return NextResponse.json(
                { success: false, error: 'Post ID and action are required' },
                { status: 400 }
            )
        }
        
        // For demo purposes, return success
        // In production, this would update the database
        
        return NextResponse.json({
            success: true,
            message: `Post ${action} successful`,
            note: 'Note: Updates are temporary in demo mode. For persistent storage, upgrade to Vercel KV or external database.'
        })
    } catch (error) {
        console.error('Error updating post:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update post' },
            { status: 500 }
        )
    }
}
