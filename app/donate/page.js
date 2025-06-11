'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { Heart, Target, Users, Leaf, CreditCard, Smartphone, Phone, CheckCircle } from 'lucide-react'

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState('one-time')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false
  })
  const [loading, setLoading] = useState(false)
  const [donationComplete, setDonationComplete] = useState(false)
  const [donationId, setDonationId] = useState('')

  const { user } = useAuth()

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000]

  const impactData = [
    { 
      amount: 500, 
      impact: 'Plant 10 trees in the Congo Basin',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'
    },
    { 
      amount: 1000, 
      impact: 'Support 1 family with sustainable farming training',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=200&fit=crop'
    },
    { 
      amount: 2500, 
      impact: 'Fund forest monitoring for 1 month',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop'
    },
    { 
      amount: 5000, 
      impact: 'Establish 1 community conservation project',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=300&h=200&fit=crop'
    },
    { 
      amount: 10000, 
      impact: 'Support 5 families with clean energy solutions',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop'
    },
    { 
      amount: 25000, 
      impact: 'Fund a complete reforestation project',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop'
    }
  ]

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount.toString())
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value)
    setDonationAmount('')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const finalAmount = customAmount || donationAmount
    
    // Simulate donation processing
    setTimeout(() => {
      const newDonationId = `DON-${Date.now()}`
      setDonationId(newDonationId)
      
      // Save donation to localStorage
      const donations = JSON.parse(localStorage.getItem('tac-hub-donations') || '[]')
      const newDonation = {
        id: newDonationId,
        userId: user?.id || 'anonymous',
        amount: parseInt(finalAmount),
        type: donationType,
        paymentMethod: paymentMethod,
        donorInfo: formData,
        status: 'completed',
        createdAt: new Date().toISOString()
      }
      donations.push(newDonation)
      localStorage.setItem('tac-hub-donations', JSON.stringify(donations))
      
      setDonationComplete(true)
      setLoading(false)
    }, 2000)
  }

  if (donationComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container-max py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Donation!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Your generous donation of {customAmount || donationAmount} CFA has been received.
            </p>
            <p className="text-gray-600 mb-8">
              Donation ID: {donationId}
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-green-800 mb-2">Your Impact</h3>
              <p className="text-green-700">
                {impactData.find(item => item.amount <= parseInt(customAmount || donationAmount))?.impact || 
                 'Your donation will help fund critical climate action projects across Africa.'}
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-max py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=400&fit=crop" 
              alt="African forest landscape" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative text-center py-16 px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Support Climate Action in Africa
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Your donation helps fund critical climate initiatives, forest conservation projects, 
              and sustainable development programs across the Congo Basin and beyond.
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-green-200">Trees Planted</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1,200+</div>
                <div className="text-blue-200">Families Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold">25</div>
                <div className="text-purple-200">Active Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">See Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.impact}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {item.amount.toLocaleString()} CFA
                  </div>
                  <p className="text-gray-700">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">50,000+</h3>
            <p className="text-gray-600">Trees Planted</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">1,200+</h3>
            <p className="text-gray-600">Families Supported</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">25</h3>
            <p className="text-gray-600">Active Projects</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">500+</h3>
            <p className="text-gray-600">Donors</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donation Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Make a Donation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      className={`p-3 border rounded-lg text-center ${
                        donationType === 'one-time' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('monthly')}
                      className={`p-3 border rounded-lg text-center ${
                        donationType === 'monthly' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Amount (CFA)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-3 border rounded-lg text-center ${
                          donationAmount === amount.toString() ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                        }`}
                      >
                        {amount.toLocaleString()} CFA
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                        paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mobile')}
                      className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                        paymentMethod === 'mobile' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('orange')}
                      className={`p-3 border rounded-lg flex items-center justify-center space-x-2 ${
                        paymentMethod === 'orange' ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Orange</span>
                    </button>
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Donor Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share why you're supporting our cause..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="anonymous"
                        checked={formData.anonymous}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Make this donation anonymous
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || (!donationAmount && !customAmount)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Donation...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      <span>Donate {customAmount || donationAmount} CFA</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Impact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Impact</h3>
                <div className="space-y-4">
                  {impactData.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-semibold text-sm">
                          {item.amount >= 1000 ? `${item.amount/1000}k` : item.amount}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.amount.toLocaleString()} CFA</p>
                        <p className="text-gray-600 text-sm">{item.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">
                  Why Your Donation Matters
                </h3>
                <ul className="space-y-2 text-primary-800">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Directly funds forest conservation projects</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Supports local communities with sustainable livelihoods</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Enables climate research and monitoring</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Promotes renewable energy adoption</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
