// Forest Guardian Game Component
function ForestGuardianGame({ onGameEnd }) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [forestHealth, setForestHealth] = useState(100)
  const [showResult, setShowResult] = useState(false)

  const scenarios = [
    {
      title: "Illegal Logging Spotted",
      description: "You discover illegal loggers cutting down ancient trees in your protected area. What do you do?",
      image: "🌲⚠️",
      options: [
        { text: "Confront them directly", impact: -10, explanation: "Dangerous! Could lead to conflict." },
        { text: "Report to authorities", impact: +15, explanation: "Smart! Proper channels ensure safety and action." },
        { text: "Document evidence first", impact: +20, explanation: "Excellent! Evidence helps authorities take action." },
        { text: "Ignore it", impact: -25, explanation: "Forest destruction continues unchecked." }
      ]
    },
    {
      title: "Community Needs Firewood",
      description: "Local villagers need firewood for cooking. They want to cut live trees. How do you help?",
      image: "🔥🏘️",
      options: [
        { text: "Let them cut any trees", impact: -20, explanation: "Unsustainable! Live trees are vital for the ecosystem." },
        { text: "Show them dead branches", impact: +15, explanation: "Good! Dead wood is perfect for fuel without harming trees." },
        { text: "Teach sustainable harvesting", impact: +25, explanation: "Perfect! Education ensures long-term conservation." },
        { text: "Forbid all wood collection", impact: -5, explanation: "Too strict. Communities need fuel for survival." }
      ]
    },
    {
      title: "Rare Species Discovered",
      description: "You find a new species of bird in your forest. Researchers want to study it. What's your approach?",
      image: "🦅✨",
      options: [
        { text: "Allow unlimited access", impact: -10, explanation: "Too much disturbance could harm the species." },
        { text: "Controlled research visits", impact: +20, explanation: "Perfect balance of science and protection!" },
        { text: "Keep it completely secret", impact: +5, explanation: "Safe but misses scientific opportunities." },
        { text: "Charge high fees", impact: -15, explanation: "Money shouldn't be the priority for conservation." }
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
    const creditsEarned = Math.floor(score / 5) + (forestHealth > 80 ? 10 : forestHealth > 60 ? 5 : 0)
    onGameEnd(creditsEarned, score, scenarios.length)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg">
          <div className="text-6xl mb-4">
            {forestHealth > 80 ? '🌳✨' : forestHealth > 60 ? '🌲' : forestHealth > 40 ? '🌿' : '🍂'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mission Complete!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-lg">Forest Health: <span className={`font-bold ${forestHealth > 80 ? 'text-green-600' : forestHealth > 60 ? 'text-yellow-600' : 'text-red-600'}`}>{forestHealth}%</span></p>
            <p className="text-lg">Conservation Score: <span className="font-bold text-blue-600">{score}</span></p>
            <p className="text-sm text-gray-500">Credits earned: {Math.floor(score / 5) + (forestHealth > 80 ? 10 : forestHealth > 60 ? 5 : 0)}</p>
          </div>
          <div className="text-sm text-gray-600 mb-6">
            {forestHealth > 80 && "🎉 Excellent! You're a true Forest Guardian!"}
            {forestHealth > 60 && forestHealth <= 80 && "👍 Good work! The forest is in safe hands."}
            {forestHealth > 40 && forestHealth <= 60 && "⚠️ The forest needs more protection."}
            {forestHealth <= 40 && "🚨 Critical! The forest is in danger."}
          </div>
          <button onClick={handleGameEnd} className="btn-primary w-full">
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
      <Header />
      <div className="container-max py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <TreePine className="w-6 h-6 mr-2 text-green-600" />
                Forest Guardian
              </h1>
              <div className="text-right">
                <div className="text-sm text-gray-600">Scenario {currentScenario + 1} of {scenarios.length}</div>
                <div className="text-sm text-gray-600">Score: {score}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Forest Health</span>
                <span className={`text-sm font-bold ${forestHealth > 80 ? 'text-green-600' : forestHealth > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {forestHealth}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    forestHealth > 80 ? 'bg-green-500' : 
                    forestHealth > 60 ? 'bg-yellow-500' : 
                    forestHealth > 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${forestHealth}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{scenarios[currentScenario].image}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{scenarios[currentScenario].title}</h2>
              <p className="text-gray-600 leading-relaxed">{scenarios[currentScenario].description}</p>
            </div>
            
            <div className="space-y-3">
              {scenarios[currentScenario].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(index)}
                  className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Traditional Calendar Game Component
function SeasonalCalendarGame({ onGameEnd }) {
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const calendarChallenges = [
    {
      activity: "Planting Cassava",
      description: "When is the best time to plant cassava in the Congo Basin?",
      image: "🌱",
      seasons: ["Dry Season Start", "Peak Rainy Season", "End of Rainy Season", "Mid Dry Season"],
      correct: 2,
      explanation: "Cassava is planted at the end of the rainy season when soil moisture is optimal but flooding risk is low."
    },
    {
      activity: "Honey Harvesting",
      description: "Traditional honey harvesting follows which seasonal pattern?",
      image: "🍯",
      seasons: ["Beginning of Rains", "Peak Dry Season", "End of Dry Season", "Any Time"],
      correct: 1,
      explanation: "Honey is traditionally harvested during peak dry season when bees have stored maximum honey."
    },
    {
      activity: "Fish Smoking Season",
      description: "When do communities traditionally smoke fish for preservation?",
      image: "🐟",
      seasons: ["Rainy Season", "Dry Season", "Transition Periods", "Year Round"],
      correct: 1,
      explanation: "Fish smoking is done during dry season when weather conditions are ideal for preservation."
    },
    {
      activity: "Medicinal Plant Collection",
      description: "Traditional healers collect medicinal plants during which time?",
      image: "🌿",
      seasons: ["Early Morning Dry Season", "Rainy Season Afternoon", "Any Time", "Full Moon Nights"],
      correct: 0,
      explanation: "Medicinal plants are collected early morning in dry season when active compounds are most concentrated."
    }
  ]

  const handleSeasonSelect = (seasonIndex) => {
    setSelectedSeason(seasonIndex)
  }

  const handleSubmit = () => {
    if (selectedSeason === calendarChallenges[currentRound].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      alert(calendarChallenges[currentRound].explanation)
      
      if (currentRound + 1 < calendarChallenges.length) {
        setCurrentRound(currentRound + 1)
        setSelectedSeason(null)
      } else {
        setShowResult(true)
      }
    }, 500)
  }

  const handleGameEnd = () => {
    const creditsEarned = score * 3 // 3 credits per correct answer
    onGameEnd(creditsEarned, score, calendarChallenges.length)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg">
          <Sun className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calendar Master!</h2>
          <p className="text-lg text-gray-600 mb-4">
            You scored {score} out of {calendarChallenges.length}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Credits earned: {score * 3}
          </p>
          <button onClick={handleGameEnd} className="btn-primary w-full">
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-50">
      <Header />
      <div className="container-max py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Sun className="w-6 h-6 mr-2 text-yellow-600" />
                Traditional Calendar Master
              </h1>
              <div className="text-right">
                <div className="text-sm text-gray-600">Round {currentRound + 1} of {calendarChallenges.length}</div>
                <div className="text-sm text-gray-600">Score: {score}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{calendarChallenges[currentRound].image}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{calendarChallenges[currentRound].activity}</h2>
              <p className="text-gray-600 leading-relaxed">{calendarChallenges[currentRound].description}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {calendarChallenges[currentRound].seasons.map((season, index) => (
                <button
                  key={index}
                  onClick={() => handleSeasonSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedSeason === index
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {season}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedSeason === null}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentRound + 1 === calendarChallenges.length ? 'Finish Game' : 'Next Challenge'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Congo Species Spotter Game Component
function SpeciesSpotterGame({ onGameEnd }) {
  const [currentSpecies, setCurrentSpecies] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedUse, setSelectedUse] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const species = [
    {
      name: "African Oil Palm",
      image: "🌴",
      description: "A tall palm tree with large fronds, native to the Congo Basin",
      uses: ["Building material only", "Palm wine and oil production", "Decoration only", "No traditional use"],
      correct: 1,
      explanation: "African Oil Palm provides palm wine, palm oil for cooking, and leaves for roofing - a vital multipurpose tree."
    },
    {
      name: "Congo Peacock",
      image: "🦚",
      description: "A rare, colorful bird found only in the Congo Basin rainforests",
      uses: ["Feathers for ceremonies", "Food source only", "Pet keeping", "No cultural significance"],
      correct: 0,
      explanation: "Congo Peacock feathers are highly valued for traditional ceremonies and cultural decorations."
    },
    {
      name: "African Mahogany",
      image: "🌳",
      description: "A large hardwood tree with reddish-brown wood",
      uses: ["Firewood only", "Traditional canoes and furniture", "Medicine only", "Animal feed"],
      correct: 1,
      explanation: "African Mahogany is prized for making traditional canoes, furniture, and ceremonial items due to its durability."
    },
    {
      name: "Forest Elephant",
      image: "🐘",
      description: "Smaller than savanna elephants, these giants shape the forest ecosystem",
      uses: ["Hunting for ivory", "Ecosystem engineers", "Transportation", "Farming helpers"],
      correct: 1,
      explanation: "Forest elephants are 'ecosystem engineers' - they create forest paths and disperse seeds, vital for forest health."
    },
    {
      name: "Kola Nut Tree",
      image: "🌰",
      description: "A tree producing caffeine-rich nuts, sacred in many cultures",
      uses: ["Building material", "Ceremonial offerings and medicine", "Animal food", "Decoration only"],
      correct: 1,
      explanation: "Kola nuts are central to traditional ceremonies, hospitality rituals, and traditional medicine practices."
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
    const creditsEarned = score * 4 // 4 credits per correct answer
    onGameEnd(creditsEarned, score, species.length)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg">
          <Fish className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Species Expert!</h2>
          <p className="text-lg text-gray-600 mb-4">
            You identified {score} out of {species.length} species correctly
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Credits earned: {score * 4}
          </p>
          <div className="text-sm text-gray-600 mb-6">
            {score === species.length && "🎉 Perfect! You're a true Congo Basin species expert!"}
            {score >= 4 && score < species.length && "👍 Excellent knowledge of Congo Basin biodiversity!"}
            {score >= 2 && score < 4 && "🌿 Good start! Keep learning about our amazing species."}
            {score < 2 && "📚 There's so much to discover about Congo Basin wildlife!"}
          </div>
          <button onClick={handleGameEnd} className="btn-primary w-full">
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-50">
      <Header />
      <div className="container-max py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Fish className="w-6 h-6 mr-2 text-purple-600" />
                Congo Species Spotter
              </h1>
              <div className="text-right">
                <div className="text-sm text-gray-600">Species {currentSpecies + 1} of {species.length}</div>
                <div className="text-sm text-gray-600">Score: {score}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{species[currentSpecies].image}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{species[currentSpecies].name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{species[currentSpecies].description}</p>
              <p className="text-lg font-semibold text-purple-700">What is the traditional use of this species?</p>
            </div>

            <div className="space-y-3 mb-6">
              {species[currentSpecies].uses.map((use, index) => (
                <button
                  key={index}
                  onClick={() => handleUseSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedUse === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {use}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedUse === null}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSpecies + 1 === species.length ? 'Finish Game' : 'Next Species'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
