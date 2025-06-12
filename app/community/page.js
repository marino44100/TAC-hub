'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
    Users,
    MessageCircle,
    Vote,
    UserCheck,
    Plus,
    Search,
    Filter,
    MapPin,
    Calendar,
    Clock,
    ThumbsUp,
    MessageSquare,
    Eye,
    CheckCircle,
    AlertCircle,
    Globe,
    BookOpen,
    Mic,
    Play,
    Download,
    Share2,
    Heart,
    Star,
    ChevronRight,
    User,
    X
} from 'lucide-react'
import { CommunityCommService } from '../../lib/communityCommService'

export default function CommunityPage() {
    const { user } = useAuth()
    const [commService] = useState(() => new CommunityCommService())
    const [activeTab, setActiveTab] = useState('networks')
    const [searchTerm, setSearchTerm] = useState('')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormType, setCreateFormType] = useState('')
    const [userVotes, setUserVotes] = useState({})

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

    const [teachingForm, setTeachingForm] = useState({
        title: '',
        category: '',
        summary: '',
        keyTeachings: '',
        duration: '',
        language: ''
    })

    const [decisionForm, setDecisionForm] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        votingDeadline: ''
    })

    const [partnerForm, setPartnerForm] = useState({
        name: '',
        type: '',
        description: '',
        contactEmail: '',
        website: '',
        focusAreas: '',
        currentProjects: ''
    })

    useEffect(() => {
        loadData()
        loadUserVotes()
    }, [])

    const loadUserVotes = () => {
        try {
            const savedVotes = localStorage.getItem('userVotes')
            if (savedVotes) {
                setUserVotes(JSON.parse(savedVotes))
            }
        } catch (error) {
            console.error('Failed to load user votes:', error)
        }
    }

    const loadData = () => {
        setLoading(true)
        try {
            const commData = commService.getData()
            setData(commData)
        } catch (error) {
            console.error('Failed to load community data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleVote = async(decisionId, voteType) => {
        try {
            if (!user) {
                alert('Please log in to vote.')
                return
            }

            // Check if user has already voted on this decision
            const voteKey = `${user.email || user.id}_${decisionId}`
            if (userVotes[voteKey]) {
                alert('You have already voted on this decision. Each user can only vote once per decision.')
                return
            }

            // Update the decision data
            const updatedData = {...data }
            const decisionIndex = updatedData.decisionMaking.findIndex(d => d.id === decisionId)

            if (decisionIndex === -1) {
                alert('Decision not found.')
                return
            }

            const decision = updatedData.decisionMaking[decisionIndex]

            // Update vote counts
            if (voteType === 'inFavor') {
                decision.votes.inFavor = (decision.votes.inFavor || 0) + 1
            } else if (voteType === 'against') {
                decision.votes.against = (decision.votes.against || 0) + 1
            } else if (voteType === 'abstain') {
                decision.votes.abstain = (decision.votes.abstain || 0) + 1
            }

            decision.votes.total = (decision.votes.total || 0) + 1

            // Record the user's vote to prevent duplicate voting
            setUserVotes(prev => ({
                ...prev,
                [voteKey]: {
                    voteType,
                    timestamp: new Date().toISOString(),
                    userId: user.email || user.id,
                    decisionId
                }
            }))

            // Update the data state
            setData(updatedData)

            // Store in localStorage for persistence
            localStorage.setItem('userVotes', JSON.stringify({
                ...userVotes,
                [voteKey]: {
                    voteType,
                    timestamp: new Date().toISOString(),
                    userId: user.email || user.id,
                    decisionId
                }
            }))

            alert(`✅ Your vote "${voteType === 'inFavor' ? 'In Favor' : voteType === 'against' ? 'Against' : 'Abstain'}" has been recorded!`)

        } catch (error) {
            alert('Failed to vote: ' + error.message)
        }
    }

    const handleCreateNetwork = () => {
        try {
            if (!user) {
                alert('Please log in to create a network.')
                return
            }

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
                established: new Date().toISOString(),
                activities: [],
                achievements: [],
                challenges: []
            }

            // In a real app, this would save to backend
            console.log('Creating network:', newNetwork)
            alert('✅ Network created successfully! It will be reviewed by administrators.')
            setShowCreateForm(false)
            resetForms()
        } catch (error) {
            alert('Failed to create network: ' + error.message)
        }
    }

    const handleCreateTeaching = () => {
        try {
            if (!user) {
                alert('Please log in to share teachings.')
                return
            }

            const newTeaching = {
                id: Date.now(),
                title: teachingForm.title,
                category: teachingForm.category,
                summary: teachingForm.summary,
                keyTeachings: teachingForm.keyTeachings.split('\n').filter(t => t.trim()),
                duration: teachingForm.duration,
                language: teachingForm.language,
                elder: user.name || user.email,
                community: user.community || 'Community Member',
                status: 'pending_approval',
                dateSubmitted: new Date().toISOString(),
                views: 0,
                likes: 0,
                comments: 0
            }

            console.log('Creating teaching:', newTeaching)
            alert('✅ Teaching submitted successfully! It will be reviewed by administrators.')
            setShowCreateForm(false)
            resetForms()
        } catch (error) {
            alert('Failed to submit teaching: ' + error.message)
        }
    }

    const handleCreateDecision = () => {
        try {
            if (!user) {
                alert('Please log in to propose decisions.')
                return
            }

            const newDecision = {
                id: Date.now(),
                title: decisionForm.title,
                description: decisionForm.description,
                priority: decisionForm.priority,
                category: decisionForm.category,
                proposedBy: user.name || user.email,
                dateProposed: new Date().toISOString(),
                votingDeadline: decisionForm.votingDeadline,
                status: 'voting',
                votes: {
                    inFavor: 0,
                    against: 0,
                    abstain: 0,
                    total: 0
                },
                eligibleVoters: 100, // This would be calculated based on community size
                comments: []
            }

            console.log('Creating decision:', newDecision)
            alert('✅ Decision proposal submitted successfully!')
            setShowCreateForm(false)
            resetForms()
        } catch (error) {
            alert('Failed to propose decision: ' + error.message)
        }
    }

    const handleCreatePartner = () => {
        try {
            if (!user) {
                alert('Please log in to add partners.')
                return
            }

            const newPartner = {
                id: Date.now(),
                name: partnerForm.name,
                type: partnerForm.type,
                description: partnerForm.description,
                contactEmail: partnerForm.contactEmail,
                website: partnerForm.website,
                focusAreas: partnerForm.focusAreas.split(',').map(a => a.trim()),
                currentProjects: partnerForm.currentProjects.split('\n').filter(p => p.trim()),
                status: 'pending_approval',
                dateAdded: new Date().toISOString(),
                funding: {
                    totalCommitted: 0,
                    disbursed: 0,
                    remaining: 0
                }
            }

            console.log('Creating partner:', newPartner)
            alert('✅ Partner information submitted successfully! It will be reviewed by administrators.')
            setShowCreateForm(false)
            resetForms()
        } catch (error) {
            alert('Failed to add partner: ' + error.message)
        }
    }

    const resetForms = () => {
        setNetworkForm({
            name: '',
            region: '',
            villages: '',
            population: '',
            languages: '',
            coordinator: '',
            description: ''
        })
        setTeachingForm({
            title: '',
            category: '',
            summary: '',
            keyTeachings: '',
            duration: '',
            language: ''
        })
        setDecisionForm({
            title: '',
            description: '',
            priority: 'medium',
            category: '',
            votingDeadline: ''
        })
        setPartnerForm({
            name: '',
            type: '',
            description: '',
            contactEmail: '',
            website: '',
            focusAreas: '',
            currentProjects: ''
        })
    }

    const communityTabs = [{
            id: 'networks',
            title: 'Village Networks',
            icon: Users,
            description: 'Connect with village communities across the Congo Basin',
            color: 'blue'
        },
        {
            id: 'teachings',
            title: 'Elder Teachings',
            icon: BookOpen,
            description: 'Traditional knowledge and wisdom from community elders',
            color: 'green'
        },
        {
            id: 'decisions',
            title: 'Decision Making',
            icon: Vote,
            description: 'Community voting and collaborative decision processes',
            color: 'purple'
        },
        {
            id: 'partners',
            title: 'External Partners',
            icon: UserCheck,
            description: 'NGOs, researchers, and organizations working with communities',
            color: 'orange'
        }
    ]

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600 border-blue-200',
            green: 'bg-green-100 text-green-600 border-green-200',
            purple: 'bg-purple-100 text-purple-600 border-purple-200',
            orange: 'bg-orange-100 text-orange-600 border-orange-200'
        }
        return colors[color] || 'bg-gray-100 text-gray-600 border-gray-200'
    }

    const renderNetworks = () => {
        const networks = data ? .villageNetworks || []

        return ( <
            div className = "space-y-6" >
            <
            div className = "flex justify-between items-center" >
            <
            div >
            <
            h3 className = "text-2xl font-bold text-gray-900" > Village Networks < /h3> <
            p className = "text-gray-600 mt-1" >
            Connected communities across the Congo Basin working together
            for conservation and cultural preservation. <
            /p> < /
            div > <
            button onClick = {
                () => {
                    if (!user) {
                        alert('Please log in to create a network.')
                        return
                    }
                    setCreateFormType('network')
                    setShowCreateForm(true)
                }
            }
            className = "bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center" >
            <
            Plus className = "w-4 h-4 mr-2" / >
            Create Network <
            /button> < /
            div >

            <
            div className = "grid grid-cols-1 lg:grid-cols-2 gap-6" > {
                networks.map((network, index) => ( <
                    div key = { network.id || index }
                    className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    div className = "flex justify-between items-start mb-4" >
                    <
                    div >
                    <
                    h4 className = "text-xl font-bold text-gray-900" > { network.name } < /h4> <
                    div className = "flex items-center text-sm text-gray-500 mt-1" >
                    <
                    MapPin className = "w-4 h-4 mr-1" / > { network.region } <
                    /div> < /
                    div > <
                    span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                  network.status === 'active' ? 'bg-green-100 text-green-700' :
                  network.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }` } > { network.status.replace('_', ' ') } <
                    /span> < /
                    div >

                    <
                    p className = "text-gray-600 mb-4" > { network.description } < /p>

                    <
                    div className = "grid grid-cols-2 gap-4 mb-4" >
                    <
                    div className = "bg-gray-50 rounded-lg p-3" >
                    <
                    div className = "text-sm text-gray-600" > Villages < /div> <
                    div className = "text-lg font-semibold text-gray-900" > { network.villages ? .length || 0 } < /div> < /
                    div > <
                    div className = "bg-gray-50 rounded-lg p-3" >
                    <
                    div className = "text-sm text-gray-600" > Population < /div> <
                    div className = "text-lg font-semibold text-gray-900" > { network.population ? .toLocaleString() } < /div> < /
                    div > <
                    /div>

                    <
                    div className = "space-y-3" >
                    <
                    div >
                    <
                    h5 className = "font-semibold text-gray-700 text-sm mb-2" > Recent Activities < /h5> <
                    ul className = "text-sm text-gray-600 space-y-1" > {
                        (network.activities || []).slice(0, 3).map((activity, i) => ( <
                            li key = { i }
                            className = "flex items-start" >
                            <
                            CheckCircle className = "w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" / > { activity } <
                            /li>
                        ))
                    } <
                    /ul> < /
                    div >

                    <
                    div >
                    <
                    h5 className = "font-semibold text-gray-700 text-sm mb-2" > Key Achievements < /h5> <
                    ul className = "text-sm text-gray-600 space-y-1" > {
                        (network.achievements || []).slice(0, 2).map((achievement, i) => ( <
                            li key = { i }
                            className = "flex items-start" >
                            <
                            Star className = "w-3 h-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" / > { achievement } <
                            /li>
                        ))
                    } <
                    /ul> < /
                    div > <
                    /div>

                    <
                    div className = "flex items-center justify-between mt-4 pt-4 border-t border-gray-100" >
                    <
                    div className = "flex items-center text-sm text-gray-500" >
                    <
                    User className = "w-4 h-4 mr-1" / > { network.coordinator } <
                    /div> <
                    div className = "flex items-center space-x-2" >
                    <
                    span className = "text-xs text-gray-500" >
                    Est. { new Date(network.established).getFullYear() } <
                    /span> <
                    button className = "text-blue-600 hover:text-blue-700 text-sm font-medium" >
                    View Details <
                    /button> < /
                    div > <
                    /div> < /
                    div >
                ))
            } <
            /div> < /
            div >
        )
    }

    const renderTeachings = () => {
        const teachings = commService.getElderTeachings('approved')

        return ( <
            div className = "space-y-6" >
            <
            div className = "flex justify-between items-center" >
            <
            div >
            <
            h3 className = "text-2xl font-bold text-gray-900" > Elder Teachings < /h3> <
            p className = "text-gray-600 mt-1" >
            Traditional knowledge and wisdom shared by community elders across the Congo Basin. <
            /p> < /
            div > <
            button onClick = {
                () => {
                    if (!user) {
                        alert('Please log in to share teachings.')
                        return
                    }
                    setCreateFormType('teaching')
                    setShowCreateForm(true)
                }
            }
            className = "bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center" >
            <
            Plus className = "w-4 h-4 mr-2" / >
            Share Teaching <
            /button> < /
            div >

            <
            div className = "grid grid-cols-1 lg:grid-cols-2 gap-6" > {
                teachings.map((teaching, index) => ( <
                    div key = { teaching.id || index }
                    className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    div className = "flex items-start justify-between mb-4" >
                    <
                    div className = "flex-1" >
                    <
                    h4 className = "text-xl font-bold text-gray-900 mb-2" > { teaching.title } < /h4> <
                    div className = "flex items-center text-sm text-gray-500 mb-2" >
                    <
                    User className = "w-4 h-4 mr-1" / > { teaching.elder }• { teaching.community } <
                    /div> <
                    span className = "inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium" > { teaching.category } <
                    /span> < /
                    div > <
                    div className = "flex items-center space-x-2" >
                    <
                    Mic className = "w-5 h-5 text-gray-400" / >
                    <
                    span className = "text-sm text-gray-500" > { teaching.duration } < /span> < /
                    div > <
                    /div>

                    <
                    p className = "text-gray-600 mb-4" > { teaching.summary } < /p>

                    <
                    div className = "space-y-3 mb-4" >
                    <
                    div >
                    <
                    h5 className = "font-semibold text-gray-700 text-sm mb-2" > Key Teachings < /h5> <
                    ul className = "text-sm text-gray-600 space-y-1" > {
                        (teaching.keyTeachings || []).slice(0, 3).map((keyTeaching, i) => ( <
                            li key = { i }
                            className = "flex items-start" >
                            <
                            span className = "text-green-500 mr-2" > • < /span> { keyTeaching } < /
                            li >
                        ))
                    } <
                    /ul> < /
                    div > <
                    /div>

                    <
                    div className = "flex items-center justify-between pt-4 border-t border-gray-100" >
                    <
                    div className = "flex items-center space-x-4 text-sm text-gray-500" >
                    <
                    span className = "flex items-center" >
                    <
                    Eye className = "w-4 h-4 mr-1" / > { teaching.views } <
                    /span> <
                    span className = "flex items-center" >
                    <
                    Heart className = "w-4 h-4 mr-1" / > { teaching.likes } <
                    /span> <
                    span className = "flex items-center" >
                    <
                    MessageSquare className = "w-4 h-4 mr-1" / > { teaching.comments } <
                    /span> < /
                    div > <
                    div className = "flex items-center space-x-2" >
                    <
                    button className = "p-2 text-gray-400 hover:text-green-600 transition-colors" >
                    <
                    Play className = "w-4 h-4" / >
                    <
                    /button> <
                    button className = "p-2 text-gray-400 hover:text-blue-600 transition-colors" >
                    <
                    Download className = "w-4 h-4" / >
                    <
                    /button> <
                    button className = "p-2 text-gray-400 hover:text-purple-600 transition-colors" >
                    <
                    Share2 className = "w-4 h-4" / >
                    <
                    /button> < /
                    div > <
                    /div> < /
                    div >
                ))
            } <
            /div> < /
            div >
        )
    }

    const renderDecisions = () => {
        const decisions = data ? .decisionMaking || []

        return ( <
            div className = "space-y-6" >
            <
            div className = "flex justify-between items-center" >
            <
            div >
            <
            h3 className = "text-2xl font-bold text-gray-900" > Community Decision Making < /h3> <
            p className = "text-gray-600 mt-1" >
            Participate in community decisions through transparent voting and discussion. <
            /p> < /
            div > <
            button onClick = {
                () => {
                    if (!user) {
                        alert('Please log in to propose decisions.')
                        return
                    }
                    setCreateFormType('decision')
                    setShowCreateForm(true)
                }
            }
            className = "bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center" >
            <
            Plus className = "w-4 h-4 mr-2" / >
            Propose Decision <
            /button> < /
            div >

            <
            div className = "space-y-6" > {
                decisions.map((decision, index) => ( <
                    div key = { decision.id || index }
                    className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    div className = "flex justify-between items-start mb-4" >
                    <
                    div className = "flex-1" >
                    <
                    div className = "flex items-center space-x-3 mb-2" >
                    <
                    h4 className = "text-xl font-bold text-gray-900" > { decision.title } < /h4> <
                    span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                      decision.status === 'voting' ? 'bg-blue-100 text-blue-700' :
                      decision.status === 'approved' ? 'bg-green-100 text-green-700' :
                      decision.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }` } > { decision.status.replace('_', ' ') } <
                    /span> <
                    span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                      decision.priority === 'high' ? 'bg-red-100 text-red-700' :
                      decision.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }` } > { decision.priority }
                    priority <
                    /span> < /
                    div > <
                    div className = "flex items-center text-sm text-gray-500 mb-2" >
                    <
                    User className = "w-4 h-4 mr-1" / >
                    Proposed by { decision.proposedBy } <
                    /div> <
                    div className = "flex items-center text-sm text-gray-500" >
                    <
                    Calendar className = "w-4 h-4 mr-1" / > { new Date(decision.dateProposed).toLocaleDateString() } {
                        decision.votingDeadline && ( <
                            >
                            <
                            span className = "mx-2" > • < /span> <
                            Clock className = "w-4 h-4 mr-1" / >
                            Voting ends { new Date(decision.votingDeadline).toLocaleDateString() } <
                            />
                        )
                    } <
                    /div> < /
                    div > <
                    /div>

                    <
                    p className = "text-gray-600 mb-4" > { decision.description } < /p>

                    {
                        decision.status === 'voting' && ( <
                            div className = "mb-4" >
                            <
                            div className = "flex items-center justify-between mb-3" >
                            <
                            h5 className = "font-semibold text-gray-700" > Current Votes < /h5> <
                            span className = "text-sm text-gray-500" > { decision.votes ? .total || 0 }
                            of { decision.eligibleVoters || 0 }
                            eligible voters <
                            /span> < /
                            div >

                            <
                            div className = "space-y-2 mb-4" >
                            <
                            div className = "flex items-center justify-between" >
                            <
                            span className = "text-sm text-gray-600" > In Favor < /span> <
                            span className = "text-sm font-medium text-green-600" > { decision.votes ? .inFavor || 0 } < /span> < /
                            div > <
                            div className = "w-full bg-gray-200 rounded-full h-2" >
                            <
                            div className = "bg-green-500 h-2 rounded-full"
                            style = {
                                { width: `${((decision.votes?.inFavor || 0) / (decision.eligibleVoters || 1)) * 100}%` }
                            } >
                            <
                            /div> < /
                            div >

                            <
                            div className = "flex items-center justify-between" >
                            <
                            span className = "text-sm text-gray-600" > Against < /span> <
                            span className = "text-sm font-medium text-red-600" > { decision.votes ? .against || 0 } < /span> < /
                            div > <
                            div className = "w-full bg-gray-200 rounded-full h-2" >
                            <
                            div className = "bg-red-500 h-2 rounded-full"
                            style = {
                                { width: `${((decision.votes?.against || 0) / (decision.eligibleVoters || 1)) * 100}%` }
                            } >
                            <
                            /div> < /
                            div >

                            <
                            div className = "flex items-center justify-between" >
                            <
                            span className = "text-sm text-gray-600" > Abstain < /span> <
                            span className = "text-sm font-medium text-gray-600" > { decision.votes ? .abstain || 0 } < /span> < /
                            div > <
                            div className = "w-full bg-gray-200 rounded-full h-2" >
                            <
                            div className = "bg-gray-500 h-2 rounded-full"
                            style = {
                                { width: `${((decision.votes?.abstain || 0) / (decision.eligibleVoters || 1)) * 100}%` }
                            } >
                            <
                            /div> < /
                            div > <
                            /div>

                            {
                                user && (() => {
                                    const voteKey = `${user.email || user.id}_${decision.id}`
                                    const userVote = userVotes[voteKey]
                                    const hasVoted = !!userVote

                                    return ( <
                                        div className = "space-y-3" > {
                                            hasVoted && ( <
                                                div className = "bg-blue-50 border border-blue-200 rounded-lg p-3" >
                                                <
                                                p className = "text-sm text-blue-800" > ✅You voted: < strong > {
                                                    userVote.voteType === 'inFavor' ? 'In Favor' : userVote.voteType === 'against' ? 'Against' : 'Abstain'
                                                } <
                                                /strong> <
                                                span className = "text-blue-600 ml-2" >
                                                ({ new Date(userVote.timestamp).toLocaleDateString() }) <
                                                /span> <
                                                /p> <
                                                /div>
                                            )
                                        }

                                        <
                                        div className = "flex space-x-3" >
                                        <
                                        button onClick = {
                                            () => handleVote(decision.id, 'inFavor') }
                                        disabled = { hasVoted }
                                        className = { `flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                                        hasVoted
                                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            : 'bg-green-600 text-white hover:bg-green-700'
                                                    } ${userVote?.voteType === 'inFavor' ? 'ring-2 ring-green-400' : ''}` } >
                                        { userVote ? .voteType === 'inFavor' ? '✓ ' : '' }
                                        Vote In Favor <
                                        /button>

                                        <
                                        button onClick = {
                                            () => handleVote(decision.id, 'against') }
                                        disabled = { hasVoted }
                                        className = { `flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                                        hasVoted
                                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            : 'bg-red-600 text-white hover:bg-red-700'
                                                    } ${userVote?.voteType === 'against' ? 'ring-2 ring-red-400' : ''}` } >
                                        { userVote ? .voteType === 'against' ? '✓ ' : '' }
                                        Vote Against <
                                        /button>

                                        <
                                        button onClick = {
                                            () => handleVote(decision.id, 'abstain') }
                                        disabled = { hasVoted }
                                        className = { `flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                                        hasVoted
                                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            : 'bg-gray-600 text-white hover:bg-gray-700'
                                                    } ${userVote?.voteType === 'abstain' ? 'ring-2 ring-gray-400' : ''}` } >
                                        { userVote ? .voteType === 'abstain' ? '✓ ' : '' }
                                        Abstain <
                                        /button> <
                                        /div> <
                                        /div>
                                    )
                                })()
                            } <
                            /div>
                        )
                    } <
                    /div>
                ))
            } <
            /div> < /
            div >
        )
    }

    const renderPartners = () => {
        const partners = data ? .externalPartners || []

        return ( <
            div className = "space-y-6" >
            <
            div className = "flex justify-between items-center" >
            <
            div >
            <
            h3 className = "text-2xl font-bold text-gray-900" > External Partners < /h3> <
            p className = "text-gray-600 mt-1" >
            Organizations, NGOs, and institutions collaborating with Congo Basin communities. <
            /p> < /
            div > <
            button onClick = {
                () => {
                    if (!user) {
                        alert('Please log in to add partners.')
                        return
                    }
                    setCreateFormType('partner')
                    setShowCreateForm(true)
                }
            }
            className = "bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center" >
            <
            Plus className = "w-4 h-4 mr-2" / >
            Add Partner <
            /button> < /
            div >

            <
            div className = "grid grid-cols-1 lg:grid-cols-2 gap-6" > {
                partners.map((partner, index) => ( <
                    div key = { partner.id || index }
                    className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    div className = "flex justify-between items-start mb-4" >
                    <
                    div >
                    <
                    h4 className = "text-xl font-bold text-gray-900" > { partner.name } < /h4> <
                    div className = "flex items-center space-x-2 mt-1" >
                    <
                    span className = "text-sm text-gray-500" > { partner.type } < /span> <
                    span className = "text-gray-300" > • < /span> <
                    span className = "text-sm text-gray-500" > { partner.country } < /span> < /
                    div > <
                    span className = "inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium" > { partner.category } <
                    /span> < /
                    div > <
                    span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                  partner.status === 'active' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }` } > { partner.status } <
                    /span> < /
                    div >

                    <
                    p className = "text-gray-600 mb-4" > { partner.description } < /p>

                    <
                    div className = "space-y-3 mb-4" >
                    <
                    div >
                    <
                    h5 className = "font-semibold text-gray-700 text-sm mb-2" > Current Projects < /h5> <
                    ul className = "text-sm text-gray-600 space-y-1" > {
                        (partner.currentProjects || []).slice(0, 3).map((project, i) => ( <
                            li key = { i }
                            className = "flex items-start" >
                            <
                            ChevronRight className = "w-3 h-3 text-gray-400 mr-2 mt-1 flex-shrink-0" / > { project } <
                            /li>
                        ))
                    } <
                    /ul> < /
                    div >

                    {
                        partner.funding && ( <
                            div className = "bg-gray-50 rounded-lg p-3" >
                            <
                            h5 className = "font-semibold text-gray-700 text-sm mb-2" > Funding < /h5> <
                            div className = "grid grid-cols-2 gap-2 text-xs" >
                            <
                            div >
                            <
                            span className = "text-gray-500" > Total: < /span> <
                            span className = "text-gray-900 ml-1" > { partner.funding.totalCommitted } < /span> < /
                            div > <
                            div >
                            <
                            span className = "text-gray-500" > Disbursed: < /span> <
                            span className = "text-gray-900 ml-1" > { partner.funding.disbursed } < /span> < /
                            div > <
                            /div> < /
                            div >
                        )
                    } <
                    /div>

                    <
                    div className = "flex items-center justify-between pt-4 border-t border-gray-100" >
                    <
                    div className = "text-sm text-gray-500" >
                    <
                    div > { partner.contactPerson } < /div> <
                    div className = "text-xs" > { partner.email } < /div> < /
                    div > <
                    div className = "flex items-center space-x-2" >
                    <
                    span className = "text-xs text-gray-500" >
                    Since { new Date(partner.established).getFullYear() } <
                    /span> <
                    button className = "text-orange-600 hover:text-orange-700 text-sm font-medium" >
                    View Details <
                    /button> < /
                    div > <
                    /div> < /
                    div >
                ))
            } <
            /div> < /
            div >
        )
    }

    const renderContent = () => {
        if (loading) {
            return ( <
                div className = "flex items-center justify-center h-64" >
                <
                div className = "text-center" >
                <
                div className = "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" > < /div> <
                p className = "text-gray-600" > Loading community data... < /p> < /
                div > <
                /div>
            )
        }

        switch (activeTab) {
            case 'networks':
                return renderNetworks()
            case 'teachings':
                return renderTeachings()
            case 'decisions':
                return renderDecisions()
            case 'partners':
                return renderPartners()
            default:
                return renderNetworks()
        }
    }

    return ( <
            main className = "min-h-screen bg-gray-50" >
            <
            Header / >

            <
            div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
            <
            div className = "text-center mb-12" >
            <
            h1 className = "text-4xl font-bold text-gray-900 mb-4" > Community Communication < /h1> <
            p className = "text-xl text-gray-600 max-w-3xl mx-auto" >
            Connect, collaborate, and make decisions together across Congo Basin communities.Share knowledge, vote on important issues, and work with partners
            for conservation. <
            /p> < /
            div >

            <
            div className = "max-w-2xl mx-auto mb-8" >
            <
            div className = "relative" >
            <
            Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" / >
            <
            input type = "text"
            placeholder = "Search networks, teachings, decisions..."
            value = { searchTerm }
            onChange = {
                (e) => setSearchTerm(e.target.value)
            }
            className = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
            >
            <
            button className = "absolute right-3 top-1/2 transform -translate-y-1/2" >
            <
            Filter className = "w-5 h-5 text-gray-400" / >
            <
            /button> < /
            div > <
            /div>

            <
            div className = "flex flex-wrap justify-center gap-4 mb-8" > {
                communityTabs.map((tab) => ( <
                        button key = { tab.id }
                        onClick = {
                            () => setActiveTab(tab.id)
                        }
                        className = { `flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? `${getColorClasses(tab.color)} border-2`
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.title}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          {renderContent()}
        </div>
      </div>

      {renderCreateForm()}

      <Footer />
    </main>
  )

  function renderCreateForm() {
    if (!showCreateForm) return null

    const getFormTitle = () => {
      switch (createFormType) {
        case 'network': return 'Create Village Network'
        case 'teaching': return 'Share Elder Teaching'
        case 'decision': return 'Propose Decision'
        case 'partner': return 'Add External Partner'
        default: return 'Create Content'
      }
    }

    const getFormHandler = () => {
      switch (createFormType) {
        case 'network': return handleCreateNetwork
        case 'teaching': return handleCreateTeaching
        case 'decision': return handleCreateDecision
        case 'partner': return handleCreatePartner
        default: return () => {}
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">{getFormTitle()}</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {createFormType === 'network' && renderNetworkForm()}
            {createFormType === 'teaching' && renderTeachingForm()}
            {createFormType === 'decision' && renderDecisionForm()}
            {createFormType === 'partner' && renderPartnerForm()}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={getFormHandler()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderNetworkForm() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Network Name</label>
            <input
              type="text"
              value={networkForm.name}
              onChange={(e) => setNetworkForm({...networkForm, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Baka Villages Network - East Cameroon"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <input
              type="text"
              value={networkForm.region}
              onChange={(e) => setNetworkForm({...networkForm, region: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., East Cameroon"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Villages (comma-separated)</label>
            <input
              type="text"
              value={networkForm.villages}
              onChange={(e) => setNetworkForm({...networkForm, villages: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Djoum, Mintom, Sangmelima"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Population</label>
            <input
              type="number"
              value={networkForm.population}
              onChange={(e) => setNetworkForm({...networkForm, population: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 15000"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Languages (comma-separated)</label>
            <input
              type="text"
              value={networkForm.languages}
              onChange={(e) => setNetworkForm({...networkForm, languages: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Baka, French"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Network Coordinator</label>
            <input
              type="text"
              value={networkForm.coordinator}
              onChange={(e) => setNetworkForm({...networkForm, coordinator: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Chief Ngozi Mbala"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={networkForm.description}
            onChange={(e) => setNetworkForm({...networkForm, description: e.target.value})}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the network's purpose and focus"
            required
          />
        </div>
      </div>
    )
  }

  function renderTeachingForm() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Title</label>
            <input
              type="text"
              value={teachingForm.title}
              onChange={(e) => setTeachingForm({...teachingForm, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Traditional Forest Medicine"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={teachingForm.category}
              onChange={(e) => setTeachingForm({...teachingForm, category: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              <option value="Spiritual Ecology">Spiritual Ecology</option>
              <option value="Traditional Skills">Traditional Skills</option>
              <option value="Medicinal Knowledge">Medicinal Knowledge</option>
              <option value="Climate Wisdom">Climate Wisdom</option>
              <option value="Cultural Practices">Cultural Practices</option>
              <option value="Conservation Methods">Conservation Methods</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={teachingForm.duration}
              onChange={(e) => setTeachingForm({...teachingForm, duration: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., 15 minutes"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={teachingForm.language}
              onChange={(e) => setTeachingForm({...teachingForm, language: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select Language</option>
              <option value="Lingala">Lingala</option>
              <option value="French">French</option>
              <option value="Baka">Baka</option>
              <option value="Mbuti">Mbuti</option>
              <option value="Kikongo">Kikongo</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
          <textarea
            value={teachingForm.summary}
            onChange={(e) => setTeachingForm({...teachingForm, summary: e.target.value})}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Brief summary of the teaching"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Teachings (one per line)</label>
          <textarea
            value={teachingForm.keyTeachings}
            onChange={(e) => setTeachingForm({...teachingForm, keyTeachings: e.target.value})}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter each key teaching on a new line"
            required
          />
        </div>
      </div>
    )
  }

  function renderDecisionForm() {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Decision Title</label>
          <input
            type="text"
            value={decisionForm.title}
            onChange={(e) => setDecisionForm({...decisionForm, title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Establish New Protected Forest Area"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={decisionForm.priority}
              onChange={(e) => setDecisionForm({...decisionForm, priority: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={decisionForm.category}
              onChange={(e) => setDecisionForm({...decisionForm, category: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              <option value="Forest Conservation">Forest Conservation</option>
              <option value="Resource Management">Resource Management</option>
              <option value="Cultural Preservation">Cultural Preservation</option>
              <option value="Community Development">Community Development</option>
              <option value="External Partnerships">External Partnerships</option>
              <option value="Traditional Practices">Traditional Practices</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Voting Deadline</label>
          <input
            type="date"
            value={decisionForm.votingDeadline}
            onChange={(e) => setDecisionForm({...decisionForm, votingDeadline: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={decisionForm.description}
            onChange={(e) => setDecisionForm({...decisionForm, description: e.target.value})}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Detailed description of the proposed decision"
            required
          />
        </div>
      </div>
    )
  }

  function renderPartnerForm() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
            <input
              type="text"
              value={partnerForm.name}
              onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., WWF Central Africa"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
            <select
              value={partnerForm.type}
              onChange={(e) => setPartnerForm({...partnerForm, type: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Select Type</option>
              <option value="NGO">NGO</option>
              <option value="Research Institution">Research Institution</option>
              <option value="Government Agency">Government Agency</option>
              <option value="International Organization">International Organization</option>
              <option value="Private Foundation">Private Foundation</option>
              <option value="Academic Institution">Academic Institution</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              value={partnerForm.contactEmail}
              onChange={(e) => setPartnerForm({...partnerForm, contactEmail: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="contact@organization.org"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={partnerForm.website}
              onChange={(e) => setPartnerForm({...partnerForm, website: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="https://www.organization.org"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas (comma-separated)</label>
          <input
            type="text"
            value={partnerForm.focusAreas}
            onChange={(e) => setPartnerForm({...partnerForm, focusAreas: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Conservation, Community Development, Research"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={partnerForm.description}
            onChange={(e) => setPartnerForm({...partnerForm, description: e.target.value})}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Brief description of the organization and its mission"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Projects (one per line)</label>
          <textarea
            value={partnerForm.currentProjects}
            onChange={(e) => setPartnerForm({...partnerForm, currentProjects: e.target.value})}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="List current projects, one per line"
          />
        </div>
      </div>
    )
  }
}