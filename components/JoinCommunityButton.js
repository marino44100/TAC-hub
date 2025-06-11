'use client'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

export default function JoinCommunityButton({ 
  className = "bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center",
  showIcon = true,
  children = "Join Our Community"
}) {
  const { user } = useAuth()

  // If user is logged in, redirect to community dashboard
  // If not logged in, redirect to registration
  const href = user ? '/community/dashboard' : '/register'
  const buttonText = user ? 'Go to Community' : children

  return (
    <Link href={href} className={className}>
      {user && showIcon && <Users className="mr-2 w-5 h-5" />}
      {buttonText}
      {showIcon && <ArrowRight className="ml-2 w-5 h-5" />}
    </Link>
  )
}
