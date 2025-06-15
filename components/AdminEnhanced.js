'use client'
import { useState, useEffect } from 'react'
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
    XCircle,
    Clock
} from 'lucide-react'

export default function AdminEnhanced({
    activeTab,
    stats,
    forumPosts,
    gameStats,
    speciesData,
    weatherData,
    mediaFiles,
    systemSettings,
    onDeleteForumPost,
    onModerateForumPost,
    onAddSpecies,
    onUpdateSpecies,
    onDeleteSpecies,
    onAddWeatherData,
    onDeleteWeatherData,
    onUploadMedia,
    onDeleteMedia,
    onUpdateSystemSettings
}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [editingItem, setEditingItem] = useState(null)

    const openModal = (type, item = null) => {
        setModalType(type)
        setEditingItem(item)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setModalType('')
        setEditingItem(null)
    }

    const renderForumManagement = () => ( <
        div className = "space-y-6" >
        <
        div className = "flex justify-between items-center" >
        <
        h2 className = "text-2xl font-bold text-gray-900" > Forum Management < /h2> <
        div className = "flex space-x-3" >
        <
        button onClick = {
            () => openModal('moderate-all') }
        className = "px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2" >
        <
        Shield className = "w-4 h-4" / >
        <
        span > Moderate All < /span> <
        /button> <
        button onClick = {
            () => openModal('forum-settings') }
        className = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2" >
        <
        Settings className = "w-4 h-4" / >
        <
        span > Forum Settings < /span> <
        /button> <
        /div> <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" >
        <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        MessageCircle className = "w-8 h-8 text-blue-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { stats.totalForumPosts || 0 } < /p> <
        p className = "text-sm text-gray-600" > Total Posts < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        Users className = "w-8 h-8 text-green-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { forumPosts.filter(p => p.replies ? .length > 0).length } < /p> <
        p className = "text-sm text-gray-600" > Active Discussions < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        AlertTriangle className = "w-8 h-8 text-yellow-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { forumPosts.filter(p => !p.moderated).length } < /p> <
        p className = "text-sm text-gray-600" > Pending Moderation < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        Star className = "w-8 h-8 text-purple-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { forumPosts.reduce((sum, p) => sum + (p.likes || 0), 0) } < /p> <
        p className = "text-sm text-gray-600" > Total Likes < /p> <
        /div> <
        /div> <
        /div> <
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
        placeholder = "Search forum posts..."
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value) }
        className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
        >
        <
        /div> <
        select value = { filterCategory }
        onChange = {
            (e) => setFilterCategory(e.target.value) }
        className = "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
        <
        option value = "all" > All Categories < /option> <
        option value = "general" > General < /option> <
        option value = "research" > Research < /option> <
        option value = "conservation" > Conservation < /option> <
        option value = "policy" > Policy < /option> <
        /select> <
        /div> <
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
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Post < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Author < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Category < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Engagement < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Status < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> <
        /tr> <
        /thead> <
        tbody className = "bg-white divide-y divide-gray-200" > {
            forumPosts
            .filter(post =>
                (filterCategory === 'all' || post.category === filterCategory) &&
                (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((post) => ( <
                tr key = { post.id } >
                <
                td className = "px-6 py-4" >
                <
                div >
                <
                div className = "text-sm font-medium text-gray-900 truncate max-w-xs" > { post.title } < /div> <
                div className = "text-sm text-gray-500 truncate max-w-xs" > { post.content } < /div> <
                div className = "text-xs text-gray-400" > { new Date(post.createdAt).toLocaleDateString() } < /div> <
                /div> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                div className = "text-sm font-medium text-gray-900" > { post.author } < /div> <
                div className = "text-sm text-gray-500" > { post.authorRole } < /div> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                span className = "px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800" > { post.category } <
                /span> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" >
                <
                div > { post.likes || 0 }
                likes < /div> <
                div > { post.replies ? .length || 0 }
                replies < /div> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                span className = { `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.moderated 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }` } > { post.moderated ? 'Approved' : 'Pending' } <
                /span> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap text-sm font-medium" >
                <
                div className = "flex space-x-2" >
                <
                button onClick = {
                    () => onModerateForumPost(post.id, 'approve') }
                className = "text-green-600 hover:text-green-900"
                title = "Approve" >
                <
                CheckCircle className = "w-4 h-4" / >
                <
                /button> <
                button onClick = {
                    () => openModal('edit-post', post) }
                className = "text-blue-600 hover:text-blue-900"
                title = "Edit" >
                <
                Edit className = "w-4 h-4" / >
                <
                /button> <
                button onClick = {
                    () => onDeleteForumPost(post.id) }
                className = "text-red-600 hover:text-red-900"
                title = "Delete" >
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
        /div> <
        /div>
    )

    const renderSpeciesManagement = () => ( <
        div className = "space-y-6" >
        <
        div className = "flex justify-between items-center" >
        <
        h2 className = "text-2xl font-bold text-gray-900" > Species Database Management < /h2> <
        div className = "flex space-x-3" >
        <
        button onClick = {
            () => openModal('add-species') }
        className = "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Add Species < /span> <
        /button> <
        button onClick = {
            () => openModal('import-species') }
        className = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2" >
        <
        Upload className = "w-4 h-4" / >
        <
        span > Import Data < /span> <
        /button> <
        /div> <
        /div>

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
        p className = "text-sm text-gray-600" > Total Species < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        AlertTriangle className = "w-8 h-8 text-red-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { speciesData.filter(s => s.status === 'endangered').length } < /p> <
        p className = "text-sm text-gray-600" > Endangered < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        CheckCircle className = "w-8 h-8 text-blue-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { speciesData.filter(s => s.verified).length } < /p> <
        p className = "text-sm text-gray-600" > Verified Entries < /p> <
        /div> <
        /div> <
        /div> <
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
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value) }
        className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
        >
        <
        /div> <
        /div> <
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
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> <
        /tr> <
        /thead> <
        tbody className = "bg-white divide-y divide-gray-200" > {
            speciesData
            .filter(species =>
                species.name ? .toLowerCase().includes(searchTerm.toLowerCase()) ||
                species.scientificName ? .toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((species) => ( <
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
                div className = "text-sm text-gray-500" > { species.localName } < /div> <
                /div> <
                /div> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { species.scientificName } <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                span className = "px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" > { species.category } <
                /span> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                span className = { `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      species.status === 'endangered' 
                        ? 'bg-red-100 text-red-800'
                        : species.status === 'vulnerable'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }` } > { species.status } <
                /span> <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500" > { species.createdAt ? new Date(species.createdAt).toLocaleDateString() : 'Unknown' } <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap text-sm font-medium" >
                <
                div className = "flex space-x-2" >
                <
                button onClick = {
                    () => openModal('view-species', species) }
                className = "text-blue-600 hover:text-blue-900"
                title = "View Details" >
                <
                Eye className = "w-4 h-4" / >
                <
                /button> <
                button onClick = {
                    () => openModal('edit-species', species) }
                className = "text-green-600 hover:text-green-900"
                title = "Edit" >
                <
                Edit className = "w-4 h-4" / >
                <
                /button> <
                button onClick = {
                    () => onDeleteSpecies(species.id) }
                className = "text-red-600 hover:text-red-900"
                title = "Delete" >
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
        /div> <
        /div>
    )

    const renderGameManagement = () => ( <
        div className = "space-y-6" >
        <
        div className = "flex justify-between items-center" >
        <
        h2 className = "text-2xl font-bold text-gray-900" > Games Management < /h2> <
        div className = "flex space-x-3" >
        <
        button onClick = {
            () => openModal('add-game') }
        className = "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Add Game < /span> <
        /button> <
        button onClick = {
            () => openModal('game-settings') }
        className = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2" >
        <
        Settings className = "w-4 h-4" / >
        <
        span > Game Settings < /span> <
        /button> <
        /div> <
        /div>

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
        p className = "text-sm text-gray-600" > Total Players < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        Activity className = "w-8 h-8 text-green-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > 6 < /p> <
        p className = "text-sm text-gray-600" > Active Games < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        Award className = "w-8 h-8 text-yellow-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { gameStats.reduce((sum, g) => sum + (g.credits || 0), 0) } < /p> <
        p className = "text-sm text-gray-600" > Credits Awarded < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        TrendingUp className = "w-8 h-8 text-blue-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { gameStats.reduce((sum, g) => sum + (g.gamesPlayed || 0), 0) } < /p> <
        p className = "text-sm text-gray-600" > Games Played < /p> <
        /div> <
        /div> <
        /div> <
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
        p className = "text-sm text-gray-600" > Educational quiz about traditional practices < /p> <
        /div> <
        div className = "text-right" >
        <
        p className = "text-lg font-bold text-gray-900" > 85 % < /p> <
        p className = "text-sm text-gray-600" > Completion Rate < /p> <
        /div> <
        /div> <
        div className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg" >
        <
        div >
        <
        h4 className = "font-medium text-gray-900" > Tree Planting Master < /h4> <
        p className = "text-sm text-gray-600" > Interactive tree planting simulation < /p> <
        /div> <
        div className = "text-right" >
        <
        p className = "text-lg font-bold text-gray-900" > 92 % < /p> <
        p className = "text-sm text-gray-600" > Completion Rate < /p> <
        /div> <
        /div> <
        div className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg" >
        <
        div >
        <
        h4 className = "font-medium text-gray-900" > Forest Adventure Mini - Games < /h4> <
        p className = "text-sm text-gray-600" > Collection of interactive conservation games < /p> <
        /div> <
        div className = "text-right" >
        <
        p className = "text-lg font-bold text-gray-900" > 78 % < /p> <
        p className = "text-sm text-gray-600" > Completion Rate < /p> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div>
    )

    const renderMediaLibrary = () => ( <
        div className = "space-y-6" >
        <
        div className = "flex justify-between items-center" >
        <
        h2 className = "text-2xl font-bold text-gray-900" > Media Library Management < /h2> <
        div className = "flex space-x-3" >
        <
        button onClick = {
            () => openModal('upload-media') }
        className = "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2" >
        <
        Upload className = "w-4 h-4" / >
        <
        span > Upload Media < /span> <
        /button> <
        button onClick = {
            () => openModal('bulk-upload') }
        className = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2" >
        <
        Package className = "w-4 h-4" / >
        <
        span > Bulk Upload < /span> <
        /button> <
        /div> <
        /div>

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
        p className = "text-sm text-gray-600" > Total Files < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        FileText className = "w-8 h-8 text-green-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { mediaFiles.filter(m => m.type === 'image').length } < /p> <
        p className = "text-sm text-gray-600" > Images < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        Activity className = "w-8 h-8 text-purple-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > { mediaFiles.filter(m => m.type === 'video').length } < /p> <
        p className = "text-sm text-gray-600" > Videos < /p> <
        /div> <
        /div> <
        /div> <
        div className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
        <
        div className = "flex items-center" >
        <
        Database className = "w-8 h-8 text-yellow-600" / >
        <
        div className = "ml-3" >
        <
        p className = "text-2xl font-bold text-gray-900" > {
            (mediaFiles.reduce((sum, m) => sum + (m.size || 0), 0) / 1024 / 1024).toFixed(1) }
        MB <
        /p> <
        p className = "text-sm text-gray-600" > Storage Used < /p> <
        /div> <
        /div> <
        /div> <
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
        placeholder = "Search media files..."
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value) }
        className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /
        >
        <
        /div> <
        select value = { filterCategory }
        onChange = {
            (e) => setFilterCategory(e.target.value) }
        className = "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" >
        <
        option value = "all" > All Types < /option> <
        option value = "image" > Images < /option> <
        option value = "video" > Videos < /option> <
        option value = "document" > Documents < /option> <
        /select> <
        /div> <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6" > {
            mediaFiles
            .filter(file =>
                (filterCategory === 'all' || file.type === filterCategory) &&
                file.name ? .toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((file) => ( <
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
                    () => openModal('view-media', file) }
                className = "text-blue-600 hover:text-blue-900"
                title = "View" >
                <
                Eye className = "w-4 h-4" / >
                <
                /button> <
                button onClick = {
                    () => openModal('edit-media', file) }
                className = "text-green-600 hover:text-green-900"
                title = "Edit" >
                <
                Edit className = "w-4 h-4" / >
                <
                /button> <
                button onClick = {
                    () => onDeleteMedia(file.id) }
                className = "text-red-600 hover:text-red-900"
                title = "Delete" >
                <
                Trash2 className = "w-4 h-4" / >
                <
                /button> <
                /div> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div> <
        /div>
    )

    // Render different sections based on activeTab
    switch (activeTab) {
        case 'forum':
            return renderForumManagement()
        case 'species':
            return renderSpeciesManagement()
        case 'games':
            return renderGameManagement()
        case 'media':
            return renderMediaLibrary()
        default:
            return ( <
                div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
                <
                p className = "text-gray-600" > Enhanced admin feature
                for { activeTab }
                coming soon... < /p> <
                /div>
            )
    }
}