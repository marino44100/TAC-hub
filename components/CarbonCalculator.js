'use client'
import { useState, useEffect } from 'react'
import { Calculator, TreePine, Zap, Car, Trash2, Leaf, BarChart3, Save } from 'lucide-react'

export default function CarbonCalculator({ onCalculationComplete }) {
    const [activeCategory, setActiveCategory] = useState('energy')
    const [calculations, setCalculations] = useState({
        energy: {},
        transport: {},
        waste: {},
        agriculture: {},
        forestry: {}
    })
    const [results, setResults] = useState({
        totalEmissions: 0,
        categoryBreakdown: {},
        offsetPotential: 0,
        recommendations: []
    })

    // Carbon emission factors (kg CO2 equivalent)
    const emissionFactors = {
        energy: {
            electricity: 0.5,
            charcoal: 3.7,
            firewood: 1.8,
            kerosene: 2.5,
            lpg: 3.0,
            solar: 0.05,
            hydroelectric: 0.02
        },
        transport: {
            car_petrol: 0.21,
            motorcycle: 0.11,
            bus: 0.08,
            domestic_flight: 0.25,
            boat: 0.12,
            bicycle: 0,
            walking: 0
        },
        waste: {
            organic_waste: 0.5,
            plastic_waste: 3.3,
            composting: -0.2,
            recycling: -1.5
        },
        agriculture: {
            rice: 2.5,
            cassava: 0.4,
            cattle: 18.7,
            chickens: 0.4,
            fertilizer_use: 5.5
        },
        forestry: {
            deforestation: 200,
            reforestation: -25,
            forest_conservation: -100,
            sustainable_logging: 20
        }
    }

    const categories = [
        { id: 'energy', name: 'Energy Use', icon: Zap, color: 'yellow' },
        { id: 'transport', name: 'Transportation', icon: Car, color: 'blue' },
        { id: 'waste', name: 'Waste Management', icon: Trash2, color: 'red' },
        { id: 'agriculture', name: 'Agriculture', icon: Leaf, color: 'green' },
        { id: 'forestry', name: 'Forestry', icon: TreePine, color: 'emerald' }
    ]

    useEffect(() => {
        calculateTotalEmissions()
    }, [calculations])

    const calculateTotalEmissions = () => {
        let total = 0
        const breakdown = {}

        Object.keys(calculations).forEach(category => {
            let categoryTotal = 0
            Object.keys(calculations[category]).forEach(item => {
                const value = calculations[category][item] || 0
                const factor = emissionFactors[category] ? .[item] || 0
                categoryTotal += value * factor
            })
            breakdown[category] = categoryTotal
            total += categoryTotal
        })

        const offsetPotential = calculateOffsetPotential()
        const recommendations = generateRecommendations(breakdown, total)

        setResults({
            totalEmissions: total,
            categoryBreakdown: breakdown,
            offsetPotential,
            recommendations
        })
    }

    const calculateOffsetPotential = () => {
        let potential = 0

        const forestArea = calculations.forestry ? .forest_conservation || 0
        potential += forestArea * Math.abs(emissionFactors.forestry.forest_conservation)

        const treesPlanted = calculations.forestry ? .reforestation || 0
        potential += treesPlanted * Math.abs(emissionFactors.forestry.reforestation)

        const renewableEnergy = (calculations.energy ? .solar || 0) + (calculations.energy ? .hydroelectric || 0)
        potential += renewableEnergy * 100

        const composting = calculations.waste ? .composting || 0
        const recycling = calculations.waste ? .recycling || 0
        potential += (composting * Math.abs(emissionFactors.waste.composting)) +
            (recycling * Math.abs(emissionFactors.waste.recycling))

        return potential
    }

    const generateRecommendations = (breakdown, total) => {
        const recommendations = []

        if (breakdown.energy > total * 0.3) {
            recommendations.push({
                category: 'Energy',
                priority: 'High',
                action: 'Switch to renewable energy sources (solar, hydroelectric)',
                impact: 'Could reduce emissions by 60-80%',
                icon: Zap
            })
        }

        if (breakdown.transport > total * 0.25) {
            recommendations.push({
                category: 'Transport',
                priority: 'Medium',
                action: 'Use public transport, cycling, or walking more often',
                impact: 'Could reduce emissions by 40-60%',
                icon: Car
            })
        }

        if (breakdown.forestry > 0) {
            recommendations.push({
                category: 'Forestry',
                priority: 'High',
                action: 'Implement reforestation and forest conservation programs',
                impact: 'Could offset 50-100% of emissions',
                icon: TreePine
            })
        }

        return recommendations
    }

    const updateCalculation = (category, item, value) => {
        setCalculations(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [item]: parseFloat(value) || 0
            }
        }))
    }

    const handleSubmit = async() => {
        if (results.totalEmissions === 0) {
            alert('Please enter some data to calculate emissions')
            return
        }

        const calculationData = {
            calculations,
            results,
            timestamp: new Date().toISOString(),
            type: 'carbon_calculation',
            location: 'Congo Basin',
            methodology: 'IPCC Guidelines',
            offsetPotential: results.offsetPotential,
            netEmissions: results.totalEmissions - results.offsetPotential
        }

        if (onCalculationComplete) {
            await onCalculationComplete(calculationData)
        }

        alert('Carbon calculation saved successfully!')
    }

    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(Math.round(num))
    }

    const renderInputField = (category, item, label, placeholder) => ( <
        div key = { item } >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > { label } < /label> <
        input type = "number"
        value = { calculations[category][item] || '' }
        onChange = {
            (e) => updateCalculation(category, item, e.target.value) }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder = { placeholder }
        /> <
        /div>
    )

    const renderCategoryInputs = () => {
        switch (activeCategory) {
            case 'energy':
                return ( <
                    div className = "space-y-4" >
                    <
                    h5 className = "font-semibold text-gray-900 mb-3" > Energy Consumption(Monthly) < /h5> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('energy', 'electricity', 'Electricity (kWh)', 'e.g., 150') } { renderInputField('energy', 'charcoal', 'Charcoal (kg)', 'e.g., 30') } { renderInputField('energy', 'firewood', 'Firewood (kg)', 'e.g., 100') } { renderInputField('energy', 'kerosene', 'Kerosene (liters)', 'e.g., 20') } { renderInputField('energy', 'lpg', 'LPG/Cooking Gas (kg)', 'e.g., 15') } <
                    /div> <
                    div className = "bg-green-50 border border-green-200 rounded-lg p-4" >
                    <
                    h6 className = "font-semibold text-green-900 mb-2" > Renewable Energy(Carbon Negative) < /h6> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('energy', 'solar', 'Solar Energy (kWh)', 'e.g., 50') } { renderInputField('energy', 'hydroelectric', 'Hydroelectric (kWh)', 'e.g., 25') } <
                    /div> <
                    /div> <
                    /div>
                )
            case 'transport':
                return ( <
                    div className = "space-y-4" >
                    <
                    h5 className = "font-semibold text-gray-900 mb-3" > Transportation(Monthly Distance) < /h5> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('transport', 'car_petrol', 'Car - Petrol (km)', 'e.g., 500') } { renderInputField('transport', 'motorcycle', 'Motorcycle (km)', 'e.g., 200') } { renderInputField('transport', 'bus', 'Bus/Public Transport (km)', 'e.g., 150') } { renderInputField('transport', 'domestic_flight', 'Domestic Flights (km)', 'e.g., 1000') } { renderInputField('transport', 'boat', 'Boat/Water Transport (km)', 'e.g., 50') } <
                    /div> <
                    div className = "bg-green-50 border border-green-200 rounded-lg p-4" >
                    <
                    h6 className = "font-semibold text-green-900 mb-2" > Sustainable Transport(Carbon Neutral) < /h6> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('transport', 'bicycle', 'Bicycle (km)', 'e.g., 100') } { renderInputField('transport', 'walking', 'Walking (km)', 'e.g., 50') } <
                    /div> <
                    /div> <
                    /div>
                )
            case 'waste':
                return ( <
                    div className = "space-y-4" >
                    <
                    h5 className = "font-semibold text-gray-900 mb-3" > Waste Management(Monthly) < /h5> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('waste', 'organic_waste', 'Organic Waste (kg)', 'e.g., 20') } { renderInputField('waste', 'plastic_waste', 'Plastic Waste (kg)', 'e.g., 5') } <
                    /div> <
                    div className = "bg-green-50 border border-green-200 rounded-lg p-4" >
                    <
                    h6 className = "font-semibold text-green-900 mb-2" > Waste Reduction(Carbon Negative) < /h6> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('waste', 'composting', 'Composting (kg)', 'e.g., 15') } { renderInputField('waste', 'recycling', 'Recycling (kg)', 'e.g., 10') } <
                    /div> <
                    /div> <
                    /div>
                )
            case 'agriculture':
                return ( <
                    div className = "space-y-4" >
                    <
                    h5 className = "font-semibold text-gray-900 mb-3" > Agriculture(Monthly) < /h5> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('agriculture', 'rice', 'Rice Production (kg)', 'e.g., 100') } { renderInputField('agriculture', 'cassava', 'Cassava Production (kg)', 'e.g., 200') } { renderInputField('agriculture', 'cattle', 'Cattle (number of heads)', 'e.g., 5') } { renderInputField('agriculture', 'chickens', 'Chickens (number of heads)', 'e.g., 20') } { renderInputField('agriculture', 'fertilizer_use', 'Fertilizer Use (kg)', 'e.g., 10') } <
                    /div> <
                    /div>
                )
            case 'forestry':
                return ( <
                    div className = "space-y-4" >
                    <
                    h5 className = "font-semibold text-gray-900 mb-3" > Forestry Activities < /h5> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('forestry', 'deforestation', 'Trees Cut Down (number)', 'e.g., 5') } { renderInputField('forestry', 'sustainable_logging', 'Sustainable Logging (m³)', 'e.g., 2') } <
                    /div> <
                    div className = "bg-green-50 border border-green-200 rounded-lg p-4" >
                    <
                    h6 className = "font-semibold text-green-900 mb-2" > Forest Conservation(Carbon Negative) < /h6> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > { renderInputField('forestry', 'reforestation', 'Trees Planted (number)', 'e.g., 50') } { renderInputField('forestry', 'forest_conservation', 'Forest Conservation (hectares)', 'e.g., 10') } <
                    /div> <
                    /div> <
                    /div>
                )
            default:
                return <div > Select a category to start calculating < /div>
        }
    }

    return ( <
        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
        <
        h4 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        Calculator className = "w-5 h-5 mr-2" / >
        Carbon Footprint Calculator <
        /h4>

        { /* Category Tabs */ } <
        div className = "flex flex-wrap gap-2 mb-6" > {
            categories.map((category) => {
                const IconComponent = category.icon
                return ( <
                    button key = { category.id }
                    onClick = {
                        () => setActiveCategory(category.id) }
                    className = { `flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }` } >
                    <
                    IconComponent className = "w-4 h-4 mr-2" / > { category.name } <
                    /button>
                )
            })
        } <
        /div>

        { /* Input Forms */ } <
        div className = "mb-6" > { renderCategoryInputs() } <
        /div>

        { /* Real-time Results */ } <
        div className = "bg-gray-50 rounded-lg p-4 mb-6" >
        <
        h5 className = "font-semibold text-gray-900 mb-3 flex items-center" >
        <
        BarChart3 className = "w-4 h-4 mr-2" / >
        Current Calculation Results <
        /h5>

        <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-4" >
        <
        div className = "bg-white rounded-lg p-4 text-center" >
        <
        div className = "text-2xl font-bold text-red-600" > { formatNumber(results.totalEmissions) } <
        /div> <
        div className = "text-sm text-gray-600" > kg CO₂ Emissions < /div> <
        /div>

        <
        div className = "bg-white rounded-lg p-4 text-center" >
        <
        div className = "text-2xl font-bold text-green-600" > { formatNumber(results.offsetPotential) } <
        /div> <
        div className = "text-sm text-gray-600" > kg CO₂ Offset Potential < /div> <
        /div>

        <
        div className = "bg-white rounded-lg p-4 text-center" >
        <
        div className = { `text-2xl font-bold ${
              results.totalEmissions - results.offsetPotential > 0 ? 'text-red-600' : 'text-green-600'
            }` } > { formatNumber(results.totalEmissions - results.offsetPotential) } <
        /div> <
        div className = "text-sm text-gray-600" > kg CO₂ Net Emissions < /div> <
        /div> <
        /div> <
        /div>

        { /* Category Breakdown */ } {
            results.totalEmissions > 0 && ( <
                div className = "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" >
                <
                h6 className = "font-semibold text-blue-900 mb-3" > Emissions by Category < /h6> <
                div className = "space-y-2" > {
                    Object.entries(results.categoryBreakdown).map(([category, emissions]) => {
                        const categoryInfo = categories.find(c => c.id === category)
                        const percentage = results.totalEmissions > 0 ? (Math.abs(emissions) / Math.abs(results.totalEmissions) * 100) : 0
                        return ( <
                            div key = { category }
                            className = "flex justify-between items-center" >
                            <
                            span className = "text-sm font-medium text-blue-800" > { categoryInfo ? .name || category } <
                            /span> <
                            div className = "flex items-center space-x-2" >
                            <
                            div className = "w-20 bg-blue-200 rounded-full h-2" >
                            <
                            div className = { `h-2 rounded-full ${emissions >= 0 ? 'bg-red-600' : 'bg-green-600'}` }
                            style = {
                                { width: `${Math.min(percentage, 100)}%` } } >
                            < /div> <
                            /div> <
                            span className = { `text-sm w-16 text-right ${emissions >= 0 ? 'text-red-700' : 'text-green-700'}` } > { formatNumber(emissions) }
                            kg <
                            /span> <
                            /div> <
                            /div>
                        )
                    })
                } <
                /div> <
                /div>
            )
        }

        { /* Recommendations */ } {
            results.recommendations.length > 0 && ( <
                div className = "bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6" >
                <
                h6 className = "font-semibold text-yellow-900 mb-3" > Recommendations to Reduce Carbon Footprint < /h6> <
                div className = "space-y-3" > {
                    results.recommendations.map((rec, index) => {
                        const IconComponent = rec.icon
                        return ( <
                            div key = { index }
                            className = "flex items-start space-x-3" >
                            <
                            div className = { `p-2 rounded-lg ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-600' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }` } >
                            <
                            IconComponent className = "w-4 h-4" / >
                            <
                            /div> <
                            div className = "flex-1" >
                            <
                            div className = "flex items-center space-x-2 mb-1" >
                            <
                            span className = "font-medium text-yellow-900" > { rec.category } < /span> <
                            span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }` } > { rec.priority }
                            Priority <
                            /span> <
                            /div> <
                            p className = "text-sm text-yellow-800 mb-1" > { rec.action } < /p> <
                            p className = "text-xs text-yellow-700" > { rec.impact } < /p> <
                            /div> <
                            /div>
                        )
                    })
                } <
                /div> <
                /div>
            )
        }

        { /* Submit Button */ } <
        button onClick = { handleSubmit }
        disabled = { results.totalEmissions === 0 }
        className = "w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center" >
        <
        Save className = "w-4 h-4 mr-2" / >
        Save Carbon Calculation <
        /button> <
        /div>
    )
}