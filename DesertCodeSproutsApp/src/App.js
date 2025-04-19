import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
    return (
        <PaperProvider>
            <AppNavigator />
        </PaperProvider>
    );
}
// This is the main entry point of the app. It wraps the AppNavigator with PaperProvider for theming and other features.