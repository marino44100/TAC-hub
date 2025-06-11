'use client'
import { useState } from 'react'
import { Mail, ShoppingCart } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setIsSubscribing(true)
    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribing(false)
      setEmail('')
      alert('Thank you for subscribing!')
    }, 1000)
  }

  const footerLinks = [
    { name: 'Home', href: '#' },
    { name: 'Get Resources', href: '#resources' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Submit Project', href: '#submit' },
    { name: 'Discussion Forum', href: '#forum' },
    { name: 'Shop', href: '#shop' },
  ]

  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Newsletter Subscription */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Subscribe to our newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email *"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="btn-primary flex items-center justify-center min-w-[120px]"
              >
                {isSubscribing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>

          {/* Shopping Cart */}
          <div className="text-center lg:text-right">
            <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white mx-auto lg:mx-0 lg:ml-auto">
              <ShoppingCart className="w-5 h-5" />
              <span>0 items</span>
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <nav className="flex flex-wrap justify-center md:justify-start gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <p className="text-gray-400 text-sm">
              © 2025 The African Climate Hub. Powered by The African Climate Hub.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
