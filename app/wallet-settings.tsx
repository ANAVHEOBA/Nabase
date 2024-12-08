import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

// Mock wallet data - replace with real wallet integration
const walletData = {
  address: '0x1234...5678',
  balance: '1.245',
  usdBalance: '2,490.00',
  network: 'Ethereum Mainnet',
  isConnected: true,
  transactions: [
    {
      id: '1',
      type: 'Send',
      amount: '0.1',
      status: 'Completed',
      date: '2024-02-20',
    },
    {
      id: '2',
      type: 'Receive',
      amount: '0.5',
      status: 'Pending',
      date: '2024-02-19',
    },
  ],
};

const WalletSettings: React.FC = () => {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [gasPriceAlerts, setGasPriceAlerts] = useState(false);
  const [selectedGasOption, setSelectedGasOption] = useState('standard');

  const copyAddress = async () => {
    await Clipboard.setStringAsync(walletData.address);
    Alert.alert('Success', 'Address copied to clipboard');
  };

  const disconnectWallet = () => {
    Alert.alert(
      'Disconnect Wallet',
      'Are you sure you want to disconnect your wallet?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            // Handle wallet disconnection
            router.back();
          },
        },
      ]
    );
  };

  const renderTransactionItem = (transaction: typeof walletData.transactions[0]) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Ionicons 
          name={transaction.type === 'Send' ? 'arrow-up' : 'arrow-down'} 
          size={24} 
          color={transaction.type === 'Send' ? '#FF4444' : '#00B341'} 
        />
        <View>
          <Text style={styles.transactionType}>{transaction.type}</Text>
          <Text style={styles.transactionDate}>{transaction.date}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>{transaction.amount} ETH</Text>
        <Text style={[
          styles.transactionStatus,
          { color: transaction.status === 'Completed' ? '#00B341' : '#FFA500' }
        ]}>
          {transaction.status}
        </Text>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Wallet Settings</Text>
        <TouchableOpacity onPress={() => router.push('/wallet-help')}>
          <Ionicons name="help-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Wallet Info Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View style={styles.networkIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.networkText}>{walletData.network}</Text>
            </View>
            <TouchableOpacity onPress={copyAddress}>
              <Text style={styles.addressText}>{walletData.address}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceText}>{walletData.balance} ETH</Text>
          <Text style={styles.usdBalance}>${walletData.usdBalance} USD</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="send" size={24} color="#8A2BE2" />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#8A2BE2" />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card" size={24} color="#8A2BE2" />
            <Text style={styles.actionText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="swap-horizontal" size={24} color="#8A2BE2" />
            <Text style={styles.actionText}>Swap</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Settings</Text>
          
          <Text style={styles.subsectionTitle}>Gas Fee Preference</Text>
          <View style={styles.gasOptions}>
            {['standard', 'fast', 'custom'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.gasOption,
                  selectedGasOption === option && styles.selectedGasOption
                ]}
                onPress={() => setSelectedGasOption(option)}
              >
                <Text style={[
                  styles.gasOptionText,
                  selectedGasOption === option && styles.selectedGasOptionText
                ]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Biometric Authentication</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#D1D1D1', true: '#8A2BE2' }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Transaction Alerts</Text>
            <Switch
              value={transactionAlerts}
              onValueChange={setTransactionAlerts}
              trackColor={{ false: '#D1D1D1', true: '#8A2BE2' }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Gas Price Alerts</Text>
            <Switch
              value={gasPriceAlerts}
              onValueChange={setGasPriceAlerts}
              trackColor={{ false: '#D1D1D1', true: '#8A2BE2' }}
            />
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {walletData.transactions.map(renderTransactionItem)}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>

        {/* Disconnect Wallet */}
        <TouchableOpacity 
          style={styles.disconnectButton}
          onPress={disconnectWallet}
        >
          <Text style={styles.disconnectText}>Disconnect Wallet</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  walletCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  networkIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00B341',
  },
  networkText: {
    fontSize: 14,
    color: '#666',
  },
  addressText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  balanceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  usdBalance: {
    fontSize: 16,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#8A2BE2',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  gasOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  gasOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  selectedGasOption: {
    backgroundColor: '#8A2BE2',
  },
  gasOptionText: {
    color: '#666',
    fontSize: 14,
  },
  selectedGasOptionText: {
    color: 'white',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionType: {
    fontSize: 16,
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionStatus: {
    fontSize: 14,
  },
  viewAllButton: {
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
  disconnectButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    alignItems: 'center',
  },
  disconnectText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WalletSettings;