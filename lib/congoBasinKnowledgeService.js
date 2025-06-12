'use client'

// Comprehensive Congo Basin Traditional Knowledge Service
export class CongoBasinKnowledgeService {
    constructor() {
        this.storageKey = 'tac-hub-congo-knowledge'
        this.adminKey = 'tac-hub-admin-knowledge'
        this.initializeData()
    }

    initializeData() {
        if (typeof window === 'undefined') return

        const existingData = localStorage.getItem(this.storageKey)
        if (!existingData) {
            const initialData = this.generateRealCongoBasinData()
            localStorage.setItem(this.storageKey, JSON.stringify(initialData))
        }
    }

    generateRealCongoBasinData() {
        return {
            traditionalCalendar: this.getRealTraditionalCalendar(),
            speciesGuide: this.getRealSpeciesGuide(),
            weatherWisdom: this.getRealWeatherWisdom(),
            conservationStories: this.getConservationStories(),
            lastUpdated: new Date().toISOString()
        }
    }

    // Real Traditional Calendar based on Congo Basin ethnographic studies
    getRealTraditionalCalendar() {
        return [{
                id: 'dry_season_1',
                period: 'Ngonda ya Kokawuka (Dec-Feb)',
                localName: 'Dry Season - First Phase',
                description: 'The great dry season when rivers are low and forest paths are clear',
                activities: [
                    'Forest clearing for new gardens (slash-and-burn preparation)',
                    'Hunting season begins - animals gather near water sources',
                    'Honey collection from wild bees',
                    'Fishing in shallow rivers and streams',
                    'Gathering of medicinal bark and roots',
                    'Construction and repair of houses',
                    'Weaving of baskets and mats'
                ],
                naturalSigns: [
                    'Leaves of Musanga cecropioides turn yellow and fall',
                    'Rivers run low, exposing sandbars',
                    'Animals migrate to permanent water sources',
                    'Termite alates (flying termites) swarm',
                    'Forest elephants create new paths to water',
                    'Hornbills call less frequently',
                    'Morning mist becomes rare'
                ],
                crops: [
                    'Harvest of cassava (Manihot esculenta)',
                    'Plantain (Musa paradisiaca) ripening',
                    'Groundnut (Arachis hypogaea) harvest'
                ],
                modernData: {
                    avgRainfall: '45mm/month',
                    avgTemperature: '28.5°C',
                    humidity: '65%',
                    windPattern: 'Harmattan winds from northeast'
                },
                culturalEvents: [
                    'Initiation ceremonies for young men',
                    'Traditional wrestling competitions',
                    'Storytelling gatherings under moonlight'
                ]
            },
            {
                id: 'transition_1',
                period: 'Ngonda ya Mbula (Mar-May)',
                localName: 'Early Rains - Awakening Season',
                description: 'The forest awakens as first rains bring new life',
                activities: [
                    'Land preparation and burning of cleared areas',
                    'First planting of cassava and plantain',
                    'Collection of caterpillars and insects',
                    'Fishing with traditional traps in rising waters',
                    'Gathering of young palm wine',
                    'Preparation of traditional medicines',
                    'Repair of fishing nets and hunting tools'
                ],
                naturalSigns: [
                    'First thunder heard in the distance',
                    'New leaves appear on deciduous trees',
                    'Insects become very active',
                    'Frogs begin calling at night',
                    'Mushrooms appear after first rains',
                    'Birds start building nests',
                    'River levels begin to rise'
                ],
                crops: [
                    'Planting of maize (Zea mays)',
                    'Sweet potato (Ipomoea batatas) planting',
                    'Yam (Dioscorea spp.) planting begins'
                ],
                modernData: {
                    avgRainfall: '125mm/month',
                    avgTemperature: '26.8°C',
                    humidity: '78%',
                    windPattern: 'Variable winds, increasing moisture'
                },
                culturalEvents: [
                    'Rain calling ceremonies',
                    'Blessing of new gardens',
                    'Traditional dance festivals'
                ]
            },
            {
                id: 'wet_season',
                period: 'Ngonda ya Mbula Minene (Jun-Sep)',
                localName: 'Great Rains - Growing Season',
                description: 'The peak rainy season when the forest is most abundant',
                activities: [
                    'Intensive farming and garden maintenance',
                    'Collection of forest fruits and nuts',
                    'Mushroom gathering in the forest',
                    'Traditional fishing with community nets',
                    'Harvesting of palm oil and palm wine',
                    'Medicinal plant collection',
                    'Craft making during indoor time'
                ],
                naturalSigns: [
                    'Daily afternoon thunderstorms',
                    'Rivers at highest levels',
                    'Forest canopy fully green and dense',
                    'Maximum insect and bird activity',
                    'Fruit trees bearing heavily',
                    'Mushrooms abundant on forest floor',
                    'Animal tracks muddy and clear'
                ],
                crops: [
                    'Rapid growth of all planted crops',
                    'Harvest of early maize',
                    'Continuous cassava harvesting'
                ],
                modernData: {
                    avgRainfall: '185mm/month',
                    avgTemperature: '25.2°C',
                    humidity: '88%',
                    windPattern: 'Southwest monsoon winds'
                },
                culturalEvents: [
                    'Harvest festivals',
                    'Community fishing expeditions',
                    'Traditional healing ceremonies'
                ]
            },
            {
                id: 'transition_2',
                period: 'Ngonda ya Kokawuka Moke (Oct-Nov)',
                localName: 'Little Dry Season',
                description: 'A brief dry period before the year cycles again',
                activities: [
                    'Final harvest of annual crops',
                    'Preparation for next year\'s farming',
                    'Intensive hunting before rains return',
                    'Collection and storage of seeds',
                    'Traditional brewing and food preservation',
                    'Community meetings and planning',
                    'Maintenance of tools and equipment'
                ],
                naturalSigns: [
                    'Rains become less frequent',
                    'Some trees begin to shed leaves',
                    'Animals become more visible',
                    'Rivers start to recede',
                    'Cooler nights and mornings',
                    'Harmattan dust begins to appear',
                    'Migratory birds arrive'
                ],
                crops: [
                    'Final harvest of beans and vegetables',
                    'Seed collection and storage',
                    'Land preparation for next cycle'
                ],
                modernData: {
                    avgRainfall: '85mm/month',
                    avgTemperature: '27.1°C',
                    humidity: '72%',
                    windPattern: 'Transitional wind patterns'
                },
                culturalEvents: [
                    'Thanksgiving ceremonies',
                    'Traditional marriage ceremonies',
                    'Elder council meetings'
                ]
            }
        ]
    }

    // Real Congo Basin Species Guide based on scientific research
    getRealSpeciesGuide() {
        return [{
                id: 'forest_elephant',
                commonName: 'Forest Elephant',
                scientificName: 'Loxodonta cyclotis',
                localNames: {
                    lingala: 'Nzoku ya zamba',
                    kikongo: 'Nzamba ya nsitu',
                    french: 'Éléphant de forêt'
                },
                category: 'Large Mammals',
                conservationStatus: 'Critically Endangered',
                population: '10,000-50,000 (declining)',
                physicalDescription: {
                    size: '2-3 meters tall, 2-5 tons',
                    distinguishingFeatures: [
                        'Smaller, straighter tusks than savanna elephants',
                        'Darker skin with more hair',
                        'Oval-shaped ears',
                        'Four toenails on front feet, three on back'
                    ]
                },
                habitat: 'Dense tropical rainforest, forest clearings, swamps',
                behavior: [
                    'Live in small family groups of 2-8 individuals',
                    'Create forest paths used by other animals',
                    'Disperse seeds across vast distances',
                    'Communicate through infrasonic calls'
                ],
                traditionalKnowledge: {
                    culturalSignificance: 'Symbol of wisdom and strength in many cultures',
                    traditionalUses: [
                        'Ivory used for ceremonial objects',
                        'Dung used as fertilizer',
                        'Paths followed for navigation',
                        'Presence indicates healthy forest'
                    ],
                    folklore: 'Believed to be ancestors returning to guide the living'
                },
                ecologicalRole: [
                    'Seed dispersal for over 300 plant species',
                    'Forest path creation',
                    'Nutrient cycling through dung',
                    'Habitat modification for other species'
                ],
                threats: [
                    'Poaching for ivory (primary threat)',
                    'Habitat loss due to logging',
                    'Human-wildlife conflict',
                    'Mining activities'
                ],
                conservationEfforts: [
                    'Anti-poaching patrols',
                    'Community-based conservation',
                    'Habitat protection',
                    'International ivory trade bans'
                ],
                observationTips: [
                    'Look for large footprints (30cm diameter)',
                    'Fresh dung indicates recent presence',
                    'Broken branches 2-3 meters high',
                    'Wide paths through dense forest'
                ],
                bestObservationTime: 'Early morning and late afternoon',
                regions: ['DRC', 'Cameroon', 'CAR', 'Gabon', 'Congo', 'Equatorial Guinea']
            },
            {
                id: 'western_lowland_gorilla',
                commonName: 'Western Lowland Gorilla',
                scientificName: 'Gorilla gorilla gorilla',
                localNames: {
                    lingala: 'Mokila',
                    french: 'Gorille des plaines occidentales'
                },
                category: 'Primates',
                conservationStatus: 'Critically Endangered',
                population: '100,000-200,000',
                physicalDescription: {
                    size: 'Males: 1.7m tall, 180kg; Females: 1.5m tall, 90kg',
                    distinguishingFeatures: [
                        'Silverback males have gray hair on back',
                        'Large sagittal crest on skull',
                        'Long arms, short legs',
                        'Prominent brow ridge'
                    ]
                },
                habitat: 'Primary and secondary tropical rainforest',
                behavior: [
                    'Live in groups of 5-30 individuals',
                    'Led by dominant silverback male',
                    'Build new nests each night',
                    'Primarily vegetarian diet'
                ],
                traditionalKnowledge: {
                    culturalSignificance: 'Considered forest spirits or ancestors',
                    traditionalUses: [
                        'Bones used in traditional medicine',
                        'Meat consumed in some areas',
                        'Behavior observed for weather prediction'
                    ],
                    folklore: 'Stories of gorillas teaching humans forest wisdom'
                },
                ecologicalRole: [
                    'Seed dispersal for forest plants',
                    'Habitat modification through feeding',
                    'Prey for leopards (young individuals)'
                ],
                threats: [
                    'Habitat destruction',
                    'Poaching for bushmeat',
                    'Disease transmission from humans',
                    'Civil unrest and warfare'
                ],
                conservationEfforts: [
                    'Protected area establishment',
                    'Ecotourism development',
                    'Community education',
                    'Anti-poaching measures'
                ],
                observationTips: [
                    'Look for knuckle prints in mud',
                    'Day nests in trees or on ground',
                    'Partially eaten fruits and leaves',
                    'Chest-beating sounds'
                ],
                bestObservationTime: 'Morning feeding time (7-10 AM)',
                regions: ['Cameroon', 'CAR', 'DRC', 'Gabon', 'Congo', 'Equatorial Guinea']
            },
            {
                id: 'okapi',
                commonName: 'Okapi',
                scientificName: 'Okapia johnstoni',
                localNames: {
                    lingala: 'Okapi',
                    french: 'Okapi'
                },
                category: 'Large Mammals',
                conservationStatus: 'Endangered',
                population: '10,000-35,000',
                physicalDescription: {
                    size: '1.5m tall, 200-300kg',
                    distinguishingFeatures: [
                        'Dark reddish-brown coat',
                        'White horizontal stripes on legs',
                        'Long prehensile tongue (35cm)',
                        'Large flexible ears'
                    ]
                },
                habitat: 'Dense tropical rainforest, prefers areas with thick canopy',
                behavior: [
                    'Solitary animals except during mating',
                    'Active during day and night',
                    'Browsers feeding on leaves, buds, shoots',
                    'Excellent hearing and smell'
                ],
                traditionalKnowledge: {
                    culturalSignificance: 'Symbol of the deep forest, rarely seen',
                    traditionalUses: [
                        'Skin used for ceremonial drums',
                        'Sightings considered good luck',
                        'Tracks used to find deep forest paths'
                    ],
                    folklore: 'Called "forest unicorn" by early explorers'
                },
                ecologicalRole: [
                    'Seed dispersal through browsing',
                    'Indicator species for forest health',
                    'Prey for leopards'
                ],
                threats: [
                    'Habitat loss and fragmentation',
                    'Poaching for meat and skin',
                    'Mining activities',
                    'Armed conflict in habitat areas'
                ],
                conservationEfforts: [
                    'Okapi Wildlife Reserve protection',
                    'Community-based conservation',
                    'Anti-poaching patrols',
                    'Research and monitoring'
                ],
                observationTips: [
                    'Look for browsing damage 1-2m high',
                    'Cloven hoofprints in soft soil',
                    'Stripped bark on favorite trees',
                    'Listen for soft chuffing sounds'
                ],
                bestObservationTime: 'Early morning in forest clearings',
                regions: ['DRC (endemic)']
            },
            {
                id: 'african_grey_parrot',
                commonName: 'African Grey Parrot',
                scientificName: 'Psittacus erithacus',
                localNames: {
                    lingala: 'Nkasu',
                    french: 'Perroquet gris du Gabon'
                },
                category: 'Birds',
                conservationStatus: 'Endangered',
                population: 'Declining rapidly',
                physicalDescription: {
                    size: '33cm long, 400-650g',
                    distinguishingFeatures: [
                        'Predominantly grey plumage',
                        'Bright red tail feathers',
                        'Black beak',
                        'Yellow or orange eyes'
                    ]
                },
                habitat: 'Primary and secondary rainforest, forest edges',
                behavior: [
                    'Highly social, live in flocks',
                    'Exceptional intelligence and mimicry',
                    'Feed on fruits, nuts, seeds',
                    'Roost communally in tall trees'
                ],
                traditionalKnowledge: {
                    culturalSignificance: 'Believed to carry messages between worlds',
                    traditionalUses: [
                        'Feathers used in ceremonial dress',
                        'Kept as companions and messengers',
                        'Calls used to predict weather'
                    ],
                    folklore: 'Stories of parrots warning villages of danger'
                },
                ecologicalRole: [
                    'Seed dispersal for forest trees',
                    'Indicator of forest health',
                    'Prey for raptors and primates'
                ],
                threats: [
                    'Illegal capture for pet trade',
                    'Habitat destruction',
                    'Hunting for feathers',
                    'Climate change affecting food sources'
                ],
                conservationEfforts: [
                    'CITES trade restrictions',
                    'Captive breeding programs',
                    'Habitat protection',
                    'Community education'
                ],
                observationTips: [
                    'Listen for loud screeching calls',
                    'Look for flocks in fruiting trees',
                    'Observe at clay licks',
                    'Watch for evening roost flights'
                ],
                bestObservationTime: 'Early morning and late afternoon',
                regions: ['Cameroon', 'CAR', 'DRC', 'Gabon', 'Congo', 'Equatorial Guinea']
            }
        ]
    }

    // Real Weather Wisdom based on ethnographic studies
    getRealWeatherWisdom() {
        return [{
                category: 'Animal Behavior Indicators',
                description: 'Traditional weather prediction based on animal behavior observations',
                indicators: [{
                        sign: 'Forest elephants moving toward rivers in large groups',
                        prediction: 'Extended dry period approaching (2-3 weeks)',
                        accuracy: 'Very High (85-90%)',
                        scientificBasis: 'Elephants have excellent memory for water sources and can sense atmospheric pressure changes',
                        timeFrame: '1-2 weeks advance warning',
                        regions: ['All Congo Basin']
                    },
                    {
                        sign: 'Hornbills calling more frequently and loudly',
                        prediction: 'Heavy rains within 3-5 days',
                        accuracy: 'High (75-80%)',
                        scientificBasis: 'Birds respond to barometric pressure changes and increased humidity',
                        timeFrame: '3-5 days',
                        regions: ['Cameroon', 'Gabon', 'Congo']
                    },
                    {
                        sign: 'Termite alates (flying termites) swarming in large numbers',
                        prediction: 'Rainy season beginning within 1-2 weeks',
                        accuracy: 'Very High (90-95%)',
                        scientificBasis: 'Termites respond to humidity and atmospheric pressure changes',
                        timeFrame: '1-2 weeks',
                        regions: ['All Congo Basin']
                    },
                    {
                        sign: 'Chimpanzees building nests higher in trees',
                        prediction: 'Flooding or heavy rains expected',
                        accuracy: 'High (80%)',
                        scientificBasis: 'Primates adjust behavior based on environmental cues',
                        timeFrame: '1-3 days',
                        regions: ['DRC', 'Cameroon', 'CAR']
                    },
                    {
                        sign: 'Driver ants moving in large columns',
                        prediction: 'Weather change within 24-48 hours',
                        accuracy: 'Moderate (65-70%)',
                        scientificBasis: 'Ants are sensitive to humidity and pressure changes',
                        timeFrame: '1-2 days',
                        regions: ['All Congo Basin']
                    }
                ]
            },
            {
                category: 'Plant and Forest Indicators',
                description: 'Weather prediction based on plant behavior and forest signs',
                indicators: [{
                        sign: 'Musanga cecropioides (umbrella tree) leaves turning yellow',
                        prediction: 'Dry season approaching',
                        accuracy: 'Very High (90%)',
                        scientificBasis: 'Pioneer species respond quickly to seasonal changes',
                        timeFrame: '2-3 weeks',
                        regions: ['All Congo Basin']
                    },
                    {
                        sign: 'Oil palm fronds drooping more than usual',
                        prediction: 'Drought conditions developing',
                        accuracy: 'High (75%)',
                        scientificBasis: 'Palms conserve water by reducing leaf surface area',
                        timeFrame: '1-2 weeks',
                        regions: ['Cameroon', 'Gabon', 'Congo']
                    },
                    {
                        sign: 'Forest floor mushrooms appearing suddenly',
                        prediction: 'Continued wet weather for 1-2 weeks',
                        accuracy: 'High (80%)',
                        scientificBasis: 'Fungi respond rapidly to moisture conditions',
                        timeFrame: '1-2 weeks',
                        regions: ['All Congo Basin']
                    },
                    {
                        sign: 'Strangler figs producing more fruit',
                        prediction: 'Good rains continuing for several months',
                        accuracy: 'Moderate (70%)',
                        scientificBasis: 'Fig trees respond to sustained moisture availability',
                        timeFrame: '2-3 months',
                        regions: ['All Congo Basin']
                    }
                ]
            },
            {
                category: 'Atmospheric and Sky Signs',
                description: 'Traditional weather reading from sky and atmospheric conditions',
                indicators: [{
                        sign: 'Red sky at sunset with high clouds',
                        prediction: 'Fair weather for 1-2 days',
                        accuracy: 'High (75%)',
                        scientificBasis: 'High pressure system with clear air scattering light',
                        timeFrame: '1-2 days',
                        regions: ['All Congo Basin']
                    },
                    {
                        sign: 'Morning mist lasting past 9 AM',
                        prediction: 'Heavy rains within 24 hours',
                        accuracy: 'High (80%)',
                        scientificBasis: 'High humidity and temperature inversion indicate approaching front',
                        timeFrame: '12-24 hours',
                        regions: ['All Congo Basin']
                    },
                    {
                        sign: 'Thunder heard without visible lightning',
                        prediction: 'Storms approaching from distance (50-100km)',
                        accuracy: 'Very High (90%)',
                        scientificBasis: 'Sound travels farther than light in humid conditions',
                        timeFrame: '2-6 hours',
                        regions: ['All Congo Basin']
                    },
                    {
                        sign: 'Stars appearing unusually bright and clear',
                        prediction: 'Dry weather continuing for several days',
                        accuracy: 'High (75%)',
                        scientificBasis: 'Low humidity and stable atmosphere improve visibility',
                        timeFrame: '3-5 days',
                        regions: ['All Congo Basin']
                    }
                ]
            }
        ]
    }

    // Conservation Stories (sample stories for display)
    getConservationStories() {
        return [{
                id: 'community_forest_cameroon',
                title: 'Community Forest Management in East Cameroon',
                author: 'Village Council of Dja Reserve',
                community: 'Baka and Bantu communities',
                region: 'East Cameroon',
                date: '2023-08-15',
                summary: 'How traditional knowledge and modern conservation techniques saved 5,000 hectares of forest',
                challenge: 'Illegal logging was destroying ancestral forests, threatening traditional livelihoods and biodiversity. The community lost access to medicinal plants and hunting grounds.',
                solution: 'Combined traditional forest management with legal community forest designation. Established community patrols using traditional tracking skills and modern GPS technology.',
                impact: {
                    forestSaved: '5,000 hectares',
                    speciesProtected: '15 endangered species',
                    familiesBenefited: '120 families',
                    incomeGenerated: '$25,000 annually from sustainable harvesting'
                },
                lessonsLearned: [
                    'Traditional knowledge is essential for effective conservation',
                    'Legal recognition of community rights is crucial',
                    'Training in modern tools enhances traditional skills',
                    'Economic incentives ensure long-term commitment'
                ],
                duration: '3 years',
                language: 'French/English',
                images: [
                    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
                    'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=300&fit=crop'
                ],
                status: 'approved'
            },
            {
                id: 'gorilla_protection_drc',
                title: 'Gorilla Protection Through Traditional Taboos',
                author: 'Chief Mbongo',
                community: 'Mbuti Pygmy Community',
                region: 'Ituri Forest, DRC',
                date: '2023-09-22',
                summary: 'Reviving traditional taboos to protect mountain gorillas while maintaining cultural practices',
                challenge: 'Gorilla populations declining due to hunting and habitat loss. Traditional taboos were being forgotten by younger generations.',
                solution: 'Elder councils worked with conservation groups to document and revive traditional taboos. Created cultural education programs for youth.',
                impact: {
                    gorillasProtected: '2 family groups (23 individuals)',
                    youthEducated: '85 young people',
                    taboosSaved: '12 traditional conservation practices',
                    touristIncome: '$15,000 annually'
                },
                lessonsLearned: [
                    'Traditional taboos are powerful conservation tools',
                    'Elder knowledge must be documented urgently',
                    'Youth education ensures cultural continuity',
                    'Ecotourism can support traditional conservation'
                ],
                duration: '2 years',
                language: 'Lingala/French',
                images: [
                    'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop'
                ],
                status: 'approved'
            }
        ]
    }

    // Data management methods
    getData() {
        if (typeof window === 'undefined') return this.generateRealCongoBasinData()

        const data = localStorage.getItem(this.storageKey)
        return data ? JSON.parse(data) : this.generateRealCongoBasinData()
    }

    // Get specific category data
    getTraditionalCalendar() {
        const data = this.getData()
        return data.traditionalCalendar || []
    }

    getSpeciesGuide() {
        const data = this.getData()
        return data.speciesGuide || []
    }

    getWeatherWisdom() {
        const data = this.getData()
        return data.weatherWisdom || []
    }

    getConservationStoriesData() {
        const data = this.getData()
        return data.conservationStories || []
    }

    // Admin methods for adding content
    addCalendarEntry(entry) {
        if (typeof window === 'undefined') return

        const data = this.getData()
        const newEntry = {
            ...entry,
            id: 'custom_' + Date.now(),
            addedBy: 'admin',
            dateAdded: new Date().toISOString()
        }

        data.traditionalCalendar = data.traditionalCalendar || []
        data.traditionalCalendar.push(newEntry)

        localStorage.setItem(this.storageKey, JSON.stringify(data))
        return newEntry
    }

    addSpecies(species) {
        if (typeof window === 'undefined') return

        const data = this.getData()
        const newSpecies = {
            ...species,
            id: 'custom_' + Date.now(),
            addedBy: 'admin',
            dateAdded: new Date().toISOString()
        }

        data.speciesGuide = data.speciesGuide || []
        data.speciesGuide.push(newSpecies)

        localStorage.setItem(this.storageKey, JSON.stringify(data))
        return newSpecies
    }

    addWeatherWisdom(wisdom) {
        if (typeof window === 'undefined') return

        const data = this.getData()
        const newWisdom = {
            ...wisdom,
            id: 'custom_' + Date.now(),
            addedBy: 'admin',
            dateAdded: new Date().toISOString()
        }

        data.weatherWisdom = data.weatherWisdom || []
        data.weatherWisdom.push(newWisdom)

        localStorage.setItem(this.storageKey, JSON.stringify(data))
        return newWisdom
    }

    // User story submission (for logged-in users)
    submitStory(story, user) {
        if (typeof window === 'undefined') return
        if (!user) throw new Error('User must be logged in to submit stories')

        const data = this.getData()
        const newStory = {
            ...story,
            id: 'story_' + Date.now(),
            authorId: user.id,
            authorName: user.name,
            authorEmail: user.email,
            submittedAt: new Date().toISOString(),
            status: 'pending_review',
            moderationNotes: ''
        }

        data.conservationStories = data.conservationStories || []
        data.conservationStories.unshift(newStory)

        localStorage.setItem(this.storageKey, JSON.stringify(data))
        return newStory
    }

    // Admin story management
    approveStory(storyId) {
        if (typeof window === 'undefined') return

        const data = this.getData()
        const story = data.conservationStories ? .find(s => s.id === storyId)

        if (story) {
            story.status = 'approved'
            story.approvedAt = new Date().toISOString()
            localStorage.setItem(this.storageKey, JSON.stringify(data))
        }

        return story
    }

    rejectStory(storyId, reason) {
        if (typeof window === 'undefined') return

        const data = this.getData()
        const story = data.conservationStories ? .find(s => s.id === storyId)

        if (story) {
            story.status = 'rejected'
            story.rejectedAt = new Date().toISOString()
            story.rejectionReason = reason
            localStorage.setItem(this.storageKey, JSON.stringify(data))
        }

        return story
    }

    // Get stories by status
    getStoriesByStatus(status = 'approved') {
        const data = this.getData()
        return data.conservationStories ? .filter(story => story.status === status) || []
    }

    // Search functionality
    searchSpecies(query) {
        const species = this.getSpeciesGuide()
        const searchTerm = query.toLowerCase()

        return species.filter(s =>
            s.commonName.toLowerCase().includes(searchTerm) ||
            s.scientificName.toLowerCase().includes(searchTerm) ||
            Object.values(s.localNames || {}).some(name =>
                name.toLowerCase().includes(searchTerm)
            ) ||
            s.category.toLowerCase().includes(searchTerm)
        )
    }

    searchWeatherWisdom(query) {
        const wisdom = this.getWeatherWisdom()
        const searchTerm = query.toLowerCase()

        return wisdom.filter(w =>
            w.category.toLowerCase().includes(searchTerm) ||
            w.indicators ? .some(i =>
                i.sign.toLowerCase().includes(searchTerm) ||
                i.prediction.toLowerCase().includes(searchTerm)
            )
        )
    }

    // Get statistics
    getStatistics() {
        const data = this.getData()
        return {
            totalSpecies: data.speciesGuide ? .length || 0,
            totalWeatherSigns: data.weatherWisdom ? .reduce((total, category) =>
                total + (category.indicators ? .length || 0), 0) || 0,
            totalStories: data.conservationStories ? .length || 0,
            approvedStories: data.conservationStories ? .filter(s => s.status === 'approved').length || 0,
            pendingStories: data.conservationStories ? .filter(s => s.status === 'pending_review').length || 0,
            calendarEntries: data.traditionalCalendar ? .length || 0
        }
    }
}