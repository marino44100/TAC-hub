'use client'
import { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts'
import {
    Thermometer,
    CloudRain,
    Wind,
    Zap,
    TreePine,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    RefreshCw,
    MapPin,
    Calendar,
    Brain,
    Satellite,
    Database,
    Bell,
    Eye,
    Settings,
    Download,
    Activity,
    Globe,
    BarChart3,
    PieChart as PieChartIcon
} from 'lucide-react'
import { RealClimateDataService } from '../../lib/realClimateDataService'
import ForestCoverChart from '../../components/ForestCoverChart'

export default function ClimateAnalyticsPage() {
    const [climateService] = useState(() => new RealClimateDataService())
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedRegion, setSelectedRegion] = useState('Congo Basin')
    const [timeRange, setTimeRange] = useState('1year')
    const [activeView, setActiveView] = useState('overview')
    const [alerts, setAlerts] = useState([])
    const [insights, setInsights] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [lastUpdate, setLastUpdate] = useState(null)

    const regions = [
        'Congo Basin', 'Kinshasa', 'Mbandaka', 'Kisangani', 'Bukavu',
        'Yaoundé', 'Douala', 'Bangui', 'Libreville', 'Brazzaville'
    ]

    const timeRanges = [
        { value: '1month', label: 'Last Month' },
        { value: '3months', label: 'Last 3 Months' },
        { value: '6months', label: 'Last 6 Months' },
        { value: '1year', label: 'Last Year' },
        { value: '5years', label: 'Last 5 Years' }
    ]

    const views = [
        { id: 'overview', name: 'Overview', icon: BarChart3 },
        { id: 'temperature', name: 'Temperature', icon: Thermometer },
        { id: 'rainfall', name: 'Rainfall', icon: CloudRain },
        { id: 'forest', name: 'Forest Cover', icon: TreePine },
        { id: 'alerts', name: 'Alerts', icon: Bell },
        { id: 'insights', name: 'AI Insights', icon: Brain }
    ]

    useEffect(() => {
        loadData()

        // Set up auto-refresh every 30 seconds
        const interval = setInterval(() => {
            autoRefreshData()
        }, 30000)

        return () => clearInterval(interval)
    }, [selectedRegion, timeRange])

    const loadData = async() => {
        setLoading(true)
        try {
            let climateData

            // Get data based on selected region
            if (selectedRegion === 'Congo Basin') {
                climateData = await climateService.autoUpdateIfNeeded()
            } else {
                climateData = climateService.getRegionalData(selectedRegion)
            }

            // Apply time range filter
            climateData = climateService.getTimeRangeData(timeRange)

            setData(climateData)
            setAlerts(climateService.getAlerts())
            setInsights(climateService.getInsights())
            setLastUpdate(climateService.getLastUpdateTime())
        } catch (error) {
            console.error('Failed to load climate data:', error)
        } finally {
            setLoading(false)
        }
    }

    const autoRefreshData = async() => {
        try {
            const shouldUpdate = climateService.shouldAutoUpdate()
            if (shouldUpdate) {
                await triggerAIUpdate(false)
            }
        } catch (error) {
            console.error('Auto-refresh failed:', error)
        }
    }

    const triggerAIUpdate = async(adminTriggered = true) => {
        setIsUpdating(true)
        try {
            const updatedData = await climateService.triggerAIUpdate(adminTriggered)

            // Apply current region and time range filters to updated data
            let filteredData = updatedData
            if (selectedRegion !== 'Congo Basin') {
                filteredData = climateService.getRegionalData(selectedRegion)
            }
            filteredData = climateService.getTimeRangeData(timeRange)

            setData(filteredData)
            setAlerts(climateService.getAlerts())
            setInsights(climateService.getInsights())
            setLastUpdate(climateService.getLastUpdateTime())

            // Show success notification
            if (adminTriggered) {
                alert('🤖 Real-World AI Climate Update Complete! Fresh data from NASA, NOAA, and Global Forest Watch integrated.')
            }
        } catch (error) {
            console.error('AI update failed:', error)
            alert('AI update failed. Please try again.')
        } finally {
            setIsUpdating(false)
        }
    }

    const formatLastUpdate = (timestamp) => {
        if (!timestamp) return 'Never'
        const date = new Date(timestamp)
        const now = new Date()
        const diffMinutes = Math.floor((now - date) / (1000 * 60))

        if (diffMinutes < 1) return 'Just now'
        if (diffMinutes < 60) return `${diffMinutes}m ago`
        if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
        return date.toLocaleDateString()
    }

    const getStatusColor = (trend) => {
        if (trend.includes('+') && (trend.includes('°C') || trend.includes('ppm'))) return 'text-red-600'
        if (trend.includes('-') && trend.includes('%')) return 'text-red-600'
        if (trend.includes('+') && trend.includes('%')) return 'text-green-600'
        return 'text-gray-600'
    }

    const getAlertSeverityColor = (severity) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-100 border-red-300 text-red-800'
            case 'high':
                return 'bg-orange-100 border-orange-300 text-orange-800'
            case 'medium':
                return 'bg-yellow-100 border-yellow-300 text-yellow-800'
            default:
                return 'bg-blue-100 border-blue-300 text-blue-800'
        }
    }

    const generateMonthlyChartData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        return months.map((month, index) => ({
            month,
            temperature: data ? .globalData ? .temperature ? .monthly ? .[index] || 26 + Math.random() * 4,
            rainfall: data ? .globalData ? .rainfall ? .monthly ? .[index] || 100 + Math.random() * 200,
            humidity: data ? .globalData ? .humidity ? .monthly ? .[index] || 75 + Math.random() * 10
        }))
    }

    const renderOverview = () => {
        if (!data ? .globalData) return <div > Loading overview... < /div>

        const climateIndicators = [{
                name: 'Temperature',
                value: data.globalData.temperature ? .current ? .toFixed(1) || '26.5',
                unit: '°C',
                trend: data.globalData.temperature ? .trend || '+1.2°C',
                icon: Thermometer,
                color: 'red'
            },
            {
                name: 'Rainfall',
                value: Math.round(data.globalData.rainfall ? .current || 1680),
                unit: 'mm',
                trend: data.globalData.rainfall ? .trend || '-8%',
                icon: CloudRain,
                color: 'blue'
            },
            {
                name: 'Humidity',
                value: Math.round(data.globalData.humidity ? .current || 78),
                unit: '%',
                trend: data.globalData.humidity ? .trend || '+2%',
                icon: Wind,
                color: 'cyan'
            },
            {
                name: 'CO₂ Levels',
                value: Math.round(data.globalData.co2Levels ? .current || 418),
                unit: 'ppm',
                trend: data.globalData.co2Levels ? .trend || '+2.3ppm',
                icon: Zap,
                color: 'purple'
            }
        ]

        return ( <
            div className = "space-y-6" > { /* Climate Indicators Grid */ } <
            div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" > {
                climateIndicators.map((indicator) => {
                    const IconComponent = indicator.icon
                    return ( <
                        div key = { indicator.name }
                        className = "bg-white rounded-lg p-4 shadow-sm border border-gray-200" >
                        <
                        div className = "flex items-center justify-between mb-2" >
                        <
                        div className = { `p-2 rounded-lg bg-${indicator.color}-100` } >
                        <
                        IconComponent className = { `w-5 h-5 text-${indicator.color}-600` }
                        /> < /
                        div > <
                        span className = { `text-sm font-medium ${getStatusColor(indicator.trend)}` } > { indicator.trend } <
                        /span> < /
                        div > <
                        div className = "space-y-1" >
                        <
                        p className = "text-2xl font-bold text-gray-900" > { indicator.value } <
                        span className = "text-sm font-normal text-gray-500 ml-1" > { indicator.unit } <
                        /span> < /
                        p > <
                        p className = "text-sm text-gray-600" > { indicator.name } < /p> < /
                        div > <
                        /div>
                    )
                })
            } <
            /div>

            { /* Monthly Trends Chart */ } <
            div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
            <
            h3 className = "text-lg font-semibold text-gray-900 mb-4" > Monthly Climate Trends < /h3> <
            ResponsiveContainer width = "100%"
            height = { 300 } >
            <
            LineChart data = { generateMonthlyChartData() } >
            <
            CartesianGrid strokeDasharray = "3 3" / >
            <
            XAxis dataKey = "month" / >
            <
            YAxis yAxisId = "temp"
            orientation = "left" / >
            <
            YAxis yAxisId = "rain"
            orientation = "right" / >
            <
            Tooltip / >
            <
            Legend / >
            <
            Line yAxisId = "temp"
            type = "monotone"
            dataKey = "temperature"
            stroke = "#ef4444"
            strokeWidth = { 2 }
            name = "Temperature (°C)" /
            >
            <
            Line yAxisId = "rain"
            type = "monotone"
            dataKey = "rainfall"
            stroke = "#3b82f6"
            strokeWidth = { 2 }
            name = "Rainfall (mm)" /
            >
            <
            /LineChart> < /
            ResponsiveContainer > <
            /div>

            { /* Deforestation Alert */ } {
                data.globalData.deforestation && ( <
                    div className = "bg-red-50 border border-red-200 rounded-lg p-4" >
                    <
                    div className = "flex items-start space-x-3" >
                    <
                    AlertTriangle className = "w-5 h-5 text-red-600 mt-0.5" / >
                    <
                    div className = "flex-1" >
                    <
                    h4 className = "font-semibold text-red-900" > Deforestation Alert < /h4> <
                    p className = "text-red-800 text-sm mt-1" > { Math.round(data.globalData.deforestation.current.hectaresLost) }
                    hectares lost this month({ data.globalData.deforestation.trend }) <
                    /p> <
                    div className = "mt-2" >
                    <
                    p className = "text-xs text-red-700" > Main causes: < /p> <
                    ul className = "text-xs text-red-700 list-disc list-inside" > {
                        data.globalData.deforestation.current.primaryCauses ? .map((cause, index) => ( <
                            li key = { index } > { cause } < /li>
                        ))
                    } <
                    /ul> < /
                    div > <
                    /div> < /
                    div > <
                    /div>
                )
            } <
            /div>
        )
    }

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return renderOverview()
            case 'forest':
                return <ForestCoverChart data = { data }
                selectedRegion = { selectedRegion }
                />
            case 'alerts':
                return ( <
                    div className = "space-y-4" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900" > Active Climate Alerts < /h3> {
                        alerts.length > 0 ? (
                            alerts.map((alert) => ( <
                                div key = { alert.id }
                                className = { `p-4 rounded-lg border ${getAlertSeverityColor(alert.severity)}` } >
                                <
                                div className = "flex items-start justify-between" >
                                <
                                div className = "flex-1" >
                                <
                                h4 className = "font-semibold" > { alert.title } < /h4> <
                                p className = "text-sm mt-1" > { alert.message } < /p> <
                                div className = "mt-2 text-xs" >
                                <
                                span > Region: { alert.region } < /span> • <
                                span > Duration: { alert.duration } < /span> • <
                                span > Source: { alert.source } < /span> <
                                /div> {
                                    alert.recommendations && ( <
                                        div className = "mt-2" >
                                        <
                                        p className = "text-xs font-medium" > Recommendations: < /p> <
                                        ul className = "text-xs list-disc list-inside" > {
                                            alert.recommendations.map((rec, index) => ( <
                                                li key = { index } > { rec } < /li>
                                            ))
                                        } <
                                        /ul> <
                                        /div>
                                    )
                                } <
                                /div> <
                                /div> <
                                /div>
                            ))
                        ) : ( <
                            p className = "text-gray-600" > No active alerts at this time. < /p>
                        )
                    } <
                    /div>
                )
            case 'insights':
                return ( <
                    div className = "space-y-4" >
                    <
                    h3 className = "text-lg font-semibold text-gray-900" > AI Climate Insights < /h3> {
                        insights.length > 0 ? (
                            insights.map((insight) => ( <
                                div key = { insight.id }
                                className = "bg-white p-6 rounded-lg border border-gray-200 shadow-sm" >
                                <
                                div className = "flex items-start justify-between mb-3" >
                                <
                                h4 className = "font-semibold text-gray-900" > { insight.title } < /h4> <
                                div className = "flex items-center space-x-2" >
                                <
                                span className = { `px-2 py-1 text-xs rounded-full ${
                                                insight.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                                                insight.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }` } > { insight.impact }
                                Impact <
                                /span> <
                                span className = "text-xs text-gray-500" > { insight.confidence } % confidence < /span> <
                                /div> <
                                /div> <
                                p className = "text-gray-700 text-sm mb-3" > { insight.description } < /p> <
                                div className = "text-xs text-gray-600 mb-2" >
                                <
                                strong > Source: < /strong> {insight.source} <
                                /div> {
                                    insight.recommendations && ( <
                                        div className = "mt-3" >
                                        <
                                        p className = "text-xs font-medium text-gray-700 mb-1" > Recommendations: < /p> <
                                        ul className = "text-xs text-gray-600 list-disc list-inside" > {
                                            insight.recommendations.map((rec, index) => ( <
                                                li key = { index } > { rec } < /li>
                                            ))
                                        } <
                                        /ul> <
                                        /div>
                                    )
                                } <
                                /div>
                            ))
                        ) : ( <
                            p className = "text-gray-600" > No insights available at this time. < /p>
                        )
                    } <
                    /div>
                )
            default:
                return renderOverview()
        }
    }

    if (loading) {
        return ( <
            div className = "min-h-screen bg-gray-50 flex items-center justify-center" >
            <
            div className = "text-center" >
            <
            RefreshCw className = "w-8 h-8 text-blue-500 animate-spin mx-auto mb-2" / >
            <
            p className = "text-gray-600" > Loading climate data... < /p> < /
            div > <
            /div>
        )
    }

    return ( <
            div className = "min-h-screen bg-gray-50" >
            <
            div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
            <
            div className = "space-y-6" > { /* Header with Controls */ } <
            div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200" >
            <
            div className = "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0" >
            <
            div >
            <
            h1 className = "text-3xl font-bold text-gray-900 flex items-center" >
            <
            Globe className = "w-8 h-8 mr-3 text-blue-600" / >
            Congo Basin Climate Analytics <
            /h1> <
            p className = "text-gray-600 mt-2" > Real - time climate monitoring with AI - powered insights < /p> < /
            div >

            <
            div className = "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4" > { /* Region Selector */ } <
            div className = "flex items-center space-x-2" >
            <
            MapPin className = "w-4 h-4 text-gray-500" / >
            <
            select value = { selectedRegion }
            onChange = {
                (e) => setSelectedRegion(e.target.value)
            }
            className = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" > {
                regions.map(region => ( <
                    option key = { region }
                    value = { region } > { region } < /option>
                ))
            } <
            /select> < /
            div >

            { /* Time Range Selector */ } <
            div className = "flex items-center space-x-2" >
            <
            Calendar className = "w-4 h-4 text-gray-500" / >
            <
            select value = { timeRange }
            onChange = {
                (e) => setTimeRange(e.target.value)
            }
            className = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" > {
                timeRanges.map(range => ( <
                    option key = { range.value }
                    value = { range.value } > { range.label } < /option>
                ))
            } <
            /select> < /
            div >

            { /* AI Update Button */ } <
            button onClick = {
                () => triggerAIUpdate(true)
            }
            disabled = { isUpdating }
            className = "flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors" > {
                isUpdating ? ( <
                    RefreshCw className = "w-4 h-4 animate-spin" / >
                ) : ( <
                    Brain className = "w-4 h-4" / >
                )
            } <
            span > { isUpdating ? 'Updating...' : 'AI Update' } < /span> < /
            button > <
            /div> < /
            div >

            { /* Status Bar */ } <
            div className = "mt-4 flex flex-wrap items-center justify-between text-sm text-gray-600" >
            <
            div className = "flex items-center space-x-4" >
            <
            span className = "flex items-center space-x-1" >
            <
            Satellite className = "w-4 h-4" / >
            <
            span > Last update: { formatLastUpdate(lastUpdate) } < /span> < /
            span > <
            span className = "flex items-center space-x-1" >
            <
            Database className = "w-4 h-4" / >
            <
            span > Data sources: NASA, NOAA, ESA < /span> < /
            span > <
            /div> <
            div className = "flex items-center space-x-2" >
            <
            div className = "w-2 h-2 bg-green-500 rounded-full animate-pulse" > < /div> <
            span > Live monitoring active < /span> < /
            div > <
            /div> < /
            div >

            { /* View Tabs */ } <
            div className = "bg-white rounded-lg shadow-sm border border-gray-200" >
            <
            div className = "border-b border-gray-200" >
            <
            nav className = "flex space-x-8 px-6" > {
                views.map((view) => {
                        const IconComponent = view.icon
                        return ( <
                                button key = { view.id }
                                onClick = {
                                    () => setActiveView(view.id)
                                }
                                className = { `flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeView === view.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }` } >
                                <
                                IconComponent className = "w-4 h-4" / >
                                <
                                span > { view.name } < /span> {
                                view.id === 'alerts' && alerts.length > 0 && ( <
                                    span className = "bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full" > { alerts.length } <
                                    /span>
                                )
                            } {
                                view.id === 'insights' && insights.length > 0 && ( <
                                    span className = "bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full" > { insights.length } <
                                    /span>
                                )
                            } <
                            /button>
                    )
                })
        } <
        /nav> < /
    div >

        { /* Content Area */ } <
        div className = "p-6" > { renderContent() } <
        /div> < /
    div > <
        /div> < /
    div > <
        /div>
)
}