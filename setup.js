#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Personal Notes Manager - Cyberpunk Edition\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'green') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

// Check if Node.js is installed
function checkNodeVersion() {
  try {
    const version = execSync('node --version', { encoding: 'utf8' }).trim();
    const majorVersion = parseInt(version.slice(1).split('.')[0]);
    
    if (majorVersion < 16) {
      logError('Node.js version 16 or higher is required');
      logInfo('Please update Node.js and try again');
      process.exit(1);
    }
    
    logSuccess(`Node.js ${version} detected`);
    return true;
  } catch (error) {
    logError('Node.js is not installed');
    logInfo('Please install Node.js version 16 or higher');
    process.exit(1);
  }
}

// Install dependencies
function installDependencies() {
  log('Installing dependencies...', 'blue');
  
  try {
    // Install root dependencies
    log('Installing root dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    // Install backend dependencies
    log('Installing backend dependencies...');
    execSync('cd backend && npm install', { stdio: 'inherit' });
    
    // Install frontend dependencies
    log('Installing frontend dependencies...');
    execSync('cd frontend && npm install', { stdio: 'inherit' });
    
    logSuccess('All dependencies installed successfully');
  } catch (error) {
    logError('Failed to install dependencies');
    logInfo('Please check your internet connection and try again');
    process.exit(1);
  }
}

// Create environment files
function createEnvFiles() {
  log('Creating environment files...', 'blue');
  
  const backendEnvPath = path.join(__dirname, 'backend', '.env');
  const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
  
  // Backend .env
  if (!fs.existsSync(backendEnvPath)) {
    const backendEnvContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes_manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
CLIENT_URL=http://localhost:3000
NODE_ENV=development`;
    
    fs.writeFileSync(backendEnvPath, backendEnvContent);
    logSuccess('Created backend/.env file');
  } else {
    logInfo('backend/.env already exists');
  }
  
  // Frontend .env
  if (!fs.existsSync(frontendEnvPath)) {
    const frontendEnvContent = `VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_BACKEND_URL=http://localhost:5000`;
    
    fs.writeFileSync(frontendEnvPath, frontendEnvContent);
    logSuccess('Created frontend/.env file');
  } else {
    logInfo('frontend/.env already exists');
  }
}

// Display next steps
function displayNextSteps() {
  log('\n🎉 Setup completed successfully!', 'green');
  log('\nNext steps:', 'blue');
  log('1. Configure your environment variables:');
  log('   - Edit backend/.env with your MongoDB URI and Google OAuth credentials');
  log('   - Edit frontend/.env with your Google OAuth client ID');
  
  log('\n2. Set up Google OAuth:');
  log('   - Go to https://console.cloud.google.com/');
  log('   - Create a new project or select existing one');
  log('   - Enable Google+ API');
  log('   - Create OAuth 2.0 credentials');
  log('   - Add authorized redirect URIs:');
  log('     * http://localhost:5000/auth/google/callback (backend)');
  log('     * http://localhost:3000 (frontend)');
  
  log('\n3. Set up MongoDB:');
  log('   - Install MongoDB locally or use MongoDB Atlas');
  log('   - Update MONGODB_URI in backend/.env');
  
  log('\n4. Start the application:');
  log('   npm run dev');
  
  log('\n5. Open your browser and navigate to:');
  log('   http://localhost:3000');
  
  log('\n📚 For more information, check the README.md file');
  log('\n🔧 Need help? Check the troubleshooting section in README.md');
}

// Main setup function
function main() {
  try {
    log('Starting setup process...', 'blue');
    
    // Check Node.js version
    checkNodeVersion();
    
    // Install dependencies
    installDependencies();
    
    // Create environment files
    createEnvFiles();
    
    // Display next steps
    displayNextSteps();
    
  } catch (error) {
    logError('Setup failed');
    console.error(error);
    process.exit(1);
  }
}

// Run setup
if (require.main === module) {
  main();
}

module.exports = { main }; 