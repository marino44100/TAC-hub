'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Calendar, TreePine, Cloud, BookOpen, Search, Filter, Star, Users, Camera, Play, MapPin, Clock, Volume2 } from 'lucide-react'
import { congoBasinSpecies, traditionalCalendar, weatherWisdom, conservationStories } from '../../lib/data/congoBasinData'

export default function KnowledgeCenter() {
    const [activeTab, setActiveTab] = useState('calendar')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSeason, setSelectedSeason] = useState(null)
    const [selectedSpecies, setSelectedSpecies] = useState(null)

    const knowledgeCategories = [{
            id: 'calendar',
            title: 'Traditional Calendar',
            icon: Calendar,
            description: 'Digital version of seasonal patterns and climate signs',
            color: 'green'
        },
        {
            id: 'species',
            title: 'Species Guide',
            icon: TreePine,
            description: 'Photos and information about local plants and animals',
            color: 'blue'
        },
        {
            id: 'weather',
            title: 'Weather Wisdom',
            icon: Cloud,
            description: 'Combine traditional forecasting with modern weather data',
            color: 'purple'
        },
        {
            id: 'stories',
            title: 'Conservation Stories',
            icon: BookOpen,
            description: 'Share success stories and lessons learned',
            color: 'orange'
        }
    ]

    const traditionalCalendar = [{
            month: 'Dry Season (Dec-Feb)',
            activities: ['Forest clearing preparation', 'Hunting season begins', 'Honey collection'],
            signs: ['Leaves turn yellow', 'Rivers run low', 'Animals migrate to water sources'],
            modernData: 'Average rainfall: 50mm, Temperature: 28°C'
        },
        {
            month: 'Early Rains (Mar-May)',
            activities: ['Planting season', 'Forest regeneration', 'Fish spawning'],
            signs: ['First thunder heard', 'New leaves appear', 'Insects become active'],
            modernData: 'Average rainfall: 150mm, Temperature: 26°C'
        },
        {
            month: 'Heavy Rains (Jun-Aug)',
            activities: ['Crop maintenance', 'Mushroom collection', 'Limited travel'],
            signs: ['Rivers flood', 'Forest canopy thick', 'Bird migration patterns'],
            modernData: 'Average rainfall: 300mm, Temperature: 24°C'
        },
        {
            month: 'Late Rains (Sep-Nov)',
            activities: ['Harvest preparation', 'Medicine collection', 'Community gatherings'],
            signs: ['Fruit trees ripen', 'Animal tracks visible', 'Wind patterns change'],
            modernData: 'Average rainfall: 200mm, Temperature: 25°C'
        }
    ]

    // Using real Congo Basin species data
    const speciesGuide = congoBasinSpecies

    // Using real Congo Basin conservation stories
    const stories = conservationStories

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
        switch (activeTab) {
            case 'calendar':
                return ( <
                    div className = "space-y-6" >
                    <
                    h3 className = "text-2xl font-bold text-gray-900 mb-6" > Traditional Seasonal Calendar < /h3> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-6" > {
                        traditionalCalendar.map((season, index) => ( <
                            div key = { index }
                            className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                            <
                            h4 className = "text-xl font-bold text-gray-900 mb-4" > { season.month } < /h4>

                            <
                            div className = "space-y-4" >
                            <
                            div >
                            <
                            h5 className = "font-semibold text-gray-700 mb-2" > Traditional Activities < /h5> <
                            ul className = "text-sm text-gray-600 space-y-1" > {
                                season.activities.map((activity, i) => ( <
                                    li key = { i }
                                    className = "flex items-center" >
                                    <
                                    div className = "w-2 h-2 bg-green-500 rounded-full mr-2" > < /div> { activity } < /
                                    li >
                                ))
                            } <
                            /ul> < /
                            div >

                            <
                            div >
                            <
                            h5 className = "font-semibold text-gray-700 mb-2" > Natural Signs < /h5> <
                            ul className = "text-sm text-gray-600 space-y-1" > {
                                season.signs.map((sign, i) => ( <
                                    li key = { i }
                                    className = "flex items-center" >
                                    <
                                    div className = "w-2 h-2 bg-blue-500 rounded-full mr-2" > < /div> { sign } < /
                                    li >
                                ))
                            } <
                            /ul> < /
                            div >

                            <
                            div className = "bg-gray-50 rounded-lg p-3" >
                            <
                            h5 className = "font-semibold text-gray-700 mb-1" > Modern Weather Data < /h5> <
                            p className = "text-sm text-gray-600" > { season.modernData } < /p> < /
                            div > <
                            /div> < /
                            div >
                        ))
                    } <
                    /div> < /
                    div >
                )

            case 'species':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h3 className = "text-2xl font-bold text-gray-900" > Species Guide < /h3> <
                    div className = "flex space-x-2" >
                    <
                    button className = "px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium" >
                    All Species <
                    /button> <
                    button className = "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium" >
                    Trees <
                    /button> <
                    button className = "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium" >
                    Animals <
                    /button> <
                    button className = "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium" >
                    Plants <
                    /button> < /
                    div > <
                    /div>

                    <
                    div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" > {
                        speciesGuide.map((species, index) => ( <
                            div key = { index }
                            className = "bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100" >
                            <
                            img src = { species.image }
                            alt = { species.name }
                            className = "w-full h-48 object-cover" /
                            >
                            <
                            div className = "p-6" >
                            <
                            div className = "flex justify-between items-start mb-2" >
                            <
                            h4 className = "text-lg font-bold text-gray-900" > { species.name } < /h4> <
                            span className = { `px-2 py-1 rounded-full text-xs font-medium ${
                        species.status === 'Endangered' ? 'bg-red-100 text-red-700' :
                        species.status === 'Critically Endangered' ? 'bg-red-200 text-red-800' :
                        'bg-green-100 text-green-700'
                      }` } > { species.status } <
                            /span> < /
                            div > <
                            p className = "text-sm text-gray-500 italic mb-3" > { species.scientificName } < /p>

                            <
                            div className = "space-y-3" >
                            <
                            div >
                            <
                            h5 className = "font-semibold text-gray-700 text-sm mb-1" > Traditional Uses < /h5> <
                            div className = "flex flex-wrap gap-1" > {
                                species.uses.map((use, i) => ( <
                                    span key = { i }
                                    className = "px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs" > { use } <
                                    /span>
                                ))
                            } <
                            /div> < /
                            div >

                            <
                            div >
                            <
                            h5 className = "font-semibold text-gray-700 text-sm mb-1" > Traditional Knowledge < /h5> <
                            p className = "text-sm text-gray-600" > { species.traditionalKnowledge } < /p> < /
                            div > <
                            /div> < /
                            div > <
                            /div>
                        ))
                    } <
                    /div> < /
                    div >
                )

            case 'weather':
                return ( <
                    div className = "space-y-6" >
                    <
                    h3 className = "text-2xl font-bold text-gray-900 mb-6" > Weather Wisdom < /h3>

                    <
                    div className = "grid grid-cols-1 lg:grid-cols-2 gap-8" >
                    <
                    div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    h4 className = "text-xl font-bold text-gray-900 mb-4" > Traditional Forecasting < /h4> <
                    div className = "space-y-4" >
                    <
                    div className = "border-l-4 border-green-500 pl-4" >
                    <
                    h5 className = "font-semibold text-gray-700" > Animal Behavior Signs < /h5> <
                    p className = "text-sm text-gray-600" > Birds flying low indicates rain within 24 hours < /p> < /
                    div > <
                    div className = "border-l-4 border-blue-500 pl-4" >
                    <
                    h5 className = "font-semibold text-gray-700" > Plant Indicators < /h5> <
                    p className = "text-sm text-gray-600" > Leaves turning upward suggests heavy rain approaching < /p> < /
                    div > <
                    div className = "border-l-4 border-purple-500 pl-4" >
                    <
                    h5 className = "font-semibold text-gray-700" > Sky Patterns < /h5> <
                    p className = "text-sm text-gray-600" > Red sky at sunset means clear weather tomorrow < /p> < /
                    div > <
                    /div> < /
                    div >

                    <
                    div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <
                    h4 className = "text-xl font-bold text-gray-900 mb-4" > Modern Weather Data < /h4> <
                    div className = "space-y-4" >
                    <
                    div className = "flex justify-between items-center p-3 bg-gray-50 rounded-lg" >
                    <
                    span className = "font-medium text-gray-700" > Current Temperature < /span> <
                    span className = "text-xl font-bold text-primary-600" > 26° C < /span> < /
                    div > <
                    div className = "flex justify-between items-center p-3 bg-gray-50 rounded-lg" >
                    <
                    span className = "font-medium text-gray-700" > Humidity < /span> <
                    span className = "text-xl font-bold text-primary-600" > 78 % < /span> < /
                    div > <
                    div className = "flex justify-between items-center p-3 bg-gray-50 rounded-lg" >
                    <
                    span className = "font-medium text-gray-700" > Rain Probability < /span> <
                    span className = "text-xl font-bold text-primary-600" > 65 % < /span> < /
                    div > <
                    /div> < /
                    div > <
                    /div> < /
                    div >
                )

            case 'stories':
                return ( <
                    div className = "space-y-6" >
                    <
                    div className = "flex justify-between items-center" >
                    <
                    h3 className = "text-2xl font-bold text-gray-900" > Conservation Stories < /h3> <
                    button className = "bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors" >
                    Share Your Story <
                    /button> < /
                    div >

                    <
                    div className = "space-y-6" > {
                        stories.map((story, index) => ( <
                            div key = { index }
                            className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                            <
                            div className = "flex flex-col lg:flex-row gap-6" >
                            <
                            img src = { story.image }
                            alt = { story.title }
                            className = "w-full lg:w-64 h-48 object-cover rounded-lg" /
                            >
                            <
                            div className = "flex-1" >
                            <
                            div className = "flex justify-between items-start mb-3" >
                            <
                            div >
                            <
                            h4 className = "text-xl font-bold text-gray-900 mb-1" > { story.title } < /h4> <
                            p className = "text-sm text-gray-500" >
                            By { story.author }• { story.community }• { story.date } <
                            /p> < /
                            div > <
                            div className = "flex items-center" >
                            <
                            Star className = "w-4 h-4 text-yellow-500 mr-1" / >
                            <
                            span className = "text-sm text-gray-600" > 4.8 < /span> < /
                            div > <
                            /div>

                            <
                            p className = "text-gray-600 mb-4" > { story.summary } < /p>

                            <
                            div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                            <
                            div >
                            <
                            h5 className = "font-semibold text-gray-700 text-sm mb-2" > Impact Achieved < /h5> <
                            p className = "text-sm text-gray-600" > { story.impact } < /p> < /
                            div > <
                            div >
                            <
                            h5 className = "font-semibold text-gray-700 text-sm mb-2" > Key Lessons < /h5> <
                            ul className = "text-sm text-gray-600 space-y-1" > {
                                story.lessons.map((lesson, i) => ( <
                                    li key = { i }
                                    className = "flex items-center" >
                                    <
                                    div className = "w-1.5 h-1.5 bg-green-500 rounded-full mr-2" > < /div> { lesson } < /
                                    li >
                                ))
                            } <
                            /ul> < /
                            div > <
                            /div>

                            <
                            div className = "flex items-center space-x-4 text-sm text-gray-500" >
                            <
                            button className = "flex items-center hover:text-primary-600" >
                            <
                            Users className = "w-4 h-4 mr-1" / >
                            24 communities inspired <
                            /button> <
                            button className = "flex items-center hover:text-primary-600" >
                            <
                            Camera className = "w-4 h-4 mr-1" / >
                            View photos <
                            /button> <
                            button className = "flex items-center hover:text-primary-600" >
                            <
                            Play className = "w-4 h-4 mr-1" / >
                            Watch video <
                            /button> < /
                            div > <
                            /div> < /
                            div > <
                            /div>
                        ))
                    } <
                    /div> < /
                    div >
                )

            default:
                return null
        }
    }

    return ( <
            main className = "min-h-screen bg-gray-50" >
            <
            Header / >

            <
            div className = "container-max py-8" > { /* Header */ } <
            div className = "text-center mb-12" >
            <
            h1 className = "text-4xl font-bold text-gray-900 mb-4" > Community Knowledge Center < /h1> <
            p className = "text-xl text-gray-600 max-w-3xl mx-auto" >
            Access and share traditional knowledge combined with modern data to strengthen community conservation efforts <
            /p> < /
            div >

            { /* Search Bar */ } <
            div className = "max-w-2xl mx-auto mb-8" >
            <
            div className = "relative" >
            <
            Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" / >
            <
            input type = "text"
            placeholder = "Search traditional knowledge, species, stories..."
            value = { searchTerm }
            onChange = {
                (e) => setSearchTerm(e.target.value)
            }
            className = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /
            >
            <
            button className = "absolute right-3 top-1/2 transform -translate-y-1/2" >
            <
            Filter className = "w-5 h-5 text-gray-400" / >
            <
            /button> < /
            div > <
            /div>

            { /* Category Tabs */ } <
            div className = "flex flex-wrap justify-center gap-4 mb-8" > {
                knowledgeCategories.map((category) => ( <
                        button key = { category.id }
                        onClick = {
                            () => setActiveTab(category.id)
                        }
                        className = { `flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
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

        {/* Content */}
        <div className="bg-gray-50 rounded-2xl p-8">
          {renderContent()}
        </div>
      </div>

      <Footer />
    </main>
  )
}