import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ReviewGoal: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleConfirm = () => {
    if (!termsAccepted) {
      Alert.alert('Terms Required', 'Please accept the terms to continue');
      return;
    }
    
    // Here you would handle the blockchain transaction
    Alert.alert(
      'Confirm Transaction',
      'This will create your goal on the blockchain',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Handle transaction and navigate to success
            router.push('/success');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Review Goal</Text>
          <Text style={styles.stepIndicator}>Step 3 of 3</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Goal Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Goal Details</Text>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{params.title}</Text>
            
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{params.description}</Text>
          </View>
        </View>

        {/* Financial Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Financial Details</Text>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Stake Amount</Text>
              <Text style={styles.value}>{params.stake} ETH</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Gas Fee (est.)</Text>
              <Text style={styles.value}>0.001 ETH</Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.label}>Total</Text>
              <Text style={styles.totalValue}>
                {(Number(params.stake) + 0.001).toFixed(3)} ETH
              </Text>
            </View>
          </View>
        </View>

        {/* Validator Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Validator</Text>
          <View style={styles.cardContent}>
            <Text style={styles.value}>{params.validatorAddress}</Text>
            <TouchableOpacity 
              style={styles.changeButton}
              onPress={() => router.back()}
            >
              <Text style={styles.changeButtonText}>Change Validator</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms & Conditions */}
        <TouchableOpacity 
          style={styles.termsContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <MaterialIcons
            name={termsAccepted ? "check-box" : "check-box-outline-blank"}
            size={24}
            color="#8A2BE2"
          />
          <Text style={styles.termsText}>
            I agree to the Terms and Conditions and understand that my staked ETH
            will be locked until goal completion
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.grandTotal}>
            {(Number(params.stake) + 0.001).toFixed(3)} ETH
          </Text>
          <Text style={styles.usdValue}>
            ≈ ${((Number(params.stake) + 0.001) * 2000).toFixed(2)} USD
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.confirmButton, !termsAccepted && styles.disabledButton]}
          onPress={handleConfirm}
          disabled={!termsAccepted}
        >
          <Text style={styles.confirmButtonText}>Confirm & Create Goal</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stepIndicator: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
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
  cardContent: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  changeButton: {
    padding: 8,
  },
  changeButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 16,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  grandTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  usdValue: {
    fontSize: 14,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#D1D1D1',
  },
});

export default ReviewGoal;