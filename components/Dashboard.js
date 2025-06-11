import { Calendar, Camera, Users, Shield, BookOpen, MessageCircle, TreePine, Smartphone } from 'lucide-react'

export default function Dashboard() {
    const features = [{
            icon: BookOpen,
            title: 'Community Knowledge Center',
            color: 'green',
            items: [
                { icon: Calendar, text: 'Traditional Calendar' },
                { icon: TreePine, text: 'Species Guide' },
                { icon: BookOpen, text: 'Weather Wisdom' },
                { icon: MessageCircle, text: 'Conservation Stories' }
            ]
        },
        {
            icon: Camera,
            title: 'Simple Monitoring Tools',
            color: 'blue',
            items: [
                { icon: Camera, text: 'Forest Health Checker' },
                { icon: Calendar, text: 'Weather Tracker' },
                { icon: TreePine, text: 'Wildlife Counter' },
                { icon: BookOpen, text: 'Carbon Calculator' }
            ]
        },
        {
            icon: Users,
            title: 'Community Communication',
            color: 'purple',
            items: [
                { icon: Users, text: 'Village Network' },
                { icon: BookOpen, text: 'Elder Teachings' },
                { icon: MessageCircle, text: 'Decision Making' },
                { icon: Users, text: 'External Partners' }
            ]
        },
        {
            icon: Shield,
            title: 'Data Protection',
            color: 'orange',
            items: [
                { icon: Shield, text: 'Community Ownership' },
                { icon: Shield, text: 'Privacy Controls' },
                { icon: Smartphone, text: 'Local Storage' },
                { icon: Shield, text: 'Simple Permissions' }
            ]
        }
    ]

    const getColorClasses = (color) => {
        const colors = {
            green: 'bg-green-100 text-green-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600'
        }
        return colors[color] || 'bg-gray-100 text-gray-600'
    }

    const getItemColorClasses = (color) => {
        const colors = {
            green: 'text-green-500',
            blue: 'text-blue-500',
            purple: 'text-purple-500',
            orange: 'text-orange-500'
        }
        return colors[color] || 'text-gray-500'
    }

    return ( <
        section className = "section-padding bg-gray-50" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl md:text-4xl font-bold text-gray-900 mb-4" >
        Main Features <
        /h2> <
        p className = "text-lg text-gray-600 max-w-4xl mx-auto" >
        TAC - HUB combines traditional knowledge with modern technology to empower Congo Basin communities in their fight against climate change
        while keeping communities in control. <
        /p> <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" > {
            features.map((feature, index) => ( <
                div key = { index }
                className = "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow" >
                <
                div className = { `p-3 ${getColorClasses(feature.color)} rounded-lg w-fit mb-4` } >
                <
                feature.icon className = "w-6 h-6" / >
                <
                /div> <
                h3 className = "text-xl font-bold text-gray-900 mb-3" > { feature.title } < /h3> <
                ul className = "text-gray-600 text-sm space-y-2" > {
                    feature.items.map((item, itemIndex) => ( <
                        li key = { itemIndex }
                        className = "flex items-center" >
                        <
                        item.icon className = { `w-4 h-4 mr-2 ${getItemColorClasses(feature.color)}` }
                        /> { item.text } <
                        /li>
                    ))
                } <
                /ul> <
                /div>
            ))
        } <
        /div>

        <
        div className = "text-center" >
        <
        a href = "/features"
        className = "btn-primary mr-4" >
        Explore All Features <
        /a> <
        a href = "/analytics"
        className = "btn-secondary" >
        View Analytics Dashboard <
        /a> <
        /div> <
        /div> <
        /section>
    )
}