import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProgrammingScreen from '../screens/ProgrammingScreen';
import UIDesignScreen from '../screens/UIDesignScreen';
import MLScreen from '../screens/MLScreen';
import CybersecurityScreen from '../screens/CybersecurityScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Programming" component={ProgrammingScreen} />
                <Stack.Screen name="UI Design" component={UIDesignScreen} />
                <Stack.Screen name="Machine Learning" component={MLScreen} />
                <Stack.Screen name="Cybersecurity" component={CybersecurityScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}