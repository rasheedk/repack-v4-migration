import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Federated} from '@callstack/repack/client';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { TouchableWithoutFeedback } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const AuthProvider = React.lazy(() =>
  Federated.importModule('auth', './AuthProvider'),
);
const SignInScreen = React.lazy(() =>
  Federated.importModule('auth', './SignInScreen'),
);

const App = () => {
    const tap = Gesture.Tap();
  const captureTouch = () => {
   
  };
  return (
    <ErrorBoundary name="AuthProvider">
      <GestureHandlerRootView onTouchEnd={captureTouch}>
       <GestureDetector gesture={tap}>
         <TouchableWithoutFeedback>
      <React.Suspense fallback={<SplashScreen />}>
        <AuthProvider>
          {(authData: {isSignout: boolean; isLoading: boolean}) => {
            if (authData.isLoading) {
              return <SplashScreen />;
            }

            if (authData.isSignout) {
              return (
                <React.Suspense fallback={<SplashScreen />}>
                  <SignInScreen />
                </React.Suspense>
              );
            }

            return (
              <NavigationContainer
                onReady={() => RNBootSplash.hide({fade: true, duration: 500})}>
                <MainNavigator />
              </NavigationContainer>
            );
          }}
        </AuthProvider>
      </React.Suspense>

      </TouchableWithoutFeedback>
      </GestureDetector>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default App;
