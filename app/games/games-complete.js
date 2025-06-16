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

// Congo Quiz Game Component
function CongoQuizGame({ onGameEnd }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30)

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
        },
        {
            question: "Which traditional practice helps predict weather patterns?",
            options: ["Animal behavior observation", "Star gazing", "Plant growth patterns", "All of the above"],
            correct: 3,
            explanation: "Traditional communities use multiple natural indicators including animal behavior, celestial observations, and plant patterns to predict weather."
        },
        {
            question: "What is the traditional use of palm wine in Congo Basin communities?",
            options: ["Only for drinking", "Ceremonial purposes only", "Medicine and ceremonies", "Trading only"],
            correct: 2,
            explanation: "Palm wine is used both for medicinal purposes and in traditional ceremonies, not just as a beverage."
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
        const creditsEarned = score * 2 // 2 credits per correct answer
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
        div className = "max-w-2xl mx-auto" > { /* Progress Bar */ } <
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

        { /* Question Card */ } <
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