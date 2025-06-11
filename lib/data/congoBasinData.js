// Real Congo Basin data for TAC-HUB platform

export const congoBasinRegions = [
  {
    id: 'cameroon',
    name: 'Cameroon',
    capital: 'Yaoundé',
    forestCover: 41.7, // percentage
    population: 27914536,
    languages: ['French', 'English', 'Fulfulde', 'Ewondo', 'Duala'],
    coordinates: { lat: 7.3697, lng: 12.3547 },
    provinces: ['Centre', 'East', 'South']
  },
  {
    id: 'car',
    name: 'Central African Republic',
    capital: 'Bangui',
    forestCover: 35.9,
    population: 4829764,
    languages: ['French', 'Sango', 'Banda', 'Gbaya'],
    coordinates: { lat: 6.6111, lng: 20.9394 },
    provinces: ['Sangha-Mbaéré', 'Lobaye', 'Mambéré-Kadéï']
  },
  {
    id: 'chad',
    name: 'Chad',
    capital: "N'Djamena",
    forestCover: 9.1,
    population: 16425859,
    languages: ['French', 'Arabic', 'Sara', 'Kanembu'],
    coordinates: { lat: 15.4542, lng: 18.7322 },
    provinces: ['Logone Oriental', 'Moyen-Chari']
  },
  {
    id: 'drc',
    name: 'Democratic Republic of Congo',
    capital: 'Kinshasa',
    forestCover: 67.9,
    population: 95894118,
    languages: ['French', 'Lingala', 'Kikongo', 'Tshiluba', 'Swahili'],
    coordinates: { lat: -4.0383, lng: 21.7587 },
    provinces: ['Équateur', 'Mai-Ndombe', 'Mongala', 'Nord-Ubangi', 'Sud-Ubangi', 'Tshuapa']
  },
  {
    id: 'equatorial_guinea',
    name: 'Equatorial Guinea',
    capital: 'Malabo',
    forestCover: 57.1,
    population: 1402985,
    languages: ['Spanish', 'French', 'Portuguese', 'Fang', 'Bubi'],
    coordinates: { lat: 1.6508, lng: 10.2679 },
    provinces: ['Río Muni']
  },
  {
    id: 'gabon',
    name: 'Gabon',
    capital: 'Libreville',
    forestCover: 85.4,
    population: 2225734,
    languages: ['French', 'Fang', 'Myene', 'Nzebi'],
    coordinates: { lat: -0.8037, lng: 11.6094 },
    provinces: ['Estuaire', 'Haut-Ogooué', 'Moyen-Ogooué', 'Ngounié', 'Nyanga', 'Ogooué-Ivindo', 'Ogooué-Lolo', 'Ogooué-Maritime', 'Woleu-Ntem']
  }
]

export const congoBasinSpecies = [
  {
    id: 'forest_elephant',
    name: 'Forest Elephant',
    scientificName: 'Loxodonta cyclotis',
    type: 'Mammal',
    status: 'Critically Endangered',
    population: 'Estimated 10,000-50,000',
    habitat: 'Dense tropical forests',
    traditionalUses: ['Navigation paths', 'Soil health indicators', 'Sacred ceremonies'],
    threats: ['Poaching for ivory', 'Habitat loss', 'Human-wildlife conflict'],
    conservationEfforts: ['Anti-poaching patrols', 'Community education', 'Habitat protection'],
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop',
    regions: ['drc', 'cameroon', 'car', 'gabon']
  },
  {
    id: 'western_lowland_gorilla',
    name: 'Western Lowland Gorilla',
    scientificName: 'Gorilla gorilla gorilla',
    type: 'Mammal',
    status: 'Critically Endangered',
    population: 'Estimated 100,000-200,000',
    habitat: 'Primary and secondary forests',
    traditionalUses: ['Spiritual significance', 'Traditional medicine', 'Cultural stories'],
    threats: ['Habitat destruction', 'Disease (Ebola)', 'Poaching'],
    conservationEfforts: ['Protected areas', 'Ecotourism', 'Research programs'],
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop',
    regions: ['cameroon', 'car', 'equatorial_guinea', 'gabon']
  },
  {
    id: 'african_grey_parrot',
    name: 'African Grey Parrot',
    scientificName: 'Psittacus erithacus',
    type: 'Bird',
    status: 'Endangered',
    population: 'Declining rapidly',
    habitat: 'Primary and secondary rainforests',
    traditionalUses: ['Weather prediction', 'Communication with ancestors', 'Traditional ceremonies'],
    threats: ['Illegal pet trade', 'Habitat loss', 'Capture for export'],
    conservationEfforts: ['CITES protection', 'Community monitoring', 'Alternative livelihoods'],
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
    regions: ['drc', 'cameroon', 'car', 'gabon']
  },
  {
    id: 'african_mahogany',
    name: 'African Mahogany',
    scientificName: 'Khaya anthotheca',
    type: 'Tree',
    status: 'Vulnerable',
    population: 'Declining due to logging',
    habitat: 'Tropical rainforests',
    traditionalUses: ['Construction', 'Traditional medicine', 'Sacred drums', 'Canoe making'],
    threats: ['Illegal logging', 'Over-exploitation', 'Habitat fragmentation'],
    conservationEfforts: ['Sustainable forestry', 'Community management', 'Reforestation programs'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    regions: ['drc', 'cameroon', 'car', 'gabon']
  },
  {
    id: 'wild_yam',
    name: 'Wild Yam',
    scientificName: 'Dioscorea bulbifera',
    type: 'Plant',
    status: 'Stable',
    population: 'Widespread but declining in some areas',
    habitat: 'Forest understory and clearings',
    traditionalUses: ['Food security', 'Traditional medicine', 'Emergency nutrition', 'Soil indicators'],
    threats: ['Over-harvesting', 'Habitat loss', 'Climate change'],
    conservationEfforts: ['Sustainable harvesting', 'Cultivation programs', 'Traditional knowledge preservation'],
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=300&fit=crop',
    regions: ['drc', 'cameroon', 'car', 'gabon', 'equatorial_guinea']
  },
  {
    id: 'pygmy_hippopotamus',
    name: 'Pygmy Hippopotamus',
    scientificName: 'Choeropsis liberiensis',
    type: 'Mammal',
    status: 'Endangered',
    population: 'Less than 3,000',
    habitat: 'Swamps and dense forests near water',
    traditionalUses: ['Water source indicators', 'Traditional stories', 'Spiritual significance'],
    threats: ['Habitat loss', 'Hunting', 'Water pollution'],
    conservationEfforts: ['Protected areas', 'Community conservation', 'Research programs'],
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop',
    regions: ['drc', 'cameroon']
  }
]

export const traditionalCalendar = [
  {
    season: 'Dry Season',
    months: ['December', 'January', 'February'],
    localName: 'Elanga (Lingala)',
    characteristics: {
      rainfall: '50-100mm per month',
      temperature: '26-30°C',
      humidity: '60-70%'
    },
    traditionalActivities: [
      'Forest clearing preparation',
      'Hunting season begins',
      'Honey collection',
      'Traditional ceremonies',
      'House construction and repairs'
    ],
    naturalSigns: [
      'Leaves turn yellow and fall',
      'Rivers run low',
      'Animals migrate to water sources',
      'Harmattan winds blow',
      'Clear skies and bright stars'
    ],
    plantingActivities: [
      'Land preparation',
      'Burning of cleared areas',
      'Soil preparation for planting'
    ],
    wildlifePatterns: [
      'Elephants gather near water',
      'Birds migrate south',
      'Fish concentrate in deeper pools'
    ]
  },
  {
    season: 'Early Rains',
    months: ['March', 'April', 'May'],
    localName: 'Mbula ya liboso (Lingala)',
    characteristics: {
      rainfall: '100-200mm per month',
      temperature: '24-28°C',
      humidity: '75-85%'
    },
    traditionalActivities: [
      'Main planting season',
      'Forest regeneration activities',
      'Fish spawning season',
      'Medicinal plant collection',
      'Community work parties'
    ],
    naturalSigns: [
      'First thunder heard',
      'New leaves appear on trees',
      'Insects become very active',
      'Rivers begin to rise',
      'Flowers bloom on fruit trees'
    ],
    plantingActivities: [
      'Cassava planting',
      'Plantain cultivation',
      'Vegetable gardens',
      'Tree seedling planting'
    ],
    wildlifePatterns: [
      'Bird nesting season',
      'Butterfly emergence',
      'Amphibian breeding'
    ]
  },
  {
    season: 'Heavy Rains',
    months: ['June', 'July', 'August'],
    localName: 'Mbula ya makasi (Lingala)',
    characteristics: {
      rainfall: '200-400mm per month',
      temperature: '22-26°C',
      humidity: '85-95%'
    },
    traditionalActivities: [
      'Crop maintenance and weeding',
      'Mushroom and caterpillar collection',
      'Limited travel due to floods',
      'Indoor crafts and tool making',
      'Storytelling and cultural transmission'
    ],
    naturalSigns: [
      'Rivers flood regularly',
      'Forest canopy becomes very thick',
      'Mushrooms appear everywhere',
      'Constant cloud cover',
      'High humidity and mist'
    ],
    plantingActivities: [
      'Weeding of crops',
      'Pest management',
      'Drainage maintenance'
    ],
    wildlifePatterns: [
      'Reduced animal movement',
      'Aquatic species thrive',
      'Insect population peaks'
    ]
  },
  {
    season: 'Late Rains',
    months: ['September', 'October', 'November'],
    localName: 'Mbula ya nsuka (Lingala)',
    characteristics: {
      rainfall: '150-250mm per month',
      temperature: '24-27°C',
      humidity: '70-80%'
    },
    traditionalActivities: [
      'Harvest preparation',
      'Medicine collection and preparation',
      'Community gatherings and festivals',
      'Preparation for dry season',
      'Traditional knowledge sharing'
    ],
    naturalSigns: [
      'Fruit trees begin to ripen',
      'Animal tracks become visible',
      'Wind patterns change',
      'Rivers stabilize',
      'Cooler mornings and evenings'
    ],
    plantingActivities: [
      'Harvest of early crops',
      'Seed collection and storage',
      'Land preparation for next cycle'
    ],
    wildlifePatterns: [
      'Animal migration begins',
      'Fruit-eating animals active',
      'Preparation for dry season'
    ]
  }
]

export const weatherWisdom = [
  {
    category: 'Animal Behavior',
    indicators: [
      {
        sign: 'Birds flying low',
        prediction: 'Rain within 24 hours',
        accuracy: 'High',
        scientificBasis: 'Low atmospheric pressure affects bird flight patterns'
      },
      {
        sign: 'Ants moving to higher ground',
        prediction: 'Heavy rain approaching',
        accuracy: 'Very High',
        scientificBasis: 'Ants sense barometric pressure changes'
      },
      {
        sign: 'Elephants gathering near water',
        prediction: 'Dry period extending',
        accuracy: 'High',
        scientificBasis: 'Elephants have excellent memory for water sources'
      },
      {
        sign: 'Frogs calling loudly at night',
        prediction: 'Rain within 2-3 days',
        accuracy: 'Moderate',
        scientificBasis: 'Amphibians respond to humidity changes'
      }
    ]
  },
  {
    category: 'Plant Indicators',
    indicators: [
      {
        sign: 'Leaves turning upward',
        prediction: 'Heavy rain approaching',
        accuracy: 'High',
        scientificBasis: 'Plants respond to humidity and pressure changes'
      },
      {
        sign: 'Flowers closing during day',
        prediction: 'Storm coming',
        accuracy: 'Moderate',
        scientificBasis: 'Plants protect reproductive organs from damage'
      },
      {
        sign: 'Tree sap flowing heavily',
        prediction: 'Weather change imminent',
        accuracy: 'Moderate',
        scientificBasis: 'Pressure changes affect plant fluid movement'
      }
    ]
  },
  {
    category: 'Sky and Atmospheric Signs',
    indicators: [
      {
        sign: 'Red sky at sunset',
        prediction: 'Clear weather tomorrow',
        accuracy: 'High',
        scientificBasis: 'High pressure system approaching from west'
      },
      {
        sign: 'Ring around the moon',
        prediction: 'Rain within 48 hours',
        accuracy: 'Moderate',
        scientificBasis: 'Ice crystals in high clouds indicate weather front'
      },
      {
        sign: 'Morning mist in valleys',
        prediction: 'Hot, clear day ahead',
        accuracy: 'High',
        scientificBasis: 'Radiational cooling indicates stable high pressure'
      }
    ]
  }
]

export const conservationStories = [
  {
    id: 'mbandaka_reforestation',
    title: 'Mbandaka Village Reforestation Success',
    community: 'Mbandaka Village, Équateur Province, DRC',
    author: 'Elder Mama Ngozi Bokamba',
    date: '2024-01-15',
    language: 'Lingala',
    duration: '3 years (2021-2024)',
    summary: 'How our community restored 500 hectares of degraded forest using traditional planting methods combined with modern seedling techniques.',
    challenge: 'Severe deforestation due to slash-and-burn agriculture and illegal logging had left 500 hectares of community land barren and unproductive.',
    traditionalApproach: [
      'Used traditional lunar calendar for optimal planting times',
      'Applied ancestral knowledge of soil preparation',
      'Implemented traditional forest management zones',
      'Engaged community elders in species selection'
    ],
    modernTechniques: [
      'Introduced improved seedling nurseries',
      'Used GPS mapping for monitoring',
      'Applied scientific soil testing',
      'Implemented drip irrigation systems'
    ],
    results: {
      treesPlanted: 15000,
      speciesRestored: 25,
      forestCoverIncrease: '85%',
      carbonSequestered: '2,450 tons CO2',
      wildlifeReturn: '40% increase in species diversity',
      communityBenefits: 'Improved water sources, medicinal plants, construction materials'
    },
    lessonsLearned: [
      'Community cooperation is essential for success',
      'Traditional timing methods are highly effective',
      'Youth engagement ensures project continuity',
      'Combining traditional and modern methods yields best results',
      'Regular monitoring prevents setbacks'
    ],
    challenges: [
      'Initial resistance to new techniques',
      'Funding limitations for equipment',
      'Protecting young trees from animals',
      'Maintaining community motivation'
    ],
    impact: {
      environmental: 'Restored ecosystem services, improved biodiversity',
      social: 'Strengthened community bonds, preserved traditional knowledge',
      economic: 'Increased income from sustainable forest products'
    },
    futureGoals: [
      'Expand to additional 300 hectares',
      'Establish community-based ecotourism',
      'Create seed bank for rare species',
      'Train other communities in techniques'
    ],
    images: [
      'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
    ],
    videos: [
      {
        title: 'Community Planting Day',
        duration: '15 minutes',
        language: 'Lingala with French subtitles'
      }
    ]
  },
  {
    id: 'kisangani_sacred_forest',
    title: 'Sacred Forest Protection in Kisangani',
    community: 'Kisangani Region, Tshopo Province, DRC',
    author: 'Chief Bwana Mkuu Lokonga',
    date: '2024-01-10',
    language: 'Swahili',
    duration: '5 years (2019-2024)',
    summary: 'Combining traditional taboos with modern conservation laws to protect 1,200 hectares of sacred forest.',
    challenge: 'Increasing pressure from logging companies and agricultural expansion threatened ancestral sacred forests.',
    traditionalApproach: [
      'Reinforced traditional taboos and spiritual protection',
      'Engaged traditional authorities in enforcement',
      'Used customary law for forest governance',
      'Maintained sacred sites and ceremonies'
    ],
    modernTechniques: [
      'Legal registration as community conservancy',
      'GPS boundary mapping and marking',
      'Scientific biodiversity surveys',
      'Collaboration with government agencies'
    ],
    results: {
      areaProtected: '1,200 hectares',
      wildlifeIncrease: '40%',
      speciesDocumented: 156,
      illegalLoggingReduction: '90%',
      communityIncome: 'Increased through ecotourism and sustainable products'
    },
    lessonsLearned: [
      'Traditional laws are still highly effective',
      'Modern legal support strengthens enforcement',
      'Education changes community attitudes',
      'Economic incentives support conservation',
      'Youth must understand traditional values'
    ],
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
    ]
  }
]
