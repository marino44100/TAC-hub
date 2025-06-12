'use client'
import { useState, useEffect } from 'react'
import {
    Cloud,
    Sun,
    CloudRain,
    Wind,
    Thermometer,
    Droplets,
    Eye,
    Calendar,
    MapPin,
    Save,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Camera,
    Mic,
    Volume2
} from 'lucide-react'

export default function WeatherTracker({ onObservationComplete }) {
    const [currentWeather, setCurrentWeather] = useState({
        temperature: '',
        humidity: '',
        rainfall: '',
        windDirection: '',
        windSpeed: '',
        cloudCover: '',
        visibility: '',
        pressure: ''
    })

    const [traditionalSigns, setTraditionalSigns] = useState({
        animalBehavior: '',
        plantIndicators: '',
        skyPatterns: '',
        windPatterns: '',
        otherSigns: ''
    })

    const [location, setLocation] = useState('')
    const [notes, setNotes] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])
    const [isRecording, setIsRecording] = useState(false)
    const [audioRecording, setAudioRecording] = useState(null)

    // Load traditional wisdom from localStorage or use defaults
    const [traditionalWisdom, setTraditionalWisdom] = useState([])

    useEffect(() => {
        const savedWisdom = localStorage.getItem('tac-hub-traditional-wisdom')
        if (savedWisdom) {
            setTraditionalWisdom(JSON.parse(savedWisdom))
        } else {
            // Import comprehensive traditional wisdom database
            import ('../data/traditionalWisdom.js').then(module => {
                const defaultWisdom = module.defaultTraditionalWisdom
                setTraditionalWisdom(defaultWisdom)
                localStorage.setItem('tac-hub-traditional-wisdom', JSON.stringify(defaultWisdom))
            }).catch(() => {
                // Fallback to basic wisdom if import fails
                const basicWisdom = [{
                    category: 'Animal Behavior',
                    signs: [
                        'Birds flying low - Rain within 24 hours',
                        'Ants moving in lines - Heavy rain approaching',
                        'Frogs croaking loudly - Rain expected',
                        'Bees staying close to hive - Bad weather ahead'
                    ]
                }]
                setTraditionalWisdom(basicWisdom)
                localStorage.setItem('tac-hub-traditional-wisdom', JSON.stringify(basicWisdom))
            })
        }
    }, [])

    const handleWeatherChange = (field, value) => {
        setCurrentWeather(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleTraditionalSignChange = (field, value) => {
        setTraditionalSigns(prev => ({
            ...prev,
            [field]: value
        }))
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

    const startRecording = async() => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            const chunks = []

            mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' })
                setAudioRecording({
                    blob,
                    url: URL.createObjectURL(blob),
                    name: `weather-observation-${Date.now()}.wav`
                })
            }

            mediaRecorder.start()
            setIsRecording(true)

            // Auto-stop after 2 minutes
            setTimeout(() => {
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop()
                    stream.getTracks().forEach(track => track.stop())
                    setIsRecording(false)
                }
            }, 120000)

            // Store recorder for manual stop
            window.currentRecorder = { mediaRecorder, stream }
        } catch (error) {
            alert('Could not access microphone. Please check permissions.')
        }
    }

    const stopRecording = () => {
        if (window.currentRecorder) {
            window.currentRecorder.mediaRecorder.stop()
            window.currentRecorder.stream.getTracks().forEach(track => track.stop())
            setIsRecording(false)
        }
    }

    const generateWeatherForecast = () => {
        const signs = Object.values(traditionalSigns).filter(sign => sign.trim())
        const weather = currentWeather

        let forecast = "Based on traditional signs and current conditions:\n\n"

        // Analyze traditional signs
        if (traditionalSigns.animalBehavior.toLowerCase().includes('low') ||
            traditionalSigns.animalBehavior.toLowerCase().includes('gathering')) {
            forecast += "🌧️ Animal behavior suggests rain approaching\n"
        }

        if (traditionalSigns.plantIndicators.toLowerCase().includes('upward') ||
            traditionalSigns.plantIndicators.toLowerCase().includes('closing')) {
            forecast += "🌿 Plant indicators point to incoming precipitation\n"
        }

        if (traditionalSigns.skyPatterns.toLowerCase().includes('red') ||
            traditionalSigns.skyPatterns.toLowerCase().includes('ring')) {
            forecast += "🌅 Sky patterns indicate weather change\n"
        }

        // Analyze current conditions
        if (weather.humidity && parseInt(weather.humidity) > 80) {
            forecast += "💧 High humidity suggests rain potential\n"
        }

        if (weather.cloudCover === 'overcast' || weather.cloudCover === 'stormy') {
            forecast += "☁️ Cloud cover indicates possible precipitation\n"
        }

        if (weather.windDirection && weather.windSpeed) {
            forecast += `💨 Wind from ${weather.windDirection} at ${weather.windSpeed} may bring weather changes\n`
        }

        if (signs.length === 0 && !weather.temperature) {
            forecast = "Please add observations to generate forecast"
        }

        return forecast
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const observationData = {
                currentWeather,
                traditionalSigns,
                location,
                notes,
                forecast: generateWeatherForecast(),
                images: selectedImages.length,
                audioRecording: audioRecording ? 1 : 0,
                timestamp: new Date().toISOString(),
                submittedBy: 'Community Member',
                type: 'weather_observation'
            }

            if (onObservationComplete) {
                await onObservationComplete(observationData)
            }

            // Reset form
            setCurrentWeather({
                temperature: '',
                humidity: '',
                rainfall: '',
                windDirection: '',
                windSpeed: '',
                cloudCover: '',
                visibility: '',
                pressure: ''
            })
            setTraditionalSigns({
                animalBehavior: '',
                plantIndicators: '',
                skyPatterns: '',
                windPatterns: '',
                otherSigns: ''
            })
            setLocation('')
            setNotes('')
            setSelectedImages([])
            setAudioRecording(null)

            setSubmitSuccess(true)
            setTimeout(() => setSubmitSuccess(false), 3000)
        } catch (error) {
            alert('Failed to submit observation. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return ( <
        div className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
        <
        h4 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        Cloud className = "w-5 h-5 mr-2" / >
        Traditional Weather Tracker <
        /h4>

        {
            submitSuccess && ( <
                div className = "bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-6 flex items-center" >
                <
                CheckCircle className = "w-5 h-5 mr-2" / >
                Weather observation recorded successfully!
                <
                /div>
            )
        }

        <
        form onSubmit = { handleSubmit }
        className = "space-y-6" > { /* Location */ } <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" >
        <
        MapPin className = "w-4 h-4 inline mr-1" / >
        Observation Location *
        <
        /label> <
        input type = "text"
        value = { location }
        onChange = {
            (e) => setLocation(e.target.value)
        }
        placeholder = "e.g., Village Center, Forest Edge, River Bank"
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required /
        >
        <
        /div>

        { /* Current Weather Conditions */ } <
        div >
        <
        h5 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        Thermometer className = "w-5 h-5 mr-2" / >
        Current Weather Conditions <
        /h5>

        <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Temperature(°C) < /label> <
        input type = "number"
        step = "0.1"
        value = { currentWeather.temperature }
        onChange = {
            (e) => handleWeatherChange('temperature', e.target.value)
        }
        placeholder = "25.5"
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Humidity( % ) < /label> <
        input type = "number"
        min = "0"
        max = "100"
        value = { currentWeather.humidity }
        onChange = {
            (e) => handleWeatherChange('humidity', e.target.value)
        }
        placeholder = "75"
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Rainfall(mm) < /label> <
        input type = "number"
        step = "0.1"
        min = "0"
        value = { currentWeather.rainfall }
        onChange = {
            (e) => handleWeatherChange('rainfall', e.target.value)
        }
        placeholder = "5.0"
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div> < /
        div >

        <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Cloud Cover < /label> <
        select value = { currentWeather.cloudCover }
        onChange = {
            (e) => handleWeatherChange('cloudCover', e.target.value)
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
        <
        option value = "" > Select cloud cover < /option> <
        option value = "clear" > Clear(0 - 10 % ) < /option> <
        option value = "partly-cloudy" > Partly Cloudy(10 - 50 % ) < /option> <
        option value = "mostly-cloudy" > Mostly Cloudy(50 - 90 % ) < /option> <
        option value = "overcast" > Overcast(90 - 100 % ) < /option> <
        option value = "stormy" > Stormy < /option> < /
        select > <
        /div> <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Wind Direction < /label> <
        select value = { currentWeather.windDirection }
        onChange = {
            (e) => handleWeatherChange('windDirection', e.target.value)
        }
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
        <
        option value = "" > Select direction < /option> <
        option value = "north" > North < /option> <
        option value = "northeast" > Northeast < /option> <
        option value = "east" > East < /option> <
        option value = "southeast" > Southeast < /option> <
        option value = "south" > South < /option> <
        option value = "southwest" > Southwest < /option> <
        option value = "west" > West < /option> <
        option value = "northwest" > Northwest < /option> < /
        select > <
        /div> < /
        div > <
        /div>

        { /* Traditional Weather Signs */ } <
        div >
        <
        h5 className = "text-lg font-semibold text-gray-900 mb-4 flex items-center" >
        <
        Eye className = "w-5 h-5 mr-2" / >
        Traditional Weather Signs <
        /h5>

        <
        div className = "space-y-4" >
        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Animal Behavior < /label> <
        textarea value = { traditionalSigns.animalBehavior }
        onChange = {
            (e) => handleTraditionalSignChange('animalBehavior', e.target.value)
        }
        rows = "2"
        placeholder = "e.g., Birds flying low, cattle gathering under trees..."
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div>

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Plant Indicators < /label> <
        textarea value = { traditionalSigns.plantIndicators }
        onChange = {
            (e) => handleTraditionalSignChange('plantIndicators', e.target.value)
        }
        rows = "2"
        placeholder = "e.g., Leaves turning upward, flowers closing during day..."
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div>

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Sky Patterns < /label> <
        textarea value = { traditionalSigns.skyPatterns }
        onChange = {
            (e) => handleTraditionalSignChange('skyPatterns', e.target.value)
        }
        rows = "2"
        placeholder = "e.g., Red sky at sunset, ring around moon..."
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div>

        <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Other Traditional Signs < /label> <
        textarea value = { traditionalSigns.otherSigns }
        onChange = {
            (e) => handleTraditionalSignChange('otherSigns', e.target.value)
        }
        rows = "2"
        placeholder = "e.g., Smoke behavior, air pressure feelings, elder predictions..."
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div> < /
        div > <
        /div>

        { /* Traditional Wisdom Reference */ } <
        div className = "bg-blue-50 border border-blue-200 rounded-lg p-4" >
        <
        h6 className = "font-semibold text-blue-900 mb-3" > Traditional Weather Wisdom Reference < /h6> <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-4" > {
            traditionalWisdom.map((category, index) => ( <
                div key = { index } >
                <
                h7 className = "font-medium text-blue-800 text-sm mb-2" > { category.category } < /h7> <
                ul className = "text-xs text-blue-700 space-y-1" > {
                    category.signs.slice(0, 3).map((sign, i) => ( <
                        li key = { i }
                        className = "flex items-start" >
                        <
                        span className = "w-1 h-1 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0" > < /span> { sign } < /
                        li >
                    ))
                } <
                /ul> < /
                div >
            ))
        } <
        /div> < /
        div >

        { /* Media Upload */ } <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-6" > { /* Photo Upload */ } <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" >
        <
        Camera className = "w-4 h-4 inline mr-1" / >
        Weather Photos <
        /label> <
        div className = "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center" >
        <
        input type = "file"
        accept = "image/*"
        multiple onChange = { handleImageUpload }
        className = "hidden"
        id = "weather-photo-upload" /
        >
        <
        label htmlFor = "weather-photo-upload"
        className = "cursor-pointer" >
        <
        Camera className = "w-8 h-8 text-gray-400 mx-auto mb-2" / >
        <
        p className = "text-gray-600 text-sm" > Upload sky / weather photos < /p> < /
        label > <
        /div>

        {
            selectedImages.length > 0 && ( <
                div className = "mt-3 space-y-2" > {
                    selectedImages.map((image, index) => ( <
                        div key = { index }
                        className = "flex items-center justify-between bg-gray-50 p-2 rounded" >
                        <
                        div className = "flex items-center space-x-2" >
                        <
                        img src = { image.preview }
                        alt = ""
                        className = "w-8 h-8 object-cover rounded" / >
                        <
                        span className = "text-sm" > { image.name } < /span> < /
                        div > <
                        button type = "button"
                        onClick = {
                            () => removeImage(index)
                        }
                        className = "text-red-600 hover:text-red-800 text-sm" >
                        Remove <
                        /button> < /
                        div >
                    ))
                } <
                /div>
            )
        } <
        /div>

        { /* Audio Recording */ } <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" >
        <
        Mic className = "w-4 h-4 inline mr-1" / >
        Voice Observation <
        /label> <
        div className = "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center" > {!isRecording && !audioRecording && ( <
                button type = "button"
                onClick = { startRecording }
                className = "flex items-center justify-center w-full text-gray-600 hover:text-blue-600" >
                <
                Mic className = "w-8 h-8 mb-2" / >
                <
                span className = "text-sm" > Record voice observation < /span> < /
                button >
            )
        }

        {
            isRecording && ( <
                div className = "text-center" >
                <
                div className = "w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 animate-pulse" > < /div> <
                p className = "text-red-600 text-sm mb-2" > Recording... < /p> <
                button type = "button"
                onClick = { stopRecording }
                className = "bg-red-600 text-white px-3 py-1 rounded text-sm" >
                Stop Recording <
                /button> < /
                div >
            )
        }

        {
            audioRecording && ( <
                div className = "text-center" >
                <
                Volume2 className = "w-8 h-8 text-green-600 mx-auto mb-2" / >
                <
                p className = "text-green-600 text-sm mb-2" > Recording saved < /p> <
                audio controls className = "w-full" >
                <
                source src = { audioRecording.url }
                type = "audio/wav" / >
                <
                /audio> < /
                div >
            )
        } <
        /div> < /
        div > <
        /div>

        { /* Additional Notes */ } <
        div >
        <
        label className = "block text-sm font-medium text-gray-700 mb-2" > Additional Observations < /label> <
        textarea value = { notes }
        onChange = {
            (e) => setNotes(e.target.value)
        }
        rows = "3"
        placeholder = "Any other weather observations, elder predictions, or notable changes..."
        className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /
        >
        <
        /div>

        { /* Weather Forecast Preview */ } {
            (Object.values(traditionalSigns).some(sign => sign.trim()) || currentWeather.temperature) && ( <
                div className = "bg-green-50 border border-green-200 rounded-lg p-4" >
                <
                h6 className = "font-semibold text-green-900 mb-2 flex items-center" >
                <
                TrendingUp className = "w-4 h-4 mr-1" / >
                Traditional Weather Forecast <
                /h6> <
                pre className = "text-sm text-green-800 whitespace-pre-wrap" > { generateWeatherForecast() } < /pre> < /
                div >
            )
        }

        { /* Submit Button */ } <
        button type = "submit"
        disabled = { isSubmitting || !location }
        className = "w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center" > {
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
                Record Weather Observation <
                />
            )
        } <
        /button> < /
        form > <
        /div>
    )
}