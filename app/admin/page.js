'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdminAnalytics from '../../components/AdminAnalytics'
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
    Search,
    Globe,
    Brain,
    BookOpen,
    Shield,
    Database,
    Activity,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Award,
    DollarSign,
    Package,
    Star,
    Upload,
    Download,
    Filter,
    RefreshCw,
    CheckCircle,
    Clock,
    XCircle,
    Layout,
    Type,
    Image,
    Square,
    Columns,
    Edit3,
    Monitor
} from 'lucide-react'

export default function AdminPage() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('overview')
    const [stats, setStats] = useState({})
    const [users, setUsers] = useState([])
    const [projects, setProjects] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [forumPosts, setForumPosts] = useState([])
    const [gameStats, setGameStats] = useState([])
    const [speciesData, setSpeciesData] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [mediaFiles, setMediaFiles] = useState([])
    const [systemSettings, setSystemSettings] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [editingItem, setEditingItem] = useState(null)

    const tabs = [
        { id: 'overview', name: 'Overview', icon: BarChart3 },
        { id: 'users', name: 'Users', icon: Users },
        { id: 'projects', name: 'Projects', icon: FileText },
        { id: 'orders', name: 'Orders', icon: ShoppingBag },
        { id: 'analytics', name: 'Analytics', icon: TrendingUp },
        { id: 'content', name: 'Content', icon: BookOpen },
        { id: 'forum', name: 'Forum', icon: MessageCircle },
        { id: 'games', name: 'Games', icon: Brain },
        { id: 'species', name: 'Species DB', icon: Globe },
        { id: 'weather', name: 'Weather Data', icon: Calendar },
        { id: 'media', name: 'Media Library', icon: Package },
        { id: 'page-builder', name: 'Page Builder', icon: Layout },
        { id: 'reports', name: 'Reports', icon: Activity },
        { id: 'settings', name: 'Settings', icon: Settings }
    ]

    useEffect(() => {
        if (user ? .role !== 'admin') {
            window.location.href = '/login'
            return
        }
        initializeSampleData()
        loadAdminData()
    }, [user])

    // Initialize sample data if none exists
    const initializeSampleData = () => {
        // Sample forum posts
        const existingForumPosts = JSON.parse(localStorage.getItem('tac-hub-global-forum-posts') || '[]')
        if (existingForumPosts.length === 0) {
            const sampleForumPosts = [{
                    id: 1,
                    title: "Traditional Weather Patterns in Congo Basin",
                    content: "Discussing the traditional methods our ancestors used to predict weather changes...",
                    author: "Marie Ngozi",
                    authorRole: "Community Elder",
                    category: "research",
                    likes: 15,
                    replies: [
                        { id: 1, author: "Jean Baptiste", content: "Very insightful post!" },
                        { id: 2, author: "Sarah Kone", content: "My grandmother taught me similar methods." }
                    ],
                    moderated: true,
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    title: "Forest Conservation Techniques",
                    content: "Sharing traditional forest management practices from our community...",
                    author: "Paul Mbeki",
                    authorRole: "Forest Guardian",
                    category: "conservation",
                    likes: 23,
                    replies: [
                        { id: 1, author: "Anna Diallo", content: "These techniques are still very relevant today." }
                    ],
                    moderated: false,
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 3,
                    title: "Climate Change Impact on Local Species",
                    content: "Observing changes in animal behavior and plant growth patterns...",
                    author: "Dr. Fatima Sow",
                    authorRole: "Researcher",
                    category: "research",
                    likes: 31,
                    replies: [],
                    moderated: true,
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                }
            ]
            localStorage.setItem('tac-hub-global-forum-posts', JSON.stringify(sampleForumPosts))
        }

        // Sample species data
        const existingSpecies = JSON.parse(localStorage.getItem('tac-hub-species-database') || '[]')
        if (existingSpecies.length === 0) {
            const sampleSpecies = [{
                    id: 1,
                    name: "African Forest Elephant",
                    localName: "Nzoku",
                    scientificName: "Loxodonta cyclotis",
                    category: "Mammal",
                    status: "endangered",
                    verified: true,
                    description: "Large herbivorous mammal native to Congo Basin forests",
                    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: "Admin"
                },
                {
                    id: 2,
                    name: "Western Lowland Gorilla",
                    localName: "Ngila",
                    scientificName: "Gorilla gorilla gorilla",
                    category: "Mammal",
                    status: "vulnerable",
                    verified: true,
                    description: "Critically endangered great ape species",
                    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: "Admin"
                },
                {
                    id: 3,
                    name: "African Grey Parrot",
                    localName: "Koko",
                    scientificName: "Psittacus erithacus",
                    category: "Bird",
                    status: "vulnerable",
                    verified: true,
                    description: "Highly intelligent parrot species native to Central Africa",
                    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: "Admin"
                }
            ]
            localStorage.setItem('tac-hub-species-database', JSON.stringify(sampleSpecies))
        }

        // Sample game statistics
        const existingGameStats = JSON.parse(localStorage.getItem('tac-hub-game-stats') || '[]')
        if (existingGameStats.length === 0) {
            const sampleGameStats = [{
                    id: 1,
                    userId: 1,
                    userName: "Marie Ngozi",
                    credits: 150,
                    gamesPlayed: 12,
                    lastPlayed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    userId: 2,
                    userName: "Paul Mbeki",
                    credits: 230,
                    gamesPlayed: 18,
                    lastPlayed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 3,
                    userId: 3,
                    userName: "Dr. Fatima Sow",
                    credits: 95,
                    gamesPlayed: 7,
                    lastPlayed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                }
            ]
            localStorage.setItem('tac-hub-game-stats', JSON.stringify(sampleGameStats))
        }

        // Sample weather data
        const existingWeatherData = JSON.parse(localStorage.getItem('tac-hub-weather-data') || '[]')
        if (existingWeatherData.length === 0) {
            const sampleWeatherData = [{
                    id: 1,
                    title: "Dry Season Indicators",
                    description: "Traditional signs that indicate the beginning of dry season",
                    wisdom: "When the Iroko tree leaves turn yellow and fall, dry season approaches",
                    region: "Central Congo Basin",
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: "Elder Council"
                },
                {
                    id: 2,
                    title: "Rain Prediction Methods",
                    description: "How our ancestors predicted rainfall patterns",
                    wisdom: "When ants build higher mounds, heavy rains are coming within 3 days",
                    region: "Eastern Congo Basin",
                    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: "Traditional Healers"
                }
            ]
            localStorage.setItem('tac-hub-weather-data', JSON.stringify(sampleWeatherData))
        }

        // Sample media files
        const existingMediaFiles = JSON.parse(localStorage.getItem('tac-hub-media-library') || '[]')
        if (existingMediaFiles.length === 0) {
            const sampleMediaFiles = [{
                    id: 1,
                    name: "forest-elephant.jpg",
                    type: "image",
                    size: 245760,
                    url: "/images/forest-elephant.jpg",
                    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                    uploadedBy: "Admin"
                },
                {
                    id: 2,
                    name: "traditional-calendar.pdf",
                    type: "document",
                    size: 1048576,
                    url: "/documents/traditional-calendar.pdf",
                    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    uploadedBy: "Admin"
                }
            ]
            localStorage.setItem('tac-hub-media-library', JSON.stringify(sampleMediaFiles))
        }
    }

    const loadAdminData = () => {
        setLoading(true)

        // Load users
        const usersData = JSON.parse(localStorage.getItem('tac-hub-users') || '[]')
        setUsers(usersData)

        // Load projects
        const projectsData = JSON.parse(localStorage.getItem('tac-hub-projects') || '[]')
        setProjects(projectsData)

        // Load orders
        const ordersData = JSON.parse(localStorage.getItem('tac-hub-orders') || '[]')
        setOrders(ordersData)

        // Load forum posts
        const forumData = JSON.parse(localStorage.getItem('tac-hub-global-forum-posts') || '[]')
        setForumPosts(forumData)

        // Load game statistics
        const gameData = JSON.parse(localStorage.getItem('tac-hub-game-stats') || '[]')
        setGameStats(gameData)

        // Load species database
        const speciesInfo = JSON.parse(localStorage.getItem('tac-hub-species-database') || '[]')
        setSpeciesData(speciesInfo)

        // Load weather data
        const weatherInfo = JSON.parse(localStorage.getItem('tac-hub-weather-data') || '[]')
        setWeatherData(weatherInfo)

        // Load media files
        const mediaInfo = JSON.parse(localStorage.getItem('tac-hub-media-library') || '[]')
        setMediaFiles(mediaInfo)

        // Load system settings
        const settingsData = JSON.parse(localStorage.getItem('tac-hub-system-settings') || '{}')
        setSystemSettings(settingsData)

        // Calculate comprehensive stats
        const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0)
        const activeProjects = projectsData.filter(p => p.status === 'active').length
        const pendingProjects = projectsData.filter(p => p.status === 'pending').length

        setStats({
            totalUsers: usersData.length,
            activeUsers: usersData.filter(u => u.lastLogin &&
                new Date(u.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
            totalProjects: projectsData.length,
            activeProjects,
            pendingProjects,
            totalOrders: ordersData.length,
            totalRevenue,
            avgOrderValue: ordersData.length > 0 ? totalRevenue / ordersData.length : 0,
            totalForumPosts: forumData.length,
            totalGamePlayers: gameData.length,
            totalSpecies: speciesInfo.length,
            totalMediaFiles: mediaInfo.length,
            totalWeatherRecords: weatherInfo.length
        })

        setLoading(false)
    }

    const deleteUser = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter(u => u.id !== userId)
            setUsers(updatedUsers)
            localStorage.setItem('tac-hub-users', JSON.stringify(updatedUsers))
            loadAdminData()
        }
    }

    const updateUserRole = (userId, newRole) => {
        const updatedUsers = users.map(u =>
            u.id === userId ? {...u, role: newRole } : u
        )
        setUsers(updatedUsers)
        localStorage.setItem('tac-hub-users', JSON.stringify(updatedUsers))
    }

    const updateProjectStatus = (projectId, newStatus) => {
        const updatedProjects = projects.map(p =>
            p.id === projectId ? {...p, status: newStatus } : p
        )
        setProjects(updatedProjects)
        localStorage.setItem('tac-hub-projects', JSON.stringify(updatedProjects))
        loadAdminData()
    }

    const deleteProject = (projectId) => {
        if (confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter(p => p.id !== projectId)
            setProjects(updatedProjects)
            localStorage.setItem('tac-hub-projects', JSON.stringify(updatedProjects))
            loadAdminData()
        }
    }

    // Forum Management Functions
    const deleteForumPost = (postId) => {
        if (confirm('Are you sure you want to delete this forum post?')) {
            const updatedPosts = forumPosts.filter(p => p.id !== postId)
            setForumPosts(updatedPosts)
            localStorage.setItem('tac-hub-global-forum-posts', JSON.stringify(updatedPosts))
            loadAdminData()
        }
    }

    const moderateForumPost = (postId, action) => {
        const updatedPosts = forumPosts.map(p =>
            p.id === postId ? {...p, moderated: true, moderationAction: action } : p
        )
        setForumPosts(updatedPosts)
        localStorage.setItem('tac-hub-global-forum-posts', JSON.stringify(updatedPosts))
        loadAdminData()
    }

    // Species Database Management
    const addSpecies = (speciesData) => {
        const newSpecies = {
            id: Date.now(),
            ...speciesData,
            createdAt: new Date().toISOString(),
            createdBy: user.name
        }
        const updatedSpecies = [...speciesData, newSpecies]
        setSpeciesData(updatedSpecies)
        localStorage.setItem('tac-hub-species-database', JSON.stringify(updatedSpecies))
        loadAdminData()
    }

    const updateSpecies = (speciesId, updatedData) => {
        const updatedSpecies = speciesData.map(s =>
            s.id === speciesId ? {...s, ...updatedData, updatedAt: new Date().toISOString() } : s
        )
        setSpeciesData(updatedSpecies)
        localStorage.setItem('tac-hub-species-database', JSON.stringify(updatedSpecies))
        loadAdminData()
    }

    const deleteSpecies = (speciesId) => {
        if (confirm('Are you sure you want to delete this species entry?')) {
            const updatedSpecies = speciesData.filter(s => s.id !== speciesId)
            setSpeciesData(updatedSpecies)
            localStorage.setItem('tac-hub-species-database', JSON.stringify(updatedSpecies))
            loadAdminData()
        }
    }

    // Weather Data Management
    const addWeatherData = (weatherInfo) => {
        const newWeather = {
            id: Date.now(),
            ...weatherInfo,
            createdAt: new Date().toISOString(),
            createdBy: user.name
        }
        const updatedWeather = [...weatherData, newWeather]
        setWeatherData(updatedWeather)
        localStorage.setItem('tac-hub-weather-data', JSON.stringify(updatedWeather))
        loadAdminData()
    }

    const deleteWeatherData = (weatherId) => {
        if (confirm('Are you sure you want to delete this weather record?')) {
            const updatedWeather = weatherData.filter(w => w.id !== weatherId)
            setWeatherData(updatedWeather)
            localStorage.setItem('tac-hub-weather-data', JSON.stringify(updatedWeather))
            loadAdminData()
        }
    }

    // Media Library Management
    const uploadMedia = (mediaFile) => {
        const newMedia = {
            id: Date.now(),
            ...mediaFile,
            uploadedAt: new Date().toISOString(),
            uploadedBy: user.name
        }
        const updatedMedia = [...mediaFiles, newMedia]
        setMediaFiles(updatedMedia)
        localStorage.setItem('tac-hub-media-library', JSON.stringify(updatedMedia))
        loadAdminData()
    }

    const deleteMedia = (mediaId) => {
        if (confirm('Are you sure you want to delete this media file?')) {
            const updatedMedia = mediaFiles.filter(m => m.id !== mediaId)
            setMediaFiles(updatedMedia)
            localStorage.setItem('tac-hub-media-library', JSON.stringify(updatedMedia))
            loadAdminData()
        }
    }

    // System Settings Management
    const updateSystemSettings = (newSettings) => {
        const updatedSettings = {...systemSettings, ...newSettings }
        setSystemSettings(updatedSettings)
        localStorage.setItem('tac-hub-system-settings', JSON.stringify(updatedSettings))
    }

    // Modal Management
    const openModal = (type, item = null) => {
        setModalType(type)
        setEditingItem(item)
        setShowModal(true)
        console.log(`Opening modal: ${type}`, item)
    }

    const closeModal = () => {
        setShowModal(false)
        setModalType('')
        setEditingItem(null)
    }



    if (!user || user.role !== 'admin') {
        return ( <
            div className = "min-h-screen bg-gray-50" >
            <
            Header / >
            <
            div className = "container-max py-12" >
            <
            div className = "text-center" >
            <
            Shield className = "w-16 h-16 text-red-500 mx-auto mb-4" / >
            <
            h1 className = "text-2xl font-bold text-gray-900 mb-4" > Access Denied < /h1> <
            p className = "text-gray-600 mb-6" > You need administrator privileges to access this page. < /p> <
            a href = "/login"
            className = "btn-primary" > Login as Admin < /a> < /
            div > <
            /div> <
            Footer / >
            <
            /div>
        )
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return ( <
                    div className = "space-y-6" >
                    <
                    h2 className = "text-xl sm:text-2xl font-bold text-gray-900" > Admin Dashboard Overview < /h2>

                    <
                    div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" >
                    <
                    div className = "bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    div className = "p-2 bg-blue-100 rounded-lg" >
                    <
                    Users className = "w-5 h-5 sm:w-6 sm:h-6 text-blue-600" / >
                    <
                    /div> <
                    div className = "ml-3 sm:ml-4 min-w-0 flex-1" >
                    <
                    p className = "text-sm font-medium text-gray-600 truncate" > Total Users < /p> <
                    p className = "text-xl sm:text-2xl font-bold text-gray-900" > { stats.totalUsers || 0 } < /p> <
                    p className = "text-xs text-green-600 truncate" > { stats.activeUsers || 0 }
                    active this month < /p> < /
                    div > <
                    /div> < /
                    div >

                    <
                    div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    div className = "p-2 bg-green-100 rounded-lg" >
                    <
                    FileText className = "w-6 h-6 text-green-600" / >
                    <
                    /div> <
                    div className = "ml-4" >
                    <
                    p className = "text-sm font-medium text-gray-600" > Projects < /p> <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalProjects || 0 } < /p> <
                    p className = "text-xs text-blue-600" > { stats.activeProjects || 0 }
                    active, { stats.pendingProjects || 0 }
                    pending < /p> < /
                    div > <
                    /div> < /
                    div >

                    <
                    div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    div className = "p-2 bg-purple-100 rounded-lg" >
                    <
                    ShoppingBag className = "w-6 h-6 text-purple-600" / >
                    <
                    /div> <
                    div className = "ml-4" >
                    <
                    p className = "text-sm font-medium text-gray-600" > Orders < /p> <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalOrders || 0 } < /p> <
                    p className = "text-xs text-green-600" > $ {
                        (stats.avgOrderValue || 0).toFixed(2)
                    }
                    avg value < /p> < /
                    div > <
                    /div> < /
                    div >

                    <
                    div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    div className = "p-2 bg-yellow-100 rounded-lg" >
                    <
                    DollarSign className = "w-6 h-6 text-yellow-600" / >
                    <
                    /div> <
                    div className = "ml-4" >
                    <
                    p className = "text-sm font-medium text-gray-600" > Revenue < /p> <
                    p className = "text-2xl font-bold text-gray-900" > $ {
                        (stats.totalRevenue || 0).toFixed(2)
                    } < /p> <
                    p className = "text-xs text-green-600" > Total earnings < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Recent Activity < /h3> <
                    div className = "space-y-3" >
                    <
                    div className = "flex items-center space-x-3" >
                    <
                    div className = "w-2 h-2 bg-green-500 rounded-full" > < /div> <
                    span className = "text-sm text-gray-600" > New user registered: { users[users.length - 1] ? .name || 'Unknown' } < /span> <
                    span className = "text-xs text-gray-400" > Recently < /span> < /
                    div > <
                    div className = "flex items-center space-x-3" >
                    <
                    div className = "w-2 h-2 bg-blue-500 rounded-full" > < /div> <
                    span className = "text-sm text-gray-600" > Project submitted: { projects[projects.length - 1] ? .title || 'Unknown' } < /span> <
                    span className = "text-xs text-gray-400" > Recently < /span> < /
                    div > <
                    div className = "flex items-center space-x-3" >
                    <
                    div className = "w-2 h-2 bg-purple-500 rounded-full" > < /div> <
                    span className = "text-sm text-gray-600" > New order placed: Order# { orders[orders.length - 1] ? .id || 'N/A' } < /span> <
                    span className = "text-xs text-gray-400" > Recently < /span> < /
                    div > <
                    /div> < /
                    div > <
                    /div>
                )
            case 'analytics':
                return <AdminAnalytics / >
                    case 'users':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > User Management < /h2> <
                    button className = "btn-primary flex items-center space-x-2" >
                    <
                    Plus className = "w-4 h-4" / >
                    <
                    span > Add User < /span> < /
                    button > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
                    <
                    div className = "p-4 sm:p-6 border-b border-gray-200" >
                    <
                    div className = "flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4" >
                    <
                    div className = "relative flex-1" >
                    <
                    Search className = "w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" / >
                    <
                    input type = "text"
                    placeholder = "Search users..."
                    className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                    >
                    <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "overflow-x-auto" >
                    <
                    table className = "w-full min-w-full" >
                    <
                    thead className = "bg-gray-50" >
                    <
                    tr >
                    <
                    th className = "px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > User < /th> <
                    th className = "px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Role < /th> <
                    th className = "px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell" > Joined < /th> <
                    th className = "px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Status < /th> <
                    th className = "px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> < /
                    tr > < /
                    thead > <
                    tbody className = "bg-white divide-y divide-gray-200" > {
                        users.map((user) => ( <
                            tr key = { user.id } >
                            <
                            td className = "px-3 sm:px-6 py-4 whitespace-nowrap" >
                            <
                            div className = "flex items-center" >
                            <
                            div className = "w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center" > {
                                user.avatar ? ( <
                                    img src = { user.avatar }
                                    alt = { user.name }
                                    className = "w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" /
                                    >
                                ) : ( <
                                    Users className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-500" / >
                                )
                            } <
                            /div> <
                            div className = "ml-3 sm:ml-4 min-w-0 flex-1" >
                            <
                            div className = "text-sm font-medium text-gray-900 truncate" > { user.name } < /div> <
                            div className = "text-sm text-gray-500 truncate" > { user.email } < /div> < /
                            div > <
                            /div> < /
                            td > <
                            td className = "px-3 sm:px-6 py-4 whitespace-nowrap" >
                            <
                            select value = { user.role || 'user' }
                            onChange = {
                                (e) => updateUserRole(user.id, e.target.value)
                            }
                            className = "text-sm border border-gray-300 rounded px-2 py-1 w-full sm:w-auto" >
                            <
                            option value = "user" > User < /option> <
                            option value = "admin" > Admin < /option> <
                            option value = "moderator" > Moderator < /option> < /
                            select > <
                            /td> <
                            td className = "px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell" > { user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown' } <
                            /td> <
                            td className = "px-3 sm:px-6 py-4 whitespace-nowrap" >
                            <
                            span className = { `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.lastLogin && new Date(user.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }` } > { user.lastLogin && new Date(user.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? 'Active' : 'Inactive' } <
                            /span> < /
                            td > <
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
                            button onClick = {
                                () => deleteUser(user.id)
                            }
                            className = "text-red-600 hover:text-red-900" >
                            <
                            Trash2 className = "w-4 h-4" / >
                            <
                            /button> < /
                            div > <
                            /td> < /
                            tr >
                        ))
                    } <
                    /tbody> < /
                    table > <
                    /div> < /
                    div > <
                    /div>
                )
            case 'projects':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Project Management < /h2> <
                    button onClick = {
                        () => openModal('add-project')
                    }
                    className = "btn-primary flex items-center space-x-2" >
                    <
                    Plus className = "w-4 h-4" / >
                    <
                    span > Add Project < /span> < /
                    button > <
                    /div>

                    <
                    div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" >
                    <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    FileText className = "w-8 h-8 text-blue-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalProjects || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Total Projects < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    CheckCircle className = "w-8 h-8 text-green-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.activeProjects || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Active Projects < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Clock className = "w-8 h-8 text-yellow-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.pendingProjects || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Pending Projects < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
                    <
                    div className = "p-6 border-b border-gray-200" >
                    <
                    div className = "flex items-center space-x-4" >
                    <
                    div className = "relative flex-1" >
                    <
                    Search className = "w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" / >
                    <
                    input type = "text"
                    placeholder = "Search projects..."
                    className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                    >
                    <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "overflow-x-auto" >
                    <
                    table className = "w-full" >
                    <
                    thead className = "bg-gray-50" >
                    <
                    tr >
                    <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Project < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Owner < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Status < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Created < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> < /
                    tr > <
                    /thead> <
                    tbody className = "bg-white divide-y divide-gray-200" > {
                        projects.map((project) => ( <
                            tr key = { project.id } >
                            <
                            td className = "px-6 py-4 whitespace-nowrap" >
                            <
                            div >
                            <
                            div className = "text-sm font-medium text-gray-900" > { project.title } < /div> <
                            div className = "text-sm text-gray-500" > { project.description } < /div> < /
                            div > <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { project.owner } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap" >
                            <
                            select value = { project.status }
                            onChange = {
                                (e) => updateProjectStatus(project.id, e.target.value)
                            }
                            className = "text-sm border border-gray-300 rounded px-2 py-1" >
                            <
                            option value = "pending" > Pending < /option> <
                            option value = "active" > Active < /option> <
                            option value = "completed" > Completed < /option> <
                            option value = "rejected" > Rejected < /option> < /
                            select > <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown' } <
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
                            button onClick = {
                                () => deleteProject(project.id)
                            }
                            className = "text-red-600 hover:text-red-900" >
                            <
                            Trash2 className = "w-4 h-4" / >
                            <
                            /button> < /
                            div > <
                            /td> < /
                            tr >
                        ))
                    } <
                    /tbody> < /
                    table > <
                    /div> < /
                    div > <
                    /div>
                )

            case 'orders':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Order Management < /h2> <
                    button onClick = {
                        () => openModal('export-orders')
                    }
                    className = "btn-secondary flex items-center space-x-2" >
                    <
                    Download className = "w-4 h-4" / >
                    <
                    span > Export Orders < /span> < /
                    button > <
                    /div>

                    <
                    div className = "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" >
                    <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    ShoppingBag className = "w-8 h-8 text-purple-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalOrders || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Total Orders < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    DollarSign className = "w-8 h-8 text-green-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > $ {
                        (stats.totalRevenue || 0).toFixed(2)
                    } < /p> <
                    p className = "text-sm text-gray-600" > Total Revenue < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    TrendingUp className = "w-8 h-8 text-blue-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > $ {
                        (stats.avgOrderValue || 0).toFixed(2)
                    } < /p> <
                    p className = "text-sm text-gray-600" > Average Order < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Calendar className = "w-8 h-8 text-orange-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { orders.filter(o => new Date(o.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length } < /p> <
                    p className = "text-sm text-gray-600" > This Week < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
                    <
                    div className = "overflow-x-auto" >
                    <
                    table className = "w-full" >
                    <
                    thead className = "bg-gray-50" >
                    <
                    tr >
                    <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Order ID < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Customer < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Amount < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Status < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Date < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> < /
                    tr > <
                    /thead> <
                    tbody className = "bg-white divide-y divide-gray-200" > {
                        orders.map((order) => ( <
                            tr key = { order.id } >
                            <
                            td className = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" > #{ order.id } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { order.customerName } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900" >
                            $ {
                                (order.total || 0).toFixed(2)
                            } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap" >
                            <
                            span className = { `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        order.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : order.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }` } > { order.status } <
                            /span> < /
                            td > <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown' } <
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
                            /button> < /
                            div > <
                            /td> < /
                            tr >
                        ))
                    } <
                    /tbody> < /
                    table > <
                    /div> < /
                    div > <
                    /div>
                )

            case 'games':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Games Management < /h2> <
                    div className = "flex space-x-3" >
                    <
                    button onClick = {
                        () => openModal('add-game')
                    }
                    className = "btn-primary flex items-center space-x-2" >
                    <
                    Plus className = "w-4 h-4" / >
                    <
                    span > Add Game < /span> < /
                    button > <
                    button onClick = {
                        () => openModal('game-settings')
                    }
                    className = "btn-secondary flex items-center space-x-2" >
                    <
                    Settings className = "w-4 h-4" / >
                    <
                    span > Game Settings < /span> < /
                    button > <
                    /div> < /
                    div >

                    <
                    div className = "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" >
                    <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Brain className = "w-8 h-8 text-purple-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalGamePlayers || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Total Players < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Activity className = "w-8 h-8 text-green-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > 6 < /p> <
                    p className = "text-sm text-gray-600" > Active Games < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Award className = "w-8 h-8 text-yellow-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { gameStats.reduce((sum, g) => sum + (g.credits || 0), 0) } < /p> <
                    p className = "text-sm text-gray-600" > Credits Awarded < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    TrendingUp className = "w-8 h-8 text-blue-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { gameStats.reduce((sum, g) => sum + (g.gamesPlayed || 0), 0) } < /p> <
                    p className = "text-sm text-gray-600" > Games Played < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Game Performance Analytics < /h3> <
                    div className = "space-y-4" >
                    <
                    div className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg" >
                    <
                    div >
                    <
                    h4 className = "font-medium text-gray-900" > Congo Basin Knowledge Quiz < /h4> <
                    p className = "text-sm text-gray-600" > Educational quiz about traditional practices < /p> < /
                    div > <
                    div className = "text-right" >
                    <
                    p className = "text-lg font-bold text-gray-900" > 85 % < /p> <
                    p className = "text-sm text-gray-600" > Completion Rate < /p> < /
                    div > <
                    /div> <
                    div className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg" >
                    <
                    div >
                    <
                    h4 className = "font-medium text-gray-900" > Tree Planting Master < /h4> <
                    p className = "text-sm text-gray-600" > Interactive tree planting simulation < /p> < /
                    div > <
                    div className = "text-right" >
                    <
                    p className = "text-lg font-bold text-gray-900" > 92 % < /p> <
                    p className = "text-sm text-gray-600" > Completion Rate < /p> < /
                    div > <
                    /div> <
                    div className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg" >
                    <
                    div >
                    <
                    h4 className = "font-medium text-gray-900" > Forest Adventure Mini - Games < /h4> <
                    p className = "text-sm text-gray-600" > Collection of interactive conservation games < /p> < /
                    div > <
                    div className = "text-right" >
                    <
                    p className = "text-lg font-bold text-gray-900" > 78 % < /p> <
                    p className = "text-sm text-gray-600" > Completion Rate < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div> < /
                    div >
                )

            case 'species':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Species Database Management < /h2> <
                    div className = "flex space-x-3" >
                    <
                    button onClick = {
                        () => openModal('add-species')
                    }
                    className = "btn-primary flex items-center space-x-2" >
                    <
                    Plus className = "w-4 h-4" / >
                    <
                    span > Add Species < /span> < /
                    button > <
                    button onClick = {
                        () => openModal('import-species')
                    }
                    className = "btn-secondary flex items-center space-x-2" >
                    <
                    Upload className = "w-4 h-4" / >
                    <
                    span > Import Data < /span> < /
                    button > <
                    /div> < /
                    div >

                    <
                    div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" >
                    <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Globe className = "w-8 h-8 text-green-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalSpecies || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Total Species < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    AlertTriangle className = "w-8 h-8 text-red-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { speciesData.filter(s => s.status === 'endangered').length } < /p> <
                    p className = "text-sm text-gray-600" > Endangered < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    CheckCircle className = "w-8 h-8 text-blue-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { speciesData.filter(s => s.verified).length } < /p> <
                    p className = "text-sm text-gray-600" > Verified Entries < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
                    <
                    div className = "p-6 border-b border-gray-200" >
                    <
                    div className = "flex items-center space-x-4" >
                    <
                    div className = "relative flex-1" >
                    <
                    Search className = "w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" / >
                    <
                    input type = "text"
                    placeholder = "Search species..."
                    className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                    >
                    <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "overflow-x-auto" >
                    <
                    table className = "w-full" >
                    <
                    thead className = "bg-gray-50" >
                    <
                    tr >
                    <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Species < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Scientific Name < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Category < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Status < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Added < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> < /
                    tr > <
                    /thead> <
                    tbody className = "bg-white divide-y divide-gray-200" > {
                        speciesData.map((species) => ( <
                            tr key = { species.id } >
                            <
                            td className = "px-6 py-4 whitespace-nowrap" >
                            <
                            div className = "flex items-center" > {
                                species.image && ( <
                                    img src = { species.image }
                                    alt = { species.name }
                                    className = "w-10 h-10 rounded-full object-cover mr-3" / >
                                )
                            } <
                            div >
                            <
                            div className = "text-sm font-medium text-gray-900" > { species.name } < /div> <
                            div className = "text-sm text-gray-500" > { species.localName } < /div> < /
                            div > <
                            /div> < /
                            td > <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { species.scientificName } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap" >
                            <
                            span className = "px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" > { species.category } <
                            /span> < /
                            td > <
                            td className = "px-6 py-4 whitespace-nowrap" >
                            <
                            span className = { `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        species.status === 'endangered'
                                                            ? 'bg-red-100 text-red-800'
                                                            : species.status === 'vulnerable'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-green-100 text-green-800'
                                                    }` } > { species.status } <
                            /span> < /
                            td > <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { species.createdAt ? new Date(species.createdAt).toLocaleDateString() : 'Unknown' } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm font-medium" >
                            <
                            div className = "flex space-x-2" >
                            <
                            button onClick = {
                                () => openModal('view-species', species)
                            }
                            className = "text-blue-600 hover:text-blue-900"
                            title = "View Details" >
                            <
                            Eye className = "w-4 h-4" / >
                            <
                            /button> <
                            button onClick = {
                                () => openModal('edit-species', species)
                            }
                            className = "text-green-600 hover:text-green-900"
                            title = "Edit" >
                            <
                            Edit className = "w-4 h-4" / >
                            <
                            /button> <
                            button onClick = {
                                () => deleteSpecies(species.id)
                            }
                            className = "text-red-600 hover:text-red-900"
                            title = "Delete" >
                            <
                            Trash2 className = "w-4 h-4" / >
                            <
                            /button> < /
                            div > <
                            /td> < /
                            tr >
                        ))
                    } <
                    /tbody> < /
                    table > <
                    /div> < /
                    div > <
                    /div>
                )

            case 'weather':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Weather Data Management < /h2> <
                    div className = "flex space-x-3" >
                    <
                    button onClick = {
                        () => openModal('add-weather')
                    }
                    className = "btn-primary flex items-center space-x-2" >
                    <
                    Plus className = "w-4 h-4" / >
                    <
                    span > Add Weather Data < /span> < /
                    button > <
                    button onClick = {
                        () => openModal('import-weather')
                    }
                    className = "btn-secondary flex items-center space-x-2" >
                    <
                    Upload className = "w-4 h-4" / >
                    <
                    span > Import Data < /span> < /
                    button > <
                    /div> < /
                    div >

                    <
                    div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" >
                    <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Calendar className = "w-8 h-8 text-blue-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalWeatherRecords || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Weather Records < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    BookOpen className = "w-8 h-8 text-green-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { weatherData.filter(w => w.wisdom).length } < /p> <
                    p className = "text-sm text-gray-600" > Traditional Wisdom < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    MapPin className = "w-8 h-8 text-purple-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { new Set(weatherData.map(w => w.region)).size } < /p> <
                    p className = "text-sm text-gray-600" > Regions Covered < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
                    <
                    div className = "overflow-x-auto" >
                    <
                    table className = "w-full" >
                    <
                    thead className = "bg-gray-50" >
                    <
                    tr >
                    <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Title < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Region < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Traditional Wisdom < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Added By < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Date < /th> <
                    th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> < /
                    tr > <
                    /thead> <
                    tbody className = "bg-white divide-y divide-gray-200" > {
                        weatherData.map((weather) => ( <
                            tr key = { weather.id } >
                            <
                            td className = "px-6 py-4 whitespace-nowrap" >
                            <
                            div >
                            <
                            div className = "text-sm font-medium text-gray-900" > { weather.title } < /div> <
                            div className = "text-sm text-gray-500 truncate max-w-xs" > { weather.description } < /div> < /
                            div > <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { weather.region } <
                            /td> <
                            td className = "px-6 py-4" >
                            <
                            div className = "text-sm text-gray-900 max-w-xs truncate" > { weather.wisdom } < /div> < /
                            td > <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { weather.createdBy } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { weather.createdAt ? new Date(weather.createdAt).toLocaleDateString() : 'Unknown' } <
                            /td> <
                            td className = "px-6 py-4 whitespace-nowrap text-sm font-medium" >
                            <
                            div className = "flex space-x-2" >
                            <
                            button onClick = {
                                () => openModal('view-weather', weather)
                            }
                            className = "text-blue-600 hover:text-blue-900"
                            title = "View Details" >
                            <
                            Eye className = "w-4 h-4" / >
                            <
                            /button> <
                            button onClick = {
                                () => openModal('edit-weather', weather)
                            }
                            className = "text-green-600 hover:text-green-900"
                            title = "Edit" >
                            <
                            Edit className = "w-4 h-4" / >
                            <
                            /button> <
                            button onClick = {
                                () => deleteWeatherData(weather.id)
                            }
                            className = "text-red-600 hover:text-red-900"
                            title = "Delete" >
                            <
                            Trash2 className = "w-4 h-4" / >
                            <
                            /button> < /
                            div > <
                            /td> < /
                            tr >
                        ))
                    } <
                    /tbody> < /
                    table > <
                    /div> < /
                    div > <
                    /div>
                )

            case 'media':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Media Library Management < /h2> <
                    div className = "flex space-x-3" >
                    <
                    button onClick = {
                        () => openModal('upload-media')
                    }
                    className = "btn-primary flex items-center space-x-2" >
                    <
                    Upload className = "w-4 h-4" / >
                    <
                    span > Upload Media < /span> < /
                    button > <
                    button onClick = {
                        () => openModal('bulk-upload')
                    }
                    className = "btn-secondary flex items-center space-x-2" >
                    <
                    Package className = "w-4 h-4" / >
                    <
                    span > Bulk Upload < /span> < /
                    button > <
                    /div> < /
                    div >

                    <
                    div className = "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" >
                    <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Package className = "w-8 h-8 text-blue-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { stats.totalMediaFiles || 0 } < /p> <
                    p className = "text-sm text-gray-600" > Total Files < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    FileText className = "w-8 h-8 text-green-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { mediaFiles.filter(m => m.type === 'image').length } < /p> <
                    p className = "text-sm text-gray-600" > Images < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Activity className = "w-8 h-8 text-purple-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > { mediaFiles.filter(m => m.type === 'video').length } < /p> <
                    p className = "text-sm text-gray-600" > Videos < /p> < /
                    div > <
                    /div> < /
                    div > <
                    div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                    <
                    div className = "flex items-center" >
                    <
                    Database className = "w-8 h-8 text-yellow-600" / >
                    <
                    div className = "ml-3" >
                    <
                    p className = "text-2xl font-bold text-gray-900" > {
                        (mediaFiles.reduce((sum, m) => sum + (m.size || 0), 0) / 1024 / 1024).toFixed(1)
                    }
                    MB <
                    /p> <
                    p className = "text-sm text-gray-600" > Storage Used < /p> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
                    <
                    div className = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6" > {
                        mediaFiles.map((file) => ( <
                            div key = { file.id }
                            className = "bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors" >
                            <
                            div className = "aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center" > {
                                file.type === 'image' ? ( <
                                    img src = { file.url }
                                    alt = { file.name }
                                    className = "w-full h-full object-cover rounded-lg" / >
                                ) : ( <
                                    FileText className = "w-12 h-12 text-gray-400" / >
                                )
                            } <
                            /div> <
                            div className = "space-y-2" >
                            <
                            h4 className = "font-medium text-gray-900 truncate" > { file.name } < /h4> <
                            p className = "text-sm text-gray-500" > { file.type } < /p> <
                            p className = "text-xs text-gray-400" > { file.size ? `${(file.size / 1024).toFixed(1)}KB` : 'Unknown size' } <
                            /p> <
                            div className = "flex space-x-2" >
                            <
                            button onClick = {
                                () => openModal('view-media', file)
                            }
                            className = "text-blue-600 hover:text-blue-900"
                            title = "View" >
                            <
                            Eye className = "w-4 h-4" / >
                            <
                            /button> <
                            button onClick = {
                                () => openModal('edit-media', file)
                            }
                            className = "text-green-600 hover:text-green-900"
                            title = "Edit" >
                            <
                            Edit className = "w-4 h-4" / >
                            <
                            /button> <
                            button onClick = {
                                () => deleteMedia(file.id)
                            }
                            className = "text-red-600 hover:text-red-900"
                            title = "Delete" >
                            <
                            Trash2 className = "w-4 h-4" / >
                            <
                            /button> < /
                            div > <
                            /div> < /
                            div >
                        ))
                    } <
                    /div> < /
                    div > <
                    /div>
                )

            case 'reports':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Reports & Analytics < /h2> <
                    div className = "flex space-x-3" >
                    <
                    button onClick = {
                        () => openModal('generate-report')
                    }
                    className = "btn-primary flex items-center space-x-2" >
                    <
                    BarChart3 className = "w-4 h-4" / >
                    <
                    span > Generate Report < /span> < /
                    button > <
                    button onClick = {
                        () => openModal('export-data')
                    }
                    className = "btn-secondary flex items-center space-x-2" >
                    <
                    Download className = "w-4 h-4" / >
                    <
                    span > Export Data < /span> < /
                    button > <
                    /div> < /
                    div >

                    <
                    div className = "grid grid-cols-1 lg:grid-cols-2 gap-6" >
                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Platform Overview < /h3> <
                    div className = "space-y-4" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Total Users < /span> <
                    span className = "text-lg font-bold text-gray-900" > { stats.totalUsers || 0 } < /span> < /
                    div > <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Active Users(30 days) < /span> <
                    span className = "text-lg font-bold text-green-600" > { stats.activeUsers || 0 } < /span> < /
                    div > <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Forum Posts < /span> <
                    span className = "text-lg font-bold text-blue-600" > { stats.totalForumPosts || 0 } < /span> < /
                    div > <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Species Database Entries < /span> <
                    span className = "text-lg font-bold text-purple-600" > { stats.totalSpecies || 0 } < /span> < /
                    div > <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Weather Records < /span> <
                    span className = "text-lg font-bold text-orange-600" > { stats.totalWeatherRecords || 0 } < /span> < /
                    div > <
                    /div> < /
                    div >

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Engagement Metrics < /h3> <
                    div className = "space-y-4" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Forum Engagement Rate < /span> <
                    span className = "text-lg font-bold text-gray-900" > { stats.totalUsers > 0 ? ((stats.totalForumPosts / stats.totalUsers) * 100).toFixed(1) : 0 } %
                    <
                    /span> < /
                    div > <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Game Participation < /span> <
                    span className = "text-lg font-bold text-green-600" > { stats.totalGamePlayers || 0 }
                    players < /span> < /
                    div > <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Media Library Usage < /span> <
                    span className = "text-lg font-bold text-blue-600" > {
                        (mediaFiles.reduce((sum, m) => sum + (m.size || 0), 0) / 1024 / 1024).toFixed(1)
                    }
                    MB <
                    /span> < /
                    div > <
                    div className = "flex justify-between items-center" >
                    <
                    span className = "text-sm text-gray-600" > Content Moderation < /span> <
                    span className = "text-lg font-bold text-yellow-600" > { forumPosts.filter(p => !p.moderated).length }
                    pending <
                    /span> < /
                    div > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Recent Activity Summary < /h3> <
                    div className = "space-y-3" >
                    <
                    div className = "flex items-center justify-between p-3 bg-blue-50 rounded-lg" >
                    <
                    div className = "flex items-center" >
                    <
                    Users className = "w-5 h-5 text-blue-600 mr-3" / >
                    <
                    span className = "text-sm text-gray-900" > New user registrations this week < /span> < /
                    div > <
                    span className = "text-sm font-bold text-blue-600" > { users.filter(u => u.joinedAt && new Date(u.joinedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length } <
                    /span> < /
                    div > <
                    div className = "flex items-center justify-between p-3 bg-green-50 rounded-lg" >
                    <
                    div className = "flex items-center" >
                    <
                    MessageCircle className = "w-5 h-5 text-green-600 mr-3" / >
                    <
                    span className = "text-sm text-gray-900" > Forum posts this week < /span> < /
                    div > <
                    span className = "text-sm font-bold text-green-600" > { forumPosts.filter(p => new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length } <
                    /span> < /
                    div > <
                    div className = "flex items-center justify-between p-3 bg-purple-50 rounded-lg" >
                    <
                    div className = "flex items-center" >
                    <
                    Globe className = "w-5 h-5 text-purple-600 mr-3" / >
                    <
                    span className = "text-sm text-gray-900" > Species entries added this week < /span> < /
                    div > <
                    span className = "text-sm font-bold text-purple-600" > { speciesData.filter(s => s.createdAt && new Date(s.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length } <
                    /span> < /
                    div > <
                    /div> < /
                    div > <
                    /div>
                )

            case 'page-builder':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > Visual Page Builder < /h2> <
                    a href = "/admin/page-builder"
                    className = "btn-primary flex items-center space-x-2" >
                    <
                    Layout className = "w-4 h-4" / >
                    <
                    span > Open Page Builder < /span> < /
                    a > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    div className = "text-center py-12" >
                    <
                    Layout className = "w-16 h-16 text-blue-600 mx-auto mb-4" / >
                    <
                    h3 className = "text-xl font-semibold text-gray-900 mb-2" > WordPress - Style Page Builder < /h3> <
                    p className = "text-gray-600 mb-6 max-w-2xl mx-auto" >
                    Create and customize your website pages with our intuitive drag - and - drop page builder.Add components, edit content, and see changes in real - time. <
                    /p>

                    <
                    div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto" >
                    <
                    div className = "text-center" >
                    <
                    div className = "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3" >
                    <
                    Type className = "w-6 h-6 text-blue-600" / >
                    <
                    /div> <
                    h4 className = "font-medium text-gray-900 mb-2" > Rich Components < /h4> <
                    p className = "text-sm text-gray-600" > Hero sections, text blocks, images, buttons, columns and more < /p> < /
                    div > <
                    div className = "text-center" >
                    <
                    div className = "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3" >
                    <
                    Edit3 className = "w-6 h-6 text-green-600" / >
                    <
                    /div> <
                    h4 className = "font-medium text-gray-900 mb-2" > Live Editing < /h4> <
                    p className = "text-sm text-gray-600" > Edit content and see changes instantly with our property panel < /p> < /
                    div > <
                    div className = "text-center" >
                    <
                    div className = "w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3" >
                    <
                    Monitor className = "w-6 h-6 text-purple-600" / >
                    <
                    /div> <
                    h4 className = "font-medium text-gray-900 mb-2" > Responsive Design < /h4> <
                    p className = "text-sm text-gray-600" > Preview and optimize
                    for desktop, tablet, and mobile devices < /p> < /
                    div > <
                    /div>

                    <
                    div className = "mt-8" >
                    <
                    a href = "/admin/page-builder"
                    className = "btn-primary inline-flex items-center space-x-2" >
                    <
                    Layout className = "w-5 h-5" / >
                    <
                    span > Launch Page Builder < /span> < /
                    a > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Available Components < /h3> <
                    div className = "grid grid-cols-2 md:grid-cols-5 gap-4" >
                    <
                    div className = "flex items-center space-x-2 p-3 bg-gray-50 rounded-lg" >
                    <
                    Layout className = "w-5 h-5 text-gray-600" / >
                    <
                    span className = "text-sm font-medium" > Hero Section < /span> < /
                    div > <
                    div className = "flex items-center space-x-2 p-3 bg-gray-50 rounded-lg" >
                    <
                    Type className = "w-5 h-5 text-gray-600" / >
                    <
                    span className = "text-sm font-medium" > Text Block < /span> < /
                    div > <
                    div className = "flex items-center space-x-2 p-3 bg-gray-50 rounded-lg" >
                    <
                    Image className = "w-5 h-5 text-gray-600" / >
                    <
                    span className = "text-sm font-medium" > Image < /span> < /
                    div > <
                    div className = "flex items-center space-x-2 p-3 bg-gray-50 rounded-lg" >
                    <
                    Square className = "w-5 h-5 text-gray-600" / >
                    <
                    span className = "text-sm font-medium" > Button < /span> < /
                    div > <
                    div className = "flex items-center space-x-2 p-3 bg-gray-50 rounded-lg" >
                    <
                    Columns className = "w-5 h-5 text-gray-600" / >
                    <
                    span className = "text-sm font-medium" > Columns < /span> < /
                    div > <
                    /div> < /
                    div > <
                    /div>
                )

            case 'settings':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h2 className = "text-2xl font-bold text-gray-900" > System Settings < /h2> <
                    button onClick = {
                        () => openModal('backup-system')
                    }
                    className = "btn-secondary flex items-center space-x-2" >
                    <
                    Download className = "w-4 h-4" / >
                    <
                    span > Backup System < /span> < /
                    button > <
                    /div>

                    <
                    div className = "grid grid-cols-1 lg:grid-cols-2 gap-6" >
                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Platform Configuration < /h3> <
                    div className = "space-y-4" >
                    <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Platform Name < /label> <
                    input type = "text"
                    defaultValue = "TAC-HUB"
                    className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                    >
                    <
                    /div> <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Default Language < /label> <
                    select className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
                    <
                    option value = "en" > English < /option> <
                    option value = "fr" > French < /option> <
                    option value = "sw" > Swahili < /option> <
                    option value = "ln" > Lingala < /option> < /
                    select > <
                    /div> <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Time Zone < /label> <
                    select className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
                    <
                    option value = "UTC" > UTC < /option> <
                    option value = "Africa/Kinshasa" > Central Africa Time < /option> <
                    option value = "Africa/Lagos" > West Africa Time < /option> < /
                    select > <
                    /div> < /
                    div > <
                    /div>

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > Content Moderation < /h3> <
                    div className = "space-y-4" >
                    <
                    div className = "flex items-center justify-between" >
                    <
                    span className = "text-sm text-gray-700" > Auto - approve forum posts < /span> <
                    input type = "checkbox"
                    className = "rounded" / >
                    <
                    /div> <
                    div className = "flex items-center justify-between" >
                    <
                    span className = "text-sm text-gray-700" > Require species verification < /span> <
                    input type = "checkbox"
                    defaultChecked className = "rounded" / >
                    <
                    /div> <
                    div className = "flex items-center justify-between" >
                    <
                    span className = "text-sm text-gray-700" > Enable user uploads < /span> <
                    input type = "checkbox"
                    defaultChecked className = "rounded" / >
                    <
                    /div> <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Max file size(MB) < /label> <
                    input type = "number"
                    defaultValue = "30"
                    className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
                    >
                    <
                    /div> < /
                    div > <
                    /div> < /
                    div >

                    <
                    div className = "bg-white rounded-lg shadow-sm border border-gray-200 p-6" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900 mb-4" > System Maintenance < /h3> <
                    div className = "grid grid-cols-1 md:grid-cols-3 gap-4" >
                    <
                    button onClick = {
                        () => openModal('clear-cache')
                    }
                    className = "p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left" >
                    <
                    RefreshCw className = "w-6 h-6 text-blue-600 mb-2" / >
                    <
                    h4 className = "font-medium text-gray-900" > Clear Cache < /h4> <
                    p className = "text-sm text-gray-500" > Clear system cache and temporary files < /p> < /
                    button > <
                    button onClick = {
                        () => openModal('optimize-database')
                    }
                    className = "p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left" >
                    <
                    Database className = "w-6 h-6 text-green-600 mb-2" / >
                    <
                    h4 className = "font-medium text-gray-900" > Optimize Database < /h4> <
                    p className = "text-sm text-gray-500" > Optimize database performance < /p> < /
                    button > <
                    button onClick = {
                        () => openModal('system-logs')
                    }
                    className = "p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left" >
                    <
                    FileText className = "w-6 h-6 text-purple-600 mb-2" / >
                    <
                    h4 className = "font-medium text-gray-900" > View Logs < /h4> <
                    p className = "text-sm text-gray-500" > View system logs and errors < /p> < /
                    button > <
                    /div> < /
                    div > <
                    /div>
                )

            default:
                return ( <
                    div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
                    <
                    p className = "text-gray-600" > Feature coming soon... < /p> < /
                    div >
                )
        }
    }

    return ( <
        div className = "min-h-screen bg-gray-50" >
        <
        Header / >

        <
        div className = "w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden" >
        <
        div className = "space-y-6" >
        <
        div className = "bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200" >
        <
        h1 className = "text-2xl sm:text-3xl font-bold text-gray-900" > TAC - HUB Admin Panel < /h1> <
        p className = "text-gray-600 mt-2" > Manage your Congo Basin climate platform < /p> < /
        div >

        <
        div className = "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" >
        <
        div className = "border-b border-gray-200 overflow-x-auto" >
        <
        nav className = "flex space-x-4 sm:space-x-8 px-4 sm:px-6 min-w-max" > {
            tabs.map((tab) => {
                const IconComponent = tab.icon
                return ( <
                    button key = { tab.id }
                    onClick = {
                        () => setActiveTab(tab.id)
                    }
                    className = { `flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }` } >
                    <
                    IconComponent className = "w-4 h-4" / >
                    <
                    span > { tab.name } < /span> < /
                    button >
                )
            })
        } <
        /nav> < /
        div >

        <
        div className = "p-4 sm:p-6 overflow-x-auto" > { renderContent() } <
        /div> < /
        div > <
        /div> < /
        div >

        <
        Footer / >
        <
        /div>
    )
}