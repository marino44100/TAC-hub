import Header from '../components/Header'
import Hero from '../components/Hero'
import Dashboard from '../components/Dashboard'
import HowItWorks from '../components/HowItWorks'
import ResourcesLibrary from '../components/ResourcesLibrary'
import ProjectShowcase from '../components/ProjectShowcase'
import ClimateInfo from '../components/ClimateInfo'
import CallToAction from '../components/CallToAction'
import WhyJoinUs from '../components/WhyJoinUs'
import ClimateServices from '../components/ClimateServices'
import ImageGallery from '../components/ImageGallery'
import Footer from '../components/Footer'
import ShoppingCart from '../components/ShoppingCart'

export default function Home() {
    return ( <
        main className = "min-h-screen" >
        <
        Header / >
        <
        ShoppingCart / >
        <
        Hero / >
        <
        Dashboard / >
        <
        HowItWorks / >
        <
        ResourcesLibrary / >
        <
        ProjectShowcase / >
        <
        ImageGallery / >
        <
        ClimateInfo / >
        <
        CallToAction / >
        <
        WhyJoinUs / >
        <
        ClimateServices / >
        <
        Footer / >
        <
        /main>
    )
}