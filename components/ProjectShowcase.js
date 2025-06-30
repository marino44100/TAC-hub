export default function ProjectShowcase() {
    const projects = [{
            title: "Congo Basin Forest Fund (CBFF) Projects",
            description: "Launched in 2008, the CBFF supported over 40 projects aimed at reducing deforestation and forest degradation while improving the livelihoods of local communities. The projects focused on sustainable forest management, promoting alternative livelihoods to logging, and enhancing local communities' resilience to climate change.",
            impact: "Helped mitigate climate change by conserving forests and reducing emissions from deforestation. Several projects involved the promotion of agroforestry and sustainable agriculture practices.",
            partners: "African Development Bank (AfDB), Congo Basin countries, UK and Norway.",
            image: "/pictures/IMG-20250623-WA0033.jpg"
        },
        {
            title: "Mai Ndombe REDD+ Project",
            description: "The Mai Ndombe project in the Democratic Republic of the Congo (DRC) is one of the largest REDD+ (Reducing Emissions from Deforestation and Forest Degradation) projects in the Congo Basin. It aims to protect 300,000 hectares of forest while enhancing community livelihoods.",
            impact: "Prevented deforestation and generated carbon credits through forest conservation and sustainable land use. The project also provided jobs and training for local communities in sustainable forestry and agriculture.",
            partners: "Wildlife Works, local communities, World Bank's Forest Carbon Partnership Facility.",
            image: "/pictures/IMG-20250623-WA0032.jpg"
        },
        {
            title: "Tridom Project (Tri-national Dja-Odzala-Minkébé)",
            description: "This project is a transboundary conservation initiative between Cameroon, Gabon, and the Republic of Congo, focusing on the conservation of over 14 million hectares of contiguous forest area. It works to reduce deforestation and protect biodiversity through sustainable land use and law enforcement against illegal logging and poaching.",
            impact: "Reduced deforestation, protected biodiversity, and enhanced ecosystem resilience. The project also promotes eco-friendly tourism as a sustainable alternative to harmful forest exploitation.",
            partners: "World Wide Fund for Nature (WWF), governments of Cameroon, Gabon, and Congo.",
            image: "/pictures/IMG-20250623-WA0031.jpg"
        },
        {
            title: "Mbam et Djerem National Park – Conservation and Community Livelihoods Project",
            description: "Located in Cameroon, the project aimed at preserving biodiversity in Mbam et Djerem National Park while improving the resilience of surrounding communities to climate change. It involved sustainable farming practices, agroforestry, and capacity-building programs for local farmers.",
            impact: "Reduced pressure on forest resources by providing alternative livelihoods, improved food security, and contributed to biodiversity conservation.",
            partners: "Global Environment Facility (GEF), Government of Cameroon, BirdLife International.",
            image: "/pictures/IMG-20250623-WA0030.jpg"
        }
    ]

    return ( <
        section className = "section-padding bg-white" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl md:text-4xl font-bold text-gray-900 mb-4" >
        Project Showcase <
        /h2> <
        p className = "text-lg text-gray-600 max-w-4xl mx-auto" >
        These projects are not just ideas— they are real - world solutions that are making a tangible difference in the fight against climate change, deforestation, and environmental degradation. <
        /p> <
        /div>

        <
        div className = "space-y-12" > {
            projects.map((project, index) => ( <
                div key = { index }
                className = { `flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center` } >
                <
                div className = "lg:w-1/2" >
                <
                img src = { project.image }
                alt = { project.title }
                className = "h-64 lg:h-80 w-full object-cover rounded-lg shadow-lg" /
                >
                <
                /div> <
                div className = "lg:w-1/2" >
                <
                h3 className = "text-2xl font-bold text-gray-900 mb-4" > { project.title } <
                /h3> <
                p className = "text-gray-600 mb-4" >
                <
                strong > Description: < /strong> {project.description} <
                /p> <
                p className = "text-gray-600 mb-4" >
                <
                strong > Key Impact: < /strong> {project.impact} <
                /p> <
                p className = "text-gray-600" >
                <
                strong > Partners: < /strong> {project.partners} <
                /p> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div> <
        /section>
    )
}