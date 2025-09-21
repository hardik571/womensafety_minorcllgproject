/**
 * Women Safety App - Main Entry Point
 * 
 * A comprehensive cross-platform Women Safety Mobile Application
 * built with React Native and Expo for Android and iOS.
 * 
 * Features:
 * - Emergency SOS with GPS location
 * - Live location tracking and sharing
 * - Trusted contacts management
 * - Stealth mode and panic gestures
 * - Audio/video recording for evidence
 * - Safe route planning with OpenStreetMap
 * - Community alerts and safety tips
 * 
 * @author Women Safety Team
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Import components
import AccessibilityComponent from './src/components/AccessibilityComponent';
import ErrorBoundary from './src/components/ErrorBoundary';

// Import screens
import SplashScreenComponent from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';

// Import Context Providers
import { AuthProvider } from './src/context/AuthContext';
import { LocationProvider } from './src/context/LocationContext';
import { EmergencyProvider } from './src/context/EmergencyContext';
import { ThemeProvider } from './src/context/ThemeContext';

// Import utilities
import { performanceMonitor } from './src/utils/PerformanceMonitor';
import { errorHandler } from './src/utils/ErrorHandler';
import { StorageService } from './src/services/StorageService';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

/**
 * Main App Component
 * Handles app initialization, permissions, and navigation setup
 */
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  /**
   * Initialize the app with all required resources
   */
  const initializeApp = async () => {
    try {
      // Start performance monitoring
      performanceMonitor.monitorAppStartup();

      // Load fonts
      await loadFonts();

      // Request permissions
      await requestPermissions();

      // Initialize storage
      await StorageService.initialize();

      // Load error logs and performance metrics
      await errorHandler.loadErrorLogs();
      await performanceMonitor.loadMetrics();

      // Check if first launch
      const isFirstLaunch = await StorageService.get('first_launch', true);
      if (isFirstLaunch) {
        await StorageService.set('first_launch', false);
      }

    } catch (error) {
      errorHandler.logError(error, 'App initialization', 'high');
      console.warn('App initialization error:', error);
    } finally {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  /**
   * Load custom fonts
   */
  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      });
    } catch (error) {
      console.warn('Font loading error:', error);
    }
  };

  /**
   * Request necessary permissions
   */
  const requestPermissions = async () => {
    try {
      const permissions = [
        Location.requestForegroundPermissionsAsync(),
        Location.requestBackgroundPermissionsAsync(),
        Permissions.askAsync(Permissions.CAMERA),
        Permissions.askAsync(Permissions.AUDIO_RECORDING),
        Permissions.askAsync(Permissions.CONTACTS),
        Permissions.askAsync(Permissions.SMS),
        Permissions.askAsync(Permissions.PHONE),
      ];

      const results = await Promise.all(permissions);
      const allGranted = results.every(result => result.status === 'granted');
      
      setPermissionsGranted(allGranted);

      if (!allGranted) {
        Alert.alert(
          'Permissions Required',
          'This app needs certain permissions to function properly. Please grant them in Settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      errorHandler.logError(error, 'Permission request', 'medium');
      console.warn('Permission request error:', error);
    }
  };

  if (!appIsReady) {
    return <SplashScreenComponent />;
  }

  return (
    <ErrorBoundary>
      <AccessibilityComponent>
        <ThemeProvider>
          <AuthProvider>
            <LocationProvider>
              <EmergencyProvider>
                <NavigationContainer>
                  <View style={styles.container}>
                    <StatusBar style="auto" />
                    <Stack.Navigator
                      initialRouteName="Splash"
                      screenOptions={{ 
                        headerShown: false,
                        gestureEnabled: true,
                        cardStyleInterpolator: ({ current, layouts }) => {
                          return {
                            cardStyle: {
                              transform: [
                                {
                                  translateX: current.progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [layouts.screen.width, 0],
                                  }),
                                },
                              ],
                            },
                          };
                        },
                      }}
                    >
                      <Stack.Screen name="Splash" component={SplashScreenComponent} />
                      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                      <Stack.Screen name="Auth" component={AuthScreen} />
                      <Stack.Screen name="Main" component={MainTabNavigator} />
                    </Stack.Navigator>
                  </View>
                </NavigationContainer>
              </EmergencyProvider>
            </LocationProvider>
          </AuthProvider>
        </ThemeProvider>
      </AccessibilityComponent>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});