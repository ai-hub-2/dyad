# Dyad

My Electron application description

## 🚀 Available Scripts

### **Main App (Electron)**
```bash
npm start              # Start Electron dev server
npm run package        # Build Electron app
npm test               # Run tests
npm run lint           # Run linting
npm run make           # Create distributable packages
```

### **Mobile App (React Native)**
```bash
npm run mobile:install     # Install mobile dependencies
npm run mobile:start       # Start Metro bundler
npm run mobile:android     # Run on Android
npm run mobile:ios         # Run on iOS
npm run mobile:build:android # Build Android APK
npm run mobile:bundle:android # Create Android bundle
npm run mobile:clean:android  # Clean Android build
```

### **Or use mobile directory directly:**
```bash
cd mobile
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run build:android  # Build Android APK
```

## 📱 Mobile App Features

- **Cross-platform**: Built with React Native for Android and iOS
- **Theme System**: Dark/light mode with consistent design tokens
- **Navigation**: Stack-based navigation between screens
- **Performance Optimized**: Proguard, resource shrinking, and efficient rendering

## 🏗️ Project Structure

```
├── src/                 # Electron app source
├── mobile/              # React Native mobile app
│   ├── app/            # Mobile app source
│   ├── android/        # Android configuration
│   └── ios/            # iOS configuration
└── package.json         # Main project configuration
```

## 🛠️ Development

### Prerequisites
- Node.js 20+
- Electron development tools
- React Native CLI (for mobile)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup
1. Install dependencies: `npm install`
2. Install mobile dependencies: `npm run mobile:install`
3. Start development: `npm start` (Electron) or `npm run mobile:start` (Mobile)

## 📦 Building

### Electron App
```bash
npm run package  # Build Electron app
npm run make     # Create distributable packages
```

### Mobile App
```bash
npm run mobile:build:android  # Build Android APK
```

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run e2e           # Run end-to-end tests
```

## 📄 License

MIT
