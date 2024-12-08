import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Share,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const scaleValue = new Animated.Value(0);
  
  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 10,
      friction: 2,
    }).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Help me achieve my goal by being my validator!',
        url: 'https://blockgoals.app/goal/123', // Replace with actual goal URL
      });
    } catch (error) {
      console.error(error);
    }
  };

  const copyTxHash = async () => {
    await Clipboard.setStringAsync('0x1234...5678');
    // Add toast or alert to show copied
  };

  const navigateToDashboard = () => {
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Success Animation */}
      <Animated.View 
        style={[
          styles.successAnimation,
          { transform: [{ scale: scaleValue }] }
        ]}
      >
        <View style={styles.successCircle}>
          <MaterialCommunityIcons name="check-bold" size={64} color="white" />
        </View>
        <Text style={styles.successTitle}>Goal Created!</Text>
        <Text style={styles.successSubtitle}>Your goal is now live on the blockchain</Text>
      </Animated.View>

      {/* Transaction Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Transaction Details</Text>
        <TouchableOpacity style={styles.hashContainer} onPress={copyTxHash}>
          <Text style={styles.hashText}>0x1234...5678</Text>
          <Ionicons name="copy-outline" size={20} color="#8A2BE2" />
        </TouchableOpacity>
        <Text style={styles.confirmationText}>
          12 block confirmations
        </Text>
      </View>

      {/* Next Steps */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Steps</Text>
        <View style={styles.stepItem}>
          <Ionicons name="share-outline" size={24} color="#8A2BE2" />
          <Text style={styles.stepText}>Share with your validator</Text>
        </View>
        <View style={styles.stepItem}>
          <Ionicons name="notifications-outline" size={24} color="#8A2BE2" />
          <Text style={styles.stepText}>Set up notifications</Text>
        </View>
        <View style={styles.stepItem}>
          <Ionicons name="calendar-outline" size={24} color="#8A2BE2" />
          <Text style={styles.stepText}>Track your progress</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/goal-details')}
        >
          <Text style={styles.primaryButtonText}>View Goal Details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleShare}
        >
          <Text style={styles.secondaryButtonText}>Share with Validator</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tertiaryButton}
          onPress={navigateToDashboard}
        >
          <Text style={styles.tertiaryButtonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  successAnimation: {
    alignItems: 'center',
    marginVertical: 32,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  hashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  hashText: {
    fontSize: 16,
    color: '#8A2BE2',
  },
  confirmationText: {
    fontSize: 14,
    color: '#666',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    gap: 12,
    marginTop: 'auto',
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
  tertiaryButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default SuccessPage;