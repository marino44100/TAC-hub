'use client'
import { useState } from 'react'
import {
    Settings,
    Brain,
    Plus,
    AlertTriangle,
    Lightbulb,
    Save,
    RefreshCw,
    Database,
    Satellite,
    Activity,
    MapPin,
    Calendar,
    TrendingUp,
    Bell
} from 'lucide-react'
import { RealClimateDataService } from '../lib/realClimateDataService'

export default function ClimateAdminPanel() {
    const [climateService] = useState(() => new RealClimateDataService())
    const [activeTab, setActiveTab] = useState('ai-updates')
    const [isUpdating, setIsUpdating] = useState(false)
    const [newAlert, setNewAlert] = useState({
        title: '',
        message: '',
        severity: 'medium',
        region: 'Congo Basin',
        duration: '',
        recommendations: ''
    })
    const [newInsight, setNewInsight] = useState({
        title: '',
        description: '',
        impact: 'Medium',
        confidence: 85,
        recommendations: '',
        dataPoints: ''
    })

    const tabs = [
        { id: 'ai-updates', name: 'AI Updates', icon: Brain },
        { id: 'alerts', name: 'Manage Alerts', icon: AlertTriangle },
        { id: 'insights', name: 'Manage Insights', icon: Lightbulb },
        { id: 'data-sources', name: 'Data Sources', icon: Database }
    ]

    const regions = [
        'Congo Basin', 'Kinshasa', 'Mbandaka', 'Kisangani', 'Bukavu', 'Goma',
        'Yaoundé', 'Douala', 'Bangui', 'Libreville', 'Brazzaville', 'Malabo'
    ]

    const handleAIUpdate = async() => {
        setIsUpdating(true)
        try {
            await climateService.triggerAIUpdate(true)
            alert('🤖 AI Climate Update completed successfully! New data, alerts, and insights have been generated.')
        } catch (error) {
            alert('AI update failed: ' + error.message)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleAddAlert = async() => {
        if (!newAlert.title || !newAlert.message) {
            alert('Please fill in title and message fields')
            return
        }

        try {
            const alertData = {
                ...newAlert,
                recommendations: newAlert.recommendations.split('\n').filter(r => r.trim())
            }

            climateService.addCustomAlert(alertData)

            // Reset form
            setNewAlert({
                title: '',
                message: '',
                severity: 'medium',
                region: 'Congo Basin',
                duration: '',
                recommendations: ''
            })

            alert('✅ Alert added successfully!')
        } catch (error) {
            alert('Failed to add alert: ' + error.message)
        }
    }

    const handleAddInsight = async() => {
        if (!newInsight.title || !newInsight.description) {
            alert('Please fill in title and description fields')
            return
        }

        try {
            const insightData = {
                ...newInsight,
                type: 'custom',
                recommendations: newInsight.recommendations.split('\n').filter(r => r.trim()),
                dataPoints: newInsight.dataPoints.split('\n').filter(d => d.trim())
            }

            climateService.addCustomInsight(insightData)

            // Reset form
            setNewInsight({
                title: '',
                description: '',
                impact: 'Medium',
                confidence: 85,
                recommendations: '',
                dataPoints: ''
            })

            alert('✅ Insight added successfully!')
        } catch (error) {
            alert('Failed to add insight: ' + error.message)
        }
    }

    const renderAIUpdatesTab = () => ( <
        div className = "space-y-6" >
        <
        div className = "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6" >
        <
        div className = "flex items-center space-x-3 mb-4" >
        <
        div className = "p-3 bg-purple-100 rounded-lg" >
        <
        Brain className = "w-6 h-6 text-purple-600" / >
        <
        /div> <
        div >
        <
        h3 className = "text-lg font-semibold text-gray-900" > AI Climate Data Updates < /h3> <
        p className = "text-gray-600" > Trigger AI - powered analysis and data refresh < /p> < /
        div > <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" >
        <
        div className = "bg-white rounded-lg p-4 border border-gray-200" >
        <
        h4 className = "font-medium text-gray-900 mb-2" > Data Sources Monitored < /h4> <
        ul className = "text-sm text-gray-600 space-y-1" >
        <
        li className = "flex items-center space-x-2" >
        <
        Satellite className = "w-4 h-4" / >
        <
        span > NASA MODIS Satellite Data < /span> < /
        li > <
        li className = "flex items-center space-x-2" >
        <
        Activity className = "w-4 h-4" / >
        <
        span > NOAA Weather Stations < /span> < /
        li > <
        li className = "flex items-center space-x-2" >
        <
        Database className = "w-4 h-4" / >
        <
        span > ESA Sentinel Imagery < /span> < /
        li > <
        li className = "flex items-center space-x-2" >
        <
        MapPin className = "w-4 h-4" / >
        <
        span > Local Weather Networks < /span> < /
        li > <
        /ul> < /
        div >

        <
        div className = "bg-white rounded-lg p-4 border border-gray-200" >
        <
        h4 className = "font-medium text-gray-900 mb-2" > AI Analysis Features < /h4> <
        ul className = "text-sm text-gray-600 space-y-1" >
        <
        li > •Pattern recognition in climate data < /li> <
        li > •Anomaly detection and alerts < /li> <
        li > •Trend analysis and predictions < /li> <
        li > •Regional correlation analysis < /li> <
        li > •Automated insight generation < /li> < /
        ul > <
        /div> < /
        div >

        <
        button onClick = { handleAIUpdate }
        disabled = { isUpdating }
        className = "w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2" > {
            isUpdating ? ( <
                >
                <
                RefreshCw className = "w-5 h-5 animate-spin" / >
                <
                span > AI Analysis in Progress... < /span> < /
                >
            ) : ( <
                >
                <
                Brain className = "w-5 h-5" / >
                <
                span > Trigger AI Climate Update < /span> < /
                >
            )
        } <
        /button>

        {
            isUpdating && ( <
                div className = "mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4" >
                <
                div className = "flex items-center space-x-2 text-blue-800" >
                <
                Activity className = "w-4 h-4 animate-pulse" / >
                <
                span className = "text-sm" > AI is analyzing climate data from multiple sources... < /span> < /
                div > <
                /div>
            )
        } <
        /div> < /
        div >
    )

    const renderAlertsTab = () => ( <
        div className = "space-y-6" >
        <
        div className = "bg-white rounded-lg border border-gray-200 p-6" >
        <
        h3 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        AlertTriangle className = "w-5 h-5 mr-2 text-orange-500" / >
        Create New Climate Alert <
        /h3>

        <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Alert Title < /label> <
        input type = "text"
        value = { newAlert.title }
        onChange = {
            (e) => setNewAlert({...newAlert, title: e.target.value })
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder = "e.g., Extreme Heat Warning" /
        >
        <
        /div>

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Severity < /label> <
        select value = { newAlert.severity }
        onChange = {
            (e) => setNewAlert({...newAlert, severity: e.target.value })
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" >
        <
        option value = "low" > Low < /option> <
        option value = "medium" > Medium < /option> <
        option value = "high" > High < /option> <
        option value = "critical" > Critical < /option> < /
        select > <
        /div>

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Region < /label> <
        select value = { newAlert.region }
        onChange = {
            (e) => setNewAlert({...newAlert, region: e.target.value })
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" > {
            regions.map(region => ( <
                option key = { region }
                value = { region } > { region } < /option>
            ))
        } <
        /select> < /
        div >

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Duration < /label> <
        input type = "text"
        value = { newAlert.duration }
        onChange = {
            (e) => setNewAlert({...newAlert, duration: e.target.value })
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder = "e.g., 3 days, 1 week" /
        >
        <
        /div> < /
        div >

        <
        div className = "mt-4" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Alert Message < /label> <
        textarea value = { newAlert.message }
        onChange = {
            (e) => setNewAlert({...newAlert, message: e.target.value })
        }
        rows = { 3 }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder = "Describe the climate alert and its implications..." /
        >
        <
        /div>

        <
        div className = "mt-4" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Recommendations(one per line) < /label> <
        textarea value = { newAlert.recommendations }
        onChange = {
            (e) => setNewAlert({...newAlert, recommendations: e.target.value })
        }
        rows = { 3 }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder = "Stay hydrated&#10;Avoid outdoor activities during peak hours&#10;Check on vulnerable community members" /
        >
        <
        /div>

        <
        button onClick = { handleAddAlert }
        className = "mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Create Alert < /span> < /
        button > <
        /div> < /
        div >
    )

    const renderInsightsTab = () => ( <
        div className = "space-y-6" >
        <
        div className = "bg-white rounded-lg border border-gray-200 p-6" >
        <
        h3 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        Lightbulb className = "w-5 h-5 mr-2 text-blue-500" / >
        Create New Climate Insight <
        /h3>

        <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Insight Title < /label> <
        input type = "text"
        value = { newInsight.title }
        onChange = {
            (e) => setNewInsight({...newInsight, title: e.target.value })
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder = "e.g., Rising Temperature Trend" /
        >
        <
        /div>

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Impact Level < /label> <
        select value = { newInsight.impact }
        onChange = {
            (e) => setNewInsight({...newInsight, impact: e.target.value })
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
        <
        option value = "Low" > Low < /option> <
        option value = "Medium" > Medium < /option> <
        option value = "High" > High < /option> <
        option value = "Critical" > Critical < /option> < /
        select > <
        /div> < /
        div >

        <
        div className = "mt-4" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Confidence Level( % ) < /label> <
        input type = "range"
        min = "0"
        max = "100"
        value = { newInsight.confidence }
        onChange = {
            (e) => setNewInsight({...newInsight, confidence: parseInt(e.target.value) })
        }
        className = "w-full" /
        >
        <
        div className = "text-center text-sm text-gray-600 mt-1" > { newInsight.confidence } % < /div> < /
        div >

        <
        div className = "mt-4" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Description < /label> <
        textarea value = { newInsight.description }
        onChange = {
            (e) => setNewInsight({...newInsight, description: e.target.value })
        }
        rows = { 3 }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder = "Describe the climate insight and its significance..." /
        >
        <
        /div>

        <
        div className = "mt-4" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Recommendations(one per line) < /label> <
        textarea value = { newInsight.recommendations }
        onChange = {
            (e) => setNewInsight({...newInsight, recommendations: e.target.value })
        }
        rows = { 3 }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder = "Implement urban cooling strategies&#10;Increase tree cover in cities&#10;Develop heat adaptation plans" /
        >
        <
        /div>

        <
        div className = "mt-4" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Data Sources(one per line) < /label> <
        textarea value = { newInsight.dataPoints }
        onChange = {
            (e) => setNewInsight({...newInsight, dataPoints: e.target.value })
        }
        rows = { 2 }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder = "Temperature records from 15 weather stations&#10;Satellite thermal imagery&#10;Historical climate data" /
        >
        <
        /div>

        <
        button onClick = { handleAddInsight }
        className = "mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Create Insight < /span> < /
        button > <
        /div> < /
        div >
    )

    const renderDataSourcesTab = () => ( <
        div className = "space-y-6" >
        <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-6" >
        <
        div className = "bg-white rounded-lg border border-gray-200 p-6" >
        <
        h3 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        Satellite className = "w-5 h-5 mr-2 text-green-500" / >
        Active Data Sources <
        /h3> <
        div className = "space-y-3" > {
            [
                { name: 'NASA MODIS', status: 'Active', lastUpdate: '2 min ago', quality: 'High' },
                { name: 'NOAA Weather Stations', status: 'Active', lastUpdate: '5 min ago', quality: 'High' },
                { name: 'ESA Sentinel', status: 'Active', lastUpdate: '15 min ago', quality: 'Medium' },
                { name: 'Local Weather Networks', status: 'Limited', lastUpdate: '1 hour ago', quality: 'Medium' }
            ].map((source, index) => ( <
                div key = { index }
                className = "flex items-center justify-between p-3 bg-gray-50 rounded-lg" >
                <
                div >
                <
                p className = "font-medium text-gray-900" > { source.name } < /p> <
                p className = "text-sm text-gray-600" > Last update: { source.lastUpdate } < /p> < /
                div > <
                div className = "text-right" >
                <
                span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                    source.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }` } > { source.status } <
                /span> <
                p className = "text-sm text-gray-600 mt-1" > Quality: { source.quality } < /p> < /
                div > <
                /div>
            ))
        } <
        /div> < /
        div >

        <
        div className = "bg-white rounded-lg border border-gray-200 p-6" >
        <
        h3 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        TrendingUp className = "w-5 h-5 mr-2 text-blue-500" / >
        Data Quality Metrics <
        /h3> <
        div className = "space-y-4" >
        <
        div >
        <
        div className = "flex justify-between text-sm mb-1" >
        <
        span > Overall Data Quality < /span> <
        span > 87 % < /span> < /
        div > <
        div className = "w-full bg-gray-200 rounded-full h-2" >
        <
        div className = "bg-green-500 h-2 rounded-full"
        style = {
            { width: '87%' }
        } > < /div> < /
        div > <
        /div> <
        div >
        <
        div className = "flex justify-between text-sm mb-1" >
        <
        span > Coverage Completeness < /span> <
        span > 92 % < /span> < /
        div > <
        div className = "w-full bg-gray-200 rounded-full h-2" >
        <
        div className = "bg-blue-500 h-2 rounded-full"
        style = {
            { width: '92%' }
        } > < /div> < /
        div > <
        /div> <
        div >
        <
        div className = "flex justify-between text-sm mb-1" >
        <
        span > Update Frequency < /span> <
        span > 78 % < /span> < /
        div > <
        div className = "w-full bg-gray-200 rounded-full h-2" >
        <
        div className = "bg-yellow-500 h-2 rounded-full"
        style = {
            { width: '78%' }
        } > < /div> < /
        div > <
        /div> < /
        div > <
        /div> < /
        div > <
        /div>
    )

    return ( <
        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
        <
        h4 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        Settings className = "w-5 h-5 mr-2" / >
        Climate Analytics Admin Panel <
        /h4>

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

        { /* Tab Content */ } <
        div > { activeTab === 'ai-updates' && renderAIUpdatesTab() } { activeTab === 'alerts' && renderAlertsTab() } { activeTab === 'insights' && renderInsightsTab() } { activeTab === 'data-sources' && renderDataSourcesTab() } <
        /div> < /
        div >
    )
}