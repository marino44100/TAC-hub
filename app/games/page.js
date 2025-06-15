'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
    Trophy,
    Star,
    Coins,
    Play,
    Brain,
    Leaf,
    Users,
    Globe,
    CheckCircle,
    XCircle,
    Clock,
    Target,
    Award,
    Gamepad2,
    TreePine,
    Fish,
    Flower,
    Sun,
    Moon,
    Droplets
} from 'lucide-react'

export default function GamesPage() {
    const { user } = useAuth()
    const [userCredits, setUserCredits] = useState(0)
    const [currentGame, setCurrentGame] = useState(null)
    const [gameStats, setGameStats] = useState({
        gamesPlayed: 0,
        correctAnswers: 0,
        totalCredits: 0,
        achievements: []
    })

    const games = [{
            id: 'congo-quiz',
            title: 'Congo Basin Knowledge Quiz',
            description: 'Test your knowledge about Congo Basin traditional practices and conservation',
            icon: Brain,
            difficulty: 'Easy',
            credits: 10,
            type: 'quiz',
            color: 'bg-blue-500'
        },
        {
            id: 'tree-planting',
            title: 'Tree Planting Master',
            description: 'Plant trees using traditional methods and watch your forest grow!',
            icon: TreePine,
            difficulty: 'Easy',
            credits: 15,
            type: 'animation',
            color: 'bg-green-500'
        },
        {
            id: 'traditional-fishing',
            title: 'Traditional Fishing Wisdom',
            description: 'Learn sustainable fishing techniques from Congo Basin communities',
            icon: Fish,
            difficulty: 'Medium',
            credits: 18,
            type: 'animation',
            color: 'bg-blue-600'
        },
        {
            id: 'forest-guardian',
            title: 'Forest Guardian Challenge',
            description: 'Protect the forest by making the right conservation decisions',
            icon: Target,
            difficulty: 'Medium',
            credits: 15,
            type: 'simulation',
            color: 'bg-emerald-500'
        },
        {
            id: 'seasonal-calendar',
            title: 'Traditional Calendar Master',
            description: 'Learn about seasonal patterns and traditional farming cycles',
            icon: Sun,
            difficulty: 'Medium',
            credits: 12,
            type: 'matching',
            color: 'bg-yellow-500'
        },
        {
            id: 'species-spotter',
            title: 'Congo Species Spotter',
            description: 'Identify native species and learn their traditional uses',
            icon: Flower,
            difficulty: 'Hard',
            credits: 20,
            type: 'identification',
            color: 'bg-purple-500'
        },
        {
            id: 'forest-adventure',
            title: 'Forest Adventure Mini-Games',
            description: 'Interactive animations: plant trees, catch fish, and protect the forest!',
            icon: Gamepad2,
            difficulty: 'Fun',
            credits: 25,
            type: 'mini-games',
            color: 'bg-gradient-to-r from-green-500 to-blue-500'
        }
    ]

    const achievements = [
        { id: 'first-game', name: 'First Steps', description: 'Play your first game', icon: Play, credits: 5 },
        { id: 'quiz-master', name: 'Quiz Master', description: 'Answer 50 questions correctly', icon: Brain, credits: 25 },
        { id: 'forest-protector', name: 'Forest Protector', description: 'Complete 10 conservation challenges', icon: TreePine, credits: 30 },
        { id: 'knowledge-keeper', name: 'Knowledge Keeper', description: 'Learn 25 traditional practices', icon: Users, credits: 40 },
        { id: 'eco-champion', name: 'Eco Champion', description: 'Earn 500 total credits', icon: Trophy, credits: 50 }
    ]

    useEffect(() => {
        if (user) {
            loadUserGameData()
        }
    }, [user])

    const loadUserGameData = () => {
        const savedCredits = localStorage.getItem(`game-credits-${user.email}`)
        const savedStats = localStorage.getItem(`game-stats-${user.email}`)

        // New users start with 0 credits
        setUserCredits(savedCredits ? parseInt(savedCredits) : 0)

        if (savedStats) {
            setGameStats(JSON.parse(savedStats))
        } else {
            // Initialize new user stats
            setGameStats({
                gamesPlayed: 0,
                correctAnswers: 0,
                totalCredits: 0,
                achievements: []
            })
        }
    }

    const saveUserGameData = (newCredits, newStats) => {
        localStorage.setItem(`game-credits-${user.email}`, newCredits.toString())
        localStorage.setItem(`game-stats-${user.email}`, JSON.stringify(newStats))
    }

    const startGame = (gameId) => {
        setCurrentGame(gameId)
    }

    const endGame = (creditsEarned, correct = 0, total = 0) => {
        // Ensure credits earned is positive, but allow for penalties
        const finalCreditsEarned = Math.max(1, creditsEarned) // Minimum 1 credit for playing
        const newCredits = userCredits + finalCreditsEarned
        const newStats = {
            ...gameStats,
            gamesPlayed: gameStats.gamesPlayed + 1,
            correctAnswers: gameStats.correctAnswers + correct,
            totalCredits: newCredits
        }

        setUserCredits(newCredits)
        setGameStats(newStats)
        saveUserGameData(newCredits, newStats)
        setCurrentGame(null)

        // Show credits earned notification
        alert(`🎉 Game Complete! You earned ${finalCreditsEarned} credits!`)

        // Check for new achievements
        checkAchievements(newStats)
    }

    const checkAchievements = (stats) => {
        const newAchievements = []

        if (stats.gamesPlayed >= 1 && !stats.achievements.includes('first-game')) {
            newAchievements.push('first-game')
        }
        if (stats.correctAnswers >= 50 && !stats.achievements.includes('quiz-master')) {
            newAchievements.push('quiz-master')
        }
        if (stats.totalCredits >= 500 && !stats.achievements.includes('eco-champion')) {
            newAchievements.push('eco-champion')
        }

        if (newAchievements.length > 0) {
            const updatedStats = {
                ...stats,
                achievements: [...stats.achievements, ...newAchievements]
            }
            setGameStats(updatedStats)
            saveUserGameData(userCredits, updatedStats)

            // Show achievement notification
            newAchievements.forEach(achievementId => {
                const achievement = achievements.find(a => a.id === achievementId)
                if (achievement) {
                    alert(`🎉 Achievement Unlocked: ${achievement.name}! +${achievement.credits} credits`)
                    setUserCredits(prev => prev + achievement.credits)
                }
            })
        }
    }

    if (currentGame) {
        return <GameComponent gameId = { currentGame }
        onGameEnd = { endGame }
        />
    }

    return ( <
        div className = "min-h-screen bg-gray-50" >
        <
        Header / >

        <
        div className = "container-max py-8" > { /* Header Section */ } <
        div className = "text-center mb-8" >
        <
        h1 className = "text-4xl font-bold text-gray-900 mb-4" > 🎮Congo Basin Learning Games <
        /h1> <
        p className = "text-xl text-gray-600 max-w-3xl mx-auto" >
        Learn traditional practices and conservation knowledge through fun, interactive games.Earn credits and unlock achievements
        while preserving Congo Basin wisdom!
        <
        /p> < /
        div >

        { /* User Stats */ } {
            user && ( <
                div className = "bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200" >
                <
                div className = "grid grid-cols-1 md:grid-cols-4 gap-6" >
                <
                div className = "text-center" >
                <
                div className = "w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2" >
                <
                Coins className = "w-8 h-8 text-yellow-600" / >
                <
                /div> <
                h3 className = "text-2xl font-bold text-gray-900" > { userCredits } < /h3> <
                p className = "text-gray-600" > Credits Earned < /p> < /
                div > <
                div className = "text-center" >
                <
                div className = "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2" >
                <
                Gamepad2 className = "w-8 h-8 text-blue-600" / >
                <
                /div> <
                h3 className = "text-2xl font-bold text-gray-900" > { gameStats.gamesPlayed } < /h3> <
                p className = "text-gray-600" > Games Played < /p> < /
                div > <
                div className = "text-center" >
                <
                div className = "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2" >
                <
                CheckCircle className = "w-8 h-8 text-green-600" / >
                <
                /div> <
                h3 className = "text-2xl font-bold text-gray-900" > { gameStats.correctAnswers } < /h3> <
                p className = "text-gray-600" > Correct Answers < /p> < /
                div > <
                div className = "text-center" >
                <
                div className = "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2" >
                <
                Trophy className = "w-8 h-8 text-purple-600" / >
                <
                /div> <
                h3 className = "text-2xl font-bold text-gray-900" > { gameStats.achievements ? .length || 0 } < /h3> <
                p className = "text-gray-600" > Achievements < /p> < /
                div > <
                /div> < /
                div >
            )
        }

        { /* Games Grid */ } <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8" > {
            games.map((game) => {
                const IconComponent = game.icon
                return ( <
                    div key = { game.id }
                    className = "bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow" >
                    <
                    div className = { `${game.color} p-6 text-white` } >
                    <
                    div className = "flex items-center justify-between mb-4" >
                    <
                    IconComponent className = "w-12 h-12" / >
                    <
                    div className = "text-right" >
                    <
                    div className = "flex items-center space-x-1" >
                    <
                    Coins className = "w-4 h-4" / >
                    <
                    span className = "font-bold" > +{ game.credits } < /span> < /
                    div > <
                    span className = "text-sm opacity-90" > { game.difficulty } < /span> < /
                    div > <
                    /div> <
                    h3 className = "text-xl font-bold mb-2" > { game.title } < /h3> <
                    p className = "text-sm opacity-90" > { game.description } < /p> < /
                    div > <
                    div className = "p-6" >
                    <
                    button onClick = {
                        () => startGame(game.id)
                    }
                    className = "w-full btn-primary flex items-center justify-center space-x-2"
                    disabled = {!user } >
                    <
                    Play className = "w-5 h-5" / >
                    <
                    span > Play Game < /span> < /
                    button > {!user && ( <
                            p className = "text-sm text-gray-500 text-center mt-2" >
                            <
                            a href = "/login"
                            className = "text-primary-600 hover:underline" > Login < /a> to play and earn credits < /
                            p >
                        )
                    } <
                    /div> < /
                    div >
                )
            })
        } <
        /div>

        { /* Learning Benefits */ } <
        div className = "bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8" >
        <
        h2 className = "text-2xl font-bold text-gray-900 mb-6 text-center" > 🌍What You 'll Learn < /
        h2 > <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
        <
        div className = "text-center" >
        <
        div className = "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <
        Leaf className = "w-8 h-8 text-green-600" / >
        <
        /div> <
        h3 className = "font-semibold text-gray-900 mb-2" > Traditional Practices < /h3> <
        p className = "text-sm text-gray-600" > Ancient wisdom
        for forest conservation and sustainable living < /p> < /
        div > <
        div className = "text-center" >
        <
        div className = "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <
        Users className = "w-8 h-8 text-blue-600" / >
        <
        /div> <
        h3 className = "font-semibold text-gray-900 mb-2" > Community Knowledge < /h3> <
        p className = "text-sm text-gray-600" > Learn from indigenous communities and their time - tested methods < /p> < /
        div > <
        div className = "text-center" >
        <
        div className = "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <
        Globe className = "w-8 h-8 text-purple-600" / >
        <
        /div> <
        h3 className = "font-semibold text-gray-900 mb-2" > Conservation Science < /h3> <
        p className = "text-sm text-gray-600" > Modern conservation techniques combined with traditional knowledge < /p> < /
        div > <
        div className = "text-center" >
        <
        div className = "w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <
        Star className = "w-8 h-8 text-yellow-600" / >
        <
        /div> <
        h3 className = "font-semibold text-gray-900 mb-2" > Cultural Heritage < /h3> <
        p className = "text-sm text-gray-600" > Preserve and celebrate Congo Basin cultural traditions < /p> < /
        div > <
        /div> < /
        div > <
        /div>

        <
        Footer / >
        <
        /div>
    )
}

// Game Component Wrapper
function GameComponent({ gameId, onGameEnd }) {
    switch (gameId) {
        case 'congo-quiz':
            return <CongoQuizGame onGameEnd = { onGameEnd }
            />
        case 'tree-planting':
            return <TreePlantingGame onGameEnd = { onGameEnd }
            />
        case 'traditional-fishing':
            return <TraditionalFishingGame onGameEnd = { onGameEnd }
            />
        case 'forest-guardian':
            return <ForestGuardianGame onGameEnd = { onGameEnd }
            />
        case 'seasonal-calendar':
            return <SeasonalCalendarGame onGameEnd = { onGameEnd }
            />
        case 'species-spotter':
            return <SpeciesSpotterGame onGameEnd = { onGameEnd }
            />
        case 'forest-adventure':
            return <ForestAdventureGame onGameEnd = { onGameEnd }
            />
        default:
            return <CongoQuizGame onGameEnd = { onGameEnd }
            />
    }
}

// Congo Quiz Game Component
function CongoQuizGame({ onGameEnd }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30)

    const questions = [{
            question: "What is the traditional method used by Congo Basin communities to preserve fish?",
            options: ["Freezing", "Salting", "Smoking", "Drying in sun"],
            correct: 2,
            explanation: "Smoking is the traditional method used to preserve fish, extending its shelf life while adding flavor."
        },
        {
            question: "Which tree is considered sacred in many Congo Basin communities?",
            options: ["Baobab", "Iroko", "Mahogany", "Ebony"],
            correct: 1,
            explanation: "The Iroko tree is considered sacred and is often used in traditional ceremonies and medicine."
        },
        {
            question: "What is the traditional farming technique that helps preserve soil fertility?",
            options: ["Monoculture", "Intensive farming", "Slash and burn", "Crop rotation"],
            correct: 3,
            explanation: "Crop rotation helps maintain soil fertility by alternating different crops that replenish nutrients."
        },
        {
            question: "Which traditional practice helps predict weather patterns?",
            options: ["All of the above", "Star gazing", "Plant growth patterns", "Animal behavior observation"],
            correct: 0,
            explanation: "Traditional communities use multiple natural indicators including animal behavior, celestial observations, and plant patterns to predict weather."
        },
        {
            question: "What is the traditional use of palm wine in Congo Basin communities?",
            options: ["Only for drinking", "Ceremonial purposes only", "Medicine and ceremonies", "Trading only"],
            correct: 2,
            explanation: "Palm wine is used both for medicinal purposes and in traditional ceremonies, not just as a beverage."
        },
        {
            question: "How do traditional hunters in the Congo Basin ensure sustainable hunting?",
            options: ["Hunt any time", "Follow seasonal restrictions", "Use modern weapons", "Hunt alone"],
            correct: 1,
            explanation: "Traditional hunters follow strict seasonal restrictions and community rules to ensure animal populations remain stable."
        },
        {
            question: "What is the traditional method for selecting trees to cut for building?",
            options: ["Cut the biggest trees", "Cut any tree", "Select mature trees carefully", "Cut young trees only"],
            correct: 2,
            explanation: "Traditional communities carefully select only mature trees and leave younger ones to grow, ensuring forest regeneration."
        },
        {
            question: "Which plant is traditionally used for water purification in Congo Basin?",
            options: ["Moringa seeds", "Banana leaves", "Palm fronds", "Cassava roots"],
            correct: 0,
            explanation: "Moringa seeds have been traditionally used to purify water by removing impurities and bacteria."
        },
        {
            question: "What is the traditional way to determine the best time for planting?",
            options: ["Calendar dates", "Moon phases and natural signs", "Weather forecast", "Random timing"],
            correct: 1,
            explanation: "Traditional farmers use moon phases, animal behavior, and plant signs to determine optimal planting times."
        },
        {
            question: "How do traditional communities protect their forests from fires?",
            options: ["Let fires burn", "Create firebreaks", "Use water only", "Ignore fire prevention"],
            correct: 1,
            explanation: "Traditional communities create firebreaks and use controlled burning techniques to prevent destructive forest fires."
        },
        {
            question: "Which traditional medicine is made from tree bark in the Congo Basin?",
            options: ["Aspirin", "Quinine from Cinchona", "Antibiotics", "Vitamins"],
            correct: 1,
            explanation: "Quinine, extracted from Cinchona tree bark, has been traditionally used to treat malaria and fever."
        },
        {
            question: "What is the traditional method for storing seeds for next season?",
            options: ["Plastic containers", "Clay pots with ash", "Metal boxes", "Paper bags"],
            correct: 1,
            explanation: "Traditional communities store seeds in clay pots with ash to protect them from insects and moisture."
        },
        {
            question: "How do traditional communities identify edible mushrooms?",
            options: ["Trial and error", "Passed down knowledge", "Modern guides", "Random selection"],
            correct: 1,
            explanation: "Knowledge of edible vs poisonous mushrooms is carefully passed down through generations with specific identification methods."
        },
        {
            question: "What traditional technique is used to improve soil in gardens?",
            options: ["Chemical fertilizers", "Composting organic matter", "Burning everything", "Adding sand only"],
            correct: 1,
            explanation: "Traditional composting of organic matter enriches soil naturally and sustainably."
        },
        {
            question: "Which traditional practice helps preserve biodiversity?",
            options: ["Monoculture farming", "Mixed species planting", "Clear cutting", "Chemical spraying"],
            correct: 1,
            explanation: "Mixed species planting maintains biodiversity and creates resilient ecosystems."
        },
        {
            question: "How do traditional communities determine water quality?",
            options: ["Chemical tests", "Observing aquatic life", "Color only", "Taste only"],
            correct: 1,
            explanation: "Traditional communities assess water quality by observing fish, plants, and other aquatic life indicators."
        },
        {
            question: "What is the traditional way to preserve meat without refrigeration?",
            options: ["Salt curing", "Smoking and drying", "Burying underground", "Wrapping in leaves"],
            correct: 1,
            explanation: "Smoking and drying meat removes moisture and adds preservative compounds from smoke."
        },
        {
            question: "Which traditional tool is used for sustainable forest harvesting?",
            options: ["Chainsaws", "Hand axes and machetes", "Bulldozers", "Chemical treatments"],
            correct: 1,
            explanation: "Traditional hand tools allow selective harvesting without damaging surrounding vegetation."
        },
        {
            question: "How do traditional communities predict rainfall?",
            options: ["Weather apps", "Cloud patterns and wind", "Random guessing", "Modern instruments"],
            correct: 1,
            explanation: "Traditional weather prediction uses cloud formations, wind patterns, and animal behavior."
        },
        {
            question: "What traditional method prevents soil erosion on slopes?",
            options: ["Concrete barriers", "Terracing with plants", "Chemical stabilizers", "Ignoring the problem"],
            correct: 1,
            explanation: "Traditional terracing with deep-rooted plants prevents soil erosion naturally."
        },
        {
            question: "Which traditional practice helps maintain forest health?",
            options: ["Clear cutting", "Selective harvesting", "Chemical spraying", "Burning everything"],
            correct: 1,
            explanation: "Selective harvesting maintains forest structure and allows natural regeneration."
        },
        {
            question: "How do traditional communities treat minor wounds?",
            options: ["Modern antibiotics", "Medicinal plant extracts", "Ignoring them", "Chemical disinfectants"],
            correct: 1,
            explanation: "Traditional medicine uses plant extracts with natural antiseptic and healing properties."
        },
        {
            question: "What traditional method is used to control crop pests?",
            options: ["Chemical pesticides", "Companion planting", "Burning crops", "Doing nothing"],
            correct: 1,
            explanation: "Companion planting uses natural pest-repelling plants to protect crops."
        },
        {
            question: "Which traditional practice helps during dry seasons?",
            options: ["Water hoarding", "Rainwater harvesting", "Ignoring drought", "Using all water quickly"],
            correct: 1,
            explanation: "Traditional rainwater harvesting systems collect and store water for dry periods."
        },
        {
            question: "How do traditional communities navigate in dense forests?",
            options: ["GPS devices", "Natural landmarks", "Random walking", "Following roads"],
            correct: 1,
            explanation: "Traditional navigation uses trees, rocks, water sources, and other natural landmarks."
        }
    ]

    useEffect(() => {
        if (timeLeft > 0 && !showResult) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0) {
            handleNextQuestion()
        }
    }, [timeLeft, showResult])

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex)
    }

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestion].correct) {
            setScore(score + 1)
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setTimeLeft(30)
        } else {
            setShowResult(true)
        }
    }

    const handleGameEnd = () => {
        const correctAnswers = score
        const wrongAnswers = questions.length - score
        const baseCredits = correctAnswers * 3 // 3 credits per correct answer
        const penalty = wrongAnswers * 1 // -1 credit per wrong answer
        const creditsEarned = Math.max(2, baseCredits - penalty) // Minimum 2 credits for playing
        onGameEnd(creditsEarned, score, questions.length)
    }

    if (showResult) {
        return ( <
            div className = "min-h-screen bg-gray-50 flex items-center justify-center" >
            <
            div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
            <
            Trophy className = "w-16 h-16 text-yellow-500 mx-auto mb-4" / >
            <
            h2 className = "text-2xl font-bold text-gray-900 mb-4" > Quiz Complete! < /h2> <
            p className = "text-lg text-gray-600 mb-4" >
            You scored { score }
            out of { questions.length } <
            /p> <
            p className = "text-sm text-gray-500 mb-6" >
            Credits earned: { score * 2 } <
            /p> <
            button onClick = { handleGameEnd }
            className = "btn-primary w-full" >
            Continue <
            /button> < /
            div > <
            /div>
        )
    }

    return ( <
        div className = "min-h-screen bg-gray-50" >
        <
        Header / >
        <
        div className = "container-max py-8" >
        <
        div className = "max-w-2xl mx-auto" >
        <
        div className = "mb-6" >
        <
        div className = "flex justify-between items-center mb-2" >
        <
        span className = "text-sm text-gray-600" >
        Question { currentQuestion + 1 }
        of { questions.length } <
        /span> <
        div className = "flex items-center space-x-2" >
        <
        Clock className = "w-4 h-4 text-gray-500" / >
        <
        span className = "text-sm text-gray-600" > { timeLeft }
        s < /span> < /
        div > <
        /div> <
        div className = "w-full bg-gray-200 rounded-full h-2" >
        <
        div className = "bg-primary-600 h-2 rounded-full transition-all duration-300"
        style = {
            { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
        } >
        <
        /div> < /
        div > <
        /div>

        <
        div className = "bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6" >
        <
        h2 className = "text-xl font-semibold text-gray-900 mb-6" > { questions[currentQuestion].question } <
        /h2>

        <
        div className = "space-y-3" > {
            questions[currentQuestion].options.map((option, index) => ( <
                button key = { index }
                onClick = {
                    () => handleAnswerSelect(index)
                }
                className = { `w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswer === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }` } >
                <
                span className = "font-medium" > { String.fromCharCode(65 + index) }. < /span> {option} < /
                button >
            ))
        } <
        /div>

        <
        button onClick = { handleNextQuestion }
        disabled = { selectedAnswer === null }
        className = "btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed" > { currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question' } <
        /button> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}

function ForestGuardianGame({ onGameEnd }) {
    const [currentScenario, setCurrentScenario] = useState(0)
    const [score, setScore] = useState(0)
    const [forestHealth, setForestHealth] = useState(100)
    const [showResult, setShowResult] = useState(false)

    const scenarios = [{
            title: "Illegal Logging Spotted",
            description: "You discover illegal loggers cutting down ancient trees. What do you do?",
            image: "🌲⚠️",
            options: [
                { text: "Report to authorities", impact: +15, explanation: "Smart! Proper channels ensure safety." },
                { text: "Document evidence first", impact: +20, explanation: "Excellent! Evidence helps authorities." },
                { text: "Confront them directly", impact: -10, explanation: "Dangerous! Could lead to conflict." },
                { text: "Ignore it", impact: -25, explanation: "Forest destruction continues." }
            ]
        },
        {
            title: "Community Needs Firewood",
            description: "Villagers need firewood for cooking. How do you help sustainably?",
            image: "🔥🏘️",
            options: [
                { text: "Show them dead branches", impact: +15, explanation: "Good! Dead wood is perfect fuel." },
                { text: "Teach sustainable harvesting", impact: +25, explanation: "Perfect! Education ensures conservation." },
                { text: "Let them cut any trees", impact: -20, explanation: "Unsustainable! Live trees are vital." },
                { text: "Forbid all wood collection", impact: -5, explanation: "Too strict. Communities need fuel." }
            ]
        },
        {
            title: "Wildlife Poachers Detected",
            description: "You find snares set for endangered animals. What's your response?",
            image: "🦌🚫",
            options: [
                { text: "Remove snares quietly", impact: +10, explanation: "Helpful but doesn't address the source." },
                { text: "Report and educate community", impact: +25, explanation: "Best approach! Addresses root causes." },
                { text: "Confront poachers directly", impact: -15, explanation: "Dangerous! Could escalate conflict." },
                { text: "Ignore the problem", impact: -30, explanation: "Wildlife continues to suffer." }
            ]
        },
        {
            title: "River Pollution Crisis",
            description: "A nearby factory is dumping waste into the river. How do you respond?",
            image: "🏭💧",
            options: [
                { text: "Document and report officially", impact: +20, explanation: "Proper documentation helps legal action." },
                { text: "Organize community cleanup", impact: +15, explanation: "Good immediate action!" },
                { text: "Confront factory owners", impact: -10, explanation: "Could be dangerous without proper support." },
                { text: "Wait for someone else to act", impact: -25, explanation: "Pollution continues to spread." }
            ]
        },
        {
            title: "Drought Threatens Forest",
            description: "A severe drought is stressing the forest ecosystem. What do you prioritize?",
            image: "🌳☀️",
            options: [
                { text: "Set up water collection points", impact: +20, explanation: "Smart! Helps wildlife and plants survive." },
                { text: "Create fire prevention barriers", impact: +25, explanation: "Excellent! Prevents catastrophic fires." },
                { text: "Do nothing, it's natural", impact: -15, explanation: "Some intervention can help ecosystems." },
                { text: "Cut trees to reduce competition", impact: -20, explanation: "Reduces forest resilience!" }
            ]
        },
        {
            title: "Invasive Species Spreading",
            description: "Non-native plants are taking over native habitat. Your action?",
            image: "🌿⚠️",
            options: [
                { text: "Remove invasives manually", impact: +15, explanation: "Good start! Manual removal is effective." },
                { text: "Educate community about identification", impact: +25, explanation: "Perfect! Community involvement is key." },
                { text: "Use chemical herbicides", impact: -10, explanation: "Chemicals can harm native species too." },
                { text: "Let nature sort it out", impact: -20, explanation: "Invasives often outcompete natives." }
            ]
        },
        {
            title: "Tourist Littering Problem",
            description: "Eco-tourists are leaving trash in pristine areas. How do you handle this?",
            image: "🗑️🌲",
            options: [
                { text: "Set up waste stations", impact: +15, explanation: "Good infrastructure solution!" },
                { text: "Educate tourists about impact", impact: +25, explanation: "Education creates lasting change!" },
                { text: "Ban all tourism", impact: -10, explanation: "Too extreme. Tourism can fund conservation." },
                { text: "Ignore the problem", impact: -25, explanation: "Pollution accumulates and harms wildlife." }
            ]
        },
        {
            title: "Forest Fire Emergency",
            description: "A wildfire is approaching the protected area. What's your priority?",
            image: "🔥🌲",
            options: [
                { text: "Evacuate wildlife to safety", impact: +10, explanation: "Saves lives but fire still spreads." },
                { text: "Create firebreaks strategically", impact: +25, explanation: "Best strategy! Stops fire spread." },
                { text: "Fight fire directly", impact: -15, explanation: "Dangerous without proper equipment!" },
                { text: "Flee the area", impact: -20, explanation: "Abandoning responsibility." }
            ]
        },
        {
            title: "Mining Company Proposal",
            description: "A mining company wants to extract minerals from the forest. Your response?",
            image: "⛏️🌳",
            options: [
                { text: "Organize community opposition", impact: +25, explanation: "Community unity is powerful!" },
                { text: "Negotiate environmental conditions", impact: +10, explanation: "Compromise but still risky." },
                { text: "Accept for economic benefits", impact: -25, explanation: "Short-term gain, long-term environmental loss." },
                { text: "Ignore the proposal", impact: -15, explanation: "Inaction allows harmful development." }
            ]
        }
    ]

    const handleChoice = (choiceIndex) => {
        const choice = scenarios[currentScenario].options[choiceIndex]
        const newForestHealth = Math.max(0, Math.min(100, forestHealth + choice.impact))
        setForestHealth(newForestHealth)

        if (choice.impact > 0) {
            setScore(score + Math.abs(choice.impact))
        }

        setTimeout(() => {
            alert(`${choice.explanation}\nForest Health: ${choice.impact > 0 ? '+' : ''}${choice.impact}`)

            if (currentScenario + 1 < scenarios.length) {
                setCurrentScenario(currentScenario + 1)
            } else {
                setShowResult(true)
            }
        }, 500)
    }

    const handleGameEnd = () => {
        const creditsEarned = Math.floor(score / 5) + (forestHealth > 80 ? 10 : 5)
        onGameEnd(creditsEarned, score, scenarios.length)
    }

    if (showResult) {
        return ( <
            div className = "min-h-screen bg-gray-50 flex items-center justify-center" >
            <
            div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
            <
            div className = "text-6xl mb-4" > { forestHealth > 80 ? '🌳✨' : forestHealth > 60 ? '🌲' : '🌿' } <
            /div> <
            h2 className = "text-2xl font-bold text-gray-900 mb-4" > Mission Complete! < /h2> <
            p className = "text-lg" > Forest Health: < span className = "font-bold text-green-600" > { forestHealth } % < /span></p >
            <
            p className = "text-lg" > Score: < span className = "font-bold text-blue-600" > { score } < /span></p >
            <
            p className = "text-sm text-gray-500 mb-6" > Credits earned: { Math.floor(score / 5) + (forestHealth > 80 ? 10 : 5) } < /p> <
            button onClick = { handleGameEnd }
            className = "btn-primary w-full" > Continue < /button> < /
            div > <
            /div>
        )
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-green-100 to-green-50" >
        <
        Header / >
        <
        div className = "container-max py-8" >
        <
        div className = "max-w-2xl mx-auto" >
        <
        div className = "bg-white rounded-lg p-6 mb-6 shadow-sm" >
        <
        h1 className = "text-2xl font-bold text-gray-900 flex items-center mb-4" >
        <
        TreePine className = "w-6 h-6 mr-2 text-green-600" / >
        Forest Guardian - Scenario { currentScenario + 1 } <
        /h1> <
        div className = "mb-4" >
        <
        span className = "text-sm font-medium text-gray-700" > Forest Health: { forestHealth } % < /span> <
        div className = "w-full bg-gray-200 rounded-full h-3 mt-1" >
        <
        div className = "bg-green-500 h-3 rounded-full transition-all duration-500"
        style = {
            { width: `${forestHealth}%` }
        } >
        <
        /div> < /
        div > <
        /div> < /
        div >

        <
        div className = "bg-white rounded-lg p-6 shadow-sm" >
        <
        div className = "text-center mb-6" >
        <
        div className = "text-6xl mb-4" > { scenarios[currentScenario].image } < /div> <
        h2 className = "text-xl font-bold text-gray-900 mb-3" > { scenarios[currentScenario].title } < /h2> <
        p className = "text-gray-600" > { scenarios[currentScenario].description } < /p> < /
        div >

        <
        div className = "space-y-3" > {
            scenarios[currentScenario].options.map((option, index) => ( <
                button key = { index }
                onClick = {
                    () => handleChoice(index)
                }
                className = "w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors" >
                <
                span className = "font-medium" > { String.fromCharCode(65 + index) }. < /span> {option.text} < /
                button >
            ))
        } <
        /div> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}

function SeasonalCalendarGame({ onGameEnd }) {
    const [currentRound, setCurrentRound] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedSeason, setSelectedSeason] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const challenges = [{
            activity: "Planting Cassava",
            description: "When is the best time to plant cassava in the Congo Basin?",
            image: "🌱",
            seasons: ["Dry Season Start", "Peak Rainy Season", "End of Rainy Season", "Mid Dry Season"],
            correct: 2,
            explanation: "Cassava is planted at the end of the rainy season when soil moisture is optimal."
        },
        {
            activity: "Honey Harvesting",
            description: "Traditional honey harvesting follows which seasonal pattern?",
            image: "🍯",
            seasons: ["Beginning of Rains", "Peak Dry Season", "End of Dry Season", "Any Time"],
            correct: 1,
            explanation: "Honey is harvested during peak dry season when bees have stored maximum honey."
        }
    ]

    const handleSeasonSelect = (seasonIndex) => {
        setSelectedSeason(seasonIndex)
    }

    const handleSubmit = () => {
        if (selectedSeason === challenges[currentRound].correct) {
            setScore(score + 1)
        }

        setTimeout(() => {
            alert(challenges[currentRound].explanation)

            if (currentRound + 1 < challenges.length) {
                setCurrentRound(currentRound + 1)
                setSelectedSeason(null)
            } else {
                setShowResult(true)
            }
        }, 500)
    }

    const handleGameEnd = () => {
        const creditsEarned = score * 3
        onGameEnd(creditsEarned, score, challenges.length)
    }

    if (showResult) {
        return ( <
            div className = "min-h-screen bg-gray-50 flex items-center justify-center" >
            <
            div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
            <
            Sun className = "w-16 h-16 text-yellow-500 mx-auto mb-4" / >
            <
            h2 className = "text-2xl font-bold text-gray-900 mb-4" > Calendar Master! < /h2> <
            p className = "text-lg text-gray-600 mb-4" > You scored { score }
            out of { challenges.length } < /p> <
            p className = "text-sm text-gray-500 mb-6" > Credits earned: { score * 3 } < /p> <
            button onClick = { handleGameEnd }
            className = "btn-primary w-full" > Continue < /button> < /
            div > <
            /div>
        )
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-yellow-100 to-orange-50" >
        <
        Header / >
        <
        div className = "container-max py-8" >
        <
        div className = "max-w-2xl mx-auto" >
        <
        div className = "bg-white rounded-lg p-6 mb-6 shadow-sm" >
        <
        h1 className = "text-2xl font-bold text-gray-900 flex items-center" >
        <
        Sun className = "w-6 h-6 mr-2 text-yellow-600" / >
        Traditional Calendar Master - Round { currentRound + 1 } <
        /h1> < /
        div >

        <
        div className = "bg-white rounded-lg p-6 shadow-sm" >
        <
        div className = "text-center mb-6" >
        <
        div className = "text-6xl mb-4" > { challenges[currentRound].image } < /div> <
        h2 className = "text-xl font-bold text-gray-900 mb-3" > { challenges[currentRound].activity } < /h2> <
        p className = "text-gray-600" > { challenges[currentRound].description } < /p> < /
        div >

        <
        div className = "space-y-3 mb-6" > {
            challenges[currentRound].seasons.map((season, index) => ( <
                button key = { index }
                onClick = {
                    () => handleSeasonSelect(index)
                }
                className = { `w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedSeason === index
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }` } >
                <
                span className = "font-medium" > { String.fromCharCode(65 + index) }. < /span> {season} < /
                button >
            ))
        } <
        /div>

        <
        button onClick = { handleSubmit }
        disabled = { selectedSeason === null }
        className = "btn-primary w-full disabled:opacity-50" > { currentRound + 1 === challenges.length ? 'Finish Game' : 'Next Challenge' } <
        /button> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}

function SpeciesSpotterGame({ onGameEnd }) {
    const [currentSpecies, setCurrentSpecies] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedUse, setSelectedUse] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const species = [{
            name: "African Oil Palm",
            image: "🌴",
            description: "A tall palm tree with large fronds, native to the Congo Basin",
            uses: ["Building material only", "Palm wine and oil production", "Decoration only", "No traditional use"],
            correct: 1,
            explanation: "African Oil Palm provides palm wine, palm oil for cooking, and leaves for roofing."
        },
        {
            name: "Congo Peacock",
            image: "🦚",
            description: "A rare, colorful bird found only in the Congo Basin rainforests",
            uses: ["Feathers for ceremonies", "Food source only", "Pet keeping", "No cultural significance"],
            correct: 0,
            explanation: "Congo Peacock feathers are highly valued for traditional ceremonies and decorations."
        }
    ]

    const handleUseSelect = (useIndex) => {
        setSelectedUse(useIndex)
    }

    const handleSubmit = () => {
        if (selectedUse === species[currentSpecies].correct) {
            setScore(score + 1)
        }

        setTimeout(() => {
            alert(species[currentSpecies].explanation)

            if (currentSpecies + 1 < species.length) {
                setCurrentSpecies(currentSpecies + 1)
                setSelectedUse(null)
            } else {
                setShowResult(true)
            }
        }, 500)
    }

    const handleGameEnd = () => {
        const creditsEarned = score * 4
        onGameEnd(creditsEarned, score, species.length)
    }

    if (showResult) {
        return ( <
            div className = "min-h-screen bg-gray-50 flex items-center justify-center" >
            <
            div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
            <
            Fish className = "w-16 h-16 text-purple-500 mx-auto mb-4" / >
            <
            h2 className = "text-2xl font-bold text-gray-900 mb-4" > Species Expert! < /h2> <
            p className = "text-lg text-gray-600 mb-4" > You identified { score }
            out of { species.length }
            correctly < /p> <
            p className = "text-sm text-gray-500 mb-6" > Credits earned: { score * 4 } < /p> <
            button onClick = { handleGameEnd }
            className = "btn-primary w-full" > Continue < /button> < /
            div > <
            /div>
        )
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-purple-100 to-blue-50" >
        <
        Header / >
        <
        div className = "container-max py-8" >
        <
        div className = "max-w-2xl mx-auto" >
        <
        div className = "bg-white rounded-lg p-6 mb-6 shadow-sm" >
        <
        h1 className = "text-2xl font-bold text-gray-900 flex items-center" >
        <
        Fish className = "w-6 h-6 mr-2 text-purple-600" / >
        Congo Species Spotter - Species { currentSpecies + 1 } <
        /h1> < /
        div >

        <
        div className = "bg-white rounded-lg p-6 shadow-sm" >
        <
        div className = "text-center mb-6" >
        <
        div className = "text-8xl mb-4" > { species[currentSpecies].image } < /div> <
        h2 className = "text-xl font-bold text-gray-900 mb-3" > { species[currentSpecies].name } < /h2> <
        p className = "text-gray-600 mb-4" > { species[currentSpecies].description } < /p> <
        p className = "text-lg font-semibold text-purple-700" > What is the traditional use of this species ? < /p> < /
        div >

        <
        div className = "space-y-3 mb-6" > {
            species[currentSpecies].uses.map((use, index) => ( <
                button key = { index }
                onClick = {
                    () => handleUseSelect(index)
                }
                className = { `w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedUse === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }` } >
                <
                span className = "font-medium" > { String.fromCharCode(65 + index) }. < /span> {use} < /
                button >
            ))
        } <
        /div>

        <
        button onClick = { handleSubmit }
        disabled = { selectedUse === null }
        className = "btn-primary w-full disabled:opacity-50" > { currentSpecies + 1 === species.length ? 'Finish Game' : 'Next Species' } <
        /button> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}

// Tree Planting Game with Animation
function TreePlantingGame({ onGameEnd }) {
    const [treesPlanted, setTreesPlanted] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [animatingTree, setAnimatingTree] = useState(false)

    const questions = [{
            question: "What is the traditional spacing between trees when planting in the Congo Basin?",
            options: ["10 meters apart", "3-5 meters apart", "1 meter apart", "No spacing needed"],
            correct: 1,
            explanation: "Traditional spacing of 3-5 meters allows trees to grow properly without competing for resources."
        },
        {
            question: "Which season is best for planting trees in the Congo Basin?",
            options: ["Peak dry season", "Beginning of rainy season", "Dry season", "Any time"],
            correct: 1,
            explanation: "Planting at the beginning of rainy season ensures young trees get enough water to establish roots."
        },
        {
            question: "What traditional method helps protect young trees from animals?",
            options: ["Chemical repellents", "Electric fences", "Natural thorn barriers", "Concrete walls"],
            correct: 2,
            explanation: "Traditional communities use natural thorn barriers from local plants to protect young trees."
        },
        {
            question: "Which trees are traditionally planted together for forest diversity?",
            options: ["Only fruit trees", "Mix of native species", "Only fast-growing trees", "Only hardwood trees"],
            correct: 1,
            explanation: "Mixing native species creates a balanced ecosystem and improves forest health."
        },
        {
            question: "How do traditional communities prepare soil for tree planting?",
            options: ["Use chemical fertilizers", "Add compost and organic matter", "Leave soil as is", "Use only sand"],
            correct: 1,
            explanation: "Traditional methods use compost and organic matter to enrich soil naturally."
        },
        {
            question: "What traditional method protects seedlings from strong winds?",
            options: ["Concrete barriers", "Planting windbreak trees", "Chemical treatments", "Metal fences"],
            correct: 1,
            explanation: "Traditional windbreaks use fast-growing trees to protect young seedlings from damaging winds."
        },
        {
            question: "How do traditional planters choose which tree species to plant?",
            options: ["Random selection", "Based on soil and climate", "Only exotic species", "Fastest growing only"],
            correct: 1,
            explanation: "Traditional knowledge matches tree species to specific soil types and local climate conditions."
        },
        {
            question: "What traditional practice helps trees establish strong roots?",
            options: ["Frequent shallow watering", "Deep, infrequent watering", "No watering", "Chemical root stimulants"],
            correct: 1,
            explanation: "Deep, infrequent watering encourages roots to grow deep, making trees more drought-resistant."
        },
        {
            question: "How do traditional communities mark planted areas?",
            options: ["Plastic markers", "Natural stone cairns", "Paint on trees", "Metal tags"],
            correct: 1,
            explanation: "Traditional markers use natural materials like stone cairns that don't harm the environment."
        },
        {
            question: "What traditional method prevents animals from eating seedlings?",
            options: ["Electric fences", "Thorny branch barriers", "Chemical repellents", "Concrete walls"],
            correct: 1,
            explanation: "Traditional protection uses thorny branches from local plants to create natural barriers."
        },
        {
            question: "How do traditional planters know when seedlings are ready to transplant?",
            options: ["Calendar dates", "Root and leaf development", "Random timing", "When convenient"],
            correct: 1,
            explanation: "Traditional knowledge looks for specific root development and leaf patterns to determine readiness."
        },
        {
            question: "What traditional practice helps newly planted trees survive drought?",
            options: ["Constant irrigation", "Mulching with organic matter", "Removing all other plants", "Chemical treatments"],
            correct: 1,
            explanation: "Traditional mulching retains soil moisture and provides nutrients as organic matter decomposes."
        },
        {
            question: "How do traditional communities ensure genetic diversity in plantings?",
            options: ["Use only one variety", "Collect seeds from multiple sources", "Buy commercial seeds", "Clone the best trees"],
            correct: 1,
            explanation: "Traditional practice collects seeds from various healthy trees to maintain genetic diversity."
        },
        {
            question: "What traditional sign indicates the best time for tree planting?",
            options: ["Calendar date", "First rains after dry season", "Full moon only", "When convenient"],
            correct: 1,
            explanation: "Traditional timing uses the first reliable rains to ensure seedlings get adequate water."
        }
    ]

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex)
    }

    const handlePlantTree = () => {
        if (selectedAnswer === questions[currentQuestion].correct) {
            setScore(score + 1)
            setAnimatingTree(true)

            setTimeout(() => {
                setTreesPlanted(treesPlanted + 1)
                setAnimatingTree(false)
            }, 1000)
        }

        setTimeout(() => {
            alert(questions[currentQuestion].explanation)

            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer(null)
            } else {
                setShowResult(true)
            }
        }, selectedAnswer === questions[currentQuestion].correct ? 1500 : 500)
    }

    const handleGameEnd = () => {
        const creditsEarned = score * 3 + treesPlanted * 2
        onGameEnd(creditsEarned, score, questions.length)
    }

    if (showResult) {
        return ( <
            div className = "min-h-screen bg-gray-50 flex items-center justify-center" >
            <
            div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
            <
            div className = "text-6xl mb-4" > 🌳🌲🌴 < /div> <
            h2 className = "text-2xl font-bold text-gray-900 mb-4" > Forest Created! < /h2> <
            p className = "text-lg text-gray-600 mb-2" > Trees Planted: < span className = "font-bold text-green-600" > { treesPlanted } < /span></p >
            <
            p className = "text-lg text-gray-600 mb-4" > Correct Answers: < span className = "font-bold text-blue-600" > { score }
            /{questions.length}</span > < /p> <
            p className = "text-sm text-gray-500 mb-6" > Credits earned: { score * 3 + treesPlanted * 2 } < /p> <
            button onClick = { handleGameEnd }
            className = "btn-primary w-full" > Continue < /button> < /
            div > <
            /div>
        )
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-green-100 to-green-50" >
        <
        Header / >
        <
        div className = "container-max py-8" >
        <
        div className = "max-w-2xl mx-auto" >
        <
        div className = "bg-white rounded-lg p-6 mb-6 shadow-sm" >
        <
        h1 className = "text-2xl font-bold text-gray-900 flex items-center mb-4" >
        <
        TreePine className = "w-6 h-6 mr-2 text-green-600" / >
        Tree Planting Master - Question { currentQuestion + 1 } <
        /h1> <
        div className = "mb-4" >
        <
        span className = "text-sm font-medium text-gray-700" > Trees Planted: { treesPlanted } < /span> <
        div className = "flex space-x-1 mt-2" > {
            Array.from({ length: Math.max(5, treesPlanted) }, (_, i) => ( <
                div key = { i }
                className = "text-2xl" > { i < treesPlanted ? '🌳' : '🌱' } <
                /div>
            ))
        } <
        /div> < /
        div > <
        /div>

        <
        div className = "bg-white rounded-lg p-6 shadow-sm" >
        <
        div className = "text-center mb-6" >
        <
        div className = { `text-6xl mb-4 transition-all duration-1000 ${animatingTree ? 'scale-150 animate-bounce' : ''}` } > { animatingTree ? '🌱➡️🌳' : '🌱' } <
        /div> <
        h2 className = "text-xl font-bold text-gray-900 mb-3" > { questions[currentQuestion].question } < /h2> < /
        div >

        <
        div className = "space-y-3 mb-6" > {
            questions[currentQuestion].options.map((option, index) => ( <
                button key = { index }
                onClick = {
                    () => handleAnswerSelect(index)
                }
                className = { `w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswer === index
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }` } >
                <
                span className = "font-medium" > { String.fromCharCode(65 + index) }. < /span> {option} < /
                button >
            ))
        } <
        /div>

        <
        button onClick = { handlePlantTree }
        disabled = { selectedAnswer === null || animatingTree }
        className = "btn-primary w-full disabled:opacity-50" > { animatingTree ? 'Planting Tree...' : 'Plant Tree' } <
        /button> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}

// Traditional Fishing Game with Animation
function TraditionalFishingGame({ onGameEnd }) {
    const [fishCaught, setFishCaught] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [animatingFish, setAnimatingFish] = useState(false)
    const [riverHealth, setRiverHealth] = useState(100)

    const questions = [{
            question: "What is the traditional fishing season in the Congo Basin?",
            options: ["All year round", "Dry season only", "Rainy season only", "Specific months based on fish migration"],
            correct: 3,
            explanation: "Traditional fishing follows fish migration patterns and breeding seasons to ensure sustainability."
        },
        {
            question: "Which traditional fishing method is most sustainable?",
            options: ["Large nets that catch everything", "Selective traps and lines", "Dynamite fishing", "Poisoning water"],
            correct: 1,
            explanation: "Selective traps and lines allow young fish to escape and maintain fish populations."
        },
        {
            question: "How do traditional communities protect fish breeding areas?",
            options: ["Fish anywhere", "Avoid shallow spawning areas", "Use chemicals", "Fish more during breeding"],
            correct: 1,
            explanation: "Traditional communities avoid fishing in shallow spawning areas during breeding season."
        },
        {
            question: "What traditional bait is used in Congo Basin fishing?",
            options: ["Artificial lures only", "Local insects and worms", "Imported bait", "No bait needed"],
            correct: 1,
            explanation: "Traditional fishing uses local insects, worms, and plant materials as natural bait."
        },
        {
            question: "How do traditional fishers preserve their catch?",
            options: ["Refrigeration", "Smoking and drying", "Chemical preservatives", "Eating immediately only"],
            correct: 1,
            explanation: "Traditional smoking and drying methods preserve fish without modern technology."
        }
    ]

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex)
    }

    const handleCastNet = () => {
        if (selectedAnswer === questions[currentQuestion].correct) {
            setScore(score + 1)
            setAnimatingFish(true)

            setTimeout(() => {
                setFishCaught(fishCaught + 1)
                setRiverHealth(Math.min(100, riverHealth + 5)) // Sustainable fishing improves river health
                setAnimatingFish(false)
            }, 1500)
        } else {
            setRiverHealth(Math.max(0, riverHealth - 10)) // Wrong methods harm river health
        }

        setTimeout(() => {
            alert(questions[currentQuestion].explanation)

            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer(null)
            } else {
                setShowResult(true)
            }
        }, selectedAnswer === questions[currentQuestion].correct ? 2000 : 500)
    }

    const handleGameEnd = () => {
        const creditsEarned = score * 4 + fishCaught * 3 + (riverHealth > 80 ? 10 : 0)
        onGameEnd(creditsEarned, score, questions.length)
    }

    if (showResult) {
        return ( <
            div className = "min-h-screen bg-gray-50 flex items-center justify-center" >
            <
            div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
            <
            div className = "text-6xl mb-4" > 🎣🐟🌊 < /div> <
            h2 className = "text-2xl font-bold text-gray-900 mb-4" > Fishing Complete! < /h2> <
            p className = "text-lg text-gray-600 mb-2" > Fish Caught: < span className = "font-bold text-blue-600" > { fishCaught } < /span></p >
            <
            p className = "text-lg text-gray-600 mb-2" > River Health: < span className = "font-bold text-green-600" > { riverHealth } % < /span></p >
            <
            p className = "text-lg text-gray-600 mb-4" > Correct Answers: < span className = "font-bold text-purple-600" > { score }
            /{questions.length}</span > < /p> <
            p className = "text-sm text-gray-500 mb-6" > Credits earned: { score * 4 + fishCaught * 3 + (riverHealth > 80 ? 10 : 0) } < /p> <
            button onClick = { handleGameEnd }
            className = "btn-primary w-full" > Continue < /button> < /
            div > <
            /div>
        )
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-blue-100 to-blue-50" >
        <
        Header / >
        <
        div className = "container-max py-8" >
        <
        div className = "max-w-2xl mx-auto" >
        <
        div className = "bg-white rounded-lg p-6 mb-6 shadow-sm" >
        <
        h1 className = "text-2xl font-bold text-gray-900 flex items-center mb-4" >
        <
        Fish className = "w-6 h-6 mr-2 text-blue-600" / >
        Traditional Fishing - Question { currentQuestion + 1 } <
        /h1> <
        div className = "grid grid-cols-2 gap-4 mb-4" >
        <
        div >
        <
        span className = "text-sm font-medium text-gray-700" > Fish Caught: { fishCaught } < /span> <
        div className = "flex space-x-1 mt-1" > {
            Array.from({ length: Math.max(3, fishCaught) }, (_, i) => ( <
                div key = { i }
                className = "text-xl" > { i < fishCaught ? '🐟' : '🌊' } <
                /div>
            ))
        } <
        /div> < /
        div > <
        div >
        <
        span className = "text-sm font-medium text-gray-700" > River Health: { riverHealth } % < /span> <
        div className = "w-full bg-gray-200 rounded-full h-3 mt-1" >
        <
        div className = "bg-blue-500 h-3 rounded-full transition-all duration-500"
        style = {
            { width: `${riverHealth}%` }
        } >
        <
        /div> < /
        div > <
        /div> < /
        div > <
        /div>

        <
        div className = "bg-white rounded-lg p-6 shadow-sm" >
        <
        div className = "text-center mb-6" >
        <
        div className = { `text-6xl mb-4 transition-all duration-1500 ${animatingFish ? 'scale-125 animate-pulse' : ''}` } > { animatingFish ? '🎣💫🐟' : '🎣' } <
        /div> <
        h2 className = "text-xl font-bold text-gray-900 mb-3" > { questions[currentQuestion].question } < /h2> < /
        div >

        <
        div className = "space-y-3 mb-6" > {
            questions[currentQuestion].options.map((option, index) => ( <
                button key = { index }
                onClick = {
                    () => handleAnswerSelect(index)
                }
                className = { `w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }` } >
                <
                span className = "font-medium" > { String.fromCharCode(65 + index) }. < /span> {option} < /
                button >
            ))
        } <
        /div>

        <
        button onClick = { handleCastNet }
        disabled = { selectedAnswer === null || animatingFish }
        className = "btn-primary w-full disabled:opacity-50" > { animatingFish ? 'Casting Net...' : 'Cast Net' } <
        /button> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}

// Forest Adventure Mini-Games Component
function ForestAdventureGame({ onGameEnd }) {
    const [currentMiniGame, setCurrentMiniGame] = useState(null)
    const [totalCredits, setTotalCredits] = useState(0)
    const [gamesCompleted, setGamesCompleted] = useState(0)

    const miniGames = [{
            id: 'quick-plant',
            title: 'Quick Tree Planting',
            description: 'Plant as many trees as you can in 60 seconds!',
            icon: '🌱',
            color: 'bg-green-500'
        },
        {
            id: 'fish-catch',
            title: 'Sustainable Fishing',
            description: 'Catch fish while maintaining river health!',
            icon: '🎣',
            color: 'bg-blue-500'
        },
        {
            id: 'forest-protect',
            title: 'Forest Protection',
            description: 'Stop threats to the forest ecosystem!',
            icon: '🛡️',
            color: 'bg-emerald-500'
        }
    ]

    const startMiniGame = (gameId) => {
        setCurrentMiniGame(gameId)
    }

    const endMiniGame = (creditsEarned) => {
        setTotalCredits(totalCredits + creditsEarned)
        setGamesCompleted(gamesCompleted + 1)
        setCurrentMiniGame(null)

        if (gamesCompleted + 1 >= 3) {
            // All mini-games completed
            setTimeout(() => {
                onGameEnd(totalCredits + 10, gamesCompleted + 1, 3) // Bonus 10 credits for completing all
            }, 1000)
        }
    }

    const handleFinishEarly = () => {
        onGameEnd(totalCredits, gamesCompleted, 3)
    }

    if (currentMiniGame) {
        return <MiniGameComponent gameId = { currentMiniGame }
        onGameEnd = { endMiniGame }
        />
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100" >
        <
        Header / >
        <
        div className = "container-max py-8" >
        <
        div className = "max-w-4xl mx-auto" >
        <
        div className = "bg-white rounded-lg p-6 mb-6 shadow-sm text-center" >
        <
        h1 className = "text-3xl font-bold text-gray-900 mb-4" > 🎮Forest Adventure Mini - Games <
        /h1> <
        p className = "text-lg text-gray-600 mb-4" >
        Experience the Congo Basin through interactive animations!
        <
        /p> <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" >
        <
        div className = "text-center" >
        <
        div className = "text-2xl font-bold text-green-600" > { totalCredits } < /div> <
        div className = "text-sm text-gray-600" > Credits Earned < /div> < /
        div > <
        div className = "text-center" >
        <
        div className = "text-2xl font-bold text-blue-600" > { gamesCompleted } < /div> <
        div className = "text-sm text-gray-600" > Games Completed < /div> < /
        div > <
        div className = "text-center" >
        <
        div className = "text-2xl font-bold text-purple-600" > { 3 - gamesCompleted } < /div> <
        div className = "text-sm text-gray-600" > Games Remaining < /div> < /
        div > <
        /div> < /
        div >

        <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" > {
            miniGames.map((game) => ( <
                div key = { game.id }
                className = "bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow" >
                <
                div className = { `${game.color} p-6 text-white text-center` } >
                <
                div className = "text-4xl mb-3" > { game.icon } < /div> <
                h3 className = "text-xl font-bold mb-2" > { game.title } < /h3> <
                p className = "text-sm opacity-90" > { game.description } < /p> < /
                div > <
                div className = "p-4" >
                <
                button onClick = {
                    () => startMiniGame(game.id)
                }
                className = "w-full btn-primary" >
                Play Now <
                /button> < /
                div > <
                /div>
            ))
        } <
        /div>

        <
        div className = "text-center" >
        <
        button onClick = { handleFinishEarly }
        className = "btn-secondary" >
        Finish Adventure({ totalCredits }
            credits earned) <
        /button> < /
        div > <
        /div> < /
        div > <
        /div>
    )
}

// Mini-Game Component Handler
function MiniGameComponent({ gameId, onGameEnd }) {
    switch (gameId) {
        case 'quick-plant':
            return <QuickPlantGame onGameEnd = { onGameEnd }
            />
        case 'fish-catch':
            return <FishCatchGame onGameEnd = { onGameEnd }
            />
        case 'forest-protect':
            return <ForestProtectGame onGameEnd = { onGameEnd }
            />
        default:
            return <QuickPlantGame onGameEnd = { onGameEnd }
            />
    }
}

// Quick Tree Planting Mini-Game
function QuickPlantGame({ onGameEnd }) {
    const [treesPlanted, setTreesPlanted] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [gameActive, setGameActive] = useState(true)
    const [plantingAnimation, setPlantingAnimation] = useState(false)

    useEffect(() => {
        if (timeLeft > 0 && gameActive) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0) {
            setGameActive(false)
            setTimeout(() => {
                // Minimum 5 credits, bonus for performance
                const baseCredits = Math.max(5, treesPlanted * 2)
                const bonus = treesPlanted > 20 ? 10 : treesPlanted > 15 ? 5 : 0
                onGameEnd(baseCredits + bonus)
            }, 2000)
        }
    }, [timeLeft, gameActive, treesPlanted, onGameEnd])

    const plantTree = () => {
        if (gameActive && !plantingAnimation) {
            setPlantingAnimation(true)
                // Don't stop the timer - animation runs parallel to game timer
            setTreesPlanted(prev => prev + 1)
            setTimeout(() => {
                    setPlantingAnimation(false)
                }, 300) // Shorter animation so timer doesn't feel stuck
        }
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-green-200 to-green-100 flex items-center justify-center" >
        <
        div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
        <
        h2 className = "text-2xl font-bold text-gray-900 mb-4" > 🌱Quick Tree Planting < /h2>

        <
        div className = "mb-6" >
        <
        div className = "text-4xl font-bold text-green-600 mb-2" > { timeLeft }
        s < /div> <
        div className = "text-lg text-gray-600 mb-4" > Trees Planted: { treesPlanted } < /div>

        <
        div className = "grid grid-cols-5 gap-2 mb-4" > {
            Array.from({ length: Math.min(25, treesPlanted + 5) }, (_, i) => ( <
                div key = { i }
                className = "text-2xl" > { i < treesPlanted ? '🌳' : '🌱' } <
                /div>
            ))
        } <
        /div> < /
        div >

        {
            gameActive ? ( <
                button onClick = { plantTree }
                disabled = { plantingAnimation }
                className = { `w-full py-4 px-6 rounded-lg font-bold text-white transition-all ${
              plantingAnimation
                ? 'bg-green-400 scale-110'
                : 'bg-green-600 hover:bg-green-700 active:scale-95'
            }` } > { plantingAnimation ? '🌱 Planting...' : '🌱 Plant Tree!' } <
                /button>
            ) : ( <
                div >
                <
                div className = "text-6xl mb-4" > 🌳🌲🌴 < /div> <
                h3 className = "text-xl font-bold text-gray-900 mb-2" > Forest Created! < /h3> <
                p className = "text-gray-600 mb-4" > You planted { treesPlanted }
                trees! < /p> <
                p className = "text-sm text-gray-500" > Credits earned: { treesPlanted * 2 } < /p> < /
                div >
            )
        } <
        /div> < /
        div >
    )
}

// Fish Catch Mini-Game
function FishCatchGame({ onGameEnd }) {
    const [fishCaught, setFishCaught] = useState(0)
    const [riverHealth, setRiverHealth] = useState(100)
    const [timeLeft, setTimeLeft] = useState(45)
    const [gameActive, setGameActive] = useState(true)
    const [fishingAnimation, setFishingAnimation] = useState(false)
    const [failedAttempts, setFailedAttempts] = useState(0)

    useEffect(() => {
        if (timeLeft > 0 && gameActive) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0) {
            setGameActive(false)
            setTimeout(() => {
                // Calculate credits: base + bonus - penalties
                const baseCredits = Math.max(3, fishCaught * 3) // Minimum 3 credits
                const healthBonus = riverHealth > 80 ? 10 : riverHealth > 60 ? 5 : 0
                const failurePenalty = failedAttempts * 1 // -1 credit per failed attempt
                const finalCredits = Math.max(1, baseCredits + healthBonus - failurePenalty)
                onGameEnd(finalCredits)
            }, 2000)
        }
    }, [timeLeft, gameActive, fishCaught, riverHealth, failedAttempts, onGameEnd])

    const catchFish = () => {
        if (gameActive && !fishingAnimation) {
            setFishingAnimation(true)

            // Dynamic success rate based on river health and skill
            const baseSuccessRate = Math.max(0.3, riverHealth / 100) // At least 30% chance
            const skillBonus = fishCaught * 0.05 // Get better with practice
            const successRate = Math.min(0.9, baseSuccessRate + skillBonus) // Max 90% success
            const success = Math.random() < successRate

            // Timer continues running during animation
            setTimeout(() => {
                    if (success) {
                        setFishCaught(prev => prev + 1)
                        setRiverHealth(prev => Math.max(0, prev - 3)) // Sustainable fishing
                    } else {
                        setFailedAttempts(prev => prev + 1)
                        setRiverHealth(prev => Math.max(0, prev - 8)) // Failed attempts hurt more
                    }
                    setFishingAnimation(false)
                }, 600) // Shorter animation
        }
    }

    const restoreRiver = () => {
        if (gameActive && riverHealth < 100) {
            setRiverHealth(prev => Math.min(100, prev + 20))
        }
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex items-center justify-center" >
        <
        div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
        <
        h2 className = "text-2xl font-bold text-gray-900 mb-4" > 🎣Sustainable Fishing < /h2>

        <
        div className = "mb-6" >
        <
        div className = "text-4xl font-bold text-blue-600 mb-2" > { timeLeft }
        s < /div> <
        div className = "text-lg text-gray-600 mb-2" > Fish Caught: { fishCaught } < /div>

        <
        div className = "mb-4" >
        <
        div className = "text-sm text-gray-600 mb-1" > River Health: { riverHealth } % < /div> <
        div className = "w-full bg-gray-200 rounded-full h-3" >
        <
        div className = "bg-blue-500 h-3 rounded-full transition-all duration-500"
        style = {
            { width: `${riverHealth}%` }
        } >
        <
        /div> < /
        div > <
        /div>

        <
        div className = "flex justify-center space-x-1 mb-4" > {
            Array.from({ length: Math.max(5, fishCaught) }, (_, i) => ( <
                div key = { i }
                className = "text-xl" > { i < fishCaught ? '🐟' : '🌊' } <
                /div>
            ))
        } <
        /div> < /
        div >

        {
            gameActive ? ( <
                div className = "space-y-3" >
                <
                button onClick = { catchFish }
                disabled = { fishingAnimation }
                className = { `w-full py-3 px-6 rounded-lg font-bold text-white transition-all ${
                fishingAnimation
                  ? 'bg-blue-400 scale-105'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }` } > { fishingAnimation ? '🎣 Casting...' : '🎣 Cast Net!' } <
                /button>

                <
                button onClick = { restoreRiver }
                className = "w-full py-2 px-4 rounded-lg font-medium text-green-700 bg-green-100 hover:bg-green-200" > 🌿Restore River(+15 % health) <
                /button> < /
                div >
            ) : ( <
                div >
                <
                div className = "text-6xl mb-4" > 🎣🐟🌊 < /div> <
                h3 className = "text-xl font-bold text-gray-900 mb-2" > Fishing Complete! < /h3> <
                p className = "text-gray-600 mb-2" > Fish Caught: { fishCaught } < /p> <
                p className = "text-gray-600 mb-4" > River Health: { riverHealth } % < /p> <
                p className = "text-sm text-gray-500" >
                Credits earned: { fishCaught * 3 + (riverHealth > 80 ? 10 : riverHealth > 60 ? 5 : 0) } <
                /p> < /
                div >
            )
        } <
        /div> < /
        div >
    )
}

// Forest Protection Mini-Game
function ForestProtectGame({ onGameEnd }) {
    const [threatsBlocked, setThreatsBlocked] = useState(0)
    const [forestHealth, setForestHealth] = useState(100)
    const [timeLeft, setTimeLeft] = useState(30)
    const [gameActive, setGameActive] = useState(true)
    const [currentThreat, setCurrentThreat] = useState(null)
    const [actionAnimation, setActionAnimation] = useState(false)

    const threats = [
        { id: 1, name: 'Illegal Logger', icon: '🪓', damage: 20 },
        { id: 2, name: 'Poacher', icon: '🎯', damage: 15 },
        { id: 3, name: 'Fire', icon: '🔥', damage: 25 },
        { id: 4, name: 'Pollution', icon: '🏭', damage: 18 }
    ]

    useEffect(() => {
        if (timeLeft > 0 && gameActive) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0) {
            setGameActive(false)
            setTimeout(() => {
                const bonus = forestHealth > 80 ? 15 : forestHealth > 60 ? 10 : 5
                onGameEnd(threatsBlocked * 4 + bonus) // 4 credits per threat + health bonus
            }, 2000)
        }
    }, [timeLeft, gameActive, threatsBlocked, forestHealth, onGameEnd])

    useEffect(() => {
        if (gameActive && !currentThreat) {
            const threatTimer = setTimeout(() => {
                    const randomThreat = threats[Math.floor(Math.random() * threats.length)]
                    setCurrentThreat(randomThreat)

                    // Auto-damage if not handled in time (shorter window for challenge)
                    setTimeout(() => {
                            if (currentThreat && currentThreat.id === randomThreat.id) {
                                setForestHealth(prev => Math.max(0, prev - randomThreat.damage))
                                setCurrentThreat(null)
                            }
                        }, 2500) // Reduced from 3000ms to 2500ms for more challenge
                }, Math.random() * 1500 + 800) // Faster threat spawning

            return () => clearTimeout(threatTimer)
        }
    }, [currentThreat, gameActive, threats])

    const handleThreat = () => {
        if (currentThreat && gameActive) {
            setActionAnimation(true)
            setTimeout(() => {
                setThreatsBlocked(threatsBlocked + 1)
                setForestHealth(prev => Math.min(100, prev + 5)) // Successful protection improves health
                setCurrentThreat(null)
                setActionAnimation(false)
            }, 800)
        }
    }

    return ( <
        div className = "min-h-screen bg-gradient-to-b from-emerald-200 to-emerald-100 flex items-center justify-center" >
        <
        div className = "bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg" >
        <
        h2 className = "text-2xl font-bold text-gray-900 mb-4" > 🛡️Forest Protection < /h2>

        <
        div className = "mb-6" >
        <
        div className = "text-4xl font-bold text-emerald-600 mb-2" > { timeLeft }
        s < /div> <
        div className = "text-lg text-gray-600 mb-2" > Threats Blocked: { threatsBlocked } < /div>

        <
        div className = "mb-4" >
        <
        div className = "text-sm text-gray-600 mb-1" > Forest Health: { forestHealth } % < /div> <
        div className = "w-full bg-gray-200 rounded-full h-3" >
        <
        div className = "bg-emerald-500 h-3 rounded-full transition-all duration-500"
        style = {
            { width: `${forestHealth}%` }
        } >
        <
        /div> < /
        div > <
        /div>

        <
        div className = "text-6xl mb-4" > { currentThreat ? currentThreat.icon : '🌲' } <
        /div>

        {
            currentThreat && ( <
                div className = "bg-red-100 border border-red-300 rounded-lg p-3 mb-4" >
                <
                div className = "text-red-700 font-bold" > ⚠️{ currentThreat.name }
                Detected! < /div> <
                div className = "text-red-600 text-sm" > Act quickly to protect the forest! < /div> < /
                div >
            )
        } <
        /div>

        {
            gameActive ? ( <
                button onClick = { handleThreat }
                disabled = {!currentThreat || actionAnimation }
                className = { `w-full py-4 px-6 rounded-lg font-bold text-white transition-all ${
              !currentThreat
                ? 'bg-gray-400 cursor-not-allowed'
                : actionAnimation
                  ? 'bg-emerald-400 scale-105'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
            }` } > {!currentThreat ?
                    '🌲 Forest is Safe' : actionAnimation ?
                        '🛡️ Protecting...' : '🛡️ Stop Threat!'
                } <
                /button>
            ) : ( <
                div >
                <
                div className = "text-6xl mb-4" > 🌲🛡️🌳 < /div> <
                h3 className = "text-xl font-bold text-gray-900 mb-2" > Forest Protected! < /h3> <
                p className = "text-gray-600 mb-2" > Threats Blocked: { threatsBlocked } < /p> <
                p className = "text-gray-600 mb-4" > Forest Health: { forestHealth } % < /p> <
                p className = "text-sm text-gray-500" >
                Credits earned: { threatsBlocked * 4 + (forestHealth > 80 ? 15 : forestHealth > 60 ? 10 : 5) } <
                /p> < /
                div >
            )
        } <
        /div> < /
        div >
    )
}