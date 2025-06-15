import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Target, Users, Globe, Award, Leaf, Heart, TrendingUp, Shield } from 'lucide-react'

export default function AboutPage() {
    // Core Leadership Team
    const coreTeam = [{
            name: 'Mr. Ebelle Peter',
            role: 'Founder & CEO',
            bio: 'Visionary leader and environmental advocate dedicated to combating climate change in the Congo Basin. With deep roots in African conservation, Peter founded TAC-HUB to bridge the gap between traditional knowledge and modern climate solutions.',
            image: '/images/team/peter-ebelle.jpg', // 📸 ADD PETER'S PHOTO HERE
            isFounder: true
        },
        {
            name: 'Mr. Langmi Prosper Ngunu',
            role: 'Lead Developer & Technical Director',
            bio: 'Full-stack developer and technology innovator behind the TAC-HUB platform. Prosper combines technical expertise with passion for environmental conservation to create digital solutions that empower Congo Basin communities.',
            image: '/images/team/prosper-langmi.jpg', // 📸 ADD PROSPER'S PHOTO HERE
            isDeveloper: true
        }
    ]

    // Extended Team Members
    const teamMembers = [{
            name: 'Dr. Amina Kone',
            role: 'Environmental Research Director',
            bio: 'Climate scientist with 15+ years experience in African environmental policy and Congo Basin ecosystem research.',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
        },
        {
            name: 'Emmanuel Mbeki',
            role: 'Conservation Program Manager',
            bio: 'Former park ranger turned conservation leader, expert in Congo Basin ecosystems and community-based conservation.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
        },
        {
            name: 'Dr. Sarah Johnson',
            role: 'Forest Health Specialist',
            bio: 'Environmental researcher specializing in deforestation monitoring and forest health assessment in Central Africa.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
        },
        {
            name: 'James Okoye',
            role: 'Community Engagement Coordinator',
            bio: 'Community development specialist working with indigenous communities and local stakeholders across the Congo Basin.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
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

        { /* Hero Section */ } <
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
        conserving forests, and combating climate change across the continent.Our mission is to create sustainable solutions that protect our environment
        while empowering local communities. <
        /p> < /
        div > <
        /div> < /
        section >

        { /* Mission & Vision */ } <
        section className = "py-16" >
        <
        div className = "container-max" >
        <
        div className = "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" >
        <
        div >
        <
        h2 className = "text-3xl font-bold text-gray-900 mb-6" > Our Mission < /h2> <
        p className = "text-lg text-gray-600 mb-6 leading-relaxed" >
        To serve as the central hub
        for climate action in Africa, facilitating collaboration between communities, researchers, policymakers, and international partners to address the climate crisis through innovative,
        locally - driven solutions. <
        /p> <
        h3 className = "text-2xl font-bold text-gray-900 mb-4" > Our Vision < /h3> <
        p className = "text-lg text-gray-600 leading-relaxed" >
        A resilient Africa where thriving communities live in harmony with protected forests and sustainable ecosystems, leading the global fight against climate change. <
        /p> < /
        div > <
        div className = "relative" >
        <
        img src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
        alt = "African forest landscape"
        className = "rounded-lg shadow-lg w-full h-96 object-cover" /
        >
        <
        div className = "absolute inset-0 bg-primary-600 bg-opacity-20 rounded-lg" > < /div> < /
        div > <
        /div> < /
        div > <
        /section>

        { /* Achievements */ } <
        section className = "py-16 bg-gray-50" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl font-bold text-gray-900 mb-4" > Our Impact < /h2> <
        p className = "text-lg text-gray-600 max-w-2xl mx-auto" >
        Since our founding, we 've made significant strides in climate action across Africa < /
        p > <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" > {
            achievements.map((achievement, index) => ( <
                div key = { index }
                className = "bg-white rounded-lg p-6 text-center shadow-sm" >
                <
                div className = "w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4" >
                <
                achievement.icon className = "w-8 h-8 text-primary-600" / >
                <
                /div> <
                h3 className = "text-3xl font-bold text-gray-900 mb-2" > { achievement.number } < /h3> <
                p className = "text-gray-600" > { achievement.label } < /p> < /
                div >
            ))
        } <
        /div> < /
        div > <
        /section>

        { /* Our Values */ } <
        section className = "py-16" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl font-bold text-gray-900 mb-4" > Our Values < /h2> <
        p className = "text-lg text-gray-600 max-w-2xl mx-auto" >
        The principles that guide everything we do
            </p> < /
            div >

            <
            div className = "grid grid-cols-1 md:grid-cols-2 gap-8" > {
                values.map((value, index) => ( <
                    div key = { index }
                    className = "flex items-start space-x-4" >
                    <
                    div className = "w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0" >
                    <
                    value.icon className = "w-6 h-6 text-primary-600" / >
                    <
                    /div> <
                    div >
                    <
                    h3 className = "text-xl font-semibold text-gray-900 mb-2" > { value.title } < /h3> <
                    p className = "text-gray-600 leading-relaxed" > { value.description } < /p> < /
                    div > <
                    /div>
                ))
            } <
            /div> < /
            div > <
            /section>

        { /* Team Section */ } <
        section className = "py-16 bg-gray-50" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl font-bold text-gray-900 mb-4" > Our Leadership Team < /h2> <
        p className = "text-lg text-gray-600 max-w-2xl mx-auto" >
        Meet the passionate individuals leading our mission to combat climate change <
        /p> < /
        div >

        <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" > {
            teamMembers.map((member, index) => ( <
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
                p className = "text-gray-600 text-sm leading-relaxed" > { member.bio } < /p> < /
                div > <
                /div>
            ))
        } <
        /div> < /
        div > <
        /section>

        { /* What We Do */ } <
        section className = "py-16" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl font-bold text-gray-900 mb-4" > What We Do < /h2> < /
        div >

        <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-8" >
        <
        div className = "text-center" >
        <
        div className = "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <
        Leaf className = "w-8 h-8 text-green-600" / >
        <
        /div> <
        h3 className = "text-xl font-semibold text-gray-900 mb-3" > Forest Conservation < /h3> <
        p className = "text-gray-600 leading-relaxed" >
        We work with local communities to protect and restore forest ecosystems,
        focusing on the Congo Basin and other critical African forests. <
        /p> < /
        div >

        <
        div className = "text-center" >
        <
        div className = "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <
        TrendingUp className = "w-8 h-8 text-blue-600" / >
        <
        /div> <
        h3 className = "text-xl font-semibold text-gray-900 mb-3" > Climate Research < /h3> <
        p className = "text-gray-600 leading-relaxed" >
        Our research initiatives provide critical data on climate patterns,
        deforestation rates, and environmental health across the continent. <
        /p> < /
        div >

        <
        div className = "text-center" >
        <
        div className = "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4" >
        <
        Users className = "w-8 h-8 text-purple-600" / >
        <
        /div> <
        h3 className = "text-xl font-semibold text-gray-900 mb-3" > Community Empowerment < /h3> <
        p className = "text-gray-600 leading-relaxed" >
        We empower local communities with sustainable livelihood opportunities,
        education, and resources to become environmental stewards. <
        /p> < /
        div > <
        /div> < /
        div > <
        /section>

        { /* Call to Action */ } <
        section className = "py-16 bg-primary-600 text-white" >
        <
        div className = "container-max text-center" >
        <
        h2 className = "text-3xl font-bold mb-4" > Join Our Mission < /h2> <
        p className = "text-xl mb-8 opacity-90 max-w-2xl mx-auto" >
        Together, we can create a sustainable future
        for Africa and the world.Every action counts in the fight against climate change. <
        /p> <
        div className = "flex flex-col sm:flex-row gap-4 justify-center" >
        <
        a href = "/donate"
        className = "bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200" >
        Support Our Work <
        /a> <
        a href = "/submit-project"
        className = "bg-primary-700 hover:bg-primary-800 font-semibold py-3 px-8 rounded-lg transition-colors duration-200" >
        Submit a Project <
        /a> < /
        div > <
        /div> < /
        section >

        <
        Footer / >
        <
        /div>
    )
}