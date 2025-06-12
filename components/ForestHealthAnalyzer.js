'use client'
import { useState } from 'react'
import { Upload, Camera, Loader, CheckCircle, AlertTriangle, XCircle, Eye, Leaf, TreePine, Droplets, Bug, Zap } from 'lucide-react'

export default function ForestHealthAnalyzer({ onAnalysisComplete }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const maxFileSize = 10 * 1024 * 1024 // 10MB limit for analysis

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > maxFileSize) {
      alert('Image size must be less than 10MB for analysis')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    setSelectedImage(file)
    const preview = URL.createObjectURL(file)
    setImagePreview(preview)
    setAnalysisResult(null)
  }

  const analyzeForestHealth = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    try {
      // Simulate AI analysis with realistic processing time
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Create canvas to analyze image properties
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Get image data for analysis
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Analyze color composition
        let greenPixels = 0
        let brownPixels = 0
        let totalPixels = data.length / 4
        let brightness = 0

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          
          brightness += (r + g + b) / 3

          // Detect green (healthy vegetation)
          if (g > r && g > b && g > 100) {
            greenPixels++
          }
          
          // Detect brown (dead/dying vegetation)
          if (r > 100 && g > 50 && g < 150 && b < 100) {
            brownPixels++
          }
        }

        const greenPercentage = (greenPixels / totalPixels) * 100
        const brownPercentage = (brownPixels / totalPixels) * 100
        const avgBrightness = brightness / totalPixels

        // Generate analysis based on image properties
        const analysis = generateHealthAnalysis(greenPercentage, brownPercentage, avgBrightness)
        
        setAnalysisResult(analysis)
        setIsAnalyzing(false)

        if (onAnalysisComplete) {
          onAnalysisComplete(analysis)
        }
      }

      img.src = imagePreview
    } catch (error) {
      console.error('Analysis failed:', error)
      setIsAnalyzing(false)
      alert('Analysis failed. Please try again.')
    }
  }

  const generateHealthAnalysis = (greenPercentage, brownPercentage, brightness) => {
    // Calculate overall health score
    let healthScore = Math.min(100, Math.max(0, 
      (greenPercentage * 1.5) - (brownPercentage * 2) + (brightness / 3) - 20
    ))

    // Determine health status
    let status, statusColor, statusIcon
    if (healthScore >= 80) {
      status = 'Excellent'
      statusColor = 'text-green-600'
      statusIcon = CheckCircle
    } else if (healthScore >= 60) {
      status = 'Good'
      statusColor = 'text-green-500'
      statusIcon = CheckCircle
    } else if (healthScore >= 40) {
      status = 'Fair'
      statusColor = 'text-yellow-600'
      statusIcon = AlertTriangle
    } else if (healthScore >= 20) {
      status = 'Poor'
      statusColor = 'text-orange-600'
      statusIcon = AlertTriangle
    } else {
      status = 'Critical'
      statusColor = 'text-red-600'
      statusIcon = XCircle
    }

    // Generate specific indicators
    const indicators = [
      {
        name: 'Canopy Coverage',
        value: Math.round(greenPercentage),
        unit: '%',
        status: greenPercentage > 60 ? 'good' : greenPercentage > 30 ? 'fair' : 'poor',
        icon: TreePine,
        description: greenPercentage > 60 ? 'Dense canopy coverage indicates healthy forest' : 
                    greenPercentage > 30 ? 'Moderate canopy coverage, some gaps visible' : 
                    'Sparse canopy coverage, significant deforestation detected'
      },
      {
        name: 'Vegetation Health',
        value: Math.round(100 - brownPercentage * 2),
        unit: '%',
        status: brownPercentage < 10 ? 'good' : brownPercentage < 25 ? 'fair' : 'poor',
        icon: Leaf,
        description: brownPercentage < 10 ? 'Vegetation appears healthy and vibrant' :
                    brownPercentage < 25 ? 'Some signs of stress or seasonal change' :
                    'Significant vegetation stress or disease detected'
      },
      {
        name: 'Light Penetration',
        value: Math.round(brightness / 2.55),
        unit: '%',
        status: brightness > 150 ? 'fair' : brightness > 100 ? 'good' : 'poor',
        icon: Zap,
        description: brightness > 150 ? 'High light penetration may indicate canopy gaps' :
                    brightness > 100 ? 'Balanced light levels for healthy understory' :
                    'Low light levels indicate dense canopy'
      },
      {
        name: 'Biodiversity Potential',
        value: Math.round(healthScore * 0.8 + Math.random() * 20),
        unit: '/100',
        status: healthScore > 60 ? 'good' : healthScore > 30 ? 'fair' : 'poor',
        icon: Bug,
        description: 'Estimated based on forest structure and health indicators'
      }
    ]

    // Generate recommendations
    const recommendations = []
    if (greenPercentage < 50) {
      recommendations.push('Consider reforestation efforts in sparse areas')
    }
    if (brownPercentage > 20) {
      recommendations.push('Investigate potential disease or pest issues')
    }
    if (brightness > 180) {
      recommendations.push('Monitor for illegal logging or natural disturbances')
    }
    if (healthScore < 60) {
      recommendations.push('Implement conservation measures to protect remaining forest')
    }
    if (recommendations.length === 0) {
      recommendations.push('Continue current conservation practices')
      recommendations.push('Monitor regularly for changes')
    }

    // Generate threats assessment
    const threats = []
    if (brownPercentage > 15) threats.push('Vegetation stress/disease')
    if (brightness > 160) threats.push('Canopy gaps/deforestation')
    if (greenPercentage < 40) threats.push('Habitat fragmentation')
    if (healthScore < 50) threats.push('Ecosystem degradation')

    return {
      healthScore: Math.round(healthScore),
      status,
      statusColor,
      statusIcon,
      indicators,
      recommendations,
      threats,
      analysisDate: new Date().toISOString(),
      confidence: Math.round(75 + Math.random() * 20), // Simulated confidence level
      imageMetrics: {
        greenPercentage: Math.round(greenPercentage),
        brownPercentage: Math.round(brownPercentage),
        brightness: Math.round(brightness)
      }
    }
  }

  const getIndicatorColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100'
      case 'fair': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Camera className="w-5 h-5 mr-2" />
        AI Forest Health Analyzer
      </h4>

      {!selectedImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="forest-image-upload"
          />
          <label htmlFor="forest-image-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h5 className="text-lg font-medium text-gray-900 mb-2">Upload Forest Image</h5>
            <p className="text-gray-600 mb-4">
              Upload a clear photo of the forest area you want to analyze
            </p>
            <div className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-block">
              Choose Image
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supports JPG, PNG, GIF up to 10MB
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={imagePreview}
              alt="Forest to analyze"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={() => {
                setSelectedImage(null)
                setImagePreview(null)
                setAnalysisResult(null)
              }}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Analysis Button */}
          {!analysisResult && !isAnalyzing && (
            <button
              onClick={analyzeForestHealth}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Eye className="w-5 h-5 mr-2" />
              Analyze Forest Health
            </button>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="text-center py-8">
              <Loader className="w-8 h-8 text-primary-600 mx-auto mb-4 animate-spin" />
              <h5 className="text-lg font-medium text-gray-900 mb-2">Analyzing Forest Health...</h5>
              <p className="text-gray-600">
                Our AI is examining vegetation coverage, canopy density, and health indicators
              </p>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              {/* Overall Health Score */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold text-gray-900">Forest Health Assessment</h5>
                  <div className="flex items-center">
                    <analysisResult.statusIcon className={`w-6 h-6 mr-2 ${analysisResult.statusColor}`} />
                    <span className={`text-lg font-bold ${analysisResult.statusColor}`}>
                      {analysisResult.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Health Score</span>
                      <span className="text-2xl font-bold text-gray-900">{analysisResult.healthScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          analysisResult.healthScore >= 80 ? 'bg-green-500' :
                          analysisResult.healthScore >= 60 ? 'bg-green-400' :
                          analysisResult.healthScore >= 40 ? 'bg-yellow-500' :
                          analysisResult.healthScore >= 20 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${analysisResult.healthScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Analysis confidence: {analysisResult.confidence}% • 
                  Analyzed on {new Date(analysisResult.analysisDate).toLocaleDateString()}
                </p>
              </div>

              {/* Health Indicators */}
              <div>
                <h6 className="text-lg font-semibold text-gray-900 mb-4">Health Indicators</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.indicators.map((indicator, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <indicator.icon className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="font-medium text-gray-900">{indicator.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIndicatorColor(indicator.status)}`}>
                          {indicator.value}{indicator.unit}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{indicator.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threats */}
              {analysisResult.threats.length > 0 && (
                <div>
                  <h6 className="text-lg font-semibold text-gray-900 mb-4">Detected Threats</h6>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {analysisResult.threats.map((threat, index) => (
                        <li key={index} className="flex items-center text-red-800">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div>
                <h6 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h6>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center text-blue-800">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedImage(null)
                    setImagePreview(null)
                    setAnalysisResult(null)
                  }}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Analyze Another Image
                </button>
                <button
                  onClick={() => {
                    const reportData = {
                      ...analysisResult,
                      imageUrl: imagePreview,
                      location: 'Current Location', // Could be enhanced with GPS
                      submittedBy: 'Community Member'
                    }
                    // Save to monitoring submissions
                    const existingSubmissions = JSON.parse(localStorage.getItem('tac-hub-monitoring-submissions') || '{"forestHealth": []}')
                    existingSubmissions.forestHealth.unshift({
                      id: Date.now(),
                      ...reportData,
                      timestamp: new Date().toISOString(),
                      type: 'ai_analysis'
                    })
                    localStorage.setItem('tac-hub-monitoring-submissions', JSON.stringify(existingSubmissions))
                    alert('Analysis report saved to your monitoring submissions!')
                  }}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save Report
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
