'use client'
import { useState, useEffect } from 'react'
import {
    Camera,
    MapPin,
    Clock,
    Users,
    Save,
    Plus,
    Minus,
    Search,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    TreePine
} from 'lucide-react'

export default function WildlifeCounter({ onSightingComplete }) {
    const [sightings, setSightings] = useState([])
    const [currentSighting, setCurrentSighting] = useState({
        species: '',
        count: 1,
        behavior: '',
        habitat: '',
        notes: ''
    })
    const [location, setLocation] = useState('')
    const [weather, setWeather] = useState('')
    const [time, setTime] = useState('')
    const [observerCount, setObserverCount] = useState(1)
    const [selectedImages, setSelectedImages] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    // Load wildlife database from localStorage or use defaults
    const [wildlifeDatabase, setWildlifeDatabase] = useState([])

    useEffect(() => {
        const savedSpecies = localStorage.getItem('tac-hub-wildlife-database')
        if (savedSpecies) {
            setWildlifeDatabase(JSON.parse(savedSpecies))
        } else {
            // Import comprehensive wildlife database
            import ('../data/wildlifeDatabase.js').then(module => {
                const defaultSpecies = module.defaultWildlifeDatabase
                setWildlifeDatabase(defaultSpecies)
                localStorage.setItem('tac-hub-wildlife-database', JSON.stringify(defaultSpecies))
            }).catch(() => {
                // Fallback to basic species if import fails
                const basicSpecies = [
                    { name: 'Forest Elephant', scientific: 'Loxodonta cyclotis', category: 'mammal', status: 'Critically Endangered', commonSigns: ['Large footprints', 'Broken branches', 'Dung piles'] },
                    { name: 'Western Lowland Gorilla', scientific: 'Gorilla gorilla gorilla', category: 'mammal', status: 'Critically Endangered', commonSigns: ['Knuckle prints', 'Nest sites', 'Chest beating sounds'] },
                    { name: 'African Grey Parrot', scientific: 'Psittacus erithacus', category: 'bird', status: 'Endangered', commonSigns: ['Loud squawking', 'Feathers', 'Chewed fruit'] }
                ]
                setWildlifeDatabase(basicSpecies)
                localStorage.setItem('tac-hub-wildlife-database', JSON.stringify(basicSpecies))
            })
        }
    }, [])

    const behaviorOptions = [
        'Feeding', 'Drinking', 'Resting', 'Moving/Traveling', 'Playing', 'Grooming',
        'Mating', 'Nesting', 'Territorial', 'Aggressive', 'Fleeing', 'Hunting', 'Foraging'
    ]

    const habitatOptions = [
        'Primary Forest', 'Secondary Forest', 'Forest Edge', 'Riverbank', 'Swamp',
        'Clearing', 'Canopy', 'Understory', 'Ground Level', 'Water Body', 'Agricultural Area'
    ]

    const categories = [
        { id: 'all', name: 'All Species' },
        { id: 'mammal', name: 'Mammals' },
        { id: 'bird', name: 'Birds' },
        { id: 'reptile', name: 'Reptiles' },
        { id: 'amphibian', name: 'Amphibians' },
        { id: 'fish', name: 'Fish' },
        { id: 'insect', name: 'Insects' }
    ]

    useEffect(() => {
        // Set current time
        const now = new Date()
        setTime(now.toTimeString().slice(0, 5))
    }, [])

    const filteredWildlife = wildlifeDatabase.filter(animal => {
        const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            animal.scientific.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || animal.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const addSighting = () => {
        if (!currentSighting.species) {
            alert('Please select a species')
            return
        }

        const newSighting = {
            id: Date.now(),
            ...currentSighting,
            timestamp: new Date().toISOString()
        }

        setSightings([...sightings, newSighting])
        setCurrentSighting({
            species: '',
            count: 1,
            behavior: '',
            habitat: '',
            notes: ''
        })
    }

    const removeSighting = (id) => {
        setSightings(sightings.filter(s => s.id !== id))
    }

    const updateSightingCount = (id, change) => {
        setSightings(sightings.map(s =>
            s.id === id ? {...s, count: Math.max(1, s.count + change) } : s
        ))
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        const newImages = files.map(file => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file)
        }))
        setSelectedImages(prev => [...prev, ...newImages])
    }

    const removeImage = (index) => {
        setSelectedImages(prev => {
            const newImages = [...prev]
            URL.revokeObjectURL(newImages[index].preview)
            newImages.splice(index, 1)
            return newImages
        })
    }

    const generateSummary = () => {
        const totalAnimals = sightings.reduce((sum, s) => sum + s.count, 0)
        const uniqueSpecies = new Set(sightings.map(s => s.species)).size
        const mostCommon = sightings.reduce((acc, s) => {
            acc[s.species] = (acc[s.species] || 0) + s.count
            return acc
        }, {})

        const topSpecies = Object.entries(mostCommon)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)

        return {
            totalAnimals,
            uniqueSpecies,
            topSpecies,
            observationTime: time,
            location,
            weather
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (sightings.length === 0) {
            alert('Please add at least one wildlife sighting')
            return
        }

        setIsSubmitting(true)

        try {
            const summary = generateSummary()
            const observationData = {
                sightings,
                summary,
                location,
                weather,
                time,
                observerCount,
                images: selectedImages.length,
                timestamp: new Date().toISOString(),
                submittedBy: 'Community Member',
                type: 'wildlife_observation',
                biodiversityIndex: summary.uniqueSpecies / summary.totalAnimals,
                conservationConcerns: sightings.filter(s => {
                    const species = wildlifeDatabase.find(w => w.name === s.species)
                    return species && ['Critically Endangered', 'Endangered'].includes(species.status)
                })
            }

            if (onSightingComplete) {
                await onSightingComplete(observationData)
            }

            // Reset form
            setSightings([])
            setLocation('')
            setWeather('')
            setObserverCount(1)
            setSelectedImages([])

            setSubmitSuccess(true)
            setTimeout(() => setSubmitSuccess(false), 3000)
        } catch (error) {
            alert('Failed to submit wildlife observation. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Critically Endangered':
                return 'text-red-600 bg-red-100'
            case 'Endangered':
                return 'text-orange-600 bg-orange-100'
            case 'Vulnerable':
                return 'text-yellow-600 bg-yellow-100'
            case 'Near Threatened':
                return 'text-blue-600 bg-blue-100'
            default:
                return 'text-green-600 bg-green-100'
        }
    }

    return ( <
        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
        <
        h4 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        TreePine className = "w-5 h-5 mr-2" / >
        Wildlife Counter & Tracker <
        /h4>

        {
            submitSuccess && ( <
                div className = "bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center" >
                <
                CheckCircle className = "w-5 h-5 mr-2" / >
                Wildlife observation recorded successfully!
                <
                /div>
            )
        }

        <
        form onSubmit = { handleSubmit }
        className = "space-y-6" > { /* Observation Details */ } <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-4" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" >
        <
        MapPin className = "w-4 h-4 inline mr-1" / >
        Location *
        <
        /label> <
        input type = "text"
        value = { location }
        onChange = {
            (e) => setLocation(e.target.value)
        }
        placeholder = "e.g., Forest Trail A, River Bend"
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required /
        >
        <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" >
        <
        Clock className = "w-4 h-4 inline mr-1" / >
        Time <
        /label> <
        input type = "time"
        value = { time }
        onChange = {
            (e) => setTime(e.target.value)
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /
        >
        <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" >
        <
        Users className = "w-4 h-4 inline mr-1" / >
        Observers <
        /label> <
        input type = "number"
        min = "1"
        value = { observerCount }
        onChange = {
            (e) => setObserverCount(parseInt(e.target.value))
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /
        >
        <
        /div> < /
        div >

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Weather Conditions < /label> <
        input type = "text"
        value = { weather }
        onChange = {
            (e) => setWeather(e.target.value)
        }
        placeholder = "e.g., Sunny, light breeze, 26°C"
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /
        >
        <
        /div>

        { /* Species Selection */ } <
        div >
        <
        h5 className = "text-lg font-semibold text-gray-900 mb-4" > Add Wildlife Sightings < /h5>

        { /* Category Filter */ } <
        div className = "flex flex-wrap gap-2 mb-4" > {
            categories.map((category) => ( <
                button key = { category.id }
                type = "button"
                onClick = {
                    () => setSelectedCategory(category.id)
                }
                className = { `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }` } > { category.name } <
                /button>
            ))
        } <
        /div>

        { /* Search */ } <
        div className = "relative mb-4" >
        <
        Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" / >
        <
        input type = "text"
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value)
        }
        placeholder = "Search species..."
        className = "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /
        >
        <
        /div>

        { /* Species Grid */ } <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3" > {
            filteredWildlife.map((animal, index) => ( <
                button key = { index }
                type = "button"
                onClick = {
                    () => setCurrentSighting({...currentSighting, species: animal.name })
                }
                className = { `text-left p-3 rounded-lg border transition-colors ${
                  currentSighting.species === animal.name
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }` } >
                <
                div className = "flex justify-between items-start mb-1" >
                <
                h6 className = "font-medium text-gray-900 text-sm" > { animal.name } < /h6> <
                span className = { `px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(animal.status)}` } > { animal.status.split(' ')[0] } <
                /span> < /
                div > <
                p className = "text-xs text-gray-500 italic mb-2" > { animal.scientific } < /p> <
                div className = "text-xs text-gray-600" >
                <
                p className = "font-medium" > Common signs: < /p> <
                ul className = "list-disc list-inside" > {
                    animal.commonSigns.slice(0, 2).map((sign, i) => ( <
                        li key = { i } > { sign } < /li>
                    ))
                } <
                /ul> < /
                div > <
                /button>
            ))
        } <
        /div>

        { /* Sighting Details */ } {
            currentSighting.species && ( <
                    div className = "bg-green-50 border border-green-200 rounded-lg p-4 mb-4" >
                    <
                    h6 className = "font-semibold text-green-900 mb-3" > Add Sighting: { currentSighting.species } < /h6> <
                    div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                    <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Count < /label> <
                    input type = "number"
                    min = "1"
                    value = { currentSighting.count }
                    onChange = {
                        (e) => setCurrentSighting({...currentSighting, count: parseInt(e.target.value) })
                    }
                    className = "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /
                    >
                    <
                    /div> <
                    div >
                    <
                    label className = "block text-sm font-medium text-gray-700 mb-2" > Behavior < /label> <
                    select value = { currentSighting.behavior }
                    onChange = {
                        (e) => setCurrentSighting({...currentSighting, behavior: e.target.value })
                    }
                    className = "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" >
                    <
                    option value = "" > Select behavior < /option> {
                    behaviorOptions.map((behavior) => ( <
                        option key = { behavior }
                        value = { behavior } > { behavior } < /option>
                    ))
                } <
                /select> < /
            div > <
                /div> <
            div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                <
                div >
                <
                label className = "block text-sm font-medium text-gray-700 mb-2" > Habitat < /label> <
            select value = { currentSighting.habitat }
            onChange = {
                (e) => setCurrentSighting({...currentSighting, habitat: e.target.value })
            }
            className = "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" >
                <
                option value = "" > Select habitat < /option> {
            habitatOptions.map((habitat) => ( <
                option key = { habitat }
                value = { habitat } > { habitat } < /option>
            ))
        } <
        /select> < /
        div > <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Notes < /label> <
        input type = "text"
        value = { currentSighting.notes }
        onChange = {
            (e) => setCurrentSighting({...currentSighting, notes: e.target.value })
        }
        placeholder = "Additional observations..."
        className = "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" /
        >
        <
        /div> < /
        div > <
        button type = "button"
        onClick = { addSighting }
        className = "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center" >
        <
        Plus className = "w-4 h-4 mr-2" / >
        Add Sighting <
        /button> < /
        div >
    )
} <
/div>

{ /* Current Sightings */ } {
    sightings.length > 0 && ( <
        div >
        <
        h5 className = "text-lg font-semibold text-gray-900 mb-4" > Current Sightings({ sightings.length }) < /h5> <
        div className = "space-y-3 mb-4" > {
            sightings.map((sighting) => ( <
                    div key = { sighting.id }
                    className = "bg-gray-50 rounded-lg p-4 flex justify-between items-center" >
                    <
                    div className = "flex-1" >
                    <
                    div className = "flex items-center space-x-4 mb-2" >
                    <
                    h6 className = "font-medium text-gray-900" > { sighting.species } < /h6> <
                    div className = "flex items-center space-x-2" >
                    <
                    button type = "button"
                    onClick = {
                        () => updateSightingCount(sighting.id, -1)
                    }
                    className = "w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200" >
                    <
                    Minus className = "w-3 h-3" / >
                    <
                    /button> <
                    span className = "font-bold text-lg" > { sighting.count } < /span> <
                    button type = "button"
                    onClick = {
                        () => updateSightingCount(sighting.id, 1)
                    }
                    className = "w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200" >
                    <
                    Plus className = "w-3 h-3" / >
                    <
                    /button> < /
                    div > <
                    /div> <
                    div className = "text-sm text-gray-600 space-x-4" > {
                        sighting.behavior && < span > Behavior: { sighting.behavior } < /span>} {
                        sighting.habitat && < span > Habitat: { sighting.habitat } < /span>} {
                        sighting.notes && < span > Notes: { sighting.notes } < /span>} < /
                        div > <
                        /div> <
                        button
                        type = "button"
                        onClick = {
                            () => removeSighting(sighting.id)
                        }
                        className = "text-red-600 hover:text-red-800 ml-4" >
                        Remove <
                        /button> < /
                        div >
                    ))
            } <
            /div>

            { /* Summary */ } <
            div className = "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4" >
            <
            h6 className = "font-semibold text-blue-900 mb-2 flex items-center" >
            <
            TrendingUp className = "w-4 h-4 mr-1" / >
            Observation Summary <
            /h6> <
            div className = "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" >
            <
            div >
            <
            span className = "font-medium text-blue-800" > Total Animals: < /span> <
            p className = "text-blue-700" > { generateSummary().totalAnimals } < /p> < /
            div > <
            div >
            <
            span className = "font-medium text-blue-800" > Unique Species: < /span> <
            p className = "text-blue-700" > { generateSummary().uniqueSpecies } < /p> < /
            div > <
            div >
            <
            span className = "font-medium text-blue-800" > Observation Time: < /span> <
            p className = "text-blue-700" > { time || 'Not set' } < /p> < /
            div > <
            div >
            <
            span className = "font-medium text-blue-800" > Observers: < /span> <
            p className = "text-blue-700" > { observerCount } < /p> < /
            div > <
            /div> < /
            div > <
            /div>
        )
    }

    { /* Photo Upload */ } <
    div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" >
        <
        Camera className = "w-4 h-4 inline mr-1" / >
        Wildlife Photos <
        /label> <
    div className = "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center" >
        <
        input
    type = "file"
    accept = "image/*"
    multiple
    onChange = { handleImageUpload }
    className = "hidden"
    id = "wildlife-photo-upload" /
        >
        <
        label htmlFor = "wildlife-photo-upload"
    className = "cursor-pointer" >
        <
        Camera className = "w-8 h-8 text-gray-400 mx-auto mb-2" / >
        <
        p className = "text-gray-600 text-sm" > Upload wildlife photos < /p> < /
    label > <
        /div>

    {
        selectedImages.length > 0 && ( <
            div className = "mt-3 grid grid-cols-2 md:grid-cols-4 gap-3" > {
                selectedImages.map((image, index) => ( <
                    div key = { index }
                    className = "relative" >
                    <
                    img src = { image.preview }
                    alt = ""
                    className = "w-full h-20 object-cover rounded" / >
                    <
                    button type = "button"
                    onClick = {
                        () => removeImage(index)
                    }
                    className = "absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs" > ×
                    <
                    /button> < /
                    div >
                ))
            } <
            /div>
        )
    } <
    /div>

    { /* Submit Button */ } <
    button
    type = "submit"
    disabled = { isSubmitting || sightings.length === 0 || !location }
    className = "w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center" > {
            isSubmitting ? ( <
                >
                <
                div className = "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" > < /div>
                Recording Observation... <
                />
            ) : ( <
                >
                <
                Save className = "w-4 h-4 mr-2" / >
                Record Wildlife Observation({ sightings.length }
                    sightings) <
                />
            )
        } <
        /button> < /
    form > <
        /div>
)
}