'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import { Upload, MapPin, Calendar, DollarSign, Users, Target } from 'lucide-react'

export default function SubmitProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    duration: '',
    budget: '',
    teamSize: '',
    objectives: '',
    expectedImpact: '',
    methodology: '',
    timeline: '',
    resources: '',
    partnerships: '',
    sustainability: '',
    contactEmail: '',
    contactPhone: '',
    organization: '',
    website: '',
    attachments: []
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { user } = useAuth()

  const categories = [
    'Forest Conservation',
    'Renewable Energy',
    'Sustainable Agriculture',
    'Climate Research',
    'Carbon Trading',
    'Environmental Education',
    'Water Management',
    'Waste Management',
    'Biodiversity Protection',
    'Climate Adaptation',
    'Green Technology',
    'Community Development'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please login to submit a project')
      return
    }

    setLoading(true)

    // Simulate API submission
    setTimeout(() => {
      // Save to localStorage for demo
      const projects = JSON.parse(localStorage.getItem('tac-hub-projects') || '[]')
      const newProject = {
        id: Date.now(),
        ...formData,
        submittedBy: user.name,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }
      projects.push(newProject)
      localStorage.setItem('tac-hub-projects', JSON.stringify(projects))

      setSubmitted(true)
      setLoading(false)
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container-max py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Project Submitted Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for submitting your climate project. Our team will review it and get back to you within 5-7 business days.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/'}
                className="btn-primary mr-4"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    title: '', description: '', category: '', location: '', duration: '',
                    budget: '', teamSize: '', objectives: '', expectedImpact: '', methodology: '',
                    timeline: '', resources: '', partnerships: '', sustainability: '',
                    contactEmail: '', contactPhone: '', organization: '', website: '', attachments: []
                  })
                }}
                className="btn-secondary"
              >
                Submit Another Project
              </button>
            </div>
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Climate Project</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your climate action project with the TAC-HUB community. Whether it's a research initiative, 
            conservation effort, or innovative solution, we want to showcase your work and connect you with potential collaborators.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-primary-600" />
                Project Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Country, Region, or Specific Location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Project Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 6 months, 2 years, Ongoing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="over-500k">Over $500,000</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Provide a comprehensive description of your project..."
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objectives & Goals *
                  </label>
                  <textarea
                    name="objectives"
                    required
                    rows={3}
                    value={formData.objectives}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="What are the main objectives and goals of your project?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Impact *
                  </label>
                  <textarea
                    name="expectedImpact"
                    required
                    rows={3}
                    value={formData.expectedImpact}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="What impact do you expect this project to have on climate change?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Methodology & Approach
                  </label>
                  <textarea
                    name="methodology"
                    rows={3}
                    value={formData.methodology}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe your approach and methodology..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline & Milestones
                  </label>
                  <textarea
                    name="timeline"
                    rows={3}
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Key milestones and timeline for your project..."
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization/Institution
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website/Portfolio
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  * Required fields. All submissions will be reviewed before publication.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Submit Project</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
