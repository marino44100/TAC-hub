import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Target, Users, Globe, Award, Leaf, Heart, TrendingUp, Shield } from 'lucide-react'

export default function AboutPage() {
    const coreTeam = [{
            name: 'Mr. Ebelle Peter',
            role: 'Founder & CEO',
            bio: 'Visionary leader and environmental advocate dedicated to combating climate change in the Congo Basin. With deep roots in African conservation, Peter founded TAC-HUB to bridge the gap between traditional knowledge and modern climate solutions.',
            image: '/pictures/IMG-20250623-WA0040.jpg',
            isFounder: true
        },
        {
            name: 'Engr. Langmi Prosper Ngunu',
            role: 'Lead Developer & Technical Director',
            bio: 'Full-stack developer and technology innovator behind the TAC-HUB platform. Prosper combines technical expertise with passion for environmental conservation to create digital solutions that empower Congo Basin communities.',
            image: '/pictures/IMG-20250623-WA0034.jpg',
            isDeveloper: true
        }
    ]

    const achievements = [
        { icon: Leaf, number: '50,000+', label: 'Trees Planted' },
        { icon: Users, number: '1,200+', label: 'Families Supported' },
        { icon: Globe, number: '6', label: 'Countries Active' },
        { icon: Award, number: '25+', label: 'Projects Completed' }
    ]

    const values = [{
            icon: Target,
            title: 'Mission-Driven',
            description: 'Every action we take is guided by our commitment to combating climate change and protecting African forests.'
        },
        {
            icon: Users,
            title: 'Community-Centered',
            description: 'We believe in empowering local communities as the primary guardians of their natural resources.'
        },
        {
            icon: TrendingUp,
            title: 'Data-Driven',
            description: 'Our decisions are based on scientific research and real-time environmental monitoring.'
        },
        {
            icon: Shield,
            title: 'Transparent',
            description: 'We maintain full transparency in our operations, funding, and impact reporting.'
        }
    ]

    return ( <
        div className = "min-h-screen bg-white" >
        <
        Header / >
        <
        section className = "bg-gradient-to-br from-primary-50 to-primary-100 py-16" >
        <
        div className = "container-max" >
        <
        div className = "max-w-4xl mx-auto text-center" >
        <
        h1 className = "text-4xl md:text-5xl font-bold text-gray-900 mb-6" >
        About The African Climate Hub <
        /h1> <
        p className = "text-xl text-gray-600 leading-relaxed" >
        We are a pan - African organization dedicated to connecting communities,
        conserving forests, and combating climate change across the continent. <
        /p> <
        /div> <
        /div> <
        /section> <
        section className = "py-16 bg-gray-50" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl font-bold text-gray-900 mb-4" > Our Leadership Team < /h2> <
        p className = "text-lg text-gray-600 max-w-2xl mx-auto" >
        Meet the passionate individuals leading our mission to combat climate change <
        /p> <
        /div> <
        div className = "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" > {
            coreTeam.map((member, index) => ( <
                div key = { index }
                className = "bg-white rounded-lg overflow-hidden shadow-sm" >
                <
                img src = { member.image }
                alt = { member.name }
                className = "w-full h-64 object-cover" /
                >
                <
                div className = "p-6" >
                <
                h3 className = "text-xl font-semibold text-gray-900 mb-1" > { member.name } < /h3> <
                p className = "text-primary-600 font-medium mb-3" > { member.role } < /p> <
                p className = "text-gray-600 text-sm leading-relaxed" > { member.bio } < /p> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div> <
        /section> <
        Footer / >
        <
        /div>
    )
}