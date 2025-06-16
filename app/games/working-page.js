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
            id: 'forest-guardian',
            title: 'Forest Guardian Challenge',
            description: 'Protect the forest by making the right conservation decisions',
            icon: TreePine,
            difficulty: 'Medium',
            credits: 15,
            type: 'simulation',
            color: 'bg-green-500'
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
            icon: Fish,
            difficulty: 'Hard',
            credits: 20,
            type: 'identification',
            color: 'bg-purple-500'
        }
    ]

    useEffect(() => {
        if (user) {
            loadUserGameData()
        }
    }, [user])

    const loadUserGameData = () => {
        const savedCredits = localStorage.getItem(`game-credits-${user.email}`) || '0'
        const savedStats = localStorage.getItem(`game-stats-${user.email}`)

        setUserCredits(parseInt(savedCredits))

        if (savedStats) {
            setGameStats(JSON.parse(savedStats))
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
        const newCredits = userCredits + creditsEarned
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
        div className = "container-max py-8" >
        <
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

        {
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

        <
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

        <
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

function GameComponent({ gameId, onGameEnd }) {
    switch (gameId) {
        case 'congo-quiz':
            return <CongoQuizGame onGameEnd = { onGameEnd }
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
        default:
            return <CongoQuizGame onGameEnd = { onGameEnd }
            />
    }
}

function CongoQuizGame({ onGameEnd }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const questions = [{
            question: "What is the traditional method used by Congo Basin communities to preserve fish?",
            options: ["Smoking", "Freezing", "Salting", "Drying in sun"],
            correct: 0,
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
            options: ["Monoculture", "Slash and burn", "Crop rotation", "Intensive farming"],
            correct: 2,
            explanation: "Crop rotation helps maintain soil fertility by alternating different crops that replenish nutrients."
        }
    ]

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
        } else {
            setShowResult(true)
        }
    }

    const handleGameEnd = () => {
        const creditsEarned = score * 2
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
            p className = "text-lg text-gray-600 mb-4" > You scored { score }
            out of { questions.length } < /p> <
            p className = "text-sm text-gray-500 mb-6" > Credits earned: { score * 2 } < /p> <
            button onClick = { handleGameEnd }
            className = "btn-primary w-full" > Continue < /button> < /
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