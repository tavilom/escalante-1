import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import image from '../assets/images/CFDC.jpeg'; // Importa a imagem local

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/tela2"><Text>tela2</Text></Link>
      <Link href="/tela3"><Text>tela3</Text></Link>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
