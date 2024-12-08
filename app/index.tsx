import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Set timeout for 3 seconds
    const timer = setTimeout(() => {
      router.replace('/welcome'); // Navigate to welcome screen
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>B</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8A2BE2",
  },
  
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#8A2BE2",
  },
});