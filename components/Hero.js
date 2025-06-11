import Link from 'next/link'
import { ArrowRight, BookOpen, Smartphone, Users, TreePine, Calendar, Camera, MessageCircle, Shield } from 'lucide-react'

export default function Hero() {
    return ( <
        section className = "relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden" >
        <
        div className = "absolute inset-0 bg-black opacity-20" > < /div> <
        div className = "relative container-max py-20 lg:py-32" >
        <
        div className = "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" >
        <
        div className = "space-y-8" >
        <
        div className = "inline-flex items-center bg-secondary-500 bg-opacity-20 text-secondary-300 px-4 py-2 rounded-full text-sm font-medium" >
        <
        Smartphone className = "w-4 h-4 mr-2" / >
        Mobile & Web Platform
        for Communities <
        /div> <
        h1 className = "text-4xl lg:text-6xl font-bold leading-tight" >
        The African Climate Hub <
        span className = "block text-secondary-400" > TAC - HUB < /span> <
        /h1> <
        p className = "text-xl lg:text-2xl text-gray-200 leading-relaxed" >
        A mobile and web platform that helps Congo Basin communities use their traditional knowledge alongside modern technology to fight climate change
        while keeping communities in control. <
        /p> <
        div className = "flex flex-col sm:flex-row gap-4" >
        <
        Link href = "/register"
        className = "bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center" >
        Join Our Community <
        ArrowRight className = "ml-2 w-5 h-5" / >
        <
        /Link> <
        Link href = "/knowledge-center"
        className = "border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center" >
        Explore Knowledge <
        BookOpen className = "ml-2 w-5 h-5" / >
        <
        /Link> <
        /div> <
        /div> <
        div className = "relative" >
        <
        div className = "bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20" >
        <
        h3 className = "text-2xl font-bold mb-6" > Community Impact < /h3> <
        div className = "space-y-4" >
        <
        div className = "flex justify-between items-center" >
        <
        span className = "text-gray-200" > Communities Connected < /span> <
        span className = "text-2xl font-bold text-secondary-400" > 247 < /span> <
        /div> <
        div className = "flex justify-between items-center" >
        <
        span className = "text-gray-200" > Traditional Knowledge Entries < /span> <
        span className = "text-2xl font-bold text-secondary-400" > 1, 847 < /span> <
        /div> <
        div className = "flex justify-between items-center" >
        <
        span className = "text-gray-200" > Forest Area Monitored < /span> <
        span className = "text-2xl font-bold text-secondary-400" > 1.2 M ha < /span> <
        /div> <
        div className = "flex justify-between items-center" >
        <
        span className = "text-gray-200" > Elder Teachings Recorded < /span> <
        span className = "text-2xl font-bold text-secondary-400" > 342 < /span> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /section>
    )
}