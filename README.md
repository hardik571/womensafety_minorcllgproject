# 🚨 Women Safety App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-49.0.0-black.svg)](https://expo.dev/)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green.svg)](https://reactnative.dev/)

A comprehensive cross-platform Women Safety Mobile Application built with React Native and Expo. This app prioritizes simplicity, speed, and reliability in emergency situations.

## 🌟 Features

### 🚨 Emergency Features
- **SOS Button**: One-tap emergency alert with GPS location
- **Panic Gesture**: Shake device to trigger emergency mode
- **Stealth Mode**: Disguise app icon and hide from recent apps
- **Audio/Video Recording**: Capture evidence during emergencies

### 📍 Location & Navigation
- **Live Location Tracking**: Share real-time location with trusted contacts
- **Safe Route Planning**: Find safest routes using OpenStreetMap
- **Nearby Help**: Locate hospitals, police stations, and safe zones
- **Community Alerts**: Flag unsafe areas and view recent alerts

### 👥 Contact Management
- **Trusted Contacts**: Add emergency contacts with quick access
- **SMS Alerts**: Send location and emergency info via SMS
- **Quick Dial**: Direct calling to emergency contacts

### 🛡️ Security & Privacy
- **Data Encryption**: All sensitive data encrypted locally
- **Secure Storage**: Contacts and recordings stored securely
- **Privacy Mode**: Hide app from device history

## 🚀 Quick Start

### Prerequisites
- Node.js (>=16.0.0)
- npm (>=8.0.0)
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/women-safety-app.git
   cd women-safety-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## 📱 Platform Support

- **Android**: API 21+ (Android 5.0+)
- **iOS**: iOS 11.0+
- **Web**: Modern browsers with WebView support

## 🏗️ Project Structure

```
women-safety-app/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   ├── 📁 screens/            # App screens
│   ├── 📁 navigation/         # Navigation configuration
│   ├── 📁 context/            # React Context providers
│   ├── 📁 utils/              # Utility functions
│   ├── 📁 services/           # API and external services
│   └── 📁 constants/          # App constants
├── 📁 assets/                 # Images, fonts, icons
├── 📁 docs/                   # Documentation
├── 📁 tests/                  # Test files
├── 📄 App.js                  # Main app component
├── 📄 app.json               # Expo configuration
└── 📄 package.json           # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **Maps**: OpenStreetMap (free alternative to Google Maps)
- **Routing**: OSRM (Open Source Routing Machine)
- **Storage**: AsyncStorage + SecureStore
- **State Management**: React Context API
- **Styling**: StyleSheet with responsive design

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Optional: Firebase configuration (for cloud features)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id

# Optional: SMS service configuration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

### Permissions
The app requires the following permissions:
- **Location**: For GPS tracking and emergency alerts
- **Camera**: For video recording during emergencies
- **Microphone**: For audio recording
- **Contacts**: For emergency contact management
- **SMS**: For sending emergency alerts
- **Phone**: For emergency calls

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

## 📦 Building for Production

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/women-safety-app/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- OpenStreetMap contributors for free map data
- OSRM team for open-source routing
- React Native and Expo communities
- All contributors and testers

## 📊 Project Status

- ✅ Core emergency features
- ✅ Location tracking
- ✅ Contact management
- ✅ Maps integration
- ✅ Security features
- 🔄 Community features (in development)
- 🔄 Cloud sync (optional)

---

**⚠️ Important**: This app is designed for emergency situations. Always test features in a safe environment and ensure emergency contacts are properly configured.

**🔒 Privacy**: All data is stored locally on your device. No personal information is shared without your explicit consent.