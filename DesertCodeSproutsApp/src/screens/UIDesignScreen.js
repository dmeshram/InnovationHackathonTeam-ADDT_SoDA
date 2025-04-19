import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

export default function UIDesignScreen() {
    return (
        <View style={styles.container}>
            <Title>UI Design</Title>
            <Text>Coming soon: Sketch and prototype your dream app!</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});