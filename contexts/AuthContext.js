'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Initialize admin user if not exists
        const users = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
        if (!users.find(u => u.email === 'admin@tac-hub.org')) {
            const adminUser = {
                id: 'admin-001',
                name: 'TAC-HUB Administrator',
                email: 'admin@tac-hub.org',
                password: 'admin123',
                role: 'admin',
                joinedAt: new Date().toISOString(),
                avatar: null,
                phone: '+237 6XX XXX XXX',
                organization: 'The African Climate Hub'
            }
            users.push(adminUser)
            localStorage.setItem('tac-hub-users', JSON.stringify(users))
        }

        // Check if user is logged in from localStorage
        const savedUser = localStorage.getItem('tac-hub-user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = async(email, password) => {
        try {
            // Simulate API call
            const users = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
            const user = users.find(u => u.email === email && u.password === password)

            if (!user) {
                throw new Error('Invalid credentials')
            }

            const userSession = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || 'user',
                avatar: user.avatar || null,
                joinedAt: user.joinedAt
            }

            setUser(userSession)
            localStorage.setItem('tac-hub-user', JSON.stringify(userSession))
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const register = async(userData) => {
        try {
            const users = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')

            // Check if user already exists
            if (users.find(u => u.email === userData.email)) {
                throw new Error('User already exists')
            }

            const newUser = {
                id: Date.now().toString(),
                ...userData,
                role: 'user',
                joinedAt: new Date().toISOString(),
                avatar: null
            }

            users.push(newUser)
            localStorage.setItem('tac-hub-users', JSON.stringify(users))

            const userSession = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                avatar: newUser.avatar,
                joinedAt: newUser.joinedAt
            }

            setUser(userSession)
            localStorage.setItem('tac-hub-user', JSON.stringify(userSession))
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('tac-hub-user')
    }

    const value = {
        user,
        login,
        register,
        logout,
        loading
    }

    return ( <
        AuthContext.Provider value = { value } > { children } <
        /AuthContext.Provider>
    )
}