'use client'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { X, Upload, Image, Video, MapPin, Calendar, User, FileText, Save, AlertCircle } from 'lucide-react'

export default function ShareStoryModal({ isOpen, onClose, onSubmit }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    community: '',
    summary: '',
    challenge: '',
    solution: '',
    impact: '',
    lessonsLearned: '',
    duration: '',
    language: 'English'
  })
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedVideos, setSelectedVideos] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const maxFileSize = 30 * 1024 * 1024 // 30MB in bytes
  const maxImages = 5
  const maxVideos = 2

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateFile = (file, type) => {
    if (file.size > maxFileSize) {
      return `File size must be less than 30MB`
    }
    
    if (type === 'image') {
      if (!file.type.startsWith('image/')) {
        return 'Please select a valid image file'
      }
    } else if (type === 'video') {
      if (!file.type.startsWith('video/')) {
        return 'Please select a valid video file'
      }
    }
    
    return null
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newErrors = []
    const validFiles = []

    if (selectedImages.length + files.length > maxImages) {
      setErrors(prev => ({
        ...prev,
        images: `Maximum ${maxImages} images allowed`
      }))
      return
    }

    files.forEach(file => {
      const error = validateFile(file, 'image')
      if (error) {
        newErrors.push(`${file.name}: ${error}`)
      } else {
        validFiles.push({
          file,
          name: file.name,
          size: file.size,
          preview: URL.createObjectURL(file)
        })
      }
    })

    if (newErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        images: newErrors.join(', ')
      }))
    } else {
      setSelectedImages(prev => [...prev, ...validFiles])
      setErrors(prev => ({
        ...prev,
        images: ''
      }))
    }
  }

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newErrors = []
    const validFiles = []

    if (selectedVideos.length + files.length > maxVideos) {
      setErrors(prev => ({
        ...prev,
        videos: `Maximum ${maxVideos} videos allowed`
      }))
      return
    }

    files.forEach(file => {
      const error = validateFile(file, 'video')
      if (error) {
        newErrors.push(`${file.name}: ${error}`)
      } else {
        validFiles.push({
          file,
          name: file.name,
          size: file.size,
          preview: URL.createObjectURL(file)
        })
      }
    })

    if (newErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        videos: newErrors.join(', ')
      }))
    } else {
      setSelectedVideos(prev => [...prev, ...validFiles])
      setErrors(prev => ({
        ...prev,
        videos: ''
      }))
    }
  }

  const removeImage = (index) => {
    setSelectedImages(prev => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const removeVideo = (index) => {
    setSelectedVideos(prev => {
      const newVideos = [...prev]
      URL.revokeObjectURL(newVideos[index].preview)
      newVideos.splice(index, 1)
      return newVideos
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.community.trim()) newErrors.community = 'Community name is required'
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required'
    if (!formData.challenge.trim()) newErrors.challenge = 'Challenge description is required'
    if (!formData.solution.trim()) newErrors.solution = 'Solution description is required'
    if (!formData.impact.trim()) newErrors.impact = 'Impact description is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const storyData = {
        ...formData,
        author: user?.name || 'Anonymous',
        authorEmail: user?.email || '',
        date: new Date().toISOString().split('T')[0],
        images: selectedImages.map(img => img.preview),
        videos: selectedVideos.map(vid => ({
          url: vid.preview,
          name: vid.name,
          size: vid.size
        })),
        submittedAt: new Date().toISOString(),
        status: 'pending_review'
      }

      await onSubmit(storyData)
      
      // Reset form
      setFormData({
        title: '',
        community: '',
        summary: '',
        challenge: '',
        solution: '',
        impact: '',
        lessonsLearned: '',
        duration: '',
        language: 'English'
      })
      setSelectedImages([])
      setSelectedVideos([])
      setErrors({})
      
      onClose()
    } catch (error) {
      setErrors({ submit: 'Failed to submit story. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Share Your Conservation Story</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors.submit}
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Story Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Forest Restoration in Our Village"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Community/Location *
              </label>
              <input
                type="text"
                name="community"
                value={formData.community}
                onChange={handleInputChange}
                placeholder="e.g., Mbandaka Village, Équateur Province, DRC"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.community ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              {errors.community && <p className="text-red-600 text-sm mt-1">{errors.community}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Project Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 3 years (2021-2024)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Lingala">Lingala</option>
                <option value="Swahili">Swahili</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Story Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story Summary *
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              rows="3"
              placeholder="Brief overview of your conservation story..."
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.summary ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.summary && <p className="text-red-600 text-sm mt-1">{errors.summary}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Challenge Faced *
            </label>
            <textarea
              name="challenge"
              value={formData.challenge}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe the environmental or conservation challenge your community faced..."
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.challenge ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.challenge && <p className="text-red-600 text-sm mt-1">{errors.challenge}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solution/Approach *
            </label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe how your community addressed the challenge, including traditional and modern methods..."
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.solution ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.solution && <p className="text-red-600 text-sm mt-1">{errors.solution}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Impact Achieved *
            </label>
            <textarea
              name="impact"
              value={formData.impact}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe the positive impact on environment, community, and economy..."
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.impact ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.impact && <p className="text-red-600 text-sm mt-1">{errors.impact}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lessons Learned
            </label>
            <textarea
              name="lessonsLearned"
              value={formData.lessonsLearned}
              onChange={handleInputChange}
              rows="3"
              placeholder="Key lessons that other communities could benefit from (separate with commas)..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Media Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Image className="w-4 h-4 inline mr-1" />
                Images (Max {maxImages}, 30MB each)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload images</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 30MB</p>
                </label>
              </div>
              {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images}</p>}
              
              {selectedImages.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <img src={image.preview} alt="" className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="text-sm font-medium">{image.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Video className="w-4 h-4 inline mr-1" />
                Videos (Max {maxVideos}, 30MB each)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload videos</p>
                  <p className="text-xs text-gray-500">MP4, MOV, AVI up to 30MB</p>
                </label>
              </div>
              {errors.videos && <p className="text-red-600 text-sm mt-1">{errors.videos}</p>}
              
              {selectedVideos.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedVideos.map((video, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <Video className="w-10 h-10 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{video.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(video.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Share Story
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
