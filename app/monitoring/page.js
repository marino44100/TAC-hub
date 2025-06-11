'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Camera, Calendar, TreePine, Calculator, Upload, MapPin, Clock, TrendingUp, AlertCircle, CheckCircle, Save } from 'lucide-react'
import dataManager from '../../lib/dataManager'

export default function MonitoringTools() {
    const [activeTab, setActiveTab] = useState('forest-health')
    const [selectedImage, setSelectedImage] = useState(null)
    const [submissions, setSubmissions] = useState({
        forestHealth: [],
        weather: [],
        wildlife: [],
        carbon: []
    })
    const [currentSubmission, setCurrentSubmission] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    useEffect(() => {
        loadSubmissions()
    }, [])

    const loadSubmissions = () => {
        const savedSubmissions = localStorage.getItem('tac-hub-monitoring-submissions')
        if (savedSubmissions) {
            setSubmissions(JSON.parse(savedSubmissions))
        }
    }

    const saveSubmission = (type, data) => {
        setIsSubmitting(true)

        const newSubmission = {
            id: Date.now(),
            ...data,
            timestamp: new Date().toISOString(),
            submittedBy: 'Community Member', // In real app, get from auth
            status: 'submitted'
        }

        const updatedSubmissions = {
            ...submissions,
            [type]: [newSubmission, ...submissions[type]]
        }

        localStorage.setItem('tac-hub-monitoring-submissions', JSON.stringify(updatedSubmissions))
        setSubmissions(updatedSubmissions)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccess(true)
            setCurrentSubmission({})
            setTimeout(() => setSubmitSuccess(false), 3000)
        }, 1500)
    }

    const monitoringTools = [{
            id: 'forest-health',
            title: 'Forest Health Checker',
            icon: Camera,
            description: 'Easy photo-based forest monitoring',
            color: 'green'
        },
        {
            id: 'weather-tracker',
            title: 'Weather Tracker',
            icon: Calendar,
            description: 'Record daily observations and patterns',
            color: 'blue'
        },
        {
            id: 'wildlife-counter',
            title: 'Wildlife Counter',
            icon: TreePine,
            description: 'Track animal sightings and migration patterns',
            color: 'purple'
        },
        {
            id: 'carbon-calculator',
            title: 'Carbon Calculator',
            description: 'Measure forest carbon storage progress',
            icon: Calculator,
            color: 'orange'
        }
    ]

    const forestHealthData = [{
            location: 'Sector A - Primary Forest',
            date: '2024-01-15',
            health: 'Excellent',
            score: 95,
            issues: [],
            photos: 3,
            reporter: 'Community Monitor Jean'
        },
        {
            location: 'Sector B - Secondary Growth',
            date: '2024-01-14',
            health: 'Good',
            score: 78,
            issues: ['Some invasive species spotted'],
            photos: 5,
            reporter: 'Elder Mama Koko'
        },
        {
            location: 'Sector C - River Edge',
            date: '2024-01-13',
            health: 'Needs Attention',
            score: 65,
            issues: ['Erosion visible', 'Reduced canopy cover'],
            photos: 7,
            reporter: 'Youth Group Leader Paul'
        }
    ]

    const weatherObservations = [{
            date: '2024-01-15',
            time: '06:00',
            temperature: '24°C',
            humidity: 'High',
            rainfall: '0mm',
            windDirection: 'Southwest',
            cloudCover: 'Partly cloudy',
            traditionalSigns: 'Birds singing early - good weather expected',
            observer: 'Elder Bwana Mkuu'
        },
        {
            date: '2024-01-14',
            time: '18:00',
            temperature: '26°C',
            humidity: 'Very High',
            rainfall: '15mm',
            windDirection: 'East',
            cloudCover: 'Overcast',
            traditionalSigns: 'Ants moving to higher ground - more rain coming',
            observer: 'Community Member Sarah'
        }
    ]

    const wildlifeSightings = [{
            species: 'Forest Elephant',
            count: 3,
            location: 'Near river crossing',
            date: '2024-01-15',
            time: '05:30',
            behavior: 'Feeding on fruits',
            photos: 2,
            observer: 'Tracker Joseph',
            significance: 'First sighting this season - indicates healthy fruit trees'
        },
        {
            species: 'Grey Parrot',
            count: 12,
            location: 'Canopy level, Sector A',
            date: '2024-01-14',
            time: '16:45',
            behavior: 'Nesting activity',
            photos: 4,
            observer: 'Youth Monitor Lisa',
            significance: 'Breeding season starting - forest ecosystem healthy'
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

    const getHealthColor = (health) => {
        switch (health) {
            case 'Excellent':
                return 'text-green-600 bg-green-100'
            case 'Good':
                return 'text-blue-600 bg-blue-100'
            case 'Needs Attention':
                return 'text-orange-600 bg-orange-100'
            case 'Poor':
                return 'text-red-600 bg-red-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'forest-health':
                return ( <
                        div className = "space-y-6" >
                        <
                        div className = "flex justify-between items-center" >
                        <
                        h3 className = "text-2xl font-bold text-gray-900" > Forest Health Checker < /h3> <
                        button className = "bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center" >
                        <
                        Camera className = "w-4 h-4 mr-2" / >
                        New Health Check <
                        /button> < /
                        div >

                        { /* Photo Upload Section */ } <
                        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                        <
                        h4 className = "text-lg font-semibold text-gray-900 mb-4" > Submit Forest Health Photos < /h4> <
                        div className = "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center" >
                        <
                        Upload className = "w-12 h-12 text-gray-400 mx-auto mb-4" / >
                        <
                        p className = "text-gray-600 mb-2" > Drag and drop photos here, or click to select < /p> <
                        p className = "text-sm text-gray-500" > Take photos of: tree health, ground cover, water sources, any concerns < /p> <
                        button className = "mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors" >
                        Choose Photos <
                        /button> < /
                        div > <
                        /div>

                        { /* Recent Health Checks */ } <
                        div className = "space-y-4" >
                        <
                        h4 className = "text-lg font-semibold text-gray-900" > Recent Health Checks < /h4> {
                        forestHealthData.map((check, index) => ( <
                            div key = { index }
                            className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                            <
                            div className = "flex justify-between items-start mb-4" >
                            <
                            div >
                            <
                            h5 className = "text-lg font-semibold text-gray-900" > { check.location } < /h5> <
                            p className = "text-sm text-gray-500 flex items-center" >
                            <
                            MapPin className = "w-4 h-4 mr-1" / > { check.date }•
                            Reported by { check.reporter } <
                            /p> < /
                            div > <
                            div className = "text-right" >
                            <
                            span className = { `px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(check.health)}` } > { check.health } <
                            /span> <
                            p className = "text-2xl font-bold text-gray-900 mt-1" > { check.score } % < /p> < /
                            div > <
                            /div>

                            {
                                check.issues.length > 0 && ( <
                                    div className = "mb-4" >
                                    <
                                    h6 className = "font-medium text-gray-700 mb-2 flex items-center" >
                                    <
                                    AlertCircle className = "w-4 h-4 mr-1 text-orange-500" / >
                                    Issues Identified <
                                    /h6> <
                                    ul className = "text-sm text-gray-600 space-y-1" > {
                                        check.issues.map((issue, i) => ( <
                                            li key = { i }
                                            className = "flex items-center" >
                                            <
                                            div className = "w-2 h-2 bg-orange-500 rounded-full mr-2" > < /div> { issue } < /
                                            li >
                                        ))
                                    } <
                                    /ul> < /
                                    div >
                                )
                            }

                            <
                            div className = "flex items-center justify-between text-sm text-gray-500" >
                            <
                            span className = "flex items-center" >
                            <
                            Camera className = "w-4 h-4 mr-1" / > { check.photos }
                            photos submitted <
                            /span> <
                            button className = "text-primary-600 hover:text-primary-700 font-medium" >
                            View Details <
                            /button> < /
                            div > <
                            /div>
                        ))
                    } <
                    /div> < /
                    div >
        )

        case 'weather-tracker':
            return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h3 className = "text-2xl font-bold text-gray-900" > Weather Tracker < /h3> <
                    button className = "bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center" >
                    <
                    Calendar className = "w-4 h-4 mr-2" / >
                    Record Observation <
                    /button> < /
                    div >

                    { /* Quick Weather Form */ } <
                    div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    h4 className = "text-lg font-semibold text-gray-900 mb-4" > Today 's Weather Observation</h4> <
                    div className = "grid grid-cols-1 md:grid-cols-3 gap-4" >
                    <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Temperature < /label> <
                    input type = "text"
                    placeholder = "e.g., 25°C"
                    className = "w-full p-3 border border-gray-300 rounded-lg" / >
                    <
                    /div> <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Rainfall < /label> <
                    input type = "text"
                    placeholder = "e.g., 5mm"
                    className = "w-full p-3 border border-gray-300 rounded-lg" / >
                    <
                    /div> <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Cloud Cover < /label> <
                    select className = "w-full p-3 border border-gray-300 rounded-lg" >
                    <
                    option > Clear < /option> <
                    option > Partly cloudy < /option> <
                    option > Overcast < /option> <
                    option > Stormy < /option> < /
                    select > <
                    /div> < /
                    div > <
                    div className = "mt-4" >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Traditional Weather Signs < /label> <
                    textarea placeholder = "Describe any traditional weather indicators you observed..."
                    className = "w-full p-3 border border-gray-300 rounded-lg h-24" >
                    <
                    /textarea> < /
                    div > <
                    button className = "mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors" >
                    Submit Observation <
                    /button> < /
                    div >

                    { /* Recent Observations */ } <
                    div className = "space-y-4" >
                    <
                    h4 className = "text-lg font-semibold text-gray-900" > Recent Weather Observations < /h4> {
                    weatherObservations.map((obs, index) => ( <
                        div key = { index }
                        className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                        <
                        div className = "flex justify-between items-start mb-4" >
                        <
                        div >
                        <
                        h5 className = "text-lg font-semibold text-gray-900" > { obs.date } < /h5> <
                        p className = "text-sm text-gray-500 flex items-center" >
                        <
                        Clock className = "w-4 h-4 mr-1" / > { obs.time }•
                        Observed by { obs.observer } <
                        /p> < /
                        div > <
                        /div>

                        <
                        div className = "grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" >
                        <
                        div className = "text-center p-3 bg-gray-50 rounded-lg" >
                        <
                        p className = "text-sm text-gray-600" > Temperature < /p> <
                        p className = "text-lg font-semibold text-gray-900" > { obs.temperature } < /p> < /
                        div > <
                        div className = "text-center p-3 bg-gray-50 rounded-lg" >
                        <
                        p className = "text-sm text-gray-600" > Rainfall < /p> <
                        p className = "text-lg font-semibold text-gray-900" > { obs.rainfall } < /p> < /
                        div > <
                        div className = "text-center p-3 bg-gray-50 rounded-lg" >
                        <
                        p className = "text-sm text-gray-600" > Humidity < /p> <
                        p className = "text-lg font-semibold text-gray-900" > { obs.humidity } < /p> < /
                        div > <
                        div className = "text-center p-3 bg-gray-50 rounded-lg" >
                        <
                        p className = "text-sm text-gray-600" > Wind < /p> <
                        p className = "text-lg font-semibold text-gray-900" > { obs.windDirection } < /p> < /
                        div > <
                        /div>

                        <
                        div className = "bg-blue-50 rounded-lg p-4" >
                        <
                        h6 className = "font-medium text-blue-900 mb-2" > Traditional Weather Signs < /h6> <
                        p className = "text-blue-800" > { obs.traditionalSigns } < /p> < /
                        div > <
                        /div>
                    ))
                } <
                /div> < /
                div >
    )

    case 'wildlife-counter':
        return ( <
                div className = "space-y-6" >
                <
                div className = "flex justify-between items-center" >
                <
                h3 className = "text-2xl font-bold text-gray-900" > Wildlife Counter < /h3> <
                button className = "bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center" >
                <
                TreePine className = "w-4 h-4 mr-2" / >
                Record Sighting <
                /button> < /
                div >

                { /* Wildlife Sighting Form */ } <
                div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                <
                h4 className = "text-lg font-semibold text-gray-900 mb-4" > Record Wildlife Sighting < /h4> <
                div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
                <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" > Species < /label> <
                input type = "text"
                placeholder = "e.g., Forest Elephant"
                className = "w-full p-3 border border-gray-300 rounded-lg" / >
                <
                /div> <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" > Count < /label> <
                input type = "number"
                placeholder = "Number seen"
                className = "w-full p-3 border border-gray-300 rounded-lg" / >
                <
                /div> <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" > Location < /label> <
                input type = "text"
                placeholder = "Describe location"
                className = "w-full p-3 border border-gray-300 rounded-lg" / >
                <
                /div> <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" > Time < /label> <
                input type = "time"
                className = "w-full p-3 border border-gray-300 rounded-lg" / >
                <
                /div> < /
                div > <
                div className = "mt-4" >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" > Behavior & Significance < /label> <
                textarea placeholder = "Describe what the animals were doing and why this sighting is important..."
                className = "w-full p-3 border border-gray-300 rounded-lg h-24" >
                <
                /textarea> < /
                div > <
                button className = "mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors" >
                Record Sighting <
                /button> < /
                div >

                { /* Recent Sightings */ } <
                div className = "space-y-4" >
                <
                h4 className = "text-lg font-semibold text-gray-900" > Recent Wildlife Sightings < /h4> {
                wildlifeSightings.map((sighting, index) => ( <
                    div key = { index }
                    className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    div className = "flex justify-between items-start mb-4" >
                    <
                    div >
                    <
                    h5 className = "text-lg font-semibold text-gray-900" > { sighting.species } < /h5> <
                    p className = "text-sm text-gray-500 flex items-center" >
                    <
                    MapPin className = "w-4 h-4 mr-1" / > { sighting.location }• { sighting.date }
                    at { sighting.time } <
                    /p> < /
                    div > <
                    div className = "text-right" >
                    <
                    span className = "text-2xl font-bold text-purple-600" > { sighting.count } < /span> <
                    p className = "text-sm text-gray-500" > individuals < /p> < /
                    div > <
                    /div>

                    <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                    <
                    div >
                    <
                    h6 className = "font-medium text-gray-700 mb-2" > Behavior Observed < /h6> <
                    p className = "text-sm text-gray-600" > { sighting.behavior } < /p> < /
                    div > <
                    div >
                    <
                    h6 className = "font-medium text-gray-700 mb-2" > Ecological Significance < /h6> <
                    p className = "text-sm text-gray-600" > { sighting.significance } < /p> < /
                    div > <
                    /div>

                    <
                    div className = "flex items-center justify-between text-sm text-gray-500" >
                    <
                    span > Observed by { sighting.observer } < /span> <
                    span className = "flex items-center" >
                    <
                    Camera className = "w-4 h-4 mr-1" / > { sighting.photos }
                    photos <
                    /span> < /
                    div > <
                    /div>
                ))
            } <
            /div> < /
            div >
)

case 'carbon-calculator':
    return ( <
        div className = "space-y-6" >
        <
        div className = "flex justify-between items-center" >
        <
        h3 className = "text-2xl font-bold text-gray-900" > Carbon Calculator < /h3> <
        button className = "bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center" >
        <
        Calculator className = "w-4 h-4 mr-2" / >
        New Calculation <
        /button> < /
        div >

        { /* Carbon Calculation Tool */ } <
        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
        <
        h4 className = "text-lg font-semibold text-gray-900 mb-4" > Forest Carbon Storage Calculator < /h4> <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-6" >
        <
        div >
        <
        h5 className = "font-medium text-gray-700 mb-3" > Forest Area Measurements < /h5> <
        div className = "space-y-3" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-1" > Total Forest Area(hectares) < /label> <
        input type = "number"
        placeholder = "e.g., 100"
        className = "w-full p-3 border border-gray-300 rounded-lg" / >
        <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-1" > Forest Type < /label> <
        select className = "w-full p-3 border border-gray-300 rounded-lg" >
        <
        option > Primary Tropical Forest < /option> <
        option > Secondary Forest < /option> <
        option > Mixed Forest < /option> <
        option > Plantation Forest < /option> < /
        select > <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-1" > Average Tree Age(years) < /label> <
        input type = "number"
        placeholder = "e.g., 25"
        className = "w-full p-3 border border-gray-300 rounded-lg" / >
        <
        /div> < /
        div > <
        /div>

        <
        div >
        <
        h5 className = "font-medium text-gray-700 mb-3" > Estimated Carbon Storage < /h5> <
        div className = "bg-orange-50 rounded-lg p-6 text-center" >
        <
        div className = "text-4xl font-bold text-orange-600 mb-2" > 2, 450 < /div> <
        div className = "text-sm text-orange-700 mb-4" > tons CO₂ equivalent < /div> <
        div className = "text-xs text-orange-600" >
        Based on Congo Basin forest averages <
        /div> < /
        div >

        <
        div className = "mt-4 space-y-2" >
        <
        div className = "flex justify-between text-sm" >
        <
        span className = "text-gray-600" > Above - ground biomass: < /span> <
        span className = "font-medium" > 1, 680 tons CO₂ < /span> < /
        div > <
        div className = "flex justify-between text-sm" >
        <
        span className = "text-gray-600" > Below - ground biomass: < /span> <
        span className = "font-medium" > 420 tons CO₂ < /span> < /
        div > <
        div className = "flex justify-between text-sm" >
        <
        span className = "text-gray-600" > Soil carbon: < /span> <
        span className = "font-medium" > 350 tons CO₂ < /span> < /
        div > <
        /div> < /
        div > <
        /div>

        <
        button className = "mt-6 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors" >
        Calculate & Save Results <
        /button> < /
        div >

        { /* Carbon Storage Trends */ } <
        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
        <
        h4 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        TrendingUp className = "w-5 h-5 mr-2 text-green-500" / >
        Community Carbon Storage Progress <
        /h4>

        <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-6" >
        <
        div className = "text-center p-4 bg-green-50 rounded-lg" >
        <
        div className = "text-2xl font-bold text-green-600 mb-1" > 45, 230 < /div> <
        div className = "text-sm text-green-700" > Total CO₂ Stored < /div> <
        div className = "text-xs text-green-600 mt-1" > +12 % this year < /div> < /
        div > <
        div className = "text-center p-4 bg-blue-50 rounded-lg" >
        <
        div className = "text-2xl font-bold text-blue-600 mb-1" > 1, 247 < /div> <
        div className = "text-sm text-blue-700" > Hectares Protected < /div> <
        div className = "text-xs text-blue-600 mt-1" > +8 % this year < /div> < /
        div > <
        div className = "text-center p-4 bg-purple-50 rounded-lg" >
        <
        div className = "text-2xl font-bold text-purple-600 mb-1" > 89 % < /div> <
        div className = "text-sm text-purple-700" > Forest Health Score < /div> <
        div className = "text-xs text-purple-600 mt-1" > Stable < /div> < /
        div > <
        /div> < /
        div > <
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
            h1 className = "text-4xl font-bold text-gray-900 mb-4" > Simple Monitoring Tools < /h1> <
            p className = "text-xl text-gray-600 max-w-3xl mx-auto" >
            Easy - to - use tools
            for community members to monitor forest health, weather patterns, wildlife, and carbon storage <
            /p> < /
            div >

            { /* Tool Tabs */ } <
            div className = "flex flex-wrap justify-center gap-4 mb-8" > {
                monitoringTools.map((tool) => ( <
                        button key = { tool.id }
                        onClick = {
                            () => setActiveTab(tool.id)
                        }
                        className = { `flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tool.id
                  ? `${getColorClasses(tool.color)} border-2`
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <tool.icon className="w-5 h-5 mr-2" />
              {tool.title}
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