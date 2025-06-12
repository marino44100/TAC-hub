// Script to populate sample data for admin panel testing
// Run this in browser console to add sample data

function populateAdminData() {
  // Sample users data
  const sampleUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      joinedAt: '2024-01-15',
      lastLogin: new Date().toISOString(),
      avatar: null
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'moderator',
      joinedAt: '2024-02-10',
      lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      avatar: null
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@tac-hub.org',
      role: 'admin',
      joinedAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
      avatar: null
    },
    {
      id: 4,
      name: 'Marie Mbeki',
      email: 'marie@village.cm',
      role: 'user',
      joinedAt: '2024-03-05',
      lastLogin: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      avatar: null
    },
    {
      id: 5,
      name: 'Pierre Ngozi',
      email: 'pierre@conservation.cd',
      role: 'user',
      joinedAt: '2024-02-20',
      lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      avatar: null
    }
  ]

  // Sample projects data
  const sampleProjects = [
    {
      id: 1,
      title: 'Forest Restoration in Sangha Region',
      category: 'Reforestation',
      submittedBy: 'Marie Mbeki',
      status: 'active',
      fundingGoal: 50000,
      currentFunding: 32000,
      createdAt: '2024-02-15',
      description: 'Community-led forest restoration project in the Sangha region of Cameroon'
    },
    {
      id: 2,
      title: 'Traditional Weather Monitoring Network',
      category: 'Climate Monitoring',
      submittedBy: 'Pierre Ngozi',
      status: 'pending',
      fundingGoal: 25000,
      currentFunding: 5000,
      createdAt: '2024-03-01',
      description: 'Establishing a network of traditional weather monitoring stations'
    },
    {
      id: 3,
      title: 'Sustainable Agriculture Training',
      category: 'Agriculture',
      submittedBy: 'John Doe',
      status: 'completed',
      fundingGoal: 15000,
      currentFunding: 15000,
      createdAt: '2024-01-10',
      description: 'Training program for sustainable farming practices'
    },
    {
      id: 4,
      title: 'Wildlife Conservation Initiative',
      category: 'Conservation',
      submittedBy: 'Jane Smith',
      status: 'active',
      fundingGoal: 75000,
      currentFunding: 45000,
      createdAt: '2024-02-28',
      description: 'Protecting endangered species in the Congo Basin'
    },
    {
      id: 5,
      title: 'Solar Energy for Villages',
      category: 'Renewable Energy',
      submittedBy: 'Marie Mbeki',
      status: 'rejected',
      fundingGoal: 100000,
      currentFunding: 2000,
      createdAt: '2024-01-25',
      description: 'Installing solar panels in remote villages'
    }
  ]

  // Sample orders data
  const sampleOrders = [
    {
      id: 1001,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [
        { name: 'Sustainable Seeds Kit', price: 25, quantity: 2 },
        { name: 'Weather Monitoring Device', price: 150, quantity: 1 }
      ],
      total: 200,
      status: 'delivered',
      createdAt: '2024-03-10'
    },
    {
      id: 1002,
      customerName: 'Marie Mbeki',
      customerEmail: 'marie@village.cm',
      items: [
        { name: 'Solar Lantern', price: 45, quantity: 3 },
        { name: 'Water Purification Tablets', price: 15, quantity: 5 }
      ],
      total: 210,
      status: 'shipped',
      createdAt: '2024-03-12'
    },
    {
      id: 1003,
      customerName: 'Pierre Ngozi',
      customerEmail: 'pierre@conservation.cd',
      items: [
        { name: 'Tree Seedlings (50 pack)', price: 75, quantity: 2 }
      ],
      total: 150,
      status: 'processing',
      createdAt: '2024-03-14'
    },
    {
      id: 1004,
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      items: [
        { name: 'Climate Data Logger', price: 300, quantity: 1 },
        { name: 'Field Guide: Congo Basin Flora', price: 35, quantity: 1 }
      ],
      total: 335,
      status: 'pending',
      createdAt: '2024-03-15'
    },
    {
      id: 1005,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [
        { name: 'Beehive Starter Kit', price: 120, quantity: 1 }
      ],
      total: 120,
      status: 'cancelled',
      createdAt: '2024-03-08'
    }
  ]

  // Store data in localStorage
  localStorage.setItem('tac-hub-users', JSON.stringify(sampleUsers))
  localStorage.setItem('tac-hub-projects', JSON.stringify(sampleProjects))
  localStorage.setItem('tac-hub-orders', JSON.stringify(sampleOrders))

  console.log('✅ Sample admin data populated successfully!')
  console.log('📊 Data summary:')
  console.log(`- Users: ${sampleUsers.length}`)
  console.log(`- Projects: ${sampleProjects.length}`)
  console.log(`- Orders: ${sampleOrders.length}`)
  console.log('🔄 Refresh the admin page to see the data')

  return {
    users: sampleUsers.length,
    projects: sampleProjects.length,
    orders: sampleOrders.length
  }
}

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  populateAdminData()
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = populateAdminData
}
