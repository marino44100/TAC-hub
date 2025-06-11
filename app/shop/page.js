'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ShoppingCart from '../../components/ShoppingCart'
import { useCart } from '../../contexts/CartContext'
import { Search, Filter, Star } from 'lucide-react'

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const { addItem } = useCart()

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'books', name: 'Books' },
    { id: 'reports', name: 'Research Reports' },
    { id: 'guides', name: 'Guides' },
    { id: 'tools', name: 'Tools' }
  ]

  const products = [
    {
      id: 1,
      title: 'All We Can Save',
      description: 'All We Can Save illuminates the expertise and insights of dozens of diverse women leading on climate in the United States.',
      price: 49,
      category: 'books',
      rating: 4.8,
      reviews: 124,
      image: '/api/placeholder/300/400'
    },
    {
      id: 2,
      title: 'The Green Book',
      description: 'The book explores symbols of transformation, myths and futures; and is structured to encourage regular reflection.',
      price: 64,
      category: 'books',
      rating: 4.6,
      reviews: 89,
      image: '/api/placeholder/300/400'
    },
    {
      id: 3,
      title: 'Climate Change Simplified',
      description: 'Only when the last tree has been cut down, the last fish been caught, and the last stream poisoned, will we realize we cannot eat money.',
      price: 85,
      category: 'books',
      rating: 4.9,
      reviews: 156,
      image: '/api/placeholder/300/400'
    },
    {
      id: 4,
      title: 'Climate Cover-Up: The Crusade to Deny Global Warming',
      description: 'An investigation into the climate denial movement and the forces behind it.',
      price: 225,
      category: 'books',
      rating: 4.7,
      reviews: 78,
      image: '/api/placeholder/300/400'
    },
    {
      id: 5,
      title: 'Congo Basin Forest Assessment Report',
      description: 'Comprehensive analysis of forest health and conservation strategies in the Congo Basin.',
      price: 150,
      category: 'reports',
      rating: 4.5,
      reviews: 45,
      image: '/api/placeholder/300/400'
    },
    {
      id: 6,
      title: 'Sustainable Agriculture Guide for Africa',
      description: 'Practical guide for implementing sustainable farming practices across African regions.',
      price: 95,
      category: 'guides',
      rating: 4.8,
      reviews: 112,
      image: '/api/placeholder/300/400'
    },
    {
      id: 7,
      title: 'Carbon Footprint Calculator Tool',
      description: 'Digital tool for calculating and tracking carbon emissions for organizations.',
      price: 299,
      category: 'tools',
      rating: 4.6,
      reviews: 67,
      image: '/api/placeholder/300/400'
    },
    {
      id: 8,
      title: 'Climate Data Visualization Toolkit',
      description: 'Comprehensive toolkit for creating climate data visualizations and reports.',
      price: 199,
      category: 'tools',
      rating: 4.7,
      reviews: 89,
      image: '/api/placeholder/300/400'
    }
  ]

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return a.title.localeCompare(b.title)
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ShoppingCart />
      
      <div className="container-max py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Climate Resources Shop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover books, reports, guides, and tools to help you understand and combat climate change
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              {filteredProducts.length} resources found
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Resource Cover</span>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">
                    {product.price} CFA
                  </span>
                  <button
                    onClick={() => addItem(product)}
                    className="btn-primary text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
