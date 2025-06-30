'use client'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageGallery() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const images = [{
            src: '/pictures/IMG-20250623-WA0040.jpg',
            alt: 'TAC-HUB Team Member',
            title: 'Our Team'
        },
        {
            src: '/pictures/IMG-20250623-WA0034.jpg',
            alt: 'TAC-HUB Developer',
            title: 'Technical Team'
        },
        {
            src: '/pictures/IMG-20250623-WA0033.jpg',
            alt: 'Congo Basin Forest Project',
            title: 'Forest Conservation'
        },
        {
            src: '/pictures/IMG-20250623-WA0032.jpg',
            alt: 'Environmental Project',
            title: 'Environmental Impact'
        },
        {
            src: '/pictures/IMG-20250623-WA0031.jpg',
            alt: 'Community Project',
            title: 'Community Engagement'
        },
        {
            src: '/pictures/IMG-20250623-WA0030.jpg',
            alt: 'Climate Action',
            title: 'Climate Action'
        },
        {
            src: '/pictures/IMG-20250623-WA0029.jpg',
            alt: 'African Landscape',
            title: 'African Landscape'
        },
        {
            src: '/pictures/IMG-20250623-WA0028.jpg',
            alt: 'Conservation Work',
            title: 'Conservation Efforts'
        },
        {
            src: '/pictures/IMG-20250623-WA0027.jpg',
            alt: 'Forest Monitoring',
            title: 'Forest Monitoring'
        },
        {
            src: '/pictures/IMG-20250623-WA0026.jpg',
            alt: 'Environmental Education',
            title: 'Environmental Education'
        },
        {
            src: '/pictures/IMG-20250623-WA0025.jpg',
            alt: 'Community Meeting',
            title: 'Community Meeting'
        },
        {
            src: '/pictures/IMG-20250623-WA0024.jpg',
            alt: 'Project Implementation',
            title: 'Project Implementation'
        }
    ]

    const openModal = (index) => {
        setSelectedImage(images[index])
        setCurrentIndex(index)
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length
        setSelectedImage(images[nextIndex])
        setCurrentIndex(nextIndex)
    }

    const prevImage = () => {
        const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
        setSelectedImage(images[prevIndex])
        setCurrentIndex(prevIndex)
    }

    return ( <
        section className = "section-padding bg-gray-50" >
        <
        div className = "container-max" >
        <
        div className = "text-center mb-12" >
        <
        h2 className = "text-3xl md:text-4xl font-bold text-gray-900 mb-4" >
        TAC - HUB in Action <
        /h2> <
        p className = "text-lg text-gray-600 max-w-2xl mx-auto" >
        Explore our work through these images showcasing our projects, team, and impact across the Congo Basin. <
        /p> < /
        div >

        <
        div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" > {
            images.map((image, index) => ( <
                div key = { index }
                className = "group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick = {
                    () => openModal(index)
                } >
                <
                div className = "relative aspect-square" >
                <
                img src = { image.src }
                alt = { image.alt }
                className = "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /
                >
                <
                div className = "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center" >
                <
                div className = "opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center" >
                <
                h3 className = "font-semibold text-lg" > { image.title } < /h3> <
                p className = "text-sm" > Click to view < /p> < /
                div > <
                /div> < /
                div > <
                /div>
            ))
        } <
        /div>

        { /* Modal */ } {
            selectedImage && ( <
                div className = "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" >
                <
                div className = "relative max-w-4xl max-h-full" >
                <
                button onClick = { closeModal }
                className = "absolute top-4 right-4 text-white hover:text-gray-300 z-10" >
                <
                X className = "w-8 h-8" / >
                <
                /button>

                <
                button onClick = { prevImage }
                className = "absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10" >
                <
                ChevronLeft className = "w-8 h-8" / >
                <
                /button>

                <
                button onClick = { nextImage }
                className = "absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10" >
                <
                ChevronRight className = "w-8 h-8" / >
                <
                /button>

                <
                img src = { selectedImage.src }
                alt = { selectedImage.alt }
                className = "max-w-full max-h-full object-contain rounded-lg" /
                >

                <
                div className = "absolute bottom-4 left-4 right-4 text-white text-center" >
                <
                h3 className = "text-xl font-semibold" > { selectedImage.title } < /h3> <
                p className = "text-sm opacity-90" > { selectedImage.alt } < /p> < /
                div > <
                /div> < /
                div >
            )
        } <
        /div> < /
        section >
    )
}