'use client'
import { useState, useEffect } from 'react'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Settings, 
  Database,
  BookOpen,
  TreePine,
  Cloud
} from 'lucide-react'

export default function AdminPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('wisdom')
  const [traditionalWisdom, setTraditionalWisdom] = useState([])
  const [wildlifeDatabase, setWildlifeDatabase] = useState([])
  const [editingWisdom, setEditingWisdom] = useState(null)
  const [editingSpecies, setEditingSpecies] = useState(null)
  const [newWisdomCategory, setNewWisdomCategory] = useState('')
  const [newWisdomSign, setNewWisdomSign] = useState('')
  const [newSpecies, setNewSpecies] = useState({
    name: '',
    scientific: '',
    category: 'mammal',
    status: 'Least Concern',
    commonSigns: ['']
  })

  useEffect(() => {
    if (isOpen) {
      loadData()
    }
  }, [isOpen])

  const loadData = () => {
    // Load traditional wisdom
    const savedWisdom = localStorage.getItem('tac-hub-traditional-wisdom')
    if (savedWisdom) {
      setTraditionalWisdom(JSON.parse(savedWisdom))
    }

    // Load wildlife database
    const savedSpecies = localStorage.getItem('tac-hub-wildlife-database')
    if (savedSpecies) {
      setWildlifeDatabase(JSON.parse(savedSpecies))
    }
  }

  const saveWisdom = () => {
    localStorage.setItem('tac-hub-traditional-wisdom', JSON.stringify(traditionalWisdom))
    alert('Traditional wisdom updated successfully!')
  }

  const saveSpecies = () => {
    localStorage.setItem('tac-hub-wildlife-database', JSON.stringify(wildlifeDatabase))
    alert('Wildlife database updated successfully!')
  }

  const addWisdomCategory = () => {
    if (!newWisdomCategory.trim()) return

    const newCategory = {
      category: newWisdomCategory,
      signs: []
    }

    setTraditionalWisdom([...traditionalWisdom, newCategory])
    setNewWisdomCategory('')
  }

  const addWisdomSign = (categoryIndex) => {
    if (!newWisdomSign.trim()) return

    const updatedWisdom = [...traditionalWisdom]
    updatedWisdom[categoryIndex].signs.push(newWisdomSign)
    setTraditionalWisdom(updatedWisdom)
    setNewWisdomSign('')
  }

  const removeWisdomSign = (categoryIndex, signIndex) => {
    const updatedWisdom = [...traditionalWisdom]
    updatedWisdom[categoryIndex].signs.splice(signIndex, 1)
    setTraditionalWisdom(updatedWisdom)
  }

  const removeWisdomCategory = (categoryIndex) => {
    const updatedWisdom = [...traditionalWisdom]
    updatedWisdom.splice(categoryIndex, 1)
    setTraditionalWisdom(updatedWisdom)
  }

  const addSpecies = () => {
    if (!newSpecies.name.trim() || !newSpecies.scientific.trim()) return

    const species = {
      ...newSpecies,
      commonSigns: newSpecies.commonSigns.filter(sign => sign.trim())
    }

    setWildlifeDatabase([...wildlifeDatabase, species])
    setNewSpecies({
      name: '',
      scientific: '',
      category: 'mammal',
      status: 'Least Concern',
      commonSigns: ['']
    })
  }

  const removeSpecies = (index) => {
    const updatedDatabase = [...wildlifeDatabase]
    updatedDatabase.splice(index, 1)
    setWildlifeDatabase(updatedDatabase)
  }

  const updateSpeciesSign = (index, value) => {
    const updatedSigns = [...newSpecies.commonSigns]
    updatedSigns[index] = value
    setNewSpecies({...newSpecies, commonSigns: updatedSigns})
  }

  const addSpeciesSign = () => {
    setNewSpecies({
      ...newSpecies,
      commonSigns: [...newSpecies.commonSigns, '']
    })
  }

  const removeSpeciesSign = (index) => {
    const updatedSigns = [...newSpecies.commonSigns]
    updatedSigns.splice(index, 1)
    setNewSpecies({...newSpecies, commonSigns: updatedSigns})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Admin Panel - Traditional Knowledge Management
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('wisdom')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'wisdom'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Cloud className="w-4 h-4 mr-2" />
              Traditional Weather Wisdom
            </button>
            <button
              onClick={() => setActiveTab('species')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'species'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <TreePine className="w-4 h-4 mr-2" />
              Wildlife Species Database
            </button>
          </div>

          {/* Traditional Wisdom Management */}
          {activeTab === 'wisdom' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Traditional Weather Wisdom</h3>
                <button
                  onClick={saveWisdom}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>

              {/* Add New Category */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Add New Wisdom Category</h4>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newWisdomCategory}
                    onChange={(e) => setNewWisdomCategory(e.target.value)}
                    placeholder="e.g., Moon Phases, Seasonal Indicators"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addWisdomCategory}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Existing Categories */}
              <div className="space-y-4">
                {traditionalWisdom.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-900">{category.category}</h4>
                      <button
                        onClick={() => removeWisdomCategory(categoryIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add New Sign */}
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newWisdomSign}
                        onChange={(e) => setNewWisdomSign(e.target.value)}
                        placeholder="Add new traditional sign..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => addWisdomSign(categoryIndex)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Existing Signs */}
                    <div className="space-y-2">
                      {category.signs.map((sign, signIndex) => (
                        <div key={signIndex} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-sm">{sign}</span>
                          <button
                            onClick={() => removeWisdomSign(categoryIndex, signIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wildlife Species Management */}
          {activeTab === 'species' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Wildlife Species Database</h3>
                <button
                  onClick={saveSpecies}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>

              {/* Add New Species */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">Add New Species</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={newSpecies.name}
                    onChange={(e) => setNewSpecies({...newSpecies, name: e.target.value})}
                    placeholder="Common name (e.g., Forest Elephant)"
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={newSpecies.scientific}
                    onChange={(e) => setNewSpecies({...newSpecies, scientific: e.target.value})}
                    placeholder="Scientific name (e.g., Loxodonta cyclotis)"
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <select
                    value={newSpecies.category}
                    onChange={(e) => setNewSpecies({...newSpecies, category: e.target.value})}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="mammal">Mammal</option>
                    <option value="bird">Bird</option>
                    <option value="reptile">Reptile</option>
                    <option value="amphibian">Amphibian</option>
                    <option value="fish">Fish</option>
                    <option value="insect">Insect</option>
                  </select>
                  <select
                    value={newSpecies.status}
                    onChange={(e) => setNewSpecies({...newSpecies, status: e.target.value})}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Least Concern">Least Concern</option>
                    <option value="Near Threatened">Near Threatened</option>
                    <option value="Vulnerable">Vulnerable</option>
                    <option value="Endangered">Endangered</option>
                    <option value="Critically Endangered">Critically Endangered</option>
                  </select>
                </div>

                {/* Common Signs */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Common Signs</label>
                  {newSpecies.commonSigns.map((sign, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={sign}
                        onChange={(e) => updateSpeciesSign(index, e.target.value)}
                        placeholder="e.g., Large footprints"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeSpeciesSign(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSpeciesSign}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    + Add another sign
                  </button>
                </div>

                <button
                  onClick={addSpecies}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Species
                </button>
              </div>

              {/* Existing Species */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wildlifeDatabase.map((species, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{species.name}</h4>
                      <button
                        onClick={() => removeSpecies(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 italic mb-2">{species.scientific}</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{species.category}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        species.status === 'Critically Endangered' ? 'bg-red-100 text-red-700' :
                        species.status === 'Endangered' ? 'bg-orange-100 text-orange-700' :
                        species.status === 'Vulnerable' ? 'bg-yellow-100 text-yellow-700' :
                        species.status === 'Near Threatened' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {species.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <p className="font-medium">Signs:</p>
                      <ul className="list-disc list-inside">
                        {species.commonSigns.slice(0, 3).map((sign, i) => (
                          <li key={i}>{sign}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
