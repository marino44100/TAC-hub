'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { TrendingUp, TrendingDown, Thermometer, CloudRain, Droplets, Wind, AlertTriangle, Clock, User, RefreshCw } from 'lucide-react'
import dataManager from '../../lib/dataManager'

export default function AnalyticsPage() {
    const [deforestationData, setDeforestationData] = useState([])
    const [forestHealthData, setForestHealthData] = useState([])
    const [countryData, setCountryData] = useState([])
    const [climateData, setClimateData] = useState([])
    const [alertsData, setAlertsData] = useState([])
    const [lastUpdated, setLastUpdated] = useState('')
    const [updatedBy, setUpdatedBy] = useState('')
    const [timeRange, setTimeRange] = useState('all')
    const [selectedRegion, setSelectedRegion] = useState('all')
    const [isLoading, setIsLoading] = useState(false)

    const loadData = () => {
        setIsLoading(true)
        try {
            const data = dataManager.getData()
            if (data) {
                // Transform deforestation data
                const deforestationArray = Object.entries(data.deforestationData || {}).map(([year, values]) => ({
                    year,
                    hectares: values.area * 1000000, // Convert to hectares
                    rate: values.percentage
                }))
                setDeforestationData(deforestationArray)

                // Transform forest health data
                const forestHealthArray = Object.entries(data.forestHealthData || {}).map(([month, health]) => ({
                    month: month.charAt(0).toUpperCase() + month.slice(1, 3),
                    health,
                    biodiversity: health + Math.random() * 10 - 5,
                    carbonStock: health - Math.random() * 5
                }))
                setForestHealthData(forestHealthArray)

                // Transform country data
                setCountryData(data.countries || [])

                // Transform climate data
                const climate = data.climateData || {}
                const climateArray = [{
                        indicator: 'Temperature',
                        value: climate.temperature ? .current || 26.5,
                        change: climate.temperature ? .trend || '+1.2°C',
                        trend: 'up'
                    },
                    {
                        indicator: 'Rainfall',
                        value: climate.rainfall ? .current || 1680,
                        change: climate.rainfall ? .trend || '-8%',
                        trend: 'down'
                    },
                    {
                        indicator: 'Humidity',
                        value: climate.humidity ? .current || 78,
                        change: climate.humidity ? .trend || '+2%',
                        trend: 'up'
                    },
                    {
                        indicator: 'CO2 Levels',
                        value: climate.co2Levels ? .current || 415,
                        change: climate.co2Levels ? .trend || '+2.1ppm',
                        trend: 'up'
                    }
                ]
                setClimateData(climateArray)

                setAlertsData(data.alerts || [])
                setLastUpdated(data.lastUpdated || '')
                setUpdatedBy(data.updatedBy || '')
            } else {
                // Fallback to default data
                setDeforestationData(getDefaultDeforestationData())
                setForestHealthData(getDefaultForestHealthData())
                setCountryData(getDefaultCountryData())
                setClimateData(getDefaultClimateData())
                setAlertsData(getDefaultAlerts())
            }
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()

        // Listen for data updates
        const handleDataUpdate = () => {
            loadData()
        }

        window.addEventListener('tacHubDataUpdate', handleDataUpdate)
        window.addEventListener('tacHubDataReset', handleDataUpdate)
        window.addEventListener('tacHubDataImport', handleDataUpdate)

        return () => {
            window.removeEventListener('tacHubDataUpdate', handleDataUpdate)
            window.removeEventListener('tacHubDataReset', handleDataUpdate)
            window.removeEventListener('tacHubDataImport', handleDataUpdate)
        }
    }, [])

    const getDefaultDeforestationData = () => [
        { year: '2018', hectares: 1200000, rate: 0.8 },
        { year: '2019', hectares: 1350000, rate: 0.9 },
        { year: '2020', hectares: 1180000, rate: 0.7 },
        { year: '2021', hectares: 1420000, rate: 1.1 },
        { year: '2022', hectares: 1380000, rate: 1.0 },
        { year: '2023', hectares: 1250000, rate: 0.85 },
        { year: '2024', hectares: 1100000, rate: 0.75 }
    ]

    const getDefaultForestHealthData = () => [
        { month: 'Jan', health: 78, biodiversity: 82, carbonStock: 75 },
        { month: 'Feb', health: 76, biodiversity: 80, carbonStock: 74 },
        { month: 'Mar', health: 79, biodiversity: 83, carbonStock: 77 },
        { month: 'Apr', health: 81, biodiversity: 85, carbonStock: 79 },
        { month: 'May', health: 83, biodiversity: 87, carbonStock: 81 },
        { month: 'Jun', health: 85, biodiversity: 89, carbonStock: 83 },
        { month: 'Jul', health: 82, biodiversity: 86, carbonStock: 80 },
        { month: 'Aug', health: 80, biodiversity: 84, carbonStock: 78 },
        { month: 'Sep', health: 84, biodiversity: 88, carbonStock: 82 },
        { month: 'Oct', health: 86, biodiversity: 90, carbonStock: 84 },
        { month: 'Nov', health: 88, biodiversity: 92, carbonStock: 86 },
        { month: 'Dec', health: 85, biodiversity: 89, carbonStock: 83 }
    ]

    const getDefaultCountryData = () => [
        { country: 'DRC', coverage: 67, area: 155000000 },
        { country: 'Cameroon', coverage: 42, area: 47544000 },
        { country: 'CAR', coverage: 36, area: 62298000 },
        { country: 'Gabon', coverage: 85, area: 26767000 },
        { country: 'Congo', coverage: 65, area: 34200000 },
        { country: 'Equatorial Guinea', coverage: 58, area: 2805000 }
    ]

    const getDefaultClimateData = () => [
        { indicator: 'Temperature', value: 25.4, change: '+1.2°C', trend: 'up' },
        { indicator: 'Rainfall', value: 1680, change: '-8%', trend: 'down' },
        { indicator: 'Humidity', value: 78, change: '+2%', trend: 'up' },
        { indicator: 'CO2 Levels', value: 415, change: '+12ppm', trend: 'up' }
    ]

    const getDefaultAlerts = () => [{
            type: 'critical',
            message: 'Deforestation rate increased by 15% in Eastern DRC',
            time: '2 hours ago'
        },
        {
            type: 'warning',
            message: 'Unusual temperature spike detected in Cameroon highlands',
            time: '5 hours ago'
        },
        {
            type: 'info',
            message: 'New conservation project approved in Gabon',
            time: '1 day ago'
        }
    ]

    const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316']

    return ( <
        div className = "min-h-screen bg-gray-50" >
        <
        Header / >

        <
        div className = "container-max py-8" > { /* Page Header */ } <
        div className = "text-center mb-8" >
        <
        h1 className = "text-4xl font-bold text-gray-900 mb-4" >
        Congo Basin Climate Analytics <
        /h1> <
        p className = "text-lg text-gray-600 max-w-3xl mx-auto" >
        Real - time monitoring and analysis of climate data, deforestation patterns,
        and forest health indicators across the Congo Basin region. <
        /p> < /
        div >

        { /* Controls */ } <
        div className = "bg-white rounded-lg shadow-sm p-6 mb-8" >
        <
        div className = "flex flex-col md:flex-row gap-4 items-center justify-between" >
        <
        div className = "flex flex-col md:flex-row gap-4" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Time Range < /label> <
        select value = { timeRange }
        onChange = {
            (e) => setTimeRange(e.target.value)
        }
        className = "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" >
        <
        option value = "all" > All Time < /option> <
        option value = "5y" > Last 5 Years < /option> <
        option value = "3y" > Last 3 Years < /option> <
        option value = "1y" > Last Year < /option> < /
        select > <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Region < /label> <
        select value = { selectedRegion }
        onChange = {
            (e) => setSelectedRegion(e.target.value)
        }
        className = "px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" >
        <
        option value = "all" > All Countries < /option> <
        option value = "drc" > DRC < /option> <
        option value = "cameroon" > Cameroon < /option> <
        option value = "gabon" > Gabon < /option> <
        option value = "car" > CAR < /option> <
        option value = "congo" > Congo < /option> <
        option value = "eq-guinea" > Equatorial Guinea < /option> < /
        select > <
        /div> < /
        div > <
        div className = "flex items-center justify-between" >
        <
        button onClick = { loadData }
        disabled = { isLoading }
        className = "flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors" >
        <
        RefreshCw className = { `w-4 h-4 ${isLoading ? 'animate-spin' : ''}` }
        /> <
        span > { isLoading ? 'Refreshing...' : 'Refresh Data' } < /span> < /
        button > <
        div className = "text-sm text-gray-600" > {
            lastUpdated ? ( <
                div className = "text-right" >
                <
                div className = "flex items-center space-x-2" >
                <
                Clock className = "w-4 h-4" / >
                <
                span > Last updated: { new Date(lastUpdated).toLocaleDateString() }
                at { new Date(lastUpdated).toLocaleTimeString() } < /span> < /
                div > {
                    updatedBy && ( <
                        div className = "flex items-center space-x-2 text-xs text-primary-600 mt-1" >
                        <
                        User className = "w-3 h-3" / >
                        <
                        span > Updated by: { updatedBy } < /span> < /
                        div >
                    )
                } <
                /div>
            ) : ( <
                div className = "flex items-center space-x-2" >
                <
                Clock className = "w-4 h-4" / >
                <
                span > Last updated: { new Date().toLocaleDateString() }
                at { new Date().toLocaleTimeString() } < /span> < /
                div >
            )
        } <
        /div> < /
        div > <
        /div> < /
        div >

        { /* Climate Indicators */ } <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" > {
            climateData.map((item, index) => ( <
                div key = { index }
                className = "bg-white rounded-lg shadow-sm p-6" >
                <
                div className = "flex items-center justify-between mb-4" >
                <
                div className = "flex items-center space-x-3" > { item.indicator === 'Temperature' && < Thermometer className = "w-6 h-6 text-red-500" / > } { item.indicator === 'Rainfall' && < CloudRain className = "w-6 h-6 text-blue-500" / > } { item.indicator === 'Humidity' && < Droplets className = "w-6 h-6 text-cyan-500" / > } { item.indicator === 'CO2 Levels' && < Wind className = "w-6 h-6 text-gray-500" / > } <
                h3 className = "font-medium text-gray-900" > { item.indicator } < /h3> < /
                div > {
                    item.trend === 'up' ? ( <
                        TrendingUp className = "w-5 h-5 text-red-500" / >
                    ) : ( <
                        TrendingDown className = "w-5 h-5 text-green-500" / >
                    )
                } <
                /div> <
                div className = "text-3xl font-bold text-gray-900 mb-2" > { item.value } { item.indicator === 'Temperature' && '°C' } { item.indicator === 'Rainfall' && 'mm' } { item.indicator === 'Humidity' && '%' } { item.indicator === 'CO2 Levels' && 'ppm' } <
                /div> <
                div className = { `text-sm ${item.trend === 'up' ? 'text-red-600' : 'text-green-600'}` } > { item.change }
                from last year <
                /div> < /
                div >
            ))
        } <
        /div>

        { /* Charts Grid */ } <
        div className = "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" > { /* Deforestation Trends */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" >
        Deforestation Trends(Hectares Lost) <
        /h2> <
        ResponsiveContainer width = "100%"
        height = { 300 } >
        <
        AreaChart data = { deforestationData } >
        <
        CartesianGrid strokeDasharray = "3 3" / >
        <
        XAxis dataKey = "year" / >
        <
        YAxis / >
        <
        Tooltip formatter = {
            (value) => [value.toLocaleString(), 'Hectares']
        }
        /> <
        Area type = "monotone"
        dataKey = "hectares"
        stroke = "#EF4444"
        fill = "#FEE2E2" /
        >
        <
        /AreaChart> < /
        ResponsiveContainer > <
        /div>

        { /* Forest Health Index */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" >
        Forest Health Indicators <
        /h2> <
        ResponsiveContainer width = "100%"
        height = { 300 } >
        <
        LineChart data = { forestHealthData } >
        <
        CartesianGrid strokeDasharray = "3 3" / >
        <
        XAxis dataKey = "month" / >
        <
        YAxis / >
        <
        Tooltip / >
        <
        Legend / >
        <
        Line type = "monotone"
        dataKey = "health"
        stroke = "#10B981"
        strokeWidth = { 2 }
        name = "Overall Health" /
        >
        <
        Line type = "monotone"
        dataKey = "biodiversity"
        stroke = "#3B82F6"
        strokeWidth = { 2 }
        name = "Biodiversity Index" /
        >
        <
        Line type = "monotone"
        dataKey = "carbonStock"
        stroke = "#8B5CF6"
        strokeWidth = { 2 }
        name = "Carbon Stock" /
        >
        <
        /LineChart> < /
        ResponsiveContainer > <
        /div>

        { /* Country Comparison */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" >
        Forest Coverage by Country <
        /h2> <
        ResponsiveContainer width = "100%"
        height = { 300 } >
        <
        BarChart data = { countryData } >
        <
        CartesianGrid strokeDasharray = "3 3" / >
        <
        XAxis dataKey = "country" / >
        <
        YAxis / >
        <
        Tooltip formatter = {
            (value) => [value + '%', 'Coverage']
        }
        /> <
        Bar dataKey = "coverage"
        fill = "#10B981" / >
        <
        /BarChart> < /
        ResponsiveContainer > <
        /div>

        { /* Forest Area Distribution */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" >
        Forest Area Distribution <
        /h2> <
        ResponsiveContainer width = "100%"
        height = { 300 } >
        <
        PieChart >
        <
        Pie data = { countryData }
        cx = "50%"
        cy = "50%"
        labelLine = { false }
        label = {
            ({ country, coverage }) => `${country}: ${coverage}%`
        }
        outerRadius = { 80 }
        fill = "#8884d8"
        dataKey = "coverage" > {
            countryData.map((entry, index) => ( <
                Cell key = { `cell-${index}` }
                fill = { COLORS[index % COLORS.length] }
                />
            ))
        } <
        /Pie> <
        Tooltip / >
        <
        /PieChart> < /
        ResponsiveContainer > <
        /div> < /
        div >

        { /* Alerts and Recommendations */ } <
        div className = "grid grid-cols-1 lg:grid-cols-2 gap-8" > { /* Real-time Alerts */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" > Real - time Alerts < /h2> <
        div className = "space-y-4" > {
            alertsData.map((alert, index) => ( <
                div key = { index }
                className = { `flex items-start space-x-3 p-4 rounded-lg ${
                  alert.type === 'critical' ? 'bg-red-50 border border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-blue-50 border border-blue-200'
                }` } >
                <
                AlertTriangle className = { `w-5 h-5 mt-0.5 ${
                    alert.type === 'critical' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }` }
                /> <
                div className = "flex-1" >
                <
                p className = { `font-medium ${
                      alert.type === 'critical' ? 'text-red-800' :
                      alert.type === 'warning' ? 'text-yellow-800' :
                      'text-blue-800'
                    }` } > { alert.message } <
                /p> <
                p className = "text-sm text-gray-600 mt-1" > { alert.time } < /p> < /
                div > <
                /div>
            ))
        } <
        /div> < /
        div >

        { /* Key Insights */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" > Key Insights < /h2> <
        div className = "space-y-4" >
        <
        div className = "border-l-4 border-green-500 pl-4" >
        <
        h3 className = "font-medium text-gray-900" > Positive Trend < /h3> <
        p className = "text-gray-600 text-sm" >
        Deforestation rates have decreased by 25 % compared to 2021,
        indicating successful conservation efforts. <
        /p> < /
        div > <
        div className = "border-l-4 border-yellow-500 pl-4" >
        <
        h3 className = "font-medium text-gray-900" > Area of Concern < /h3> <
        p className = "text-gray-600 text-sm" >
        Rising temperatures in the region may affect forest health and biodiversity in the coming months. <
        /p> < /
        div > <
        div className = "border-l-4 border-blue-500 pl-4" >
        <
        h3 className = "font-medium text-gray-900" > Recommendation < /h3> <
        p className = "text-gray-600 text-sm" >
        Increased monitoring and community engagement programs needed in high - risk deforestation areas. <
        /p> < /
        div > <
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