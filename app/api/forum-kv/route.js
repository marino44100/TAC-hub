import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

// Vercel KV database keys
const POSTS_KEY = 'tac-hub-forum-posts'
const POSTS_COUNTER_KEY = 'tac-hub-forum-posts-counter'

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
    
    await kv.set(POSTS_KEY, samplePosts)
    await kv.set(POSTS_COUNTER_KEY, 2)
    return samplePosts
}

// GET - Fetch all posts
export async function GET(request) {
    try {
        console.log('GET /api/forum-kv - Fetching posts from Vercel KV')
        
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const search = searchParams.get('search')
        
        // Get posts from Vercel KV
        let posts = await kv.get(POSTS_KEY)
        
        // Initialize with sample data if no posts exist
        if (!posts || posts.length === 0) {
            console.log('No posts found, initializing sample data')
            posts = await initializeSampleData()
        }
        
        console.log(`Found ${posts.length} posts in database`)
        
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
            lastUpdated: new Date().toISOString(),
            message: 'Posts fetched successfully from Vercel KV'
        })
    } catch (error) {
        console.error('Error fetching posts from KV:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch posts from database' },
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
        const currentPosts = await kv.get(POSTS_KEY) || []
        const currentCounter = await kv.get(POSTS_COUNTER_KEY) || 0
        const newId = currentCounter + 1
        
        console.log(`Current database has ${currentPosts.length} posts, new ID will be ${newId}`)
        
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
        
        // Save to Vercel KV
        await kv.set(POSTS_KEY, updatedPosts)
        await kv.set(POSTS_COUNTER_KEY, newId)
        
        console.log(`Post saved successfully. Database now has ${updatedPosts.length} posts`)
        
        return NextResponse.json({
            success: true,
            post: newPost,
            message: 'Post created successfully and saved to database',
            totalPosts: updatedPosts.length
        })
    } catch (error) {
        console.error('Error creating post in KV:', error)
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
        const currentPosts = await kv.get(POSTS_KEY) || []
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
                
                const currentCounter = await kv.get(POSTS_COUNTER_KEY) || 0
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
        
        // Save updated posts to Vercel KV
        await kv.set(POSTS_KEY, currentPosts)
        
        console.log(`Post ${action} successful for post ID ${postId}`)
        
        return NextResponse.json({
            success: true,
            post: updatedPost,
            message: `Post ${action} successful`
        })
    } catch (error) {
        console.error('Error updating post in KV:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update post' },
            { status: 500 }
        )
    }
}

// DELETE - Delete post (admin only)
export async function DELETE(request) {
    try {
        console.log('DELETE /api/forum-kv - Deleting post')
        
        const { searchParams } = new URL(request.url)
        const postId = parseInt(searchParams.get('id'))
        
        if (!postId) {
            return NextResponse.json(
                { success: false, error: 'Post ID is required' },
                { status: 400 }
            )
        }
        
        // Get current posts
        const currentPosts = await kv.get(POSTS_KEY) || []
        const postIndex = currentPosts.findIndex(post => post.id === postId)
        
        if (postIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            )
        }
        
        // Remove post from array
        currentPosts.splice(postIndex, 1)
        
        // Save updated posts to Vercel KV
        await kv.set(POSTS_KEY, currentPosts)
        
        console.log(`Post ${postId} deleted successfully. Database now has ${currentPosts.length} posts`)
        
        return NextResponse.json({
            success: true,
            message: 'Post deleted successfully',
            totalPosts: currentPosts.length
        })
    } catch (error) {
        console.error('Error deleting post from KV:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete post' },
            { status: 500 }
        )
    }
}
