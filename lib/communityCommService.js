export class CommunityCommService {
    constructor() {
        this.storageKey = 'tac-hub-community-comm'
    }

    // Generate initial community communication data
    generateInitialData() {
        return {
            villageNetworks: [
                {
                    id: 'network_baka_cameroon',
                    name: 'Baka Villages Network - East Cameroon',
                    region: 'East Cameroon',
                    villages: ['Djoum', 'Mintom', 'Sangmelima', 'Abong-Mbang'],
                    population: 15000,
                    languages: ['Baka', 'French'],
                    coordinator: 'Chief Ngozi Mbala',
                    established: '2019-03-15',
                    status: 'active',
                    description: 'Network of Baka communities focused on forest conservation and traditional knowledge preservation',
                    activities: [
                        'Monthly village assemblies',
                        'Traditional knowledge documentation',
                        'Forest monitoring programs',
                        'Youth education initiatives'
                    ],
                    challenges: [
                        'Limited internet connectivity',
                        'Language barriers with external partners',
                        'Seasonal accessibility during rains'
                    ],
                    achievements: [
                        'Established 5 community forests',
                        'Trained 50 youth in traditional practices',
                        'Created digital archive of 200+ traditional songs'
                    ]
                },
                {
                    id: 'network_mbuti_drc',
                    name: 'Mbuti Forest Communities - Ituri',
                    region: 'Ituri Forest, DRC',
                    villages: ['Epulu', 'Mambasa', 'Beni', 'Bunia'],
                    population: 8500,
                    languages: ['Mbuti', 'Lingala', 'French'],
                    coordinator: 'Elder Kenge Molimo',
                    established: '2020-07-22',
                    status: 'active',
                    description: 'Mbuti pygmy communities network for cultural preservation and sustainable forest management',
                    activities: [
                        'Traditional hunting regulation',
                        'Medicinal plant conservation',
                        'Cultural ceremony coordination',
                        'Conflict resolution councils'
                    ],
                    challenges: [
                        'Encroachment by agricultural communities',
                        'Loss of traditional territories',
                        'Youth migration to cities'
                    ],
                    achievements: [
                        'Secured 3 traditional territories',
                        'Established medicinal plant gardens',
                        'Reduced human-wildlife conflicts by 60%'
                    ]
                }
            ],
            elderTeachings: [
                {
                    id: 'teaching_forest_spirits',
                    title: 'Forest Spirits and Conservation Ethics',
                    elder: 'Mama Ngozi Baka',
                    community: 'Baka - Djoum Village',
                    category: 'Spiritual Ecology',
                    language: 'Baka/French',
                    dateRecorded: '2023-11-15',
                    duration: '45 minutes',
                    summary: 'Traditional beliefs about forest spirits and how they guide sustainable hunting and gathering practices',
                    keyTeachings: [
                        'Every tree has a spirit that must be respected',
                        'Take only what you need, leave the rest for future generations',
                        'The forest provides for those who protect it',
                        'Ceremonies must be performed before major hunts'
                    ],
                    practicalApplications: [
                        'Sustainable hunting quotas based on spiritual calendar',
                        'Sacred grove protection protocols',
                        'Traditional blessing ceremonies for new hunters',
                        'Seasonal restrictions on certain species'
                    ],
                    status: 'approved',
                    views: 1250,
                    likes: 89,
                    comments: 23,
                    audioFile: 'forest_spirits_teaching.mp3',
                    transcript: 'Available in Baka and French'
                },
                {
                    id: 'teaching_water_wisdom',
                    title: 'Reading the Waters: Traditional Fishing Knowledge',
                    elder: 'Papa Kenge Molimo',
                    community: 'Mbuti - Epulu Village',
                    category: 'Traditional Skills',
                    language: 'Mbuti/Lingala',
                    dateRecorded: '2023-10-28',
                    duration: '38 minutes',
                    summary: 'Ancient techniques for reading water conditions, fish behavior, and sustainable fishing practices',
                    keyTeachings: [
                        'Water color tells you fish location and health',
                        'Moon phases determine best fishing times',
                        'Certain fish are messengers of seasonal changes',
                        'Fishing nets must be blessed by water spirits'
                    ],
                    practicalApplications: [
                        'Traditional fish trap construction',
                        'Seasonal fishing calendar',
                        'Water quality assessment methods',
                        'Community fishing regulations'
                    ],
                    status: 'approved',
                    views: 892,
                    likes: 67,
                    comments: 15,
                    audioFile: 'water_wisdom_teaching.mp3',
                    transcript: 'Available in Mbuti and Lingala'
                }
            ],
            decisionMaking: [
                {
                    id: 'decision_forest_boundary',
                    title: 'Community Forest Boundary Expansion',
                    proposedBy: 'Baka Villages Network',
                    category: 'Land Management',
                    priority: 'high',
                    status: 'voting',
                    dateProposed: '2023-12-01',
                    votingDeadline: '2023-12-15',
                    description: 'Proposal to expand community forest boundaries to include additional 500 hectares for traditional medicine collection',
                    details: {
                        currentArea: '2,000 hectares',
                        proposedExpansion: '500 hectares',
                        estimatedCost: '$15,000 USD',
                        timeframe: '6 months',
                        beneficiaries: '15 villages, 3,000 people'
                    },
                    supportingDocuments: [
                        'Traditional use maps',
                        'Biodiversity assessment',
                        'Community consultation reports'
                    ],
                    votes: {
                        total: 45,
                        inFavor: 38,
                        against: 5,
                        abstain: 2
                    },
                    eligibleVoters: 52,
                    comments: [
                        {
                            id: 'comment_1',
                            author: 'Chief Ngozi Mbala',
                            role: 'Village Coordinator',
                            date: '2023-12-03',
                            content: 'This expansion is crucial for preserving our medicinal plant knowledge. The area contains rare species used in traditional healing.',
                            likes: 12
                        },
                        {
                            id: 'comment_2',
                            author: 'Elder Marie Baka',
                            role: 'Traditional Healer',
                            date: '2023-12-04',
                            content: 'I support this proposal. My grandmother taught me about plants in this area that are becoming harder to find.',
                            likes: 8
                        }
                    ]
                },
                {
                    id: 'decision_youth_program',
                    title: 'Traditional Knowledge Youth Education Program',
                    proposedBy: 'Mbuti Forest Communities',
                    category: 'Education',
                    priority: 'medium',
                    status: 'approved',
                    dateProposed: '2023-11-20',
                    votingDeadline: '2023-11-30',
                    dateApproved: '2023-11-30',
                    description: 'Establish a formal program to teach traditional forest skills to youth aged 12-18',
                    details: {
                        duration: '12 months pilot program',
                        participants: '50 youth from 8 villages',
                        curriculum: 'Traditional hunting, plant identification, forest navigation, cultural ceremonies',
                        budget: '$8,500 USD',
                        instructors: '10 community elders'
                    },
                    votes: {
                        total: 38,
                        inFavor: 35,
                        against: 1,
                        abstain: 2
                    },
                    eligibleVoters: 40,
                    implementationStatus: 'planning',
                    nextSteps: [
                        'Recruit youth participants',
                        'Schedule elder instructors',
                        'Prepare learning materials',
                        'Set up forest classroom sites'
                    ]
                }
            ],
            externalPartners: [
                {
                    id: 'partner_wwf_cameroon',
                    name: 'WWF Cameroon',
                    type: 'International NGO',
                    category: 'Conservation',
                    country: 'Cameroon',
                    established: '2018-05-10',
                    status: 'active',
                    contactPerson: 'Dr. Sarah Mbongo',
                    email: 'sarah.mbongo@wwf.cm',
                    phone: '+237-677-123-456',
                    description: 'Partnership focused on community-based forest conservation and sustainable livelihoods',
                    currentProjects: [
                        'Community Forest Management Training',
                        'Sustainable NTFP Harvesting Program',
                        'Human-Wildlife Conflict Mitigation',
                        'Climate Change Adaptation Planning'
                    ],
                    funding: {
                        totalCommitted: '$250,000 USD',
                        disbursed: '$180,000 USD',
                        remaining: '$70,000 USD',
                        period: '2023-2025'
                    },
                    achievements: [
                        'Trained 120 community members in forest management',
                        'Established 8 community forests',
                        'Reduced deforestation by 35% in target areas',
                        'Created 200 sustainable livelihood opportunities'
                    ],
                    challenges: [
                        'Bureaucratic delays in permit processing',
                        'Limited local technical capacity',
                        'Seasonal accessibility issues'
                    ],
                    upcomingActivities: [
                        'Annual community forest assessment (Jan 2024)',
                        'Youth leadership training (Feb 2024)',
                        'Traditional knowledge documentation workshop (Mar 2024)'
                    ]
                },
                {
                    id: 'partner_cifor_drc',
                    name: 'CIFOR-ICRAF DRC',
                    type: 'Research Institution',
                    category: 'Research & Development',
                    country: 'DRC',
                    established: '2019-09-15',
                    status: 'active',
                    contactPerson: 'Prof. Jean-Baptiste Mumbere',
                    email: 'j.mumbere@cifor-icraf.org',
                    phone: '+243-812-345-678',
                    description: 'Research partnership on traditional ecological knowledge and climate adaptation strategies',
                    currentProjects: [
                        'Traditional Weather Prediction Systems Study',
                        'Indigenous Forest Management Practices Research',
                        'Climate Adaptation Knowledge Documentation',
                        'Community-Based Monitoring Systems'
                    ],
                    funding: {
                        totalCommitted: '$180,000 USD',
                        disbursed: '$120,000 USD',
                        remaining: '$60,000 USD',
                        period: '2023-2024'
                    },
                    achievements: [
                        'Documented 150+ traditional weather indicators',
                        'Published 5 peer-reviewed research papers',
                        'Trained 30 community researchers',
                        'Developed digital knowledge platform'
                    ],
                    challenges: [
                        'Internet connectivity in remote areas',
                        'Language barriers in research documentation',
                        'Intellectual property concerns from communities'
                    ],
                    upcomingActivities: [
                        'Traditional knowledge validation workshop (Jan 2024)',
                        'Community researcher certification (Feb 2024)',
                        'Research findings dissemination (Mar 2024)'
                    ]
                }
            ],
            communications: [
                {
                    id: 'comm_monthly_update_dec',
                    type: 'network_update',
                    title: 'December 2023 Village Network Update',
                    author: 'Chief Ngozi Mbala',
                    authorRole: 'Network Coordinator',
                    network: 'Baka Villages Network',
                    date: '2023-12-05',
                    priority: 'normal',
                    status: 'published',
                    content: 'Monthly update on network activities, upcoming events, and community achievements. This month we celebrated the completion of our traditional medicine garden project.',
                    attachments: [
                        'monthly_report_dec2023.pdf',
                        'medicine_garden_photos.zip'
                    ],
                    tags: ['monthly-update', 'achievements', 'traditional-medicine'],
                    views: 234,
                    likes: 45,
                    comments: 12,
                    language: 'French'
                }
            ]
        }
    }

    // Data management methods
    getData() {
        if (typeof window === 'undefined') return this.generateInitialData()
        
        const data = localStorage.getItem(this.storageKey)
        return data ? JSON.parse(data) : this.generateInitialData()
    }

    saveData(data) {
        if (typeof window === 'undefined') return
        localStorage.setItem(this.storageKey, JSON.stringify(data))
    }

    // Village Networks
    getVillageNetworks() {
        const data = this.getData()
        return data.villageNetworks || []
    }

    addVillageNetwork(network, user) {
        if (typeof window === 'undefined') return
        if (!user) throw new Error('User must be logged in')

        const data = this.getData()
        const newNetwork = {
            ...network,
            id: 'network_' + Date.now(),
            createdBy: user.id,
            createdAt: new Date().toISOString(),
            status: 'pending_approval'
        }

        data.villageNetworks = data.villageNetworks || []
        data.villageNetworks.push(newNetwork)
        
        this.saveData(data)
        return newNetwork
    }

    // Elder Teachings
    getElderTeachings(status = 'approved') {
        const data = this.getData()
        return (data.elderTeachings || []).filter(teaching => teaching.status === status)
    }

    addElderTeaching(teaching, user) {
        if (typeof window === 'undefined') return
        if (!user) throw new Error('User must be logged in')

        const data = this.getData()
        const newTeaching = {
            ...teaching,
            id: 'teaching_' + Date.now(),
            submittedBy: user.id,
            submittedAt: new Date().toISOString(),
            status: 'pending_review',
            views: 0,
            likes: 0,
            comments: 0
        }

        data.elderTeachings = data.elderTeachings || []
        data.elderTeachings.unshift(newTeaching)
        
        this.saveData(data)
        return newTeaching
    }

    // Decision Making
    getDecisions(status = null) {
        const data = this.getData()
        const decisions = data.decisionMaking || []
        return status ? decisions.filter(d => d.status === status) : decisions
    }

    addDecision(decision, user) {
        if (typeof window === 'undefined') return
        if (!user) throw new Error('User must be logged in')

        const data = this.getData()
        const newDecision = {
            ...decision,
            id: 'decision_' + Date.now(),
            proposedBy: user.name,
            proposerId: user.id,
            dateProposed: new Date().toISOString(),
            status: 'voting',
            votes: { total: 0, inFavor: 0, against: 0, abstain: 0 },
            comments: []
        }

        data.decisionMaking = data.decisionMaking || []
        data.decisionMaking.unshift(newDecision)
        
        this.saveData(data)
        return newDecision
    }

    vote(decisionId, voteType, user) {
        if (typeof window === 'undefined') return
        if (!user) throw new Error('User must be logged in to vote')

        const data = this.getData()
        const decision = data.decisionMaking?.find(d => d.id === decisionId)
        
        if (!decision) throw new Error('Decision not found')
        if (decision.status !== 'voting') throw new Error('Voting is closed for this decision')

        // Check if user already voted
        decision.voters = decision.voters || []
        if (decision.voters.includes(user.id)) {
            throw new Error('You have already voted on this decision')
        }

        // Record vote
        decision.votes[voteType]++
        decision.votes.total++
        decision.voters.push(user.id)

        this.saveData(data)
        return decision
    }

    // External Partners
    getExternalPartners() {
        const data = this.getData()
        return data.externalPartners || []
    }

    addExternalPartner(partner, user) {
        if (typeof window === 'undefined') return
        if (!user) throw new Error('User must be logged in')

        const data = this.getData()
        const newPartner = {
            ...partner,
            id: 'partner_' + Date.now(),
            addedBy: user.id,
            addedAt: new Date().toISOString(),
            status: 'active'
        }

        data.externalPartners = data.externalPartners || []
        data.externalPartners.push(newPartner)
        
        this.saveData(data)
        return newPartner
    }

    // Communications
    getCommunications() {
        const data = this.getData()
        return data.communications || []
    }

    addCommunication(communication, user) {
        if (typeof window === 'undefined') return
        if (!user) throw new Error('User must be logged in')

        const data = this.getData()
        const newComm = {
            ...communication,
            id: 'comm_' + Date.now(),
            author: user.name,
            authorId: user.id,
            date: new Date().toISOString(),
            status: 'published',
            views: 0,
            likes: 0,
            comments: 0
        }

        data.communications = data.communications || []
        data.communications.unshift(newComm)
        
        this.saveData(data)
        return newComm
    }

    // Admin methods
    approveTeaching(teachingId) {
        if (typeof window === 'undefined') return

        const data = this.getData()
        const teaching = data.elderTeachings?.find(t => t.id === teachingId)
        
        if (teaching) {
            teaching.status = 'approved'
            teaching.approvedAt = new Date().toISOString()
            this.saveData(data)
        }
        
        return teaching
    }

    approveNetwork(networkId) {
        if (typeof window === 'undefined') return

        const data = this.getData()
        const network = data.villageNetworks?.find(n => n.id === networkId)
        
        if (network) {
            network.status = 'active'
            network.approvedAt = new Date().toISOString()
            this.saveData(data)
        }
        
        return network
    }

    // Statistics
    getStatistics() {
        const data = this.getData()
        return {
            totalNetworks: data.villageNetworks?.length || 0,
            activeNetworks: data.villageNetworks?.filter(n => n.status === 'active').length || 0,
            totalTeachings: data.elderTeachings?.length || 0,
            approvedTeachings: data.elderTeachings?.filter(t => t.status === 'approved').length || 0,
            activeDecisions: data.decisionMaking?.filter(d => d.status === 'voting').length || 0,
            totalPartners: data.externalPartners?.length || 0,
            totalCommunications: data.communications?.length || 0
        }
    }
}
