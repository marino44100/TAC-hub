'use client'
import { useCart } from '../contexts/CartContext'

export default function ResourcesLibrary() {
    const { addItem } = useCart()

    const books = [{
            id: 1,
            title: "ALL WE CAN SAVE",
            description: "All We Can Save illuminates the expertise and insights of dozens of diverse women leading on climate in the United States–scientists, journalists, farmers, lawyers, teachers, activists, innovators, wonks, and designers, across generations, geographies, and race–and aims to advance a more representative, nuanced, and solution-oriented public conversation on the climate crisis",
            image: "/api/placeholder/300/400",
            price: 49
        },
        {
            id: 2,
            title: "THE GREEN BOOK",
            description: "The book explores symbols of transformation, myths and futures; and is structured to encourage regular reflection. Each contributor brings their own perspective – green politics, change and loss, climate change denial, consumerism and our connection to nature.",
            image: "/api/placeholder/300/400",
            price: 64
        },
        {
            id: 3,
            title: "CLIMATE CHANGE SIMPLIFIED",
            description: "Only when the last tree has been cut down, the last fish been caught, and the last stream poisoned, will we realize we cannot eat money. This simple yet sobering truth holds a mirror to our society's unsustainable trajectory.",
            image: "/api/placeholder/300/400",
            price: 85
        }
    ]

    return ( <
        section id = "resources"
        className = "section-padding bg-gray-50" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl md:text-4xl font-bold text-gray-900 mb-4" >
        Resources And Library <
        /h2> <
        p className = "text-lg text-gray-600 max-w-4xl mx-auto" >
        Our resource library is your gateway to a wealth of carefully curated materials designed to inform, inspire, and empower individuals, communities, and organizations to take meaningful action against climate change. <
        /p> <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" > {
            books.map((book, index) => ( <
                div key = { index }
                className = "card card-hover" >
                <
                div className = "h-64 bg-gray-200 flex items-center justify-center" >
                <
                span className = "text-gray-500" > Book Cover < /span> <
                /div> <
                div className = "p-6" >
                <
                h3 className = "text-xl font-bold text-gray-900 mb-3" >
                BOOK TITLE: { book.title } <
                /h3> <
                p className = "text-gray-600 mb-4 line-clamp-4" > { book.description } <
                /p> <
                div className = "flex justify-between items-center" >
                <
                span className = "text-lg font-semibold text-primary-600" > { book.price }
                CFA <
                /span> <
                button onClick = {
                    () => addItem(book) }
                className = "btn-primary text-sm" >
                Add to Cart <
                /button> <
                /div> <
                /div> <
                /div>
            ))
        } <
        /div>

        <
        div className = "text-center" >
        <
        a href = "/shop"
        className = "btn-primary" >
        Explore Library <
        /a> <
        /div> <
        /div> <
        /section>
    )
}