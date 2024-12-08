import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const Welcome: React.FC = () => {
  const router = useRouter();

  const handleConnectWallet = () => {
    // For now, this will navigate to create page
    // Later you can add actual wallet connection logic
    router.push('/create');
  };

  const handleLearnMore = () => {
    // Navigate to learn more page (you'll need to create this)
    router.push('/learn-more');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section with Logo */}
      <View style={styles.header}>
        <View style={styles.miniLogo}>
          <Text style={styles.logoText}>B</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome to BlockGoals</Text>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <View style={styles.valueProps}>
          <View style={styles.propItem}>
            <AntDesign name="flag" size={24} color="#8A2BE2" />
            <Text style={styles.propText}>Set goals with real stakes</Text>
          </View>
          <View style={styles.propItem}>
            <AntDesign name="team" size={24} color="#8A2BE2" />
            <Text style={styles.propText}>Get validated by friends</Text>
          </View>
          <View style={styles.propItem}>
            <AntDesign name="rocket1" size={24} color="#8A2BE2" />
            <Text style={styles.propText}>Achieve more with blockchain</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleConnectWallet}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Connect Wallet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleLearnMore}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Learn More</Text>
        </TouchableOpacity>
        
        <Text style={styles.disclaimer}>
          By connecting a wallet, you agree to BlockGoals' Terms of Service
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  miniLogo: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  valueProps: {
    gap: 20,
  },
  propItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
  },
  propText: {
    fontSize: 16,
    color: '#333',
  },
  bottomSection: {
    padding: 20,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 10,
  },
});

export default Welcome;