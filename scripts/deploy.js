#!/usr/bin/env node

/**
 * TAC-HUB Deployment Script
 * Prepares the project for Vercel deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing TAC-HUB for Vercel deployment...\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'next.config.js',
  'vercel.json',
  '.env.production',
  'public/manifest.json',
  'public/robots.txt',
  'public/sitemap.xml'
];

console.log('📋 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please ensure all files are present before deployment.');
  process.exit(1);
}

// Check package.json for required dependencies
console.log('\n📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredDeps = [
  'next',
  'react',
  'react-dom',
  'recharts',
  'lucide-react'
];

const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);

if (missingDeps.length > 0) {
  console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ All required dependencies present');
}

// Check for build script
if (!packageJson.scripts.build) {
  console.log('❌ Missing build script in package.json');
  process.exit(1);
} else {
  console.log('✅ Build script found');
}

// Validate environment variables
console.log('\n🔧 Checking environment configuration...');
if (fs.existsSync('.env.production')) {
  console.log('✅ Production environment file found');
} else {
  console.log('⚠️  No production environment file found');
}

// Check Next.js configuration
console.log('\n⚙️  Validating Next.js configuration...');
try {
  const nextConfig = require(path.join(process.cwd(), 'next.config.js'));
  console.log('✅ Next.js configuration is valid');
  
  if (nextConfig.output === 'standalone') {
    console.log('✅ Configured for standalone output (optimal for Vercel)');
  }
  
  if (nextConfig.images && nextConfig.images.domains) {
    console.log('✅ Image domains configured');
  }
} catch (error) {
  console.log('❌ Invalid Next.js configuration:', error.message);
  process.exit(1);
}

// Check Vercel configuration
console.log('\n🔧 Validating Vercel configuration...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  console.log('✅ Vercel configuration is valid');
  
  if (vercelConfig.framework === 'nextjs') {
    console.log('✅ Framework set to Next.js');
  }
} catch (error) {
  console.log('❌ Invalid Vercel configuration:', error.message);
  process.exit(1);
}

// Generate build info
const buildInfo = {
  buildTime: new Date().toISOString(),
  version: packageJson.version,
  nodeVersion: process.version,
  platform: process.platform
};

fs.writeFileSync('public/build-info.json', JSON.stringify(buildInfo, null, 2));
console.log('✅ Build info generated');

console.log('\n🎉 TAC-HUB is ready for Vercel deployment!');
console.log('\n📋 Deployment checklist:');
console.log('1. Push your code to GitHub');
console.log('2. Connect your repository to Vercel');
console.log('3. Configure environment variables in Vercel dashboard');
console.log('4. Deploy!');
console.log('\n🔗 Useful links:');
console.log('- Vercel Dashboard: https://vercel.com/dashboard');
console.log('- Next.js Deployment Guide: https://nextjs.org/docs/deployment');
console.log('- TAC-HUB Documentation: ./README.md');

console.log('\n✨ Happy deploying!');
