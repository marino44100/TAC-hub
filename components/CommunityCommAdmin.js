'use client'
import React, { useState, useEffect } from 'react'
import {
    Users,
    MessageCircle,
    Vote,
    UserCheck,
    Plus,
    Save,
    X,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Calendar,
    Clock,
    Star,
    AlertTriangle,
    Info,
    User,
    MapPin,
    Globe,
    BookOpen,
    Mic,
    Play,
    Download
} from 'lucide-react'
import { communityCommService } from '../lib/communityCommService'

export default function CommunityCommAdmin() {
    const [activeTab, setActiveTab] = useState('overview')
    const [showAddForm, setShowAddForm] = useState(false)
    const [formType, setFormType] = useState('network')
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [commService, setCommService] = useState(null)

    // Form states
    const [networkForm, setNetworkForm] = useState({
        name: '',
        region: '',
        villages: '',
        population: '',
        languages: '',
        coordinator: '',
        description: ''
    })

    useEffect(() => {
        setCommService(communityCommService)
    }, [])

    const tabs = [
        { id: 'overview', name: 'Overview', icon: Info },
        { id: 'networks', name: 'Village Networks', icon: Users },
        { id: 'teachings', name: 'Elder Teachings', icon: BookOpen },
        { id: 'decisions', name: 'Decision Making', icon: Vote },
        { id: 'partners', name: 'External Partners', icon: UserCheck }
    ]

    const handleAddNetwork = () => {
        const newNetwork = {
            id: Date.now(),
            name: networkForm.name,
            region: networkForm.region,
            villages: networkForm.villages.split(',').map(v => v.trim()),
            population: parseInt(networkForm.population),
            languages: networkForm.languages.split(',').map(l => l.trim()),
            coordinator: networkForm.coordinator,
            description: networkForm.description,
            status: 'pending_approval',
            createdAt: new Date().toISOString(),
            activities: [],
            achievements: [],
            challenges: []
        }

        // In a real app, this would save to backend
        console.log('Adding network:', newNetwork)
        setShowAddForm(false)
        setNetworkForm({
            name: '',
            region: '',
            villages: '',
            population: '',
            languages: '',
            coordinator: '',
            description: ''
        })
    }

    const renderOverview = () => {
        if (!commService) return <div > Loading... < /div>

        const stats = {
            totalNetworks: commService.getVillageNetworks().length,
            totalTeachings: commService.getElderTeachings().length,
            totalDecisions: commService.getDecisionMaking().length,
            totalPartners: commService.getExternalPartners().length
        }

        return ( <
            div className = "space-y-6" >
            <
            div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
            <
            div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
            <
            div className = "flex items-center justify-between" >
            <
            div >
            <
            p className = "text-sm font-medium text-gray-600" > Village Networks < /p> <
            p className = "text-3xl font-bold text-blue-600" > { stats.totalNetworks } < /p> <
            p className = "text-xs text-gray-500" > Active networks < /p> < /
            div > <
            Users className = "w-8 h-8 text-blue-600" / >
            <
            /div> < /
            div >

            <
            div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
            <
            div className = "flex items-center justify-between" >
            <
            div >
            <
            p className = "text-sm font-medium text-gray-600" > Elder Teachings < /p> <
            p className = "text-3xl font-bold text-green-600" > { stats.totalTeachings } < /p> <
            p className = "text-xs text-gray-500" > Knowledge recordings < /p> < /
            div > <
            BookOpen className = "w-8 h-8 text-green-600" / >
            <
            /div> < /
            div >

            <
            div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
            <
            div className = "flex items-center justify-between" >
            <
            div >
            <
            p className = "text-sm font-medium text-gray-600" > Decision Making < /p> <
            p className = "text-3xl font-bold text-purple-600" > { stats.totalDecisions } < /p> <
            p className = "text-xs text-gray-500" > Active proposals < /p> < /
            div > <
            Vote className = "w-8 h-8 text-purple-600" / >
            <
            /div> < /
            div >

            <
            div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
            <
            div className = "flex items-center justify-between" >
            <
            div >
            <
            p className = "text-sm font-medium text-gray-600" > External Partners < /p> <
            p className = "text-3xl font-bold text-orange-600" > { stats.totalPartners } < /p> <
            p className = "text-xs text-gray-500" > Active partnerships < /p> < /
            div > <
            UserCheck className = "w-8 h-8 text-orange-600" / >
            <
            /div> < /
            div > <
            /div>

            <
            div className = "bg-blue-50 border border-blue-200 rounded-lg p-6" >
            <
            div className = "flex items-start space-x-3" >
            <
            Info className = "w-5 h-5 text-blue-600 mt-0.5" / >
            <
            div >
            <
            h4 className = "font-semibold text-blue-900" > Community Communication Platform < /h4> <
            p className = "text-blue-800 text-sm mt-1" >
            This platform facilitates communication and collaboration across Congo Basin communities.It enables village networks to share knowledge, make collective decisions, and work with external partners. <
            /p> <
            div className = "mt-3 text-sm text-blue-700" >
            <
            p > < strong > Features: < /strong> Village networking, elder teachings, democratic decision-making, partner collaboration</p >
            <
            p > < strong > Coverage: < /strong> 6 countries, 20+ village networks, 100+ communities</p >
            <
            p > < strong > Languages: < /strong> Lingala, French, Baka, Mbuti, English</p >
            <
            /div> < /
            div > <
            /div> < /
            div > <
            /div>
        )
    }

    const renderNetworks = () => {
        if (!commService) return <div > Loading... < /div>

        const networks = commService.getVillageNetworks()

        return ( <
            div className = "space-y-6" >
            <
            div className = "flex justify-between items-center" >
            <
            h3 className = "text-2xl font-bold text-gray-900" > Village Networks Management < /h3> <
            button onClick = {
                () => {
                    setFormType('network')
                    setShowAddForm(true)
                }
            }
            className = "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center" >
            <
            Plus className = "w-4 h-4 mr-2" / >
            Add Network <
            /button> < /
            div >

            <
            div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
            <
            div className = "p-6" >
            <
            div className = "flex items-center space-x-4 mb-4" >
            <
            div className = "relative flex-1" >
            <
            Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" / >
            <
            input type = "text"
            placeholder = "Search networks..."
            value = { searchQuery }
            onChange = {
                (e) => setSearchQuery(e.target.value)
            }
            className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
            >
            <
            /div> <
            select value = { filterStatus }
            onChange = {
                (e) => setFilterStatus(e.target.value)
            }
            className = "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
            <
            option value = "all" > All Status < /option> <
            option value = "active" > Active < /option> <
            option value = "pending_approval" > Pending Approval < /option> <
            option value = "inactive" > Inactive < /option> < /
            select > <
            /div>

            <
            div className = "overflow-x-auto" >
            <
            table className = "w-full" >
            <
            thead >
            <
            tr className = "border-b border-gray-200" >
            <
            th className = "text-left py-3 px-4 font-medium text-gray-700" > Network Name < /th> <
            th className = "text-left py-3 px-4 font-medium text-gray-700" > Region < /th> <
            th className = "text-left py-3 px-4 font-medium text-gray-700" > Villages < /th> <
            th className = "text-left py-3 px-4 font-medium text-gray-700" > Population < /th> <
            th className = "text-left py-3 px-4 font-medium text-gray-700" > Status < /th> <
            th className = "text-left py-3 px-4 font-medium text-gray-700" > Actions < /th> < /
            tr > <
            /thead> <
            tbody > {
                networks.map((network, index) => ( <
                    tr key = { network.id || index }
                    className = "border-b border-gray-100 hover:bg-gray-50" >
                    <
                    td className = "py-3 px-4" >
                    <
                    div >
                    <
                    div className = "font-medium text-gray-900" > { network.name } < /div> <
                    div className = "text-sm text-gray-500" > { network.coordinator } < /div> < /
                    div > <
                    /td> <
                    td className = "py-3 px-4 text-gray-700" > { network.region } < /td> <
                    td className = "py-3 px-4 text-gray-700" > { network.villages ? .length || 0 } < /td> <
                    td className = "py-3 px-4 text-gray-700" > { network.population ? .toLocaleString() } < /td> <
                    td className = "py-3 px-4" >
                    <
                    span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                                                    network.status === 'active' ? 'bg-green-100 text-green-700' :
                                                    network.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }` } > { network.status.replace('_', ' ') } <
                    /span> < /
                    td > <
                    td className = "py-3 px-4" >
                    <
                    div className = "flex items-center space-x-2" >
                    <
                    button className = "p-1 text-gray-400 hover:text-blue-600" >
                    <
                    Eye className = "w-4 h-4" / >
                    <
                    /button> <
                    button className = "p-1 text-gray-400 hover:text-green-600" >
                    <
                    Edit className = "w-4 h-4" / >
                    <
                    /button> <
                    button className = "p-1 text-gray-400 hover:text-red-600" >
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
            /div> < /
            div >
        )
    }

    const renderAddForm = () => {
        if (!showAddForm) return null

        return ( <
            div className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" >
            <
            div className = "bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" >
            <
            div className = "sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center" >
            <
            h3 className = "text-xl font-bold text-gray-900" >
            Add New {
                formType === 'network' ? 'Village Network' :
                    formType === 'teaching' ? 'Elder Teaching' :
                    formType === 'decision' ? 'Decision Proposal' : 'External Partner'
            } <
            /h3> <
            button onClick = {
                () => setShowAddForm(false)
            }
            className = "p-2 hover:bg-gray-100 rounded-lg transition-colors" >
            <
            X className = "w-5 h-5 text-gray-500" / >
            <
            /button> < /
            div >

            <
            div className = "p-6" > {
                formType === 'network' && ( <
                    div className = "space-y-4" >
                    <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
                    <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Network Name < /label> <
                    input type = "text"
                    value = { networkForm.name }
                    onChange = {
                        (e) => setNetworkForm({...networkForm, name: e.target.value })
                    }
                    className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder = "e.g., Baka Villages Network - East Cameroon" /
                    >
                    <
                    /div> <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Region < /label> <
                    input type = "text"
                    value = { networkForm.region }
                    onChange = {
                        (e) => setNetworkForm({...networkForm, region: e.target.value })
                    }
                    className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder = "e.g., East Cameroon" /
                    >
                    <
                    /div> < /
                    div >

                    <
                    div className = "flex justify-end space-x-4" >
                    <
                    button onClick = {
                        () => setShowAddForm(false)
                    }
                    className = "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" >
                    Cancel <
                    /button> <
                    button onClick = { handleAddNetwork }
                    className = "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center" >
                    <
                    Save className = "w-4 h-4 mr-2" / >
                    Add Network <
                    /button> < /
                    div > <
                    /div>
                )
            } <
            /div> < /
            div > <
            /div>
        )
    }

    return ( <
        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
        <
        div className = "flex items-center justify-between mb-6" >
        <
        h2 className = "text-2xl font-bold text-gray-900 flex items-center" >
        <
        MessageCircle className = "w-6 h-6 mr-2 text-blue-600" / >
        Community Communication Management <
        /h2> <
        button onClick = {
            () => {
                setFormType('network')
                setShowAddForm(true)
            }
        }
        className = "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Add Content < /span> < /
        button > <
        /div>

        { /* Tabs */ } <
        div className = "border-b border-gray-200 mb-6" >
        <
        nav className = "flex space-x-8" > {
            tabs.map((tab) => {
                const IconComponent = tab.icon
                return ( <
                    button key = { tab.id }
                    onClick = {
                        () => setActiveTab(tab.id)
                    }
                    className = { `flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
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

        { /* Content */ } <
        div > { activeTab === 'overview' && renderOverview() } { activeTab === 'networks' && renderNetworks() } { /* Other tab content would be implemented here */ } <
        /div>

        { renderAddForm() } <
        /div>
    )
}