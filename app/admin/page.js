'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import {
    Users,
    FileText,
    MessageCircle,
    ShoppingBag,
    BarChart3,
    Settings,
    TrendingUp,
    AlertTriangle,
    Eye,
    Edit,
    Trash2,
    Plus,
    Search
} from 'lucide-react'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview')
    const [stats, setStats] = useState({})
    const [users, setUsers] = useState([])
    const [projects, setProjects] = useState([])
    const [orders, setOrders] = useState([])
    const [donations, setDonations] = useState([])
    const [forumPosts, setForumPosts] = useState([])
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
            return
        }
        if (user.role !== 'admin') {
            router.push('/')
            return
        }

        // Load all data
        loadData()
    }, [user, router])

    const loadData = () => {
        const usersData = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
        const projectsData = JSON.parse(localStorage.getItem('tac-hub-projects') || '[]')
        const ordersData = JSON.parse(localStorage.getItem('tac-hub-orders') || '[]')
        const donationsData = JSON.parse(localStorage.getItem('tac-hub-donations') || '[]')
        const forumData = JSON.parse(localStorage.getItem('tac-hub-forum-posts') || '[]')

        setUsers(usersData)
        setProjects(projectsData)
        setOrders(ordersData)
        setDonations(donationsData)
        setForumPosts(forumData)

        // Calculate stats
        const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0) +
            donationsData.reduce((sum, donation) => sum + donation.amount, 0)

        setStats({
            totalUsers: usersData.length,
            totalProjects: projectsData.length,
            totalOrders: ordersData.length,
            totalDonations: donationsData.length,
            totalRevenue: totalRevenue,
            totalForumPosts: forumData.length
        })
    }

    const deleteUser = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter(u => u.id !== userId)
            setUsers(updatedUsers)
            localStorage.setItem('tac-hub-users', JSON.stringify(updatedUsers))
            loadData()
        }
    }

    const updateProjectStatus = (projectId, status) => {
        const updatedProjects = projects.map(p =>
            p.id === projectId ? {...p, status } : p
        )
        setProjects(updatedProjects)
        localStorage.setItem('tac-hub-projects', JSON.stringify(updatedProjects))
        loadData()
    }

    const deleteForumPost = (postId) => {
        if (confirm('Are you sure you want to delete this post?')) {
            const updatedPosts = forumPosts.filter(p => p.id !== postId)
            setForumPosts(updatedPosts)
            localStorage.setItem('tac-hub-forum-posts', JSON.stringify(updatedPosts))
            loadData()
        }
    }

    if (!user || user.role !== 'admin') {
        return <div > Loading... < /div>
    }

    const tabs = [
        { id: 'overview', name: 'Overview', icon: BarChart3 },
        { id: 'users', name: 'Users', icon: Users },
        { id: 'projects', name: 'Projects', icon: FileText },
        { id: 'orders', name: 'Orders', icon: ShoppingBag },
        { id: 'donations', name: 'Donations', icon: TrendingUp },
        { id: 'forum', name: 'Forum', icon: MessageCircle },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
        { id: 'settings', name: 'Settings', icon: Settings }
    ]

    return ( <
        div className = "min-h-screen bg-gray-50" > { /* Admin Header */ } <
        header className = "bg-white shadow-sm border-b" >
        <
        div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <
        div className = "flex justify-between items-center py-4" >
        <
        div className = "flex items-center space-x-4" >
        <
        div className = "w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center" >
        <
        Settings className = "w-6 h-6 text-white" / >
        <
        /div> <
        div >
        <
        h1 className = "text-2xl font-bold text-gray-900" > Admin Dashboard < /h1> <
        p className = "text-gray-600" > Welcome back, { user.name } < /p> <
        /div> <
        /div> <
        div className = "flex items-center space-x-4" >
        <
        a href = "/"
        className = "text-gray-600 hover:text-gray-900" >
        View Website <
        /a> <
        button onClick = {
            () => {
                localStorage.removeItem('tac-hub-user')
                router.push('/login')
            }
        }
        className = "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" >
        Logout <
        /button> <
        /div> <
        /div> <
        /div> <
        /header>

        <
        div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
        <
        div className = "flex" > { /* Sidebar */ } <
        div className = "w-64 bg-white rounded-lg shadow-sm p-6 mr-8" >
        <
        nav className = "space-y-2" > {
            tabs.map((tab) => ( <
                button key = { tab.id }
                onClick = {
                    () => setActiveTab(tab.id) }
                className = { `w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }` } >
                <
                tab.icon className = "w-5 h-5" / >
                <
                span > { tab.name } < /span> <
                /button>
            ))
        } <
        /nav> <
        /div>

        { /* Main Content */ } <
        div className = "flex-1" > {
            activeTab === 'overview' && ( <
                div className = "space-y-6" >
                <
                h2 className = "text-2xl font-bold text-gray-900" > Overview < /h2>

                { /* Stats Grid */ } <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                <
                div className = "bg-white p-6 rounded-lg shadow-sm" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Total Users < /p> <
                p className = "text-3xl font-bold text-gray-900" > { stats.totalUsers } < /p> <
                /div> <
                Users className = "w-8 h-8 text-blue-600" / >
                <
                /div> <
                /div>

                <
                div className = "bg-white p-6 rounded-lg shadow-sm" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Total Projects < /p> <
                p className = "text-3xl font-bold text-gray-900" > { stats.totalProjects } < /p> <
                /div> <
                FileText className = "w-8 h-8 text-green-600" / >
                <
                /div> <
                /div>

                <
                div className = "bg-white p-6 rounded-lg shadow-sm" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Total Revenue < /p> <
                p className = "text-3xl font-bold text-gray-900" > { stats.totalRevenue }
                CFA < /p> <
                /div> <
                TrendingUp className = "w-8 h-8 text-purple-600" / >
                <
                /div> <
                /div>

                <
                div className = "bg-white p-6 rounded-lg shadow-sm" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Orders < /p> <
                p className = "text-3xl font-bold text-gray-900" > { stats.totalOrders } < /p> <
                /div> <
                ShoppingBag className = "w-8 h-8 text-orange-600" / >
                <
                /div> <
                /div>

                <
                div className = "bg-white p-6 rounded-lg shadow-sm" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Donations < /p> <
                p className = "text-3xl font-bold text-gray-900" > { stats.totalDonations } < /p> <
                /div> <
                TrendingUp className = "w-8 h-8 text-red-600" / >
                <
                /div> <
                /div>

                <
                div className = "bg-white p-6 rounded-lg shadow-sm" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Forum Posts < /p> <
                p className = "text-3xl font-bold text-gray-900" > { stats.totalForumPosts } < /p> <
                /div> <
                MessageCircle className = "w-8 h-8 text-indigo-600" / >
                <
                /div> <
                /div> <
                /div>

                { /* Recent Activity */ } <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                h3 className = "text-lg font-semibold text-gray-900 mb-4" > Recent Activity < /h3> <
                div className = "space-y-3" > {
                    projects.slice(0, 5).map((project) => ( <
                        div key = { project.id }
                        className = "flex items-center justify-between py-2 border-b" >
                        <
                        div >
                        <
                        p className = "font-medium" > { project.title } < /p> <
                        p className = "text-sm text-gray-600" > by { project.submittedBy } < /p> <
                        /div> <
                        span className = { `px-2 py-1 text-xs rounded-full ${
                          project.status === 'approved' ? 'bg-green-100 text-green-800' :
                          project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }` } > { project.status } <
                        /span> <
                        /div>
                    ))
                } <
                /div> <
                /div> <
                /div>
            )
        }

        {
            activeTab === 'users' && ( <
                div className = "space-y-6" >
                <
                div className = "flex justify-between items-center" >
                <
                h2 className = "text-2xl font-bold text-gray-900" > Users Management < /h2> <
                div className = "flex space-x-4" >
                <
                div className = "relative" >
                <
                Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" / >
                <
                input type = "text"
                placeholder = "Search users..."
                className = "pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /div> <
                /div> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm overflow-hidden" >
                <
                table className = "min-w-full divide-y divide-gray-200" >
                <
                thead className = "bg-gray-50" >
                <
                tr >
                <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                User <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Role <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Joined <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Actions <
                /th> <
                /tr> <
                /thead> <
                tbody className = "bg-white divide-y divide-gray-200" > {
                    users.map((user) => ( <
                        tr key = { user.id } >
                        <
                        td className = "px-6 py-4 whitespace-nowrap" >
                        <
                        div className = "flex items-center" >
                        <
                        div className = "w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center" >
                        <
                        Users className = "w-5 h-5 text-gray-600" / >
                        <
                        /div> <
                        div className = "ml-4" >
                        <
                        div className = "text-sm font-medium text-gray-900" > { user.name } < /div> <
                        div className = "text-sm text-gray-500" > { user.email } < /div> <
                        /div> <
                        /div> <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap" >
                        <
                        span className = { `px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }` } > { user.role } <
                        /span> <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { new Date(user.joinedAt).toLocaleDateString() } <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap text-sm font-medium" >
                        <
                        div className = "flex space-x-2" >
                        <
                        button className = "text-blue-600 hover:text-blue-900" >
                        <
                        Eye className = "w-4 h-4" / >
                        <
                        /button> <
                        button className = "text-green-600 hover:text-green-900" >
                        <
                        Edit className = "w-4 h-4" / >
                        <
                        /button> {
                            user.role !== 'admin' && ( <
                                button onClick = {
                                    () => deleteUser(user.id) }
                                className = "text-red-600 hover:text-red-900" >
                                <
                                Trash2 className = "w-4 h-4" / >
                                <
                                /button>
                            )
                        } <
                        /div> <
                        /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table> <
                /div> <
                /div>
            )
        }

        {
            activeTab === 'projects' && ( <
                div className = "space-y-6" >
                <
                div className = "flex justify-between items-center" >
                <
                h2 className = "text-2xl font-bold text-gray-900" > Projects Management < /h2> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm overflow-hidden" >
                <
                table className = "min-w-full divide-y divide-gray-200" >
                <
                thead className = "bg-gray-50" >
                <
                tr >
                <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Project <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Submitted By <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Status <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Actions <
                /th> <
                /tr> <
                /thead> <
                tbody className = "bg-white divide-y divide-gray-200" > {
                    projects.map((project) => ( <
                        tr key = { project.id } >
                        <
                        td className = "px-6 py-4" >
                        <
                        div >
                        <
                        div className = "text-sm font-medium text-gray-900" > { project.title } < /div> <
                        div className = "text-sm text-gray-500" > { project.category } < /div> <
                        /div> <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { project.submittedBy } <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap" >
                        <
                        select value = { project.status }
                        onChange = {
                            (e) => updateProjectStatus(project.id, e.target.value) }
                        className = "text-sm border border-gray-300 rounded px-2 py-1" >
                        <
                        option value = "pending" > Pending < /option> <
                        option value = "approved" > Approved < /option> <
                        option value = "rejected" > Rejected < /option> <
                        /select> <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap text-sm font-medium" >
                        <
                        div className = "flex space-x-2" >
                        <
                        button className = "text-blue-600 hover:text-blue-900" >
                        <
                        Eye className = "w-4 h-4" / >
                        <
                        /button> <
                        button className = "text-green-600 hover:text-green-900" >
                        <
                        Edit className = "w-4 h-4" / >
                        <
                        /button> <
                        /div> <
                        /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table> <
                /div> <
                /div>
            )
        }

        {
            activeTab === 'analytics' && ( <
                div className = "space-y-6" >
                <
                div className = "flex justify-between items-center" >
                <
                h2 className = "text-2xl font-bold text-gray-900" > Analytics Management < /h2> <
                div className = "flex space-x-4" >
                <
                a href = "/analytics"
                target = "_blank"
                className = "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2" >
                <
                Eye className = "w-4 h-4" / >
                <
                span > View Dashboard < /span> <
                /a> <
                a href = "/admin/analytics-editor"
                className = "bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2" >
                <
                Edit className = "w-4 h-4" / >
                <
                span > Edit Data < /span> <
                /a> <
                /div> <
                /div>

                { /* Analytics Overview */ } <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Climate Indicators < /p> <
                p className = "text-2xl font-bold text-gray-900" > 4 < /p> <
                /div> <
                TrendingUp className = "w-8 h-8 text-blue-600" / >
                <
                /div> <
                p className = "text-sm text-gray-500 mt-2" > Temperature, Rainfall, Humidity, CO2 < /p> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Deforestation Data < /p> <
                p className = "text-2xl font-bold text-gray-900" > 7 < /p> <
                /div> <
                BarChart3 className = "w-8 h-8 text-red-600" / >
                <
                /div> <
                p className = "text-sm text-gray-500 mt-2" > Years of data(2018 - 2024) < /p> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Countries Tracked < /p> <
                p className = "text-2xl font-bold text-gray-900" > 6 < /p> <
                /div> <
                Users className = "w-8 h-8 text-green-600" / >
                <
                /div> <
                p className = "text-sm text-gray-500 mt-2" > Congo Basin countries < /p> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                div className = "flex items-center justify-between" >
                <
                div >
                <
                p className = "text-gray-600" > Active Alerts < /p> <
                p className = "text-2xl font-bold text-gray-900" > 3 < /p> <
                /div> <
                AlertTriangle className = "w-8 h-8 text-yellow-600" / >
                <
                /div> <
                p className = "text-sm text-gray-500 mt-2" > Real - time monitoring alerts < /p> <
                /div> <
                /div>

                { /* Data Management Cards */ } <
                div className = "grid grid-cols-1 md:grid-cols-2 gap-6" >
                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                h3 className = "text-lg font-semibold text-gray-900 mb-4" > Climate Data Control < /h3> <
                p className = "text-gray-600 mb-4" >
                Modify temperature, rainfall, humidity, and CO2 levels that appear on the public dashboard. <
                /p> <
                div className = "space-y-2 text-sm" >
                <
                div className = "flex justify-between" >
                <
                span > Temperature: < /span> <
                span className = "font-medium" > 25.4° C(+1.2° C) < /span> <
                /div> <
                div className = "flex justify-between" >
                <
                span > Rainfall: < /span> <
                span className = "font-medium" > 1680 mm(-8 % ) < /span> <
                /div> <
                div className = "flex justify-between" >
                <
                span > CO2 Levels: < /span> <
                span className = "font-medium" > 415 ppm(+12 ppm) < /span> <
                /div> <
                /div> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                h3 className = "text-lg font-semibold text-gray-900 mb-4" > Deforestation Tracking < /h3> <
                p className = "text-gray-600 mb-4" >
                Add, edit, or remove yearly deforestation data points
                for the Congo Basin region. <
                /p> <
                div className = "space-y-2 text-sm" >
                <
                div className = "flex justify-between" >
                <
                span > Latest Year: < /span> <
                span className = "font-medium" > 2024 < /span> <
                /div> <
                div className = "flex justify-between" >
                <
                span > Hectares Lost: < /span> <
                span className = "font-medium" > 1, 100, 000 < /span> <
                /div> <
                div className = "flex justify-between" >
                <
                span > Rate: < /span> <
                span className = "font-medium text-green-600" > 0.75 % (↓) < /span> <
                /div> <
                /div> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                h3 className = "text-lg font-semibold text-gray-900 mb-4" > Forest Health Indicators < /h3> <
                p className = "text-gray-600 mb-4" >
                Update monthly forest health, biodiversity, and carbon stock percentages. <
                /p> <
                div className = "space-y-2 text-sm" >
                <
                div className = "flex justify-between" >
                <
                span > Overall Health: < /span> <
                span className = "font-medium" > 85 % < /span> <
                /div> <
                div className = "flex justify-between" >
                <
                span > Biodiversity: < /span> <
                span className = "font-medium" > 89 % < /span> <
                /div> <
                div className = "flex justify-between" >
                <
                span > Carbon Stock: < /span> <
                span className = "font-medium" > 83 % < /span> <
                /div> <
                /div> <
                /div>

                <
                div className = "bg-white rounded-lg shadow-sm p-6" >
                <
                h3 className = "text-lg font-semibold text-gray-900 mb-4" > Real - time Alerts < /h3> <
                p className = "text-gray-600 mb-4" >
                Manage environmental alerts that appear on the dashboard to inform users of critical situations. <
                /p> <
                div className = "space-y-2 text-sm" >
                <
                div className = "flex items-center space-x-2" >
                <
                div className = "w-2 h-2 bg-red-500 rounded-full" > < /div> <
                span > 1 Critical Alert < /span> <
                /div> <
                div className = "flex items-center space-x-2" >
                <
                div className = "w-2 h-2 bg-yellow-500 rounded-full" > < /div> <
                span > 1 Warning Alert < /span> <
                /div> <
                div className = "flex items-center space-x-2" >
                <
                div className = "w-2 h-2 bg-blue-500 rounded-full" > < /div> <
                span > 1 Info Alert < /span> <
                /div> <
                /div> <
                /div> <
                /div>

                { /* Last Update Info */ } <
                div className = "bg-blue-50 border border-blue-200 rounded-lg p-6" >
                <
                h3 className = "text-lg font-semibold text-blue-900 mb-2" > Data Update Information < /h3> <
                p className = "text-blue-800 mb-4" >
                All changes made in the analytics editor are immediately reflected on the public dashboard.Users can see when data was last updated and by whom. <
                /p> <
                div className = "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" >
                <
                div className = "bg-white rounded p-3" >
                <
                div className = "font-medium text-gray-900" > Real - time Updates < /div> <
                div className = "text-gray-600" > Changes appear instantly < /div> <
                /div> <
                div className = "bg-white rounded p-3" >
                <
                div className = "font-medium text-gray-900" > Version Control < /div> <
                div className = "text-gray-600" > Track who made changes < /div> <
                /div> <
                div className = "bg-white rounded p-3" >
                <
                div className = "font-medium text-gray-900" > Data Validation < /div> <
                div className = "text-gray-600" > Automatic data validation < /div> <
                /div> <
                /div> <
                /div> <
                /div>
            )
        }

        {
            activeTab === 'forum' && ( <
                div className = "space-y-6" >
                <
                h2 className = "text-2xl font-bold text-gray-900" > Forum Management < /h2>

                <
                div className = "bg-white rounded-lg shadow-sm overflow-hidden" >
                <
                table className = "min-w-full divide-y divide-gray-200" >
                <
                thead className = "bg-gray-50" >
                <
                tr >
                <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Post <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Author <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Replies <
                /th> <
                th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                Actions <
                /th> <
                /tr> <
                /thead> <
                tbody className = "bg-white divide-y divide-gray-200" > {
                    forumPosts.map((post) => ( <
                        tr key = { post.id } >
                        <
                        td className = "px-6 py-4" >
                        <
                        div >
                        <
                        div className = "text-sm font-medium text-gray-900" > { post.title } < /div> <
                        div className = "text-sm text-gray-500" > { post.category } < /div> <
                        /div> <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { post.author } <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { post.replies ? .length || 0 } <
                        /td> <
                        td className = "px-6 py-4 whitespace-nowrap text-sm font-medium" >
                        <
                        div className = "flex space-x-2" >
                        <
                        button className = "text-blue-600 hover:text-blue-900" >
                        <
                        Eye className = "w-4 h-4" / >
                        <
                        /button> <
                        button onClick = {
                            () => deleteForumPost(post.id) }
                        className = "text-red-600 hover:text-red-900" >
                        <
                        Trash2 className = "w-4 h-4" / >
                        <
                        /button> <
                        /div> <
                        /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table> <
                /div> <
                /div>
            )
        } <
        /div> <
        /div> <
        /div> <
        /div>
    )
}