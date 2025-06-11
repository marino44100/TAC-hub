'use client'

// Data management system for TAC-HUB
class DataManager {
  constructor() {
    this.storageKey = 'tac_hub_data'
    this.initializeData()
  }

  initializeData() {
    if (typeof window === 'undefined') return

    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      const initialData = {
        climateData: {
          temperature: {
            current: 26.5,
            trend: '+1.2°C from last year',
            monthly: [24.2, 25.1, 26.8, 27.3, 26.9, 25.4, 24.8, 25.2, 26.1, 27.0, 26.8, 25.9],
            regions: {
              'Kinshasa': 27.2,
              'Mbandaka': 26.8,
              'Kisangani': 25.9,
              'Bukavu': 23.4,
              'Goma': 22.1
            }
          },
          rainfall: {
            current: 1680,
            trend: '-8% from historical average',
            monthly: [45, 78, 156, 234, 298, 387, 412, 356, 267, 189, 123, 67],
            regions: {
              'Kinshasa': 1420,
              'Mbandaka': 1890,
              'Kisangani': 1756,
              'Bukavu': 1234,
              'Goma': 998
            }
          },
          humidity: {
            current: 78,
            trend: 'Stable conditions',
            monthly: [65, 68, 72, 78, 85, 89, 92, 88, 82, 76, 71, 67],
            regions: {
              'Kinshasa': 76,
              'Mbandaka': 82,
              'Kisangani': 79,
              'Bukavu': 74,
              'Goma': 71
            }
          },
          co2Levels: {
            current: 415,
            trend: '+2.1 ppm from last year',
            monthly: [412, 413, 414, 415, 416, 417, 418, 417, 416, 415, 414, 413],
            regions: {
              'Kinshasa': 418,
              'Mbandaka': 412,
              'Kisangani': 414,
              'Bukavu': 411,
              'Goma': 413
            }
          }
        },
        deforestationData: {
          2020: { area: 1.2, percentage: 0.8 },
          2021: { area: 1.4, percentage: 0.9 },
          2022: { area: 1.1, percentage: 0.7 },
          2023: { area: 0.9, percentage: 0.6 },
          2024: { area: 0.7, percentage: 0.5 }
        },
        forestHealthData: {
          january: 85,
          february: 87,
          march: 89,
          april: 91,
          may: 88,
          june: 86,
          july: 84,
          august: 85,
          september: 87,
          october: 89,
          november: 90,
          december: 88
        },
        countries: [
          { name: 'Democratic Republic of Congo', forestCover: 67.9, population: 95894118 },
          { name: 'Cameroon', forestCover: 41.7, population: 27914536 },
          { name: 'Central African Republic', forestCover: 35.9, population: 4829764 },
          { name: 'Gabon', forestCover: 85.4, population: 2225734 },
          { name: 'Equatorial Guinea', forestCover: 57.1, population: 1402985 },
          { name: 'Chad', forestCover: 9.1, population: 16425859 }
        ],
        alerts: [
          {
            id: 1,
            type: 'warning',
            title: 'Deforestation Alert - Équateur Province',
            message: 'Satellite data shows increased deforestation activity in the Équateur Province. Community monitoring teams have been notified.',
            date: '2024-01-15',
            region: 'Équateur Province, DRC',
            severity: 'Medium',
            status: 'Active'
          },
          {
            id: 2,
            type: 'info',
            title: 'Successful Reforestation - Mbandaka',
            message: 'Community-led reforestation project in Mbandaka has successfully planted 5,000 trees this month.',
            date: '2024-01-12',
            region: 'Mbandaka, DRC',
            severity: 'Low',
            status: 'Resolved'
          }
        ],
        communityData: {
          connectedCommunities: 247,
          traditionalKnowledgeEntries: 1847,
          forestAreaMonitored: 1200000, // hectares
          elderTeachingsRecorded: 342,
          activeProjects: 89,
          successStories: 156
        },
        lastUpdated: new Date().toISOString(),
        updatedBy: 'System'
      }
      localStorage.setItem(this.storageKey, JSON.stringify(initialData))
    }
  }

  getData() {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : null
  }

  updateData(newData, updatedBy = 'Admin') {
    if (typeof window === 'undefined') return false
    
    const currentData = this.getData()
    const updatedData = {
      ...currentData,
      ...newData,
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(updatedData))
    
    // Dispatch custom event to notify components of data change
    window.dispatchEvent(new CustomEvent('tacHubDataUpdate', { 
      detail: updatedData 
    }))
    
    return true
  }

  getClimateData() {
    const data = this.getData()
    return data ? data.climateData : null
  }

  updateClimateData(climateData, updatedBy = 'Admin') {
    return this.updateData({ climateData }, updatedBy)
  }

  getDeforestationData() {
    const data = this.getData()
    return data ? data.deforestationData : null
  }

  updateDeforestationData(deforestationData, updatedBy = 'Admin') {
    return this.updateData({ deforestationData }, updatedBy)
  }

  getForestHealthData() {
    const data = this.getData()
    return data ? data.forestHealthData : null
  }

  updateForestHealthData(forestHealthData, updatedBy = 'Admin') {
    return this.updateData({ forestHealthData }, updatedBy)
  }

  getCountries() {
    const data = this.getData()
    return data ? data.countries : []
  }

  updateCountries(countries, updatedBy = 'Admin') {
    return this.updateData({ countries }, updatedBy)
  }

  getAlerts() {
    const data = this.getData()
    return data ? data.alerts : []
  }

  addAlert(alert, updatedBy = 'Admin') {
    const alerts = this.getAlerts()
    const newAlert = {
      ...alert,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Active'
    }
    alerts.unshift(newAlert)
    return this.updateData({ alerts }, updatedBy)
  }

  updateAlert(alertId, updates, updatedBy = 'Admin') {
    const alerts = this.getAlerts()
    const alertIndex = alerts.findIndex(alert => alert.id === alertId)
    if (alertIndex !== -1) {
      alerts[alertIndex] = { ...alerts[alertIndex], ...updates }
      return this.updateData({ alerts }, updatedBy)
    }
    return false
  }

  deleteAlert(alertId, updatedBy = 'Admin') {
    const alerts = this.getAlerts()
    const filteredAlerts = alerts.filter(alert => alert.id !== alertId)
    return this.updateData({ alerts: filteredAlerts }, updatedBy)
  }

  getCommunityData() {
    const data = this.getData()
    return data ? data.communityData : null
  }

  updateCommunityData(communityData, updatedBy = 'Admin') {
    return this.updateData({ communityData }, updatedBy)
  }

  resetToDefaults() {
    if (typeof window === 'undefined') return false
    localStorage.removeItem(this.storageKey)
    this.initializeData()
    
    // Dispatch reset event
    window.dispatchEvent(new CustomEvent('tacHubDataReset'))
    return true
  }

  exportData() {
    const data = this.getData()
    if (!data) return null
    
    const exportData = {
      ...data,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    
    return JSON.stringify(exportData, null, 2)
  }

  importData(jsonData, updatedBy = 'Admin') {
    try {
      const importedData = JSON.parse(jsonData)
      // Validate data structure here if needed
      
      const processedData = {
        ...importedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: updatedBy
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(processedData))
      
      // Dispatch import event
      window.dispatchEvent(new CustomEvent('tacHubDataImport', { 
        detail: processedData 
      }))
      
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  getLastUpdated() {
    const data = this.getData()
    return data ? {
      date: data.lastUpdated,
      by: data.updatedBy
    } : null
  }

  // Real-time data simulation for demo purposes
  simulateRealTimeUpdates() {
    if (typeof window === 'undefined') return

    setInterval(() => {
      const data = this.getData()
      if (!data) return

      // Simulate small changes in climate data
      const climateData = { ...data.climateData }
      
      // Add small random variations
      climateData.temperature.current += (Math.random() - 0.5) * 0.2
      climateData.humidity.current += (Math.random() - 0.5) * 2
      climateData.co2Levels.current += (Math.random() - 0.5) * 0.5

      // Keep values within realistic ranges
      climateData.temperature.current = Math.max(20, Math.min(35, climateData.temperature.current))
      climateData.humidity.current = Math.max(40, Math.min(95, climateData.humidity.current))
      climateData.co2Levels.current = Math.max(400, Math.min(450, climateData.co2Levels.current))

      this.updateClimateData(climateData, 'Real-time System')
    }, 30000) // Update every 30 seconds
  }
}

// Create singleton instance
const dataManager = new DataManager()

export default dataManager
