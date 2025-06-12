'use client'
import { useState } from 'react'
import { 
  Calendar, TreePine, Cloud, BookOpen, Plus, Save, X, 
  Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle,
  Users, MapPin, Clock, Star, AlertTriangle, Info
} from 'lucide-react'
import { CongoBasinKnowledgeService } from '../lib/congoBasinKnowledgeService'

export default function TraditionalKnowledgeAdmin() {
  const [knowledgeService] = useState(() => new CongoBasinKnowledgeService())
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddForm, setShowAddForm] = useState(false)
  const [formType, setFormType] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Form states
  const [calendarForm, setCalendarForm] = useState({
    period: '',
    localName: '',
    description: '',
    activities: '',
    naturalSigns: '',
    crops: '',
    culturalEvents: '',
    avgRainfall: '',
    avgTemperature: '',
    humidity: ''
  })

  const [speciesForm, setSpeciesForm] = useState({
    commonName: '',
    scientificName: '',
    localNames: { lingala: '', french: '', kikongo: '' },
    category: '',
    conservationStatus: '',
    population: '',
    habitat: '',
    behavior: '',
    culturalSignificance: '',
    traditionalUses: '',
    threats: '',
    observationTips: '',
    regions: ''
  })

  const [wisdomForm, setWisdomForm] = useState({
    category: '',
    description: '',
    sign: '',
    prediction: '',
    accuracy: '',
    scientificBasis: '',
    timeFrame: '',
    regions: ''
  })

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'calendar', name: 'Traditional Calendar', icon: Calendar },
    { id: 'species', name: 'Species Guide', icon: TreePine },
    { id: 'weather', name: 'Weather Wisdom', icon: Cloud },
    { id: 'stories', name: 'Story Management', icon: Users }
  ]

  const categories = ['Large Mammals', 'Primates', 'Birds', 'Reptiles', 'Fish', 'Insects', 'Plants']
  const conservationStatuses = ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct']
  const regions = ['DRC', 'Cameroon', 'CAR', 'Gabon', 'Congo', 'Equatorial Guinea', 'All Congo Basin']
  const accuracyLevels = ['Very High (85-95%)', 'High (70-84%)', 'Moderate (55-69%)', 'Low (40-54%)']

  const handleAddCalendarEntry = () => {
    try {
      const entry = {
        ...calendarForm,
        activities: calendarForm.activities.split('\n').filter(a => a.trim()),
        naturalSigns: calendarForm.naturalSigns.split('\n').filter(s => s.trim()),
        crops: calendarForm.crops.split('\n').filter(c => c.trim()),
        culturalEvents: calendarForm.culturalEvents.split('\n').filter(e => e.trim()),
        modernData: {
          avgRainfall: calendarForm.avgRainfall,
          avgTemperature: calendarForm.avgTemperature,
          humidity: calendarForm.humidity
        }
      }

      knowledgeService.addCalendarEntry(entry)
      
      // Reset form
      setCalendarForm({
        period: '', localName: '', description: '', activities: '',
        naturalSigns: '', crops: '', culturalEvents: '', avgRainfall: '',
        avgTemperature: '', humidity: ''
      })
      
      setShowAddForm(false)
      alert('✅ Calendar entry added successfully!')
    } catch (error) {
      alert('Failed to add calendar entry: ' + error.message)
    }
  }

  const handleAddSpecies = () => {
    try {
      const species = {
        ...speciesForm,
        behavior: speciesForm.behavior.split('\n').filter(b => b.trim()),
        traditionalUses: speciesForm.traditionalUses.split('\n').filter(u => u.trim()),
        threats: speciesForm.threats.split('\n').filter(t => t.trim()),
        observationTips: speciesForm.observationTips.split('\n').filter(o => o.trim()),
        regions: speciesForm.regions.split(',').map(r => r.trim()).filter(r => r),
        traditionalKnowledge: {
          culturalSignificance: speciesForm.culturalSignificance,
          traditionalUses: speciesForm.traditionalUses.split('\n').filter(u => u.trim())
        }
      }

      knowledgeService.addSpecies(species)
      
      // Reset form
      setSpeciesForm({
        commonName: '', scientificName: '', localNames: { lingala: '', french: '', kikongo: '' },
        category: '', conservationStatus: '', population: '', habitat: '', behavior: '',
        culturalSignificance: '', traditionalUses: '', threats: '', observationTips: '', regions: ''
      })
      
      setShowAddForm(false)
      alert('✅ Species added successfully!')
    } catch (error) {
      alert('Failed to add species: ' + error.message)
    }
  }

  const handleAddWeatherWisdom = () => {
    try {
      const wisdom = {
        category: wisdomForm.category,
        description: wisdomForm.description,
        indicators: [{
          sign: wisdomForm.sign,
          prediction: wisdomForm.prediction,
          accuracy: wisdomForm.accuracy,
          scientificBasis: wisdomForm.scientificBasis,
          timeFrame: wisdomForm.timeFrame,
          regions: wisdomForm.regions.split(',').map(r => r.trim()).filter(r => r)
        }]
      }

      knowledgeService.addWeatherWisdom(wisdom)
      
      // Reset form
      setWisdomForm({
        category: '', description: '', sign: '', prediction: '',
        accuracy: '', scientificBasis: '', timeFrame: '', regions: ''
      })
      
      setShowAddForm(false)
      alert('✅ Weather wisdom added successfully!')
    } catch (error) {
      alert('Failed to add weather wisdom: ' + error.message)
    }
  }

  const renderOverview = () => {
    const stats = knowledgeService.getStatistics()
    
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Traditional Knowledge Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calendar Entries</p>
                <p className="text-3xl font-bold text-blue-600">{stats.calendarEntries}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Species Documented</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalSpecies}</p>
              </div>
              <TreePine className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weather Signs</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalWeatherSigns}</p>
              </div>
              <Cloud className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stories</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalStories}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Stories</p>
                <p className="text-3xl font-bold text-green-600">{stats.approvedStories}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingStories}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Congo Basin Traditional Knowledge Database</h4>
              <p className="text-blue-800 text-sm mt-1">
                This system preserves and manages traditional ecological knowledge from Congo Basin communities. 
                All information is based on ethnographic research and community contributions.
              </p>
              <div className="mt-3 text-sm text-blue-700">
                <p><strong>Data Sources:</strong> Community elders, ethnographic studies, scientific research</p>
                <p><strong>Languages:</strong> Lingala, French, Kikongo, English</p>
                <p><strong>Coverage:</strong> 6 countries, 10+ ethnic groups, 200+ communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAddForm = () => {
    if (!showAddForm) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">
              Add New {formType === 'calendar' ? 'Calendar Entry' : 
                      formType === 'species' ? 'Species' : 'Weather Wisdom'}
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {formType === 'calendar' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Period/Season</label>
                    <input
                      type="text"
                      value={calendarForm.period}
                      onChange={(e) => setCalendarForm({...calendarForm, period: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Ngonda ya Kokawuka (Dec-Feb)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Local Name</label>
                    <input
                      type="text"
                      value={calendarForm.localName}
                      onChange={(e) => setCalendarForm({...calendarForm, localName: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Local language name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={calendarForm.description}
                    onChange={(e) => setCalendarForm({...calendarForm, description: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe this season and its significance"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Activities (one per line)</label>
                    <textarea
                      value={calendarForm.activities}
                      onChange={(e) => setCalendarForm({...calendarForm, activities: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Forest clearing&#10;Hunting season&#10;Honey collection"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Natural Signs (one per line)</label>
                    <textarea
                      value={calendarForm.naturalSigns}
                      onChange={(e) => setCalendarForm({...calendarForm, naturalSigns: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Leaves turn yellow&#10;Rivers run low&#10;Animals migrate"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCalendarEntry}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Add Entry
                  </button>
                </div>
              </div>
            )}

            {/* Similar forms for species and weather wisdom would go here */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-green-600" />
          Traditional Knowledge Management
        </h2>
        <button
          onClick={() => {
            setFormType('calendar')
            setShowAddForm(true)
          }}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Content</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {/* Other tab content would be implemented here */}
      </div>

      {renderAddForm()}
    </div>
  )
}
