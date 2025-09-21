const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push(
  // Fonts
  'ttf',
  'otf',
  'woff',
  'woff2',
  // Images
  'webp',
  'svg',
  // Audio
  'mp3',
  'wav',
  'aac',
  'm4a',
  // Video
  'mp4',
  'mov',
  'avi',
  'mkv',
);

// Add support for additional source extensions
config.resolver.sourceExts.push('jsx', 'ts', 'tsx');

// Enable symlinks
config.resolver.unstable_enableSymlinks = true;

// Configure transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Configure resolver
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

module.exports = config;
