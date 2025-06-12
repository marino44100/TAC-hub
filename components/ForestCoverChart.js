'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { TreePine, TrendingDown, AlertTriangle, Info } from 'lucide-react'

export default function ForestCoverChart({ data, selectedRegion = 'Congo Basin' }) {
  if (!data?.globalData?.forestCover) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TreePine className="w-5 h-5 mr-2 text-green-600" />
          Forest Cover Distribution
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <TreePine className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Loading forest cover data...</p>
          </div>
        </div>
      </div>
    )
  }

  const forestData = data.globalData.forestCover
  const distributionData = forestData.distribution || []
  
  // Regional forest cover data
  const regionalData = Object.entries(forestData.regions || {}).map(([region, info]) => ({
    name: region.length > 12 ? region.substring(0, 12) + '...' : region,
    fullName: region,
    forestArea: Math.round(info.forestArea / 1000), // Convert to thousands of hectares
    forestPercentage: Math.round(info.forestPercentage * 10) / 10,
    changeRate: info.changeRate
  })).slice(0, 8) // Show top 8 regions

  const formatTooltip = (value, name, props) => {
    if (name === 'value') {
      return [`${value}%`, 'Coverage']
    }
    if (name === 'forestArea') {
      return [`${value}k hectares`, 'Forest Area']
    }
    if (name === 'forestPercentage') {
      return [`${value}%`, 'Forest Cover']
    }
    return [value, name]
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            Area: {data.area?.toLocaleString() || 'N/A'} hectares
          </p>
          <p className="text-sm text-gray-600">
            Coverage: {data.value}%
          </p>
        </div>
      )
    }
    return null
  }

  const RegionalTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.fullName}</p>
          <p className="text-sm text-gray-600">
            Forest Area: {data.forestArea}k hectares
          </p>
          <p className="text-sm text-gray-600">
            Forest Cover: {data.forestPercentage}%
          </p>
          <p className={`text-sm ${data.changeRate < 0 ? 'text-red-600' : 'text-green-600'}`}>
            Annual Change: {data.changeRate > 0 ? '+' : ''}{data.changeRate}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Forest Cover Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TreePine className="w-5 h-5 mr-2 text-green-600" />
            Congo Basin Forest Cover Overview
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            <span>Source: {forestData.source}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Total Forest Area</p>
                <p className="text-2xl font-bold text-green-900">
                  {(forestData.current?.forestArea / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-green-700">hectares</p>
              </div>
              <TreePine className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Forest Coverage</p>
                <p className="text-2xl font-bold text-blue-900">
                  {forestData.current?.forestPercentage?.toFixed(1) || '63.7'}%
                </p>
                <p className="text-xs text-blue-700">of total area</p>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">%</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Primary Forest</p>
                <p className="text-2xl font-bold text-purple-900">
                  {(forestData.current?.primaryForest / 1000000).toFixed(1) || '105'}M
                </p>
                <p className="text-xs text-purple-700">hectares</p>
              </div>
              <TreePine className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Annual Loss</p>
                <p className="text-2xl font-bold text-red-900">
                  {forestData.trend?.includes('-') ? forestData.trend : '-0.18%'}
                </p>
                <p className="text-xs text-red-700">per year</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Forest Type Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Forest Type Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Regional Forest Cover</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={regionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip content={<RegionalTooltip />} />
                <Bar dataKey="forestPercentage" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Deforestation Alert */}
      {data.globalData.deforestation && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900">Deforestation Alert</h4>
              <p className="text-red-800 text-sm mt-1">
                {Math.round(data.globalData.deforestation.current?.hectaresLost || 154000)} hectares lost this month 
                ({data.globalData.deforestation.trend})
              </p>
              <div className="mt-2">
                <p className="text-xs text-red-700">Main causes:</p>
                <ul className="text-xs text-red-700 list-disc list-inside">
                  {data.globalData.deforestation.current?.primaryCauses?.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
