import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Title>Desert CodeSprouts</Title>
            <Paragraph>Welcome! Choose a module to start learning:</Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate('Programming')}>Programming</Button>
            <Button mode="contained" onPress={() => navigation.navigate('UI Design')}>UI Design</Button>
            <Button mode="contained" onPress={() => navigation.navigate('Machine Learning')}>Machine Learning</Button>
            <Button mode="contained" onPress={() => navigation.navigate('Cybersecurity')}>Cybersecurity</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }
});