'use client'
import { useRouter } from 'next/navigation'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

export default function ShoppingCart() {
    const { items, removeItem, updateQuantity, getTotalPrice, isOpen, setIsOpen } = useCart()
    const { user } = useAuth()
    const router = useRouter()

    const handleCheckout = () => {
        if (!user) {
            alert('Please login to checkout')
            return
        }

        setIsOpen(false)
        router.push('/checkout')
    }

    if (!isOpen) return null

    return ( <
        div className = "fixed inset-0 z-50 overflow-hidden" >
        <
        div className = "absolute inset-0 bg-black bg-opacity-50"
        onClick = {
            () => setIsOpen(false) }
        />

        <
        div className = "absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl" >
        <
        div className = "flex flex-col h-full" > { /* Header */ } <
        div className = "flex items-center justify-between p-6 border-b" >
        <
        h2 className = "text-lg font-semibold text-gray-900" > Shopping Cart < /h2> <
        button onClick = {
            () => setIsOpen(false) }
        className = "text-gray-400 hover:text-gray-600" >
        <
        X className = "w-6 h-6" / >
        <
        /button> <
        /div>

        { /* Cart Items */ } <
        div className = "flex-1 overflow-y-auto p-6" > {
            items.length === 0 ? ( <
                div className = "text-center py-12" >
                <
                ShoppingBag className = "w-12 h-12 text-gray-400 mx-auto mb-4" / >
                <
                p className = "text-gray-500" > Your cart is empty < /p> <
                /div>
            ) : ( <
                div className = "space-y-4" > {
                    items.map((item) => ( <
                        div key = { item.id }
                        className = "flex items-center space-x-4 bg-gray-50 p-4 rounded-lg" >
                        <
                        div className = "w-16 h-16 bg-gray-200 rounded flex items-center justify-center" >
                        <
                        span className = "text-xs text-gray-500" > Book < /span> <
                        /div>

                        <
                        div className = "flex-1" >
                        <
                        h3 className = "font-medium text-gray-900 text-sm" > { item.title } < /h3> <
                        p className = "text-primary-600 font-semibold" > { item.price }
                        CFA < /p> <
                        /div>

                        <
                        div className = "flex items-center space-x-2" >
                        <
                        button onClick = {
                            () => updateQuantity(item.id, item.quantity - 1) }
                        className = "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300" >
                        <
                        Minus className = "w-4 h-4" / >
                        <
                        /button> <
                        span className = "w-8 text-center" > { item.quantity } < /span> <
                        button onClick = {
                            () => updateQuantity(item.id, item.quantity + 1) }
                        className = "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300" >
                        <
                        Plus className = "w-4 h-4" / >
                        <
                        /button> <
                        /div>

                        <
                        button onClick = {
                            () => removeItem(item.id) }
                        className = "text-red-500 hover:text-red-700" >
                        <
                        X className = "w-4 h-4" / >
                        <
                        /button> <
                        /div>
                    ))
                } <
                /div>
            )
        } <
        /div>

        { /* Footer */ } {
            items.length > 0 && ( <
                div className = "border-t p-6" >
                <
                div className = "flex justify-between items-center mb-4" >
                <
                span className = "text-lg font-semibold" > Total: < /span> <
                span className = "text-lg font-bold text-primary-600" > { getTotalPrice() }
                CFA < /span> <
                /div> <
                button onClick = { handleCheckout }
                className = "w-full btn-primary" >
                Checkout <
                /button> <
                /div>
            )
        } <
        /div> <
        /div> <
        /div>
    )
}