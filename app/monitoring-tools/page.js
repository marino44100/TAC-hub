'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ForestHealthAnalyzer from '../../components/ForestHealthAnalyzer'
import { Camera, Calendar, TreePine, Calculator, Upload, CheckCircle, Save } from 'lucide-react'

export default function MonitoringToolsPage() {
  const [activeTab, setActiveTab] = useState('forest-health')
  const [selectedImage, setSelectedImage] = useState(null)
  const [submissions, setSubmissions] = useState({
    forestHealth: [],
    weather: [],
    wildlife: [],
    carbon: []
  })
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
      submittedBy: 'Community Member',
      status: 'submitted'
    }

    const updatedSubmissions = {
      ...submissions,
      [type]: [newSubmission, ...submissions[type]]
    }

    localStorage.setItem('tac-hub-monitoring-submissions', JSON.stringify(updatedSubmissions))
    setSubmissions(updatedSubmissions)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
    }, 1500)
  }

  const monitoringTools = [
    {
      id: 'forest-health',
      title: 'Forest Health Checker',
      icon: Camera,
      description: 'AI-powered forest health analysis from photos',
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

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600 border-green-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200'
    }
    return colors[color] || 'bg-gray-100 text-gray-600 border-gray-200'
  }

  const renderManualHealthForm = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Manual Forest Health Report</h4>
      <p className="text-gray-600 mb-4">
        Submit a traditional forest health report based on your observations
      </p>
      
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Forest health report submitted successfully!
        </div>
      )}

      <form onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
          location: formData.get('location'),
          healthScore: parseInt(formData.get('healthScore')),
          issues: formData.get('issues').split(',').map(i => i.trim()).filter(i => i),
          notes: formData.get('notes'),
          photos: selectedImage ? 1 : 0,
          type: 'manual_observation'
        }
        saveSubmission('forestHealth', data)
        e.target.reset()
        setSelectedImage(null)
      }} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              name="location"
              placeholder="e.g., Sector A - Primary Forest" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Health Score (1-100)</label>
            <input 
              type="number" 
              name="healthScore"
              min="1" 
              max="100" 
              placeholder="85" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issues Identified (comma-separated)</label>
          <input 
            type="text" 
            name="issues"
            placeholder="e.g., Invasive species, Erosion visible" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
          <textarea 
            name="notes"
            rows="3"
            placeholder="Describe what you observed..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          ></textarea>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-2">Upload photos (optional)</p>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="hidden" 
            id="photo-upload"
          />
          <label 
            htmlFor="photo-upload"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer inline-block"
          >
            Choose Photos
          </label>
          {selectedImage && (
            <p className="text-sm text-green-600 mt-2">✓ {selectedImage.name} selected</p>
          )}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Submit Health Report
            </>
          )}
        </button>
      </form>

      {/* Recent Submissions */}
      <div className="mt-8">
        <h5 className="text-lg font-semibold text-gray-900 mb-4">Recent Health Reports</h5>
        <div className="space-y-3">
          {submissions.forestHealth.slice(0, 3).map((submission) => (
            <div key={submission.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h6 className="font-medium text-gray-900">{submission.location}</h6>
                <span className="text-sm text-gray-500">
                  {new Date(submission.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span>Health Score: {submission.healthScore}%</span>
                <span>Type: {submission.type === 'ai_analysis' ? 'AI Analysis' : 'Manual'}</span>
                {submission.issues && <span>Issues: {submission.issues.length}</span>}
                {submission.photos > 0 && <span>📷 {submission.photos} photos</span>}
              </div>
              {submission.notes && (
                <p className="text-sm text-gray-600 mt-2">{submission.notes}</p>
              )}
              {submission.status && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  submission.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                  submission.status === 'Good' ? 'bg-green-100 text-green-700' :
                  submission.status === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                  submission.status === 'Poor' ? 'bg-orange-100 text-orange-800' :
                  submission.status === 'Critical' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {submission.status}
                </span>
              )}
            </div>
          ))}
          {submissions.forestHealth.length === 0 && (
            <p className="text-gray-500 text-center py-4">No health reports submitted yet</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch(activeTab) {
      case 'forest-health':
        return (
          <div className="space-y-8">
            <ForestHealthAnalyzer onAnalysisComplete={(result) => {
              // Save AI analysis to submissions
              const newSubmission = {
                id: Date.now(),
                type: 'ai_analysis',
                healthScore: result.healthScore,
                status: result.status,
                threats: result.threats,
                recommendations: result.recommendations,
                timestamp: new Date().toISOString(),
                submittedBy: 'AI Analysis',
                location: 'Analyzed Image'
              }
              
              const updatedSubmissions = {
                ...submissions,
                forestHealth: [newSubmission, ...submissions.forestHealth]
              }
              
              localStorage.setItem('tac-hub-monitoring-submissions', JSON.stringify(updatedSubmissions))
              setSubmissions(updatedSubmissions)
            }} />
            
            <div className="border-t border-gray-200 pt-8">
              {renderManualHealthForm()}
            </div>
          </div>
        )
      case 'weather-tracker':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Weather Tracker - Coming Soon</h4>
            <p className="text-gray-600">This feature will allow you to record daily weather observations and traditional weather signs.</p>
          </div>
        )
      case 'wildlife-counter':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Wildlife Counter - Coming Soon</h4>
            <p className="text-gray-600">This feature will allow you to record wildlife sightings and track migration patterns.</p>
          </div>
        )
      case 'carbon-calculator':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Carbon Calculator - Coming Soon</h4>
            <p className="text-gray-600">This feature will help you calculate forest carbon storage and track progress.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-max py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Monitoring Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered and traditional tools for community members to monitor forest health, weather patterns, wildlife, and carbon storage
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {monitoringTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
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

        <div className="bg-gray-50 rounded-2xl p-8">
          {renderContent()}
        </div>
      </div>

      <Footer />
    </main>
  )
}
