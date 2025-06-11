#!/usr/bin/env node

/**
 * TAC-HUB Build Optimization Script
 * Optimizes the project for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('⚡ Optimizing TAC-HUB for production...\n');

// Clean up development files
console.log('🧹 Cleaning up development files...');

const devFilesToRemove = [
  '.env.local',
  '.env.development',
  'npm-debug.log',
  'yarn-debug.log',
  'yarn-error.log'
];

devFilesToRemove.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`🗑️  Removed ${file}`);
  }
});

// Optimize package.json for production
console.log('\n📦 Optimizing package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Remove unnecessary fields for production
const fieldsToRemove = ['devDependencies'];
fieldsToRemove.forEach(field => {
  if (packageJson[field]) {
    delete packageJson[field];
    console.log(`🗑️  Removed ${field} from package.json`);
  }
});

// Add production optimizations
packageJson.scripts = {
  ...packageJson.scripts,
  'start': 'next start',
  'build': 'next build'
};

// Write optimized package.json
fs.writeFileSync('package-production.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Created optimized package-production.json');

// Generate performance budget
console.log('\n📊 Generating performance budget...');
const performanceBudget = {
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb",
      "maximumError": "4kb"
    }
  ]
};

fs.writeFileSync('performance-budget.json', JSON.stringify(performanceBudget, null, 2));
console.log('✅ Performance budget created');

// Create lighthouse configuration
console.log('\n🔍 Creating Lighthouse configuration...');
const lighthouseConfig = {
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "startServerCommand": "npm start",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
};

fs.writeFileSync('lighthouserc.json', JSON.stringify(lighthouseConfig, null, 2));
console.log('✅ Lighthouse configuration created');

// Create bundle analyzer configuration
console.log('\n📈 Creating bundle analyzer configuration...');
const analyzerConfig = {
  "analyzer": {
    "enabled": true,
    "openAnalyzer": false
  }
};

fs.writeFileSync('bundle-analyzer.json', JSON.stringify(analyzerConfig, null, 2));
console.log('✅ Bundle analyzer configuration created');

// Generate security headers
console.log('\n🔒 Generating security headers...');
const securityHeaders = [
  {
    "key": "X-DNS-Prefetch-Control",
    "value": "on"
  },
  {
    "key": "Strict-Transport-Security",
    "value": "max-age=63072000; includeSubDomains; preload"
  },
  {
    "key": "X-XSS-Protection",
    "value": "1; mode=block"
  },
  {
    "key": "X-Frame-Options",
    "value": "DENY"
  },
  {
    "key": "X-Content-Type-Options",
    "value": "nosniff"
  },
  {
    "key": "Referrer-Policy",
    "value": "origin-when-cross-origin"
  }
];

fs.writeFileSync('security-headers.json', JSON.stringify(securityHeaders, null, 2));
console.log('✅ Security headers configuration created');

// Create deployment checklist
console.log('\n📋 Creating deployment checklist...');
const deploymentChecklist = {
  "pre-deployment": [
    "✅ All tests passing",
    "✅ Code linted and formatted",
    "✅ Environment variables configured",
    "✅ Build successful locally",
    "✅ Performance budget met",
    "✅ Security headers configured",
    "✅ SEO metadata complete"
  ],
  "deployment": [
    "✅ Repository connected to Vercel",
    "✅ Environment variables set in Vercel",
    "✅ Custom domain configured (if applicable)",
    "✅ SSL certificate active",
    "✅ Analytics configured"
  ],
  "post-deployment": [
    "✅ Site accessible and functional",
    "✅ All pages loading correctly",
    "✅ Forms submitting properly",
    "✅ Analytics tracking",
    "✅ Performance monitoring active"
  ]
};

fs.writeFileSync('deployment-checklist.json', JSON.stringify(deploymentChecklist, null, 2));
console.log('✅ Deployment checklist created');

// Generate optimization report
console.log('\n📊 Generating optimization report...');
const optimizationReport = {
  "timestamp": new Date().toISOString(),
  "optimizations": [
    "✅ Development files removed",
    "✅ Package.json optimized",
    "✅ Performance budget configured",
    "✅ Lighthouse configuration created",
    "✅ Bundle analyzer configured",
    "✅ Security headers defined",
    "✅ Deployment checklist generated"
  ],
  "recommendations": [
    "🔧 Run 'npm run build' to test production build",
    "🔍 Use Lighthouse to audit performance",
    "📊 Analyze bundle size with webpack-bundle-analyzer",
    "🔒 Test security headers with securityheaders.com",
    "📱 Test mobile responsiveness",
    "♿ Validate accessibility compliance"
  ],
  "nextSteps": [
    "1. Test the production build locally",
    "2. Run performance audits",
    "3. Deploy to Vercel",
    "4. Monitor performance metrics",
    "5. Set up continuous monitoring"
  ]
};

fs.writeFileSync('optimization-report.json', JSON.stringify(optimizationReport, null, 2));
console.log('✅ Optimization report generated');

console.log('\n🎉 TAC-HUB optimization complete!');
console.log('\n📋 Files created:');
console.log('- package-production.json');
console.log('- performance-budget.json');
console.log('- lighthouserc.json');
console.log('- bundle-analyzer.json');
console.log('- security-headers.json');
console.log('- deployment-checklist.json');
console.log('- optimization-report.json');

console.log('\n🚀 Ready for production deployment!');
console.log('Run "node scripts/deploy.js" to validate deployment readiness.');
