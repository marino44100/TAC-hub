'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import { Save, Plus, Trash2, ArrowLeft, BarChart3, RefreshCw, Eye } from 'lucide-react'
import dataManager from '../../../lib/dataManager'

export default function AnalyticsEditor() {
    const [deforestationData, setDeforestationData] = useState([])
    const [forestHealthData, setForestHealthData] = useState([])
    const [countryData, setCountryData] = useState([])
    const [climateData, setClimateData] = useState([])
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)
    const [previewMode, setPreviewMode] = useState(false)

    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.push('/login')
            return
        }

        loadAnalyticsData()
    }, [user, router])

    const loadAnalyticsData = () => {
        const data = dataManager.getData()
        if (data) {
            // Transform deforestation data from object to array
            const deforestationArray = Object.entries(data.deforestationData || {}).map(([year, values]) => ({
                year,
                hectares: values.area * 1000000, // Convert to hectares
                rate: values.percentage
            }))
            setDeforestationData(deforestationArray.length > 0 ? deforestationArray : getDefaultDeforestationData())

            // Transform forest health data from object to array
            const forestHealthArray = Object.entries(data.forestHealthData || {}).map(([month, health]) => ({
                month: month.charAt(0).toUpperCase() + month.slice(1, 3),
                health,
                biodiversity: health + Math.random() * 10 - 5,
                carbonStock: health - Math.random() * 5
            }))
            setForestHealthData(forestHealthArray.length > 0 ? forestHealthArray : getDefaultForestHealthData())

            setCountryData(data.countries || getDefaultCountryData())

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

            setAlerts(data.alerts || getDefaultAlerts())
        } else {
            setDeforestationData(getDefaultDeforestationData())
            setForestHealthData(getDefaultForestHealthData())
            setCountryData(getDefaultCountryData())
            setClimateData(getDefaultClimateData())
            setAlerts(getDefaultAlerts())
        }
    }

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

    const saveData = () => {
        setLoading(true)

        try {
            // Transform deforestation data back to object format
            const deforestationObject = {}
            deforestationData.forEach(item => {
                deforestationObject[item.year] = {
                    area: item.hectares / 1000000, // Convert back to millions
                    percentage: item.rate
                }
            })

            // Transform forest health data back to object format
            const forestHealthObject = {}
            forestHealthData.forEach(item => {
                const monthKey = item.month.toLowerCase()
                forestHealthObject[monthKey] = item.health
            })

            // Transform climate data back to object format
            const climateObject = {
                temperature: {
                    current: climateData.find(item => item.indicator === 'Temperature') ? .value || 26.5,
                    trend: climateData.find(item => item.indicator === 'Temperature') ? .change || '+1.2°C'
                },
                rainfall: {
                    current: climateData.find(item => item.indicator === 'Rainfall') ? .value || 1680,
                    trend: climateData.find(item => item.indicator === 'Rainfall') ? .change || '-8%'
                },
                humidity: {
                    current: climateData.find(item => item.indicator === 'Humidity') ? .value || 78,
                    trend: climateData.find(item => item.indicator === 'Humidity') ? .change || '+2%'
                },
                co2Levels: {
                    current: climateData.find(item => item.indicator === 'CO2 Levels') ? .value || 415,
                    trend: climateData.find(item => item.indicator === 'CO2 Levels') ? .change || '+2.1ppm'
                }
            }

            // Update data using dataManager
            const success = dataManager.updateData({
                deforestationData: deforestationObject,
                forestHealthData: forestHealthObject,
                countries: countryData,
                climateData: climateObject,
                alerts: alerts
            }, user.name)

            if (success) {
                setTimeout(() => {
                    setLoading(false)
                    setSaved(true)
                    setTimeout(() => setSaved(false), 3000)
                }, 1000)
            } else {
                setLoading(false)
                alert('Error saving data. Please try again.')
            }
        } catch (error) {
            console.error('Error saving data:', error)
            setLoading(false)
            alert('Error saving data. Please try again.')
        }
    }

    // Deforestation Data Functions
    const addDeforestationEntry = () => {
        const newEntry = { year: '2025', hectares: 1000000, rate: 0.7 }
        setDeforestationData([...deforestationData, newEntry])
    }

    const updateDeforestationEntry = (index, field, value) => {
        const updated = [...deforestationData]
        updated[index][field] = field === 'year' ? value : parseFloat(value)
        setDeforestationData(updated)
    }

    const removeDeforestationEntry = (index) => {
        setDeforestationData(deforestationData.filter((_, i) => i !== index))
    }

    // Forest Health Data Functions
    const updateForestHealthData = (index, field, value) => {
        const updated = [...forestHealthData]
        updated[index][field] = field === 'month' ? value : parseFloat(value)
        setForestHealthData(updated)
    }

    // Country Data Functions
    const addCountryEntry = () => {
        const newEntry = { country: 'New Country', coverage: 50, area: 1000000 }
        setCountryData([...countryData, newEntry])
    }

    const updateCountryData = (index, field, value) => {
        const updated = [...countryData]
        updated[index][field] = field === 'country' ? value : parseFloat(value)
        setCountryData(updated)
    }

    const removeCountryEntry = (index) => {
        setCountryData(countryData.filter((_, i) => i !== index))
    }

    // Climate Data Functions
    const updateClimateData = (index, field, value) => {
        const updated = [...climateData]
        if (field === 'value') {
            updated[index][field] = parseFloat(value)
        } else {
            updated[index][field] = value
        }
        setClimateData(updated)
    }

    // Alerts Functions
    const addAlert = () => {
        const newAlert = {
            type: 'info',
            message: 'New alert message',
            time: 'Just now'
        }
        setAlerts([newAlert, ...alerts])
    }

    const updateAlert = (index, field, value) => {
        const updated = [...alerts]
        updated[index][field] = value
        setAlerts(updated)
    }

    const removeAlert = (index) => {
        setAlerts(alerts.filter((_, i) => i !== index))
    }

    const resetToDefaults = () => {
        if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
            dataManager.resetToDefaults()
            loadAnalyticsData()
        }
    }

    if (!user || user.role !== 'admin') {
        return <div > Loading... < /div>
    }

    return ( <
        div className = "min-h-screen bg-gray-50" > { /* Header */ } <
        header className = "bg-white shadow-sm border-b" >
        <
        div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <
        div className = "flex justify-between items-center py-4" >
        <
        div className = "flex items-center space-x-4" >
        <
        button onClick = {
            () => router.push('/admin')
        }
        className = "flex items-center space-x-2 text-gray-600 hover:text-gray-900" >
        <
        ArrowLeft className = "w-5 h-5" / >
        <
        span > Back to Admin < /span> < /
        button > <
        div >
        <
        h1 className = "text-2xl font-bold text-gray-900" > Analytics Data Editor < /h1> <
        p className = "text-gray-600" > Modify climate data that appears on the public dashboard < /p> < /
        div > <
        /div> <
        div className = "flex items-center space-x-4" >
        <
        button onClick = {
            () => setPreviewMode(!previewMode)
        }
        className = "flex items-center space-x-2 text-primary-600 hover:text-primary-700" >
        <
        Eye className = "w-4 h-4" / >
        <
        span > { previewMode ? 'Edit Mode' : 'Preview Mode' } < /span> < /
        button > <
        a href = "/analytics"
        target = "_blank"
        className = "flex items-center space-x-2 text-primary-600 hover:text-primary-700" >
        <
        BarChart3 className = "w-4 h-4" / >
        <
        span > View Dashboard < /span> < /
        a > <
        button onClick = { resetToDefaults }
        className = "flex items-center space-x-2 text-gray-600 hover:text-gray-700" >
        <
        RefreshCw className = "w-4 h-4" / >
        <
        span > Reset to Defaults < /span> < /
        button > <
        button onClick = { saveData }
        disabled = { loading }
        className = "bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2" > {
            loading ? ( <
                div className = "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" > < /div>
            ) : ( <
                Save className = "w-4 h-4" / >
            )
        } <
        span > { loading ? 'Saving...' : 'Save Changes' } < /span> < /
        button > <
        /div> < /
        div > <
        /div> < /
        header >

        <
        div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" > {
            saved && ( <
                div className = "bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2" >
                <
                Save className = "w-5 h-5" / >
                <
                span > Analytics data saved successfully!Changes will appear on the public dashboard immediately. < /span> < /
                div >
            )
        }

        <
        div className = "space-y-8" > { /* Climate Indicators */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" > Climate Indicators < /h2> <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-6" > {
            climateData.map((item, index) => ( <
                div key = { index }
                className = "border border-gray-200 rounded-lg p-4" >
                <
                h3 className = "font-medium text-gray-900 mb-3" > { item.indicator } < /h3> <
                div className = "space-y-3" >
                <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-1" > Value < /label> <
                input type = "number"
                step = "0.1"
                value = { item.value }
                onChange = {
                    (e) => updateClimateData(index, 'value', e.target.value)
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /div> <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-1" > Change < /label> <
                input type = "text"
                value = { item.change }
                onChange = {
                    (e) => updateClimateData(index, 'change', e.target.value)
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder = "e.g., +1.2°C, -8%, +12ppm" /
                >
                <
                /div> <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-1" > Trend < /label> <
                select value = { item.trend }
                onChange = {
                    (e) => updateClimateData(index, 'trend', e.target.value)
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" >
                <
                option value = "up" > Up(Increasing) < /option> <
                option value = "down" > Down(Decreasing) < /option> < /
                select > <
                /div> < /
                div > <
                /div>
            ))
        } <
        /div> < /
        div >

        { /* Deforestation Data */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        div className = "flex justify-between items-center mb-4" >
        <
        h2 className = "text-xl font-semibold text-gray-900" > Deforestation Data < /h2> <
        button onClick = { addDeforestationEntry }
        className = "bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Add Year < /span> < /
        button > <
        /div> <
        div className = "overflow-x-auto" >
        <
        table className = "min-w-full divide-y divide-gray-200" >
        <
        thead className = "bg-gray-50" >
        <
        tr >
        <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Year < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Hectares Lost < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Rate( % ) < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> < /
        tr > <
        /thead> <
        tbody className = "bg-white divide-y divide-gray-200" > {
            deforestationData.map((item, index) => ( <
                tr key = { index } >
                <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "text"
                value = { item.year }
                onChange = {
                    (e) => updateDeforestationEntry(index, 'year', e.target.value)
                }
                className = "w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "number"
                value = { item.hectares }
                onChange = {
                    (e) => updateDeforestationEntry(index, 'hectares', e.target.value)
                }
                className = "w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "number"
                step = "0.1"
                value = { item.rate }
                onChange = {
                    (e) => updateDeforestationEntry(index, 'rate', e.target.value)
                }
                className = "w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                button onClick = {
                    () => removeDeforestationEntry(index)
                }
                className = "text-red-600 hover:text-red-900" >
                <
                Trash2 className = "w-4 h-4" / >
                <
                /button> < /
                td > <
                /tr>
            ))
        } <
        /tbody> < /
        table > <
        /div> < /
        div >

        { /* Forest Health Data */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-4" > Forest Health Indicators(Monthly) < /h2> <
        div className = "overflow-x-auto" >
        <
        table className = "min-w-full divide-y divide-gray-200" >
        <
        thead className = "bg-gray-50" >
        <
        tr >
        <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Month < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Health( % ) < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Biodiversity( % ) < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Carbon Stock( % ) < /th> < /
        tr > <
        /thead> <
        tbody className = "bg-white divide-y divide-gray-200" > {
            forestHealthData.map((item, index) => ( <
                tr key = { index } >
                <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                select value = { item.month }
                onChange = {
                    (e) => updateForestHealthData(index, 'month', e.target.value)
                }
                className = "w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" > {
                    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ( <
                        option key = { month }
                        value = { month } > { month } < /option>
                    ))
                } <
                /select> < /
                td > <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "number"
                min = "0"
                max = "100"
                value = { item.health }
                onChange = {
                    (e) => updateForestHealthData(index, 'health', e.target.value)
                }
                className = "w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "number"
                min = "0"
                max = "100"
                value = { item.biodiversity }
                onChange = {
                    (e) => updateForestHealthData(index, 'biodiversity', e.target.value)
                }
                className = "w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "number"
                min = "0"
                max = "100"
                value = { item.carbonStock }
                onChange = {
                    (e) => updateForestHealthData(index, 'carbonStock', e.target.value)
                }
                className = "w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> < /
                tr >
            ))
        } <
        /tbody> < /
        table > <
        /div> < /
        div >

        { /* Country Data */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        div className = "flex justify-between items-center mb-4" >
        <
        h2 className = "text-xl font-semibold text-gray-900" > Country Forest Coverage < /h2> <
        button onClick = { addCountryEntry }
        className = "bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Add Country < /span> < /
        button > <
        /div> <
        div className = "overflow-x-auto" >
        <
        table className = "min-w-full divide-y divide-gray-200" >
        <
        thead className = "bg-gray-50" >
        <
        tr >
        <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Country < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Coverage( % ) < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Area(hectares) < /th> <
        th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Actions < /th> < /
        tr > <
        /thead> <
        tbody className = "bg-white divide-y divide-gray-200" > {
            countryData.map((item, index) => ( <
                tr key = { index } >
                <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "text"
                value = { item.country }
                onChange = {
                    (e) => updateCountryData(index, 'country', e.target.value)
                }
                className = "w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "number"
                min = "0"
                max = "100"
                value = { item.coverage }
                onChange = {
                    (e) => updateCountryData(index, 'coverage', e.target.value)
                }
                className = "w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                input type = "number"
                value = { item.area }
                onChange = {
                    (e) => updateCountryData(index, 'area', e.target.value)
                }
                className = "w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" /
                >
                <
                /td> <
                td className = "px-6 py-4 whitespace-nowrap" >
                <
                button onClick = {
                    () => removeCountryEntry(index)
                }
                className = "text-red-600 hover:text-red-900" >
                <
                Trash2 className = "w-4 h-4" / >
                <
                /button> < /
                td > <
                /tr>
            ))
        } <
        /tbody> < /
        table > <
        /div> < /
        div >

        { /* Alerts Management */ } <
        div className = "bg-white rounded-lg shadow-sm p-6" >
        <
        div className = "flex justify-between items-center mb-4" >
        <
        h2 className = "text-xl font-semibold text-gray-900" > Real - time Alerts < /h2> <
        button onClick = { addAlert }
        className = "bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2" >
        <
        Plus className = "w-4 h-4" / >
        <
        span > Add Alert < /span> < /
        button > <
        /div> <
        div className = "space-y-4" > {
            alerts.map((alert, index) => ( <
                div key = { index }
                className = "border border-gray-200 rounded-lg p-4" >
                <
                div className = "grid grid-cols-1 md:grid-cols-3 gap-4" >
                <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-1" > Alert Type < /label> <
                select value = { alert.type }
                onChange = {
                    (e) => updateAlert(index, 'type', e.target.value)
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" >
                <
                option value = "critical" > Critical < /option> <
                option value = "warning" > Warning < /option> <
                option value = "info" > Info < /option> < /
                select > <
                /div> <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-1" > Time < /label> <
                input type = "text"
                value = { alert.time }
                onChange = {
                    (e) => updateAlert(index, 'time', e.target.value)
                }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder = "e.g., 2 hours ago" /
                >
                <
                /div> <
                div className = "flex items-end" >
                <
                button onClick = {
                    () => removeAlert(index)
                }
                className = "text-red-600 hover:text-red-900 p-2" >
                <
                Trash2 className = "w-4 h-4" / >
                <
                /button> < /
                div > <
                /div> <
                div className = "mt-4" >
                <
                label className = "block text-sm font-medium text-gray-700 mb-1" > Message < /label> <
                textarea value = { alert.message }
                onChange = {
                    (e) => updateAlert(index, 'message', e.target.value)
                }
                rows = { 2 }
                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder = "Enter alert message..." /
                >
                <
                /div> < /
                div >
            ))
        } <
        /div> < /
        div >

        { /* Data Summary */ } <
        div className = "bg-blue-50 border border-blue-200 rounded-lg p-6" >
        <
        h3 className = "text-lg font-semibold text-blue-900 mb-4" > Data Summary < /h3> <
        div className = "grid grid-cols-1 md:grid-cols-4 gap-4 text-sm" >
        <
        div className = "bg-white rounded p-3" >
        <
        div className = "font-medium text-gray-900" > Deforestation Data < /div> <
        div className = "text-gray-600" > { deforestationData.length }
        years < /div> < /
        div > <
        div className = "bg-white rounded p-3" >
        <
        div className = "font-medium text-gray-900" > Forest Health Data < /div> <
        div className = "text-gray-600" > { forestHealthData.length }
        months < /div> < /
        div > <
        div className = "bg-white rounded p-3" >
        <
        div className = "font-medium text-gray-900" > Country Data < /div> <
        div className = "text-gray-600" > { countryData.length }
        countries < /div> < /
        div > <
        div className = "bg-white rounded p-3" >
        <
        div className = "font-medium text-gray-900" > Active Alerts < /div> <
        div className = "text-gray-600" > { alerts.length }
        alerts < /div> < /
        div > <
        /div> <
        div className = "mt-4 text-sm text-blue-800" >
        <
        p > < strong > Last Updated: < /strong> {new Date().toLocaleString()}</p >
        <
        p > < strong > Note: < /strong> All changes are immediately reflected on the public analytics dashboard.</p >
        <
        /div> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}