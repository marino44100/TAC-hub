'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { Menu, X, User, ShoppingCart, LogOut, Settings } from 'lucide-react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const { user, logout } = useAuth()
    const { getTotalItems, setIsOpen } = useCart()

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Knowledge Center', href: '/knowledge-center' },
        { name: 'Monitoring Tools', href: '/monitoring' },
        { name: 'Community', href: '/community' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Forum', href: '/forum' },
        { name: 'Projects', href: '/submit-project' },
    ]

    return ( <
        header className = "bg-white shadow-sm sticky top-0 z-50" >
        <
        div className = "container-max" >
        <
        div className = "flex items-center justify-between py-4" > { /* Logo */ } <
        Link href = "/"
        className = "flex items-center space-x-3" >
        <
        div className = "w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center" >
        <
        span className = "text-white font-bold text-lg" > T < /span> <
        /div> <
        div >
        <
        div className = "font-bold text-xl text-gray-900" > TAC - HUB < /div> <
        div className = "text-xs text-gray-600" > Climate Action < /div> <
        /div> <
        /Link>

        { /* Desktop Navigation */ } <
        nav className = "hidden lg:flex items-center space-x-8" > {
            navigation.map((item) => ( <
                Link key = { item.name }
                href = { item.href }
                className = "text-gray-700 hover:text-primary-600 font-medium transition-colors" >
                { item.name } <
                /Link>
            ))
        } <
        /nav>

        { /* Right side actions */ } <
        div className = "flex items-center space-x-4" > { /* Shopping Cart */ } <
        button onClick = {
            () => setIsOpen(true) }
        className = "relative p-2 text-gray-700 hover:text-primary-600 transition-colors" >
        <
        ShoppingCart className = "w-6 h-6" / > {
            getTotalItems() > 0 && ( <
                span className = "absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" > { getTotalItems() } <
                /span>
            )
        } <
        /button>

        { /* User Menu */ } {
            user ? ( <
                div className = "relative" >
                <
                button onClick = {
                    () => setIsUserMenuOpen(!isUserMenuOpen) }
                className = "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" >
                <
                div className = "w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center" >
                <
                User className = "w-4 h-4 text-primary-600" / >
                <
                /div> <
                span className = "hidden sm:inline font-medium text-gray-700" > { user.name } < /span> <
                /button>

                {
                    isUserMenuOpen && ( <
                        div className = "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50" >
                        <
                        Link href = "/dashboard"
                        className = "block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick = {
                            () => setIsUserMenuOpen(false) } >
                        Dashboard <
                        /Link> <
                        Link href = "/profile"
                        className = "block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick = {
                            () => setIsUserMenuOpen(false) } >
                        Profile <
                        /Link> {
                            user.role === 'admin' && ( <
                                Link href = "/admin"
                                className = "block px-4 py-2 text-red-700 hover:bg-red-50 font-medium flex items-center space-x-2"
                                onClick = {
                                    () => setIsUserMenuOpen(false) } >
                                <
                                Settings className = "w-4 h-4" / >
                                <
                                span > Admin Panel < /span> <
                                /Link>
                            )
                        } <
                        button onClick = {
                            () => {
                                logout()
                                setIsUserMenuOpen(false)
                            }
                        }
                        className = "w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2" >
                        <
                        LogOut className = "w-4 h-4" / >
                        <
                        span > Logout < /span> <
                        /button> <
                        /div>
                    )
                } <
                /div>
            ) : ( <
                div className = "hidden sm:flex items-center space-x-4" >
                <
                Link href = "/login"
                className = "text-gray-700 hover:text-primary-600 font-medium" >
                Login <
                /Link> <
                Link href = "/register"
                className = "btn-primary text-sm" >
                Sign Up <
                /Link> <
                /div>
            )
        }

        { /* Mobile menu button */ } <
        button className = "lg:hidden"
        onClick = {
            () => setIsMenuOpen(!isMenuOpen) } >
        { isMenuOpen ? < X className = "w-6 h-6" / > : < Menu className = "w-6 h-6" / > } <
        /button> <
        /div> <
        /div>

        { /* Mobile Navigation */ } {
            isMenuOpen && ( <
                div className = "lg:hidden py-4 border-t" >
                <
                nav className = "flex flex-col space-y-4" > {
                    navigation.map((item) => ( <
                        Link key = { item.name }
                        href = { item.href }
                        className = "text-gray-700 hover:text-primary-600 font-medium"
                        onClick = {
                            () => setIsMenuOpen(false) } >
                        { item.name } <
                        /Link>
                    ))
                } {
                    !user && ( <
                        div className = "flex flex-col space-y-2 pt-4 border-t" >
                        <
                        Link href = "/login"
                        className = "text-gray-700 hover:text-primary-600 font-medium"
                        onClick = {
                            () => setIsMenuOpen(false) } >
                        Login <
                        /Link> <
                        Link href = "/register"
                        className = "btn-primary text-sm inline-block text-center"
                        onClick = {
                            () => setIsMenuOpen(false) } >
                        Sign Up <
                        /Link> <
                        /div>
                    )
                } {
                    user && ( <
                        div className = "flex flex-col space-y-2 pt-4 border-t" >
                        <
                        Link href = "/dashboard"
                        className = "text-gray-700 hover:text-primary-600 font-medium"
                        onClick = {
                            () => setIsMenuOpen(false) } >
                        Dashboard <
                        /Link> <
                        Link href = "/profile"
                        className = "text-gray-700 hover:text-primary-600 font-medium"
                        onClick = {
                            () => setIsMenuOpen(false) } >
                        Profile <
                        /Link> {
                            user.role === 'admin' && ( <
                                Link href = "/admin"
                                className = "text-red-700 hover:text-red-800 font-medium"
                                onClick = {
                                    () => setIsMenuOpen(false) } >
                                Admin Panel <
                                /Link>
                            )
                        } <
                        button onClick = {
                            () => {
                                logout()
                                setIsMenuOpen(false)
                            }
                        }
                        className = "text-left text-gray-700 hover:text-primary-600 font-medium" >
                        Logout <
                        /button> <
                        /div>
                    )
                } <
                /nav> <
                /div>
            )
        } <
        /div> <
        /header>
    )
}