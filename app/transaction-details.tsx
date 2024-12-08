import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

// Mock transaction data - replace with real blockchain data
const transactionData = {
  id: 'tx123',
  hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  type: 'Send',
  status: 'Completed',
  amount: '0.5',
  usdValue: '1,000.00',
  timestamp: '2024-02-20T15:30:00Z',
  confirmations: 12,
  from: '0x1234...5678',
  to: '0x9abc...def0',
  gasUsed: '21,000',
  gasPrice: '30',
  totalCost: '0.00063',
  blockNumber: '18234567',
  nonce: '42',
  network: 'Ethereum Mainnet',
  notes: 'Payment for goal validation',
};

const TransactionDetails: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this transaction: ${transactionData.hash}`,
        url: `https://etherscan.io/tx/${transactionData.hash}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openInExplorer = () => {
    Linking.openURL(`https://etherscan.io/tx/${transactionData.hash}`);
  };

  const renderInfoRow = (label: string, value: string, copyable?: boolean) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.valueContainer}
        onPress={() => copyable && copyToClipboard(value)}
      >
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
        {copyable && (
          <Ionicons name="copy-outline" size={20} color="#8A2BE2" />
        )}
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: transactionData.status === 'Completed' ? '#E6F9ED' : '#FFF3E0' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: transactionData.status === 'Completed' ? '#00B341' : '#FFA000' }
              ]}>
                {transactionData.status}
              </Text>
            </View>
            <Text style={styles.timestamp}>
              {new Date(transactionData.timestamp).toLocaleString()}
            </Text>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{transactionData.amount} ETH</Text>
            <Text style={styles.usdValue}>${transactionData.usdValue} USD</Text>
          </View>

          <Text style={styles.confirmations}>
            {transactionData.confirmations} Block Confirmations
          </Text>
        </View>

        {/* Transaction Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Information</Text>
          {renderInfoRow('Hash', transactionData.hash, true)}
          {renderInfoRow('From', transactionData.from, true)}
          {renderInfoRow('To', transactionData.to, true)}
          {renderInfoRow('Network Fee', `${transactionData.gasUsed} Gas`)}
          {renderInfoRow('Gas Price', `${transactionData.gasPrice} Gwei`)}
          {renderInfoRow('Total Cost', `${transactionData.totalCost} ETH`)}
          {renderInfoRow('Block', transactionData.blockNumber)}
          {renderInfoRow('Nonce', transactionData.nonce)}
        </View>

        {/* Network Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network Details</Text>
          {renderInfoRow('Network', transactionData.network)}
          <TouchableOpacity 
            style={styles.explorerButton}
            onPress={openInExplorer}
          >
            <Text style={styles.explorerButtonText}>View on Explorer</Text>
            <Ionicons name="open-outline" size={20} color="#8A2BE2" />
          </TouchableOpacity>
        </View>

        {/* Notes */}
        {transactionData.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notes}>{transactionData.notes}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={24} color="#8A2BE2" />
            <Text style={styles.actionButtonText}>Download Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.reportButton]}
            onPress={() => router.push('/support')}
          >
            <Ionicons name="warning-outline" size={24} color="#FF4444" />
            <Text style={[styles.actionButtonText, styles.reportButtonText]}>
              Report Issue
            </Text>
          </TouchableOpacity>
        </View>
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
  statusCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  amountContainer: {
    marginBottom: 16,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  usdValue: {
    fontSize: 16,
    color: '#666',
  },
  confirmations: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  value: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  explorerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    gap: 8,
  },
  explorerButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '600',
  },
  notes: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
  reportButton: {
    backgroundColor: '#FFF0F0',
  },
  reportButtonText: {
    color: '#FF4444',
  },
});

export default TransactionDetails;