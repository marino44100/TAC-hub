'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ShareStoryModal from '../../components/ShareStoryModal'
import { 
  Calendar, TreePine, Cloud, BookOpen, Search, Filter, Star, Users, 
  Camera, Play, MapPin, Clock, Volume2, AlertCircle, CheckCircle, 
  Info, Eye, Edit, Trash2, Plus
} from 'lucide-react'
import { CongoBasinKnowledgeService } from '../../lib/congoBasinKnowledgeService'

export default function KnowledgeCenter() {
  const { user } = useAuth()
  const [knowledgeService] = useState(() => new CongoBasinKnowledgeService())
  const [activeTab, setActiveTab] = useState('calendar')
  const [searchTerm, setSearchTerm] = useState('')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setLoading(true)
    try {
      const knowledgeData = knowledgeService.getData()
      setData(knowledgeData)
    } catch (error) {
      console.error('Failed to load knowledge data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStorySubmit = async (storyData) => {
    try {
      if (!user) {
        alert('Please log in to share your story.')
        return
      }

      await knowledgeService.submitStory(storyData, user)
      alert('✅ Thank you for sharing your story! It has been submitted for review.')
      loadData()
    } catch (error) {
      alert('Failed to submit story: ' + error.message)
    }
  }

  const knowledgeCategories = [
    {
      id: 'calendar',
      title: 'Traditional Calendar',
      icon: Calendar,
      description: 'Seasonal patterns and climate signs from Congo Basin communities',
      color: 'green'
    },
    {
      id: 'species',
      title: 'Species Guide',
      icon: TreePine,
      description: 'Comprehensive guide to Congo Basin flora and fauna',
      color: 'blue'
    },
    {
      id: 'weather',
      title: 'Weather Wisdom',
      icon: Cloud,
      description: 'Traditional weather prediction methods with scientific validation',
      color: 'purple'
    },
    {
      id: 'stories',
      title: 'Conservation Stories',
      icon: BookOpen,
      description: 'Community success stories and lessons learned',
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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Loading traditional knowledge...</p>
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case 'calendar':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Traditional Seasonal Calendar</h3>
            <p className="text-gray-600 mb-6">
              Based on ethnographic studies from Congo Basin communities including Baka, Mbuti, Bantu, and other indigenous groups.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data?.traditionalCalendar || []).map((season, index) => (
                <div key={season.id || index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{season.period}</h4>
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  
                  {season.localName && (
                    <p className="text-sm text-gray-600 italic mb-3">{season.localName}</p>
                  )}
                  
                  <p className="text-gray-700 mb-4">{season.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Traditional Activities
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(season.activities || []).map((activity, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Natural Signs
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(season.naturalSigns || []).map((sign, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {season.modernData && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-700 mb-1">Modern Climate Data</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Rainfall: {season.modernData.avgRainfall}</p>
                          <p>Temperature: {season.modernData.avgTemperature}</p>
                          <p>Humidity: {season.modernData.humidity}</p>
                        </div>
                      </div>
                    )}

                    {season.culturalEvents && season.culturalEvents.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          Cultural Events
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {season.culturalEvents.map((event, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-purple-500 mr-2">•</span>
                              {event}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'species':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Congo Basin Species Guide</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive guide featuring {(data?.speciesGuide || []).length} documented species with traditional knowledge and conservation status.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.speciesGuide || []).map((species, index) => (
                <div key={species.id || index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <TreePine className="w-16 h-16 text-green-600" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{species.commonName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        species.conservationStatus === 'Critically Endangered' ? 'bg-red-100 text-red-700' :
                        species.conservationStatus === 'Endangered' ? 'bg-orange-100 text-orange-700' :
                        species.conservationStatus === 'Vulnerable' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {species.conservationStatus}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 italic mb-3">{species.scientificName}</p>
                    
                    {species.localNames && (
                      <div className="mb-3">
                        <h5 className="font-semibold text-gray-700 text-sm mb-1">Local Names</h5>
                        <div className="text-xs text-gray-600">
                          {Object.entries(species.localNames).map(([lang, name]) => (
                            <span key={lang} className="mr-2">
                              <strong>{lang}:</strong> {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-700 text-sm mb-1">Habitat</h5>
                        <p className="text-sm text-gray-600">{species.habitat}</p>
                      </div>

                      {species.traditionalKnowledge?.culturalSignificance && (
                        <div>
                          <h5 className="font-semibold text-gray-700 text-sm mb-1">Cultural Significance</h5>
                          <p className="text-sm text-gray-600">{species.traditionalKnowledge.culturalSignificance}</p>
                        </div>
                      )}

                      {species.observationTips && species.observationTips.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-700 text-sm mb-1">Observation Tips</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {species.observationTips.slice(0, 2).map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-blue-500 mr-1">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'weather':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Traditional Weather Wisdom</h3>
            <p className="text-gray-600 mb-6">
              Scientifically validated traditional weather prediction methods from Congo Basin communities.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(data?.weatherWisdom || []).map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{category.category}</h4>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="space-y-4">
                    {(category.indicators || []).map((indicator, i) => (
                      <div key={i} className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-semibold text-gray-700 text-sm">{indicator.sign}</h5>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Prediction:</strong> {indicator.prediction}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          <strong>Accuracy:</strong> {indicator.accuracy}
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Scientific basis:</strong> {indicator.scientificBasis}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'stories':
        const stories = knowledgeService.getStoriesByStatus('approved')
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Conservation Stories</h3>
              <button
                onClick={() => {
                  if (!user) {
                    alert('Please log in to share your story.')
                    return
                  }
                  setIsShareModalOpen(true)
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share Your Story
              </button>
            </div>

            {!user && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Share Your Conservation Story</h4>
                    <p className="text-blue-800 text-sm mt-1">
                      Log in to share your community's conservation success stories and lessons learned.
                      Your stories help other communities learn and adapt proven conservation strategies.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {stories.map((story, index) => (
                <div key={story.id || index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      {story.images && story.images[0] ? (
                        <img 
                          src={story.images[0]} 
                          alt={story.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <TreePine className="w-16 h-16 text-green-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{story.title}</h4>
                          <p className="text-sm text-gray-500">
                            By {story.author} • {story.community} • {story.region} • {story.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{story.summary}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-semibold text-gray-700 text-sm mb-2">Impact Achieved</h5>
                          <div className="text-sm text-gray-600 space-y-1">
                            {typeof story.impact === 'object' ? (
                              Object.entries(story.impact).map(([key, value]) => (
                                <p key={key}>
                                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                </p>
                              ))
                            ) : (
                              <p>{story.impact}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-700 text-sm mb-2">Key Lessons</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {(story.lessonsLearned || []).slice(0, 3).map((lesson, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2"></div>
                                {lesson}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {story.region}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {story.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          Community-led
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Knowledge Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Preserving and sharing traditional ecological knowledge from Congo Basin communities, 
            combined with modern scientific data for effective conservation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search traditional knowledge, species, stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {knowledgeCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === category.id
                  ? `${getColorClasses(category.color)} border-2`
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <category.icon className="w-5 h-5 mr-2" />
              {category.title}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          {renderContent()}
        </div>
      </div>

      <Footer />

      <ShareStoryModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSubmit={handleStorySubmit}
      />
    </main>
  )
}
