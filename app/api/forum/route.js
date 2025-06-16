import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Path to our JSON database file
const dbPath = path.join(process.cwd(), 'data', 'forum-posts.json')

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize database file if it doesn't exist
if (!fs.existsSync(dbPath)) {
    const initialData = {
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
                content: 'Just completed a reforestation project in the Congo Basin! 🌳 We planted over 500 indigenous trees with local communities. The enthusiasm and traditional knowledge shared by community elders was incredible. Here are some key insights we learned about sustainable forest management...',
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
                tags: ['Reforestation', 'Congo Basin', 'Community', 'Traditional Knowledge']
            }
        ],
        lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2))
}

// Helper function to read database
function readDatabase() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading database:', error)
        return { posts: [], lastUpdated: new Date().toISOString() }
    }
}

// Helper function to write database
function writeDatabase(data) {
    try {
        data.lastUpdated = new Date().toISOString()
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
        return true
    } catch (error) {
        console.error('Error writing database:', error)
        return false
    }
}

// GET - Fetch all posts
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const search = searchParams.get('search')
        
        const db = readDatabase()
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
            lastUpdated: db.lastUpdated
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
        const body = await request.json()
        const { content, author, authorRole, authorAvatar, category, privacy, tags } = body
        
        if (!content || !author) {
            return NextResponse.json(
                { success: false, error: 'Content and author are required' },
                { status: 400 }
            )
        }
        
        const db = readDatabase()
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
        
        db.posts = [newPost, ...db.posts]
        
        if (writeDatabase(db)) {
            return NextResponse.json({
                success: true,
                post: newPost,
                message: 'Post created successfully'
            })
        } else {
            return NextResponse.json(
                { success: false, error: 'Failed to save post' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create post' },
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
        
        const db = readDatabase()
        const postIndex = db.posts.findIndex(post => post.id === postId)
        
        if (postIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            )
        }
        
        let updatedPost = { ...db.posts[postIndex] }
        
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
                
                const newReply = {
                    id: Date.now(),
                    content: reply.content,
                    author: reply.author,
                    authorRole: reply.authorRole || 'Community Member',
                    authorAvatar: reply.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    likedBy: []
                }
                
                updatedPost.replies.push(newReply)
                break
                
            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action' },
                    { status: 400 }
                )
        }
        
        updatedPost.updatedAt = new Date().toISOString()
        db.posts[postIndex] = updatedPost
        
        if (writeDatabase(db)) {
            return NextResponse.json({
                success: true,
                post: updatedPost,
                message: `Post ${action} successful`
            })
        } else {
            return NextResponse.json(
                { success: false, error: 'Failed to update post' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error updating post:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update post' },
            { status: 500 }
        )
    }
}

// DELETE - Delete post (admin only)
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const postId = parseInt(searchParams.get('id'))
        
        if (!postId) {
            return NextResponse.json(
                { success: false, error: 'Post ID is required' },
                { status: 400 }
            )
        }
        
        const db = readDatabase()
        const postIndex = db.posts.findIndex(post => post.id === postId)
        
        if (postIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            )
        }
        
        db.posts.splice(postIndex, 1)
        
        if (writeDatabase(db)) {
            return NextResponse.json({
                success: true,
                message: 'Post deleted successfully'
            })
        } else {
            return NextResponse.json(
                { success: false, error: 'Failed to delete post' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error deleting post:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete post' },
            { status: 500 }
        )
    }
}
