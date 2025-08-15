# 🚀 Dyad - Multi-Platform Application

Dyad is a comprehensive multi-platform application with web, mobile, and desktop support.

## 📱 Platforms

- **🌐 Web App** - Responsive Progressive Web App (PWA)
- **📱 Mobile App** - React Native Native app for Android & iOS
- **🖥️ Desktop App** - Electron application

## 🏗️ Project Structure

```
dyad/
├── src/                    # Main Electron app source
├── mobile/                 # React Native mobile app
│   ├── app/
│   │   ├── screens/       # App screens
│   │   ├── components/    # Reusable components
│   │   └── theme/         # Design system
│   └── App.tsx
├── .github/workflows/      # CI/CD pipelines
├── public/                 # PWA assets
└── README.md
```

## 🚀 Quick Start

### Web/Desktop (Electron)

```bash
npm install
npm start          # Development
npm run package    # Build for distribution
```

### Mobile App

```bash
cd mobile
npm install
npm run android    # Android
npm run ios        # iOS (macOS only)
```

## 📱 Mobile App Features

- ✅ **Native Performance** - Built with React Native CLI
- ✅ **Design Consistency** - Matches web app design
- ✅ **Dark/Light Mode** - Automatic theme switching
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Navigation** - Stack-based navigation system
- ✅ **Theme System** - Consistent colors, typography, spacing

### Mobile App Structure

```
mobile/app/
├── screens/           # App screens
│   ├── HomeScreen.tsx
│   ├── ExploreScreen.tsx
│   └── DetailsScreen.tsx
├── components/        # Reusable components
│   ├── Header.tsx
│   ├── Card.tsx
│   ├── Button.tsx
│   └── Responsive.ts
└── theme/            # Design system
    ├── colors.ts
    ├── typography.ts
    ├── spacing.ts
    └── index.ts
```

## 🌐 Web Features

- ✅ **Progressive Web App** - Installable on mobile devices
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Cloudflare Pages** - Fast global hosting
- ✅ **Offline Support** - Service worker implementation

## 🔧 Development

### Prerequisites

- Node.js 18+
- React Native CLI (for mobile)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Scripts

```bash
# Main app
npm start              # Start Electron dev server
npm run package        # Build Electron app
npm test              # Run tests

# Mobile app
cd mobile
npm run android       # Run on Android
npm run ios           # Run on iOS
npm run build:android # Build Android APK
```

## 🚀 Deployment

### Web App

- Automatically deployed to Cloudflare Pages
- Builds on every push to main branch

### Mobile App

- Android APK built automatically via GitHub Actions
- Releases created when pushing version tags (v1.0.0)
- APK artifacts available for download

### GitHub Actions

- **Web Deployment**: `build-deploy.yml`
- **Android Build**: `android-release.yml`

## 🎨 Design System

The app uses a consistent design system across all platforms:

- **Colors**: Primary purple theme with dark/light variants
- **Typography**: Consistent font sizes and weights
- **Spacing**: 4px grid system
- **Components**: Reusable UI components

## 📚 Documentation

- [Main App Documentation](./MULTI_PLATFORM_README.md)
- [Mobile App Documentation](./mobile/README.md)
- [API Documentation](./docs/API.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/ai-hub-2/dyad/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ai-hub-2/dyad/discussions)
- **Documentation**: Check the docs folder for detailed guides

---

**Built with ❤️ for multi-platform excellence**
