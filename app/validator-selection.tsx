import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Mock data for recent validators
const recentValidators = [
  {
    id: '1',
    name: 'John Doe',
    address: '0x1234...5678',
    image: 'https://via.placeholder.com/50',
    validationCount: 5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    address: '0x8765...4321',
    image: 'https://via.placeholder.com/50',
    validationCount: 3,
  },
];

const ValidatorSelection: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValidator, setSelectedValidator] = useState<any>(null);
  const [manualAddress, setManualAddress] = useState('');

  const handleValidatorSelect = (validator: any) => {
    setSelectedValidator(validator);
  };

  const handleContinue = () => {
    if (selectedValidator || manualAddress) {
      router.push('/review'); // Navigate to review page
    } else {
      Alert.alert('Please select a validator or enter an address');
    }
  };

  const handleScan = () => {
    // Implement QR code scanning
    Alert.alert('QR Scanner', 'QR scanning functionality to be implemented');
  };

  const renderValidatorItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.validatorItem,
        selectedValidator?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => handleValidatorSelect(item)}
    >
      <Image source={{ uri: item.image }} style={styles.validatorImage} />
      <View style={styles.validatorInfo}>
        <Text style={styles.validatorName}>{item.name}</Text>
        <Text style={styles.validatorAddress}>{item.address}</Text>
        <Text style={styles.validationCount}>
          {item.validationCount} validations completed
        </Text>
      </View>
      <MaterialIcons
        name={selectedValidator?.id === item.id ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={24}
        color="#8A2BE2"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Choose Validator</Text>
          <Text style={styles.stepIndicator}>Step 2 of 3</Text>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts or enter ETH address"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Recent Validators */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Validators</Text>
        <FlatList
          data={recentValidators}
          renderItem={renderValidatorItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.validatorList}
        />
      </View>

      {/* Manual Entry */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manual Address Entry</Text>
        <View style={styles.manualEntry}>
          <TextInput
            style={styles.addressInput}
            placeholder="Enter ETH address"
            value={manualAddress}
            onChangeText={setManualAddress}
          />
          <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
            <Ionicons name="qr-code" size={24} color="#8A2BE2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Validator Role</Text>
        <Text style={styles.infoText}>
          • Your validator will verify your goal completion{'\n'}
          • Choose someone you trust{'\n'}
          • They must have an ETH wallet
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedValidator && !manualAddress) && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!selectedValidator && !manualAddress}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    marginRight: 40, // To offset the back button width
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
  searchSection: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  validatorList: {
    gap: 12,
  },
  validatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  selectedItem: {
    backgroundColor: '#F0E6FF',
    borderColor: '#8A2BE2',
    borderWidth: 1,
  },
  validatorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  validatorInfo: {
    flex: 1,
  },
  validatorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  validatorAddress: {
    fontSize: 14,
    color: '#666',
  },
  validationCount: {
    fontSize: 12,
    color: '#8A2BE2',
  },
  manualEntry: {
    flexDirection: 'row',
    gap: 12,
  },
  addressInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  scanButton: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    margin: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  continueButton: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D1D1',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ValidatorSelection;