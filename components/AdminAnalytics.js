'use client'
import { useState, useEffect } from 'react'
import {
  BarChart3, TrendingUp, Users, FileText, ShoppingBag, DollarSign,
  Edit, Save, X, Plus, Trash2, RefreshCw, Download, Upload,
  Calendar, Target, Activity, Globe, Leaf, Heart
} from 'lucide-react'

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({})
  const [editingChart, setEditingChart] = useState(null)
  const [tempData, setTempData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const loadAnalyticsData = () => {
    // Load existing analytics data or create default structure
    const savedData = localStorage.getItem('tac-hub-analytics')
    const defaultData = {
      userGrowth: {
        title: 'User Growth Over Time',
        type: 'line',
        data: [
          { month: 'Jan 2024', users: 45, newUsers: 15 },
          { month: 'Feb 2024', users: 78, newUsers: 33 },
          { month: 'Mar 2024', users: 124, newUsers: 46 },
          { month: 'Apr 2024', users: 189, newUsers: 65 },
          { month: 'May 2024', users: 267, newUsers: 78 },
          { month: 'Jun 2024', users: 342, newUsers: 75 }
        ]
      },
      projectStatus: {
        title: 'Project Status Distribution',
        type: 'pie',
        data: [
          { status: 'Active', count: 45, color: '#10B981' },
          { status: 'Pending', count: 23, color: '#F59E0B' },
          { status: 'Completed', count: 67, color: '#3B82F6' },
          { status: 'Rejected', count: 12, color: '#EF4444' }
        ]
      },
      revenue: {
        title: 'Revenue Trends',
        type: 'bar',
        data: [
          { month: 'Jan 2024', revenue: 12500, orders: 45 },
          { month: 'Feb 2024', revenue: 18750, orders: 67 },
          { month: 'Mar 2024', revenue: 23400, orders: 89 },
          { month: 'Apr 2024', revenue: 31200, orders: 112 },
          { month: 'May 2024', revenue: 28900, orders: 98 },
          { month: 'Jun 2024', revenue: 35600, orders: 134 }
        ]
      },
      platformActivity: {
        title: 'Daily Platform Activity',
        type: 'area',
        data: [
          { date: '2024-06-01', activeUsers: 89, pageViews: 1245, projects: 3 },
          { date: '2024-06-02', activeUsers: 92, pageViews: 1367, projects: 5 },
          { date: '2024-06-03', activeUsers: 78, pageViews: 1123, projects: 2 },
          { date: '2024-06-04', activeUsers: 105, pageViews: 1456, projects: 7 },
          { date: '2024-06-05', activeUsers: 98, pageViews: 1334, projects: 4 },
          { date: '2024-06-06', activeUsers: 112, pageViews: 1567, projects: 6 },
          { date: '2024-06-07', activeUsers: 87, pageViews: 1234, projects: 3 }
        ]
      },
      congoBasinMetrics: {
        title: 'Congo Basin Conservation Metrics',
        type: 'mixed',
        data: [
          { metric: 'Forest Area Protected', value: 2340, unit: 'hectares', target: 5000 },
          { metric: 'Species Documented', value: 1567, unit: 'species', target: 2000 },
          { metric: 'Communities Engaged', value: 89, unit: 'villages', target: 150 },
          { metric: 'Traditional Knowledge Entries', value: 234, unit: 'entries', target: 500 },
          { metric: 'Carbon Offset Projects', value: 45, unit: 'projects', target: 100 }
        ]
      },
      climateImpact: {
        title: 'Climate Impact Tracking',
        type: 'progress',
        data: [
          { category: 'CO2 Reduction', achieved: 1250, target: 2000, unit: 'tons' },
          { category: 'Trees Planted', achieved: 15670, target: 25000, unit: 'trees' },
          { category: 'Water Conservation', achieved: 890, target: 1500, unit: 'liters/day' },
          { category: 'Renewable Energy', achieved: 67, target: 100, unit: 'households' },
          { category: 'Waste Reduction', achieved: 340, target: 500, unit: 'kg/month' }
        ]
      }
    }

    if (savedData) {
      setAnalyticsData(JSON.parse(savedData))
    } else {
      setAnalyticsData(defaultData)
      localStorage.setItem('tac-hub-analytics', JSON.stringify(defaultData))
    }
  }

  const saveAnalyticsData = (newData) => {
    setAnalyticsData(newData)
    localStorage.setItem('tac-hub-analytics', JSON.stringify(newData))
  }

  const startEditing = (chartKey) => {
    setEditingChart(chartKey)
    setTempData(JSON.parse(JSON.stringify(analyticsData[chartKey])))
  }

  const cancelEditing = () => {
    setEditingChart(null)
    setTempData({})
  }

  const saveChanges = () => {
    const newData = { ...analyticsData, [editingChart]: tempData }
    saveAnalyticsData(newData)
    setEditingChart(null)
    setTempData({})
  }

  const addDataPoint = (chartKey) => {
    const chart = analyticsData[chartKey]
    let newPoint = {}

    switch (chart.type) {
      case 'line':
      case 'bar':
      case 'area':
        if (chartKey === 'userGrowth') {
          newPoint = { month: 'New Month', users: 0, newUsers: 0 }
        } else if (chartKey === 'revenue') {
          newPoint = { month: 'New Month', revenue: 0, orders: 0 }
        } else if (chartKey === 'platformActivity') {
          newPoint = { date: new Date().toISOString().split('T')[0], activeUsers: 0, pageViews: 0, projects: 0 }
        }
        break
      case 'pie':
        newPoint = { status: 'New Status', count: 0, color: '#6B7280' }
        break
      case 'mixed':
        newPoint = { metric: 'New Metric', value: 0, unit: 'units', target: 100 }
        break
      case 'progress':
        newPoint = { category: 'New Category', achieved: 0, target: 100, unit: 'units' }
        break
    }

    const updatedChart = {
      ...chart,
      data: [...chart.data, newPoint]
    }
    
    const newData = { ...analyticsData, [chartKey]: updatedChart }
    saveAnalyticsData(newData)
  }

  const removeDataPoint = (chartKey, index) => {
    if (confirm('Are you sure you want to remove this data point?')) {
      const chart = analyticsData[chartKey]
      const updatedChart = {
        ...chart,
        data: chart.data.filter((_, i) => i !== index)
      }
      
      const newData = { ...analyticsData, [chartKey]: updatedChart }
      saveAnalyticsData(newData)
    }
  }

  const updateDataPoint = (chartKey, index, field, value) => {
    const updatedData = { ...tempData }
    updatedData.data[index][field] = isNaN(value) ? value : Number(value)
    setTempData(updatedData)
  }

  const exportAnalytics = () => {
    const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tac-hub-analytics-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importAnalytics = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        saveAnalyticsData(importedData)
        alert('Analytics data imported successfully!')
      } catch (error) {
        alert('Error importing data: Invalid file format')
      }
    }
    reader.readAsText(file)
  }

  const generateSampleData = () => {
    if (confirm('This will replace current analytics data with new sample data. Continue?')) {
      setLoading(true)
      
      setTimeout(() => {
        // Generate realistic sample data
        const currentDate = new Date()
        const months = []
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
          months.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))
        }

        const newSampleData = {
          userGrowth: {
            title: 'User Growth Over Time',
            type: 'line',
            data: months.map((month, i) => ({
              month,
              users: Math.floor(50 + i * 45 + Math.random() * 30),
              newUsers: Math.floor(15 + i * 8 + Math.random() * 15)
            }))
          },
          projectStatus: {
            title: 'Project Status Distribution',
            type: 'pie',
            data: [
              { status: 'Active', count: Math.floor(40 + Math.random() * 20), color: '#10B981' },
              { status: 'Pending', count: Math.floor(15 + Math.random() * 15), color: '#F59E0B' },
              { status: 'Completed', count: Math.floor(50 + Math.random() * 30), color: '#3B82F6' },
              { status: 'Rejected', count: Math.floor(5 + Math.random() * 10), color: '#EF4444' }
            ]
          },
          revenue: {
            title: 'Revenue Trends',
            type: 'bar',
            data: months.map((month, i) => ({
              month,
              revenue: Math.floor(10000 + i * 3000 + Math.random() * 5000),
              orders: Math.floor(30 + i * 15 + Math.random() * 20)
            }))
          },
          platformActivity: {
            title: 'Daily Platform Activity',
            type: 'area',
            data: Array.from({ length: 7 }, (_, i) => {
              const date = new Date()
              date.setDate(date.getDate() - (6 - i))
              return {
                date: date.toISOString().split('T')[0],
                activeUsers: Math.floor(70 + Math.random() * 50),
                pageViews: Math.floor(1000 + Math.random() * 600),
                projects: Math.floor(2 + Math.random() * 6)
              }
            })
          },
          congoBasinMetrics: {
            title: 'Congo Basin Conservation Metrics',
            type: 'mixed',
            data: [
              { metric: 'Forest Area Protected', value: Math.floor(2000 + Math.random() * 1000), unit: 'hectares', target: 5000 },
              { metric: 'Species Documented', value: Math.floor(1200 + Math.random() * 500), unit: 'species', target: 2000 },
              { metric: 'Communities Engaged', value: Math.floor(70 + Math.random() * 30), unit: 'villages', target: 150 },
              { metric: 'Traditional Knowledge Entries', value: Math.floor(180 + Math.random() * 100), unit: 'entries', target: 500 },
              { metric: 'Carbon Offset Projects', value: Math.floor(30 + Math.random() * 25), unit: 'projects', target: 100 }
            ]
          },
          climateImpact: {
            title: 'Climate Impact Tracking',
            type: 'progress',
            data: [
              { category: 'CO2 Reduction', achieved: Math.floor(800 + Math.random() * 600), target: 2000, unit: 'tons' },
              { category: 'Trees Planted', achieved: Math.floor(10000 + Math.random() * 8000), target: 25000, unit: 'trees' },
              { category: 'Water Conservation', achieved: Math.floor(600 + Math.random() * 400), target: 1500, unit: 'liters/day' },
              { category: 'Renewable Energy', achieved: Math.floor(40 + Math.random() * 35), target: 100, unit: 'households' },
              { category: 'Waste Reduction', achieved: Math.floor(200 + Math.random() * 200), target: 500, unit: 'kg/month' }
            ]
          }
        }

        saveAnalyticsData(newSampleData)
        setLoading(false)
      }, 1000)
    }
  }

  const renderChart = (chartKey, chart) => {
    const isEditing = editingChart === chartKey
    const currentData = isEditing ? tempData : chart

    return (
      <div key={chartKey} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{currentData.title}</h3>
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => addDataPoint(chartKey)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="Add Data Point"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEditing(chartKey)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Edit Chart"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={saveChanges}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="Save Changes"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={cancelEditing}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chart Title</label>
              <input
                type="text"
                value={currentData.title}
                onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Data Points</label>
              {currentData.data.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  {Object.keys(item).map((field) => (
                    <div key={field} className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">{field}</label>
                      <input
                        type={typeof item[field] === 'number' ? 'number' : 'text'}
                        value={item[field]}
                        onChange={(e) => updateDataPoint(chartKey, index, field, e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => removeDataPoint(chartKey, index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 mb-2">{chart.type.toUpperCase()} Chart: {chart.title}</p>
              <p className="text-sm text-gray-400">{chart.data.length} data points</p>
              {chart.type === 'progress' && (
                <div className="mt-4 space-y-2">
                  {chart.data.slice(0, 3).map((item, index) => (
                    <div key={index} className="text-left">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span>{item.achieved}/{item.target} {item.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.achieved / item.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          <button
            onClick={generateSampleData}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            <span>Generate Sample Data</span>
          </button>
          <button
            onClick={exportAnalytics}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <div>
            <input
              type="file"
              accept=".json"
              onChange={importAnalytics}
              className="hidden"
              id="import-analytics"
            />
            <label
              htmlFor="import-analytics"
              className="btn-secondary flex items-center space-x-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(analyticsData).map(([key, chart]) => renderChart(key, chart))}
      </div>
    </div>
  )
}
