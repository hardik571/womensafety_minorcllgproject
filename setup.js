#!/usr/bin/env node

/**
 * Setup script for Women Safety App
 * This script helps initialize the project with all necessary configurations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Women Safety App...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required');
  console.error(`   Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if Expo CLI is installed
try {
  execSync('expo --version', { stdio: 'pipe' });
  console.log('✅ Expo CLI is installed');
} catch (error) {
  console.log('📦 Installing Expo CLI...');
  try {
    execSync('npm install -g @expo/cli', { stdio: 'inherit' });
    console.log('✅ Expo CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Expo CLI');
    console.error('   Please run: npm install -g @expo/cli');
    process.exit(1);
  }
}

// Create necessary directories
const directories = [
  'assets',
  'assets/fonts',
  'assets/images',
  'src',
  'src/components',
  'src/screens',
  'src/context',
  'src/navigation',
  'src/utils',
  'src/config',
  'tests',
  'tests/__mocks__',
  'tests/components',
  'tests/screens',
  'tests/utils',
];

console.log('\n📁 Creating project directories...');
directories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`   Created: ${dir}`);
  } else {
    console.log(`   Exists: ${dir}`);
  }
});

// Create .gitignore file
const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Expo
.expo/
dist/
web-build/

# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# Debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store

# Temporary files
*.tmp
*.temp

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env.local
.env.production

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db
`;

fs.writeFileSync('.gitignore', gitignoreContent);
console.log('✅ Created .gitignore');

// Create .env.example file
const envExampleContent = `# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id

# Twilio Configuration (for SMS)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# App Configuration
APP_ENV=development
DEBUG_MODE=true
LOG_LEVEL=debug

# OpenStreetMap Configuration (no API key required)
OSM_TILE_SERVER=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
OSRM_ROUTING_SERVICE=https://router.project-osrm.org/route/v1/driving
OVERPASS_API=https://overpass-api.de/api/interpreter
`;

fs.writeFileSync('.env.example', envExampleContent);
console.log('✅ Created .env.example');

// Create jest.config.js
const jestConfigContent = `module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/android/',
    '<rootDir>/ios/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'node',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
`;

fs.writeFileSync('jest.config.js', jestConfigContent);
console.log('✅ Created jest.config.js');

// Create test setup file
const testSetupContent = `// Test setup file
import 'react-native-gesture-handler/jestSetup';

// Mock react-native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock expo modules
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  requestBackgroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() => Promise.resolve({
    coords: {
      latitude: 28.6139,
      longitude: 77.2090,
      accuracy: 10,
      speed: 0,
      heading: 0,
    },
  })),
  watchPositionAsync: jest.fn(() => Promise.resolve({
    remove: jest.fn(),
  })),
  reverseGeocodeAsync: jest.fn(() => Promise.resolve([{
    street: 'Test Street',
    city: 'Test City',
    region: 'Test Region',
    country: 'Test Country',
    postalCode: '12345',
  }])),
}));

jest.mock('expo-contacts', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getContactsAsync: jest.fn(() => Promise.resolve({
    data: [
      {
        id: '1',
        name: 'Test Contact',
        phoneNumbers: [{ number: '+91-9876543210' }],
      },
    ],
  })),
}));

jest.mock('expo-camera', () => ({
  requestCameraPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  Camera: {
    Constants: {
      Type: { back: 'back' },
      FlashMode: { off: 'off' },
      VideoQuality: { '720p': '720p' },
    },
  },
}));

jest.mock('expo-av', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
  Recording: jest.fn(() => ({
    prepareToRecordAsync: jest.fn(() => Promise.resolve()),
    startAsync: jest.fn(() => Promise.resolve()),
    stopAndUnloadAsync: jest.fn(() => Promise.resolve()),
    getURI: jest.fn(() => 'file://test.m4a'),
  })),
}));

jest.mock('expo-sms', () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
  sendSMSAsync: jest.fn(() => Promise.resolve({ result: 'sent' })),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-device-motion', () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
}));

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(() => Promise.resolve()),
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

// Mock react-native-webview
jest.mock('react-native-webview', () => 'WebView');

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Circle: 'Circle',
  Path: 'Path',
  G: 'G',
}));

// Mock react-native-super-grid
jest.mock('react-native-super-grid', () => ({
  FlatGrid: 'FlatGrid',
  SectionGrid: 'SectionGrid',
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
`;

fs.writeFileSync('tests/setup.js', testSetupContent);
console.log('✅ Created test setup file');

// Create sample test file
const sampleTestContent = `import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TestUtils } from '../src/utils/TestUtils';

// Sample test to verify setup
describe('App Setup', () => {
  it('should have test utilities available', () => {
    expect(TestUtils.MockData).toBeDefined();
    expect(TestUtils.TestHelpers).toBeDefined();
    expect(TestUtils.TestScenarios).toBeDefined();
  });

  it('should generate mock data correctly', () => {
    const userProfile = TestUtils.MockData.generateUserProfile();
    expect(userProfile).toBeDefined();
    expect(userProfile.email).toBe('test@example.com');
    expect(userProfile.name).toBe('Test User');
  });

  it('should validate emergency contact data', () => {
    const contact = TestUtils.MockData.generateEmergencyContact();
    TestUtils.TestAssertions.assertValidEmergencyContact(contact);
  });
});
`;

fs.writeFileSync('tests/sample.test.js', sampleTestContent);
console.log('✅ Created sample test file');

// Create development scripts
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add test scripts
packageJson.scripts = {
  ...packageJson.scripts,
  'test': 'jest',
  'test:watch': 'jest --watch',
  'test:coverage': 'jest --coverage',
  'test:ci': 'jest --ci --coverage --watchAll=false',
  'lint': 'eslint src/ --ext .js,.jsx',
  'lint:fix': 'eslint src/ --ext .js,.jsx --fix',
  'type-check': 'tsc --noEmit',
  'clean': 'rm -rf node_modules && npm install',
  'reset': 'expo r -c',
  'build:android': 'expo build:android',
  'build:ios': 'expo build:ios',
  'build:web': 'expo build:web',
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Updated package.json with test scripts');

// Create ESLint configuration
const eslintConfigContent = `module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
    jest: true,
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
  },
  settings: {
    'react-native/style-sheet-object-names': ['StyleSheet', 'styles'],
  },
};
`;

fs.writeFileSync('.eslintrc.js', eslintConfigContent);
console.log('✅ Created ESLint configuration');

// Create Prettier configuration
const prettierConfigContent = `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
`;

fs.writeFileSync('.prettierrc', prettierConfigContent);
console.log('✅ Created Prettier configuration');

// Create VS Code settings
const vscodeDir = path.join(process.cwd(), '.vscode');
if (!fs.existsSync(vscodeDir)) {
  fs.mkdirSync(vscodeDir);
}

const vscodeSettings = {
  'editor.formatOnSave': true,
  'editor.defaultFormatter': 'esbenp.prettier-vscode',
  'editor.codeActionsOnSave': {
    'source.fixAll.eslint': true,
  },
  'emmet.includeLanguages': {
    'javascript': 'javascriptreact',
  },
  'typescript.preferences.importModuleSpecifier': 'relative',
  'javascript.preferences.importModuleSpecifier': 'relative',
};

fs.writeFileSync(
  path.join(vscodeDir, 'settings.json'),
  JSON.stringify(vscodeSettings, null, 2)
);
console.log('✅ Created VS Code settings');

// Create launch configuration for debugging
const launchConfig = {
  version: '0.2.0',
  configurations: [
    {
      name: 'Debug Android',
      type: 'reactnative',
      request: 'launch',
      platform: 'android',
      target: 'device',
      sourceMaps: true,
      outDir: '.vscode/.react',
    },
    {
      name: 'Debug iOS',
      type: 'reactnative',
      request: 'launch',
      platform: 'ios',
      target: 'device',
      sourceMaps: true,
      outDir: '.vscode/.react',
    },
  ],
};

fs.writeFileSync(
  path.join(vscodeDir, 'launch.json'),
  JSON.stringify(launchConfig, null, 2)
);
console.log('✅ Created VS Code launch configuration');

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Copy .env.example to .env and fill in your configuration');
console.log('2. Run "npm install" to install dependencies');
console.log('3. Run "npm test" to run tests');
console.log('4. Run "npm start" to start the development server');
console.log('5. Run "npm run lint" to check code quality');
console.log('\n🔧 Available scripts:');
console.log('   npm start          - Start Expo development server');
console.log('   npm test           - Run tests');
console.log('   npm run lint       - Check code quality');
console.log('   npm run build:android - Build for Android');
console.log('   npm run build:ios  - Build for iOS');
console.log('\n📚 Documentation:');
console.log('   README.md          - Complete setup and usage guide');
console.log('   tests/             - Test files and utilities');
console.log('\n🚀 Happy coding!');
