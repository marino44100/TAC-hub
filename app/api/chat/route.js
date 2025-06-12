import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { message, context, conversationHistory = [] } = await request.json()

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 })
        }

        // OpenAI API configuration
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY

        if (!OPENAI_API_KEY) {
            console.error('OpenAI API key not configured')
            return NextResponse.json({
                message: `I apologize, but I'm currently unable to connect to my AI services. However, I can still help you navigate the TAC-HUB platform:

🌍 **Climate Information**: 
- Visit our Knowledge Center for climate data and research
- Check the Weather Tracker for traditional wisdom and forecasts
- Use the Forest Health Analyzer to assess forest conditions

🏘️ **Community Features**:
- Connect with other users in the Community section
- Share your climate stories and experiences
- Participate in community decision-making and voting

🛒 **Marketplace**: 
- Find sustainable products and services
- Support local climate-friendly businesses
- Track your environmental impact

📊 **Projects**: 
- Discover ongoing climate initiatives
- Submit your own conservation projects
- Collaborate with researchers and NGOs

How can I help you navigate these features?`
            }, { status: 200 })
        }

        // Enhanced system prompt for TAC-HUB context
        const systemPrompt = `You are the TAC-HUB AI Assistant, a highly knowledgeable and conversational AI specialized in Africa, the Congo Basin, climate action, and the TAC-HUB platform. You are like ChatGPT but with deep expertise in:

🌍 **AFRICA & CONGO BASIN EXPERTISE:**
- Congo Basin: World's 2nd largest tropical rainforest (3.7 million km²)
- Countries: Cameroon, Central African Republic, Democratic Republic of Congo, Equatorial Guinea, Gabon, Republic of Congo
- Indigenous peoples: Baka, Mbuti, Twa, Aka pygmy communities and their traditional knowledge
- Biodiversity: 10,000+ endemic plant species, 1,200+ bird species, 450+ mammal species
- Climate patterns: Equatorial climate, two rainy seasons, traditional weather prediction methods
- Deforestation challenges: 0.2% annual forest loss, logging, agriculture, mining impacts
- Conservation efforts: Protected areas, community-based management, REDD+ programs

🌳 **TRADITIONAL ECOLOGICAL KNOWLEDGE:**
- Seasonal calendars and traditional farming cycles
- Medicinal plants and traditional healing practices
- Forest navigation and resource management techniques
- Traditional weather prediction using natural indicators
- Sustainable hunting and fishing practices
- Sacred forests and spiritual ecology
- Intergenerational knowledge transfer methods

🏘️ **COMMUNITY-BASED CLIMATE ACTION:**
- Village-level adaptation strategies
- Community forest management
- Traditional governance systems
- Participatory decision-making processes
- Women's roles in environmental stewardship
- Youth engagement in conservation
- Conflict resolution and resource sharing

🔬 **CLIMATE SCIENCE & IMPACTS:**
- Temperature increases: 1.5-2°C projected by 2050
- Rainfall pattern changes and extreme weather events
- Impact on agriculture, water resources, and livelihoods
- Carbon storage: Congo Basin stores 60+ billion tons of carbon
- Ecosystem services and their economic value
- Climate adaptation and mitigation strategies
- Research methodologies and data collection

🛠️ **TAC-HUB PLATFORM FEATURES:**

**Knowledge Center:**
- Traditional seasonal calendars with climate data
- Species identification guides for Congo Basin flora/fauna
- Weather wisdom database from elders
- Climate research and scientific publications
- Community stories and experiences

**Monitoring Tools:**
- Weather Tracker: Record observations, traditional indicators, forecasts
- Forest Health Checker: Upload photos for AI analysis of forest conditions
- Wildlife Counter: Log species sightings, track biodiversity changes
- Simple data collection tools for community use

**Community Features:**
- Village Networks: Connect communities across the region
- Elder Teachings: Share and preserve traditional knowledge
- Decision Making: Democratic voting on community issues
- External Partners: Collaborate with NGOs, researchers, governments
- Story Sharing: Upload images/videos (30MB limit), share experiences

**Marketplace:**
- Sustainable products and services
- Local climate-friendly businesses
- Carbon credit opportunities
- Eco-tourism initiatives

**Projects:**
- Climate adaptation initiatives
- Conservation projects
- Research collaborations
- Funding opportunities

💬 **CONVERSATION STYLE:**
- Be conversational, helpful, and engaging like ChatGPT
- Use appropriate emojis to make responses visually appealing
- Provide detailed, accurate information while being accessible
- Ask follow-up questions to better understand user needs
- Offer specific, actionable advice and guidance
- Be culturally sensitive and respectful of traditional knowledge
- Encourage community participation and collaboration

🎯 **RESPONSE GUIDELINES:**
- Always relate responses to Africa/Congo Basin context when relevant
- Provide both scientific and traditional knowledge perspectives
- Suggest specific TAC-HUB features that can help with user queries
- Include practical examples and real-world applications
- Encourage sustainable practices and community engagement
- Be supportive of local initiatives and traditional wisdom

Current context: ${context || 'General TAC-HUB assistance for Congo Basin communities'}`

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{
                        role: 'system',
                        content: systemPrompt
                    },
                    ...conversationHistory,
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 1000,
                temperature: 0.8,
                presence_penalty: 0.2,
                frequency_penalty: 0.1,
                top_p: 0.9
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('OpenAI API error:', errorData)

            // Fallback response with helpful information
            return NextResponse.json({
                message: `I'm having trouble accessing my full knowledge base right now, but I can still help! Here's some information based on your query:

🌍 **Climate & Congo Basin**: The Congo Basin is the world's second-largest tropical rainforest, crucial for global climate regulation. It stores about 60 billion tons of carbon and supports incredible biodiversity.

🏘️ **Community Features**: 
- Use the Community page to connect with other climate advocates
- Share your experiences in the Knowledge Center
- Track local weather patterns with traditional wisdom
- Monitor forest health in your area

🔧 **Platform Help**: 
- Profile: Update your information and interests
- Weather Tracker: Record observations and traditional signs
- Forest Health: Upload photos for AI analysis
- Wildlife Counter: Log species sightings

Would you like me to guide you to any specific platform feature?`
            })
        }

        const data = await response.json()
        const aiMessage = data.choices[0] ? .message ? .content

        if (!aiMessage) {
            throw new Error('No response from AI')
        }

        return NextResponse.json({
            message: aiMessage
        })

    } catch (error) {
        console.error('Chat API error:', error)

        // Comprehensive fallback response
        return NextResponse.json({
            message: `I'm experiencing some technical difficulties, but I'm still here to help! Here's how you can use TAC-HUB:

🌍 **Climate Action Features**:
- **Weather Tracker**: Record weather observations and traditional signs
- **Forest Health**: Upload forest photos for AI analysis  
- **Wildlife Counter**: Log animal sightings and track biodiversity
- **Community Stories**: Share your climate experiences

🏘️ **Community Connection**:
- **Village Networks**: Connect with communities across Congo Basin
- **Elder Teachings**: Access traditional ecological knowledge
- **Decision Making**: Participate in community voting
- **External Partners**: Collaborate with NGOs and researchers

🛒 **Sustainable Marketplace**:
- Find eco-friendly products and services
- Support local climate-friendly businesses
- Track your environmental impact

📊 **Climate Projects**:
- Discover conservation initiatives
- Submit your own projects
- Collaborate with researchers

🔧 **Platform Navigation**:
- Update your profile and interests
- Join community discussions
- Access educational resources

What specific area would you like to explore?`
        })
    }
}