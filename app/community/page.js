'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Users, BookOpen, MessageCircle, Building, Play, Volume2, ThumbsUp, Share2, MapPin, Clock, Vote, CheckCircle } from 'lucide-react'

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('village-network')
    const [selectedTeaching, setSelectedTeaching] = useState(null)

    const communityFeatures = [{
            id: 'village-network',
            title: 'Village Network',
            icon: Users,
            description: 'Connect with other communities doing similar work',
            color: 'green'
        },
        {
            id: 'elder-teachings',
            title: 'Elder Teachings',
            icon: BookOpen,
            description: 'Video and audio recordings of traditional knowledge',
            color: 'blue'
        },
        {
            id: 'decision-making',
            title: 'Decision Making',
            icon: Vote,
            description: 'Digital voting for community conservation decisions',
            color: 'purple'
        },
        {
            id: 'external-partners',
            title: 'External Partners',
            icon: Building,
            description: 'Manage relationships with NGOs and government',
            color: 'orange'
        }
    ]

    const connectedVillages = [{
            name: 'Mbandaka Village',
            region: 'Équateur Province',
            population: 2400,
            projects: ['Reforestation', 'Sustainable fishing', 'Eco-tourism'],
            status: 'Very Active',
            lastUpdate: '2 hours ago',
            sharedKnowledge: 15,
            image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=300&h=200&fit=crop'
        },
        {
            name: 'Kisangani Community',
            region: 'Tshopo Province',
            population: 1800,
            projects: ['Sacred forest protection', 'Traditional medicine', 'Youth education'],
            status: 'Active',
            lastUpdate: '1 day ago',
            sharedKnowledge: 23,
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'
        },
        {
            name: 'Bumba Riverside',
            region: 'Mongala Province',
            population: 3200,
            projects: ['River conservation', 'Fishing regulations', 'Mangrove restoration'],
            status: 'Growing',
            lastUpdate: '3 days ago',
            sharedKnowledge: 8,
            image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300&h=200&fit=crop'
        }
    ]

    const elderTeachings = [{
            id: 1,
            title: 'Traditional Forest Management Practices',
            elder: 'Elder Mama Ngozi',
            community: 'Mbandaka Village',
            duration: '45 min',
            type: 'video',
            language: 'Lingala (with subtitles)',
            topics: ['Selective harvesting', 'Sacred groves', 'Seasonal timing', 'Community protocols'],
            views: 247,
            likes: 89,
            date: '2024-01-10',
            thumbnail: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=300&h=200&fit=crop'
        },
        {
            id: 2,
            title: 'Reading Weather Signs from Nature',
            elder: 'Chief Bwana Mkuu',
            community: 'Kisangani Region',
            duration: '32 min',
            type: 'audio',
            language: 'Swahili (with translation)',
            topics: ['Animal behavior', 'Plant indicators', 'Sky patterns', 'Seasonal predictions'],
            views: 156,
            likes: 67,
            date: '2024-01-08',
            thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'
        },
        {
            id: 3,
            title: 'Medicinal Plants of the Congo Basin',
            elder: 'Healer Mama Koko',
            community: 'Bumba Riverside',
            duration: '1h 15min',
            type: 'video',
            language: 'French (with local language)',
            topics: ['Plant identification', 'Preparation methods', 'Dosage guidelines', 'Sustainable harvesting'],
            views: 312,
            likes: 134,
            date: '2024-01-05',
            thumbnail: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300&h=200&fit=crop'
        }
    ]

    const activeVotes = [{
            id: 1,
            title: 'Expand Protected Forest Area by 200 Hectares',
            description: 'Proposal to extend our community forest protection to include the riverside area where elephants frequently visit.',
            proposedBy: 'Conservation Committee',
            deadline: '2024-01-20',
            totalVotes: 156,
            yesVotes: 124,
            noVotes: 32,
            status: 'Active',
            category: 'Forest Protection'
        },
        {
            id: 2,
            title: 'Partner with University Research Team',
            description: 'Allow researchers from Kinshasa University to study our traditional medicine practices in exchange for modern health training.',
            proposedBy: 'Elder Council',
            deadline: '2024-01-25',
            totalVotes: 89,
            yesVotes: 67,
            noVotes: 22,
            status: 'Active',
            category: 'External Partnership'
        }
    ]

    const externalPartners = [{
            name: 'Congo Basin Forest Initiative',
            type: 'International NGO',
            relationship: 'Funding Partner',
            since: '2022',
            projects: ['Reforestation funding', 'Technical training', 'Equipment provision'],
            status: 'Active',
            contact: 'Dr. Marie Dubois',
            nextMeeting: '2024-01-18'
        },
        {
            name: 'Ministry of Environment - DRC',
            type: 'Government Agency',
            relationship: 'Regulatory Partner',
            since: '2021',
            projects: ['Legal framework', 'Protected area designation', 'Policy advocacy'],
            status: 'Active',
            contact: 'Director Jean-Claude Mbuyi',
            nextMeeting: '2024-01-22'
        },
        {
            name: 'University of Kinshasa',
            type: 'Academic Institution',
            relationship: 'Research Partner',
            since: '2023',
            projects: ['Biodiversity studies', 'Student exchanges', 'Knowledge documentation'],
            status: 'New',
            contact: 'Prof. Sarah Mukendi',
            nextMeeting: '2024-01-16'
        }
    ]

    const getColorClasses = (color) => {
        const colors = {
            green: 'bg-green-100 text-green-600 border-green-200',
            blue: 'bg-blue-100 text-blue-600 border-blue-200',
            purple: 'bg-purple-100 text-purple-600 border-purple-200',
            orange: 'bg-orange-100 text-orange-600 border-orange-200'
        }
        return colors[color] || 'bg-gray-100 text-gray-600 border-gray-200'
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Very Active':
                return 'bg-green-100 text-green-700'
            case 'Active':
                return 'bg-blue-100 text-blue-700'
            case 'Growing':
                return 'bg-purple-100 text-purple-700'
            case 'New':
                return 'bg-orange-100 text-orange-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'village-network':
                return ( <
                        div className = "space-y-6" >
                        <
                        div className = "flex justify-between items-center" >
                        <
                        h3 className = "text-2xl font-bold text-gray-900" > Village Network < /h3> <
                        button className = "bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center" >
                        <
                        Users className = "w-4 h-4 mr-2" / >
                        Connect New Village <
                        /button> < /
                        div >

                        { /* Network Stats */ } <
                        div className = "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" >
                        <
                        div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                        <
                        div className = "text-2xl font-bold text-green-600" > 247 < /div> <
                        div className = "text-sm text-gray-600" > Connected Communities < /div> < /
                        div > <
                        div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                        <
                        div className = "text-2xl font-bold text-blue-600" > 1, 847 < /div> <
                        div className = "text-sm text-gray-600" > Shared Knowledge Items < /div> < /
                        div > <
                        div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                        <
                        div className = "text-2xl font-bold text-purple-600" > 89 < /div> <
                        div className = "text-sm text-gray-600" > Active Projects < /div> < /
                        div > <
                        div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                        <
                        div className = "text-2xl font-bold text-orange-600" > 156 < /div> <
                        div className = "text-sm text-gray-600" > Success Stories < /div> < /
                        div > <
                        /div>

                        { /* Connected Villages */ } <
                        div className = "space-y-6" >
                        <
                        h4 className = "text-lg font-semibold text-gray-900" > Connected Villages < /h4> {
                        connectedVillages.map((village, index) => ( <
                            div key = { index }
                            className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                            <
                            div className = "flex flex-col lg:flex-row gap-6" >
                            <
                            img src = { village.image }
                            alt = { village.name }
                            className = "w-full lg:w-48 h-32 object-cover rounded-lg" /
                            >
                            <
                            div className = "flex-1" >
                            <
                            div className = "flex justify-between items-start mb-3" >
                            <
                            div >
                            <
                            h5 className = "text-xl font-bold text-gray-900" > { village.name } < /h5> <
                            p className = "text-sm text-gray-500 flex items-center" >
                            <
                            MapPin className = "w-4 h-4 mr-1" / > { village.region }• { village.population.toLocaleString() }
                            people <
                            /p> < /
                            div > <
                            span className = { `px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(village.status)}` } > { village.status } <
                            /span> < /
                            div >

                            <
                            div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                            <
                            div >
                            <
                            h6 className = "font-medium text-gray-700 mb-2" > Active Projects < /h6> <
                            div className = "flex flex-wrap gap-1" > {
                                village.projects.map((project, i) => ( <
                                    span key = { i }
                                    className = "px-2 py-1 bg-green-100 text-green-700 rounded text-xs" > { project } <
                                    /span>
                                ))
                            } <
                            /div> < /
                            div > <
                            div >
                            <
                            h6 className = "font-medium text-gray-700 mb-2" > Knowledge Sharing < /h6> <
                            p className = "text-sm text-gray-600" > { village.sharedKnowledge }
                            items shared < /p> <
                            p className = "text-xs text-gray-500" > Last update: { village.lastUpdate } < /p> < /
                            div > <
                            /div>

                            <
                            div className = "flex items-center space-x-4" >
                            <
                            button className = "text-primary-600 hover:text-primary-700 font-medium text-sm" >
                            View Profile <
                            /button> <
                            button className = "text-primary-600 hover:text-primary-700 font-medium text-sm" >
                            Send Message <
                            /button> <
                            button className = "text-primary-600 hover:text-primary-700 font-medium text-sm" >
                            Share Knowledge <
                            /button> < /
                            div > <
                            /div> < /
                            div > <
                            /div>
                        ))
                    } <
                    /div> < /
                    div >
        )

        case 'elder-teachings':
            return ( <
                div className = "space-y-6" >
                <
                div className = "flex justify-between items-center" >
                <
                h3 className = "text-2xl font-bold text-gray-900" > Elder Teachings < /h3> <
                button className = "bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center" >
                <
                BookOpen className = "w-4 h-4 mr-2" / >
                Upload Teaching <
                /button> <
                /div>

                { /* Teaching Categories */ } <
                div className = "flex flex-wrap gap-2 mb-6" >
                <
                button className = "px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium" >
                All Teachings <
                /button> <
                button className = "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium" >
                Forest Management <
                /button> <
                button className = "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium" >
                Traditional Medicine <
                /button> <
                button className = "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium" >
                Weather Wisdom <
                /button> <
                button className = "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium" >
                Cultural Practices <
                /button> <
                /div>

                { /* Elder Teachings Grid */ } <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" > {
                    elderTeachings.map((teaching) => ( <
                        div key = { teaching.id }
                        className = "bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow" >
                        <
                        div className = "relative" >
                        <
                        img src = { teaching.thumbnail }
                        alt = { teaching.title }
                        className = "w-full h-48 object-cover" /
                        >
                        <
                        div className = "absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center" > {
                            teaching.type === 'video' ? ( <
                                Play className = "w-12 h-12 text-white" / >
                            ) : ( <
                                Volume2 className = "w-12 h-12 text-white" / >
                            )
                        } <
                        /div> <
                        div className = "absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs" > { teaching.duration } <
                        /div> <
                        div className = "absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs" > { teaching.type } <
                        /div> <
                        /div>

                        <
                        div className = "p-4" >
                        <
                        h4 className = "text-lg font-bold text-gray-900 mb-2" > { teaching.title } < /h4> <
                        p className = "text-sm text-gray-600 mb-3" >
                        By { teaching.elder }• { teaching.community } <
                        /p> <
                        p className = "text-xs text-gray-500 mb-3" > { teaching.language } < /p>

                        <
                        div className = "mb-4" >
                        <
                        h5 className = "font-medium text-gray-700 text-sm mb-2" > Topics Covered < /h5> <
                        div className = "flex flex-wrap gap-1" > {
                            teaching.topics.slice(0, 3).map((topic, i) => ( <
                                span key = { i }
                                className = "px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs" > { topic } <
                                /span>
                            ))
                        } {
                            teaching.topics.length > 3 && ( <
                                span className = "px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs" >
                                +{ teaching.topics.length - 3 }
                                more <
                                /span>
                            )
                        } <
                        /div> <
                        /div>

                        <
                        div className = "flex items-center justify-between text-sm text-gray-500" >
                        <
                        div className = "flex items-center space-x-3" >
                        <
                        span className = "flex items-center" >
                        <
                        Play className = "w-4 h-4 mr-1" / > { teaching.views } <
                        /span> <
                        span className = "flex items-center" >
                        <
                        ThumbsUp className = "w-4 h-4 mr-1" / > { teaching.likes } <
                        /span> <
                        /div> <
                        button className = "text-primary-600 hover:text-primary-700 font-medium" >
                        Watch Now <
                        /button> <
                        /div> <
                        /div> <
                        /div>
                    ))
                } <
                /div> <
                /div>
            )

        case 'decision-making':
            return ( <
                div className = "space-y-6" >
                <
                div className = "flex justify-between items-center" >
                <
                h3 className = "text-2xl font-bold text-gray-900" > Community Decision Making < /h3> <
                button className = "bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center" >
                <
                Vote className = "w-4 h-4 mr-2" / >
                Create Proposal <
                /button> <
                /div>

                { /* Voting Stats */ } <
                div className = "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" >
                <
                div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                <
                div className = "text-2xl font-bold text-purple-600" > 12 < /div> <
                div className = "text-sm text-gray-600" > Active Votes < /div> <
                /div> <
                div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                <
                div className = "text-2xl font-bold text-green-600" > 89 % < /div> <
                div className = "text-sm text-gray-600" > Participation Rate < /div> <
                /div> <
                div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                <
                div className = "text-2xl font-bold text-blue-600" > 156 < /div> <
                div className = "text-sm text-gray-600" > Decisions Made < /div> <
                /div> <
                div className = "bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100" >
                <
                div className = "text-2xl font-bold text-orange-600" > 247 < /div> <
                div className = "text-sm text-gray-600" > Community Members < /div> <
                /div> <
                /div>

                { /* Active Votes */ } <
                div className = "space-y-6" >
                <
                h4 className = "text-lg font-semibold text-gray-900" > Active Community Votes < /h4> {
                    activeVotes.map((vote) => ( <
                        div key = { vote.id }
                        className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                        <
                        div className = "flex justify-between items-start mb-4" >
                        <
                        div className = "flex-1" >
                        <
                        div className = "flex items-center mb-2" >
                        <
                        h5 className = "text-lg font-bold text-gray-900 mr-3" > { vote.title } < /h5> <
                        span className = "px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium" > { vote.category } <
                        /span> <
                        /div> <
                        p className = "text-gray-600 mb-3" > { vote.description } < /p> <
                        p className = "text-sm text-gray-500" >
                        Proposed by { vote.proposedBy }•
                        Deadline: { vote.deadline } <
                        /p> <
                        /div> <
                        /div>

                        { /* Voting Progress */ } <
                        div className = "mb-4" >
                        <
                        div className = "flex justify-between items-center mb-2" >
                        <
                        span className = "text-sm font-medium text-gray-700" > Voting Progress < /span> <
                        span className = "text-sm text-gray-500" > { vote.totalVotes }
                        votes cast < /span> <
                        /div> <
                        div className = "w-full bg-gray-200 rounded-full h-3" >
                        <
                        div className = "bg-green-500 h-3 rounded-full"
                        style = {
                            { width: `${(vote.yesVotes / vote.totalVotes) * 100}%` } } >
                        < /div> <
                        /div> <
                        div className = "flex justify-between text-sm text-gray-600 mt-1" >
                        <
                        span > Yes: { vote.yesVotes }({ Math.round((vote.yesVotes / vote.totalVotes) * 100) } % ) < /span> <
                        span > No: { vote.noVotes }({ Math.round((vote.noVotes / vote.totalVotes) * 100) } % ) < /span> <
                        /div> <
                        /div>

                        { /* Voting Buttons */ } <
                        div className = "flex items-center space-x-4" >
                        <
                        button className = "bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center" >
                        <
                        CheckCircle className = "w-4 h-4 mr-2" / >
                        Vote Yes <
                        /button> <
                        button className = "bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors" >
                        Vote No <
                        /button> <
                        button className = "text-primary-600 hover:text-primary-700 font-medium" >
                        View Details <
                        /button> <
                        button className = "text-primary-600 hover:text-primary-700 font-medium flex items-center" >
                        <
                        Share2 className = "w-4 h-4 mr-1" / >
                        Share <
                        /button> <
                        /div> <
                        /div>
                    ))
                } <
                /div> <
                /div>
            )

        case 'external-partners':
            return ( <
                div className = "space-y-6" >
                <
                div className = "flex justify-between items-center" >
                <
                h3 className = "text-2xl font-bold text-gray-900" > External Partners < /h3> <
                button className = "bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center" >
                <
                Building className = "w-4 h-4 mr-2" / >
                Add Partner <
                /button> <
                /div>

                { /* Partnership Overview */ } <
                div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" >
                <
                div className = "bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100" >
                <
                div className = "text-2xl font-bold text-orange-600 mb-2" > 15 < /div> <
                div className = "text-sm text-gray-600" > Active Partnerships < /div> <
                div className = "text-xs text-gray-500 mt-1" > Across 8 countries < /div> <
                /div> <
                div className = "bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100" >
                <
                div className = "text-2xl font-bold text-green-600 mb-2" > $2 .4 M < /div> <
                div className = "text-sm text-gray-600" > Funding Received < /div> <
                div className = "text-xs text-gray-500 mt-1" > This year < /div> <
                /div> <
                div className = "bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100" >
                <
                div className = "text-2xl font-bold text-blue-600 mb-2" > 47 < /div> <
                div className = "text-sm text-gray-600" > Joint Projects < /div> <
                div className = "text-xs text-gray-500 mt-1" > Currently active < /div> <
                /div> <
                /div>

                { /* Partners List */ } <
                div className = "space-y-6" >
                <
                h4 className = "text-lg font-semibold text-gray-900" > Current Partners < /h4> {
                    externalPartners.map((partner, index) => ( <
                        div key = { index }
                        className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                        <
                        div className = "flex justify-between items-start mb-4" >
                        <
                        div >
                        <
                        h5 className = "text-xl font-bold text-gray-900 mb-1" > { partner.name } < /h5> <
                        div className = "flex items-center space-x-4 text-sm text-gray-500" >
                        <
                        span > { partner.type } < /span> <
                        span > • < /span> <
                        span > { partner.relationship } < /span> <
                        span > • < /span> <
                        span > Since { partner.since } < /span> <
                        /div> <
                        /div> <
                        span className = { `px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(partner.status)}` } > { partner.status } <
                        /span> <
                        /div>

                        <
                        div className = "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" >
                        <
                        div >
                        <
                        h6 className = "font-medium text-gray-700 mb-2" > Active Projects < /h6> <
                        ul className = "text-sm text-gray-600 space-y-1" > {
                            partner.projects.map((project, i) => ( <
                                li key = { i }
                                className = "flex items-center" >
                                <
                                div className = "w-2 h-2 bg-orange-500 rounded-full mr-2" > < /div> { project } <
                                /li>
                            ))
                        } <
                        /ul> <
                        /div> <
                        div >
                        <
                        h6 className = "font-medium text-gray-700 mb-2" > Contact Information < /h6> <
                        p className = "text-sm text-gray-600 mb-1" > Primary Contact: { partner.contact } < /p> <
                        p className = "text-sm text-gray-600" > Next Meeting: { partner.nextMeeting } < /p> <
                        /div> <
                        /div>

                        <
                        div className = "flex items-center space-x-4" >
                        <
                        button className = "text-primary-600 hover:text-primary-700 font-medium text-sm" >
                        View Partnership Details <
                        /button> <
                        button className = "text-primary-600 hover:text-primary-700 font-medium text-sm" >
                        Schedule Meeting <
                        /button> <
                        button className = "text-primary-600 hover:text-primary-700 font-medium text-sm" >
                        View Projects <
                        /button> <
                        /div> <
                        /div>
                    ))
                } <
                /div> <
                /div>
            )

        default:
            return null
    }
}

return ( <
        main className = "min-h-screen bg-gray-50" >
        <
        Header / >

        <
        div className = "container-max py-8" > { /* Header */ } <
        div className = "text-center mb-12" >
        <
        h1 className = "text-4xl font-bold text-gray-900 mb-4" > Community Communication < /h1> <
        p className = "text-xl text-gray-600 max-w-3xl mx-auto" >
        Connect with other communities, learn from elders, participate in decisions, and manage partnerships <
        /p> <
        /div>

        { /* Feature Tabs */ } <
        div className = "flex flex-wrap justify-center gap-4 mb-8" > {
            communityFeatures.map((feature) => ( <
                    button key = { feature.id }
                    onClick = {
                        () => setActiveTab(feature.id) }
                    className = { `flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === feature.id
                  ? `${getColorClasses(feature.color)} border-2`
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <feature.icon className="w-5 h-5 mr-2" />
              {feature.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-2xl p-8">
          {renderContent()}
        </div>
      </div>

      <Footer />
    </main>
  )
}