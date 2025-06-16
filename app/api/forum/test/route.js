import { NextResponse } from 'next/server'

// Simple test endpoint to verify API is working
export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            message: 'Forum API is working!',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        
        return NextResponse.json({
            success: true,
            message: 'Test POST successful',
            receivedData: body,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
