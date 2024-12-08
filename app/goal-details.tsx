import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

// Mock data - replace with real data from your backend/blockchain
const goalData = {
  id: '1',
  title: 'Complete 30 Days of Coding',
  status: 'Active',
  description: 'Code for at least 1 hour every day for 30 days straight.',
  createdAt: '2024-02-01',
  deadline: '2024-03-01',
  stake: '0.5',
  validator: '0x1234...5678',
  progress: 60, // percentage
  daysRemaining: 12,
  contractAddress: '0xabcd...efgh',
};

const GoalDetails: React.FC = () => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my goal: ${goalData.title}`,
        url: 'https://blockgoals.app/goal/123',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const copyAddress = async () => {
    await Clipboard.setStringAsync(goalData.contractAddress);
    // Add toast notification
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
          <Text style={styles.headerTitle} numberOfLines={1}>
            {goalData.title}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{goalData.status}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{goalData.progress}%</Text>
            <Text style={styles.progressSubtext}>Complete</Text>
          </View>
          <View style={styles.timelineInfo}>
            <Text style={styles.daysRemaining}>
              {goalData.daysRemaining} days remaining
            </Text>
            <Text style={styles.deadline}>
              Deadline: {new Date(goalData.deadline).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Stake Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stake Information</Text>
          <View style={styles.stakeDetails}>
            <View style={styles.stakeRow}>
              <Text style={styles.label}>Amount Staked</Text>
              <Text style={styles.value}>{goalData.stake} ETH</Text>
            </View>
            <View style={styles.stakeRow}>
              <Text style={styles.label}>Current Value</Text>
              <Text style={styles.value}>
                ${(Number(goalData.stake) * 2000).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.contractAddress}
              onPress={copyAddress}
            >
              <Text style={styles.addressText}>{goalData.contractAddress}</Text>
              <Ionicons name="copy-outline" size={20} color="#8A2BE2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Validator Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Validator</Text>
          <View style={styles.validatorInfo}>
            <Text style={styles.validatorAddress}>{goalData.validator}</Text>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact Validator</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Goal Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Goal Details</Text>
          <Text style={styles.description}>{goalData.description}</Text>
          <Text style={styles.dateInfo}>
            Created on {new Date(goalData.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {/* Activity Timeline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Goal Created</Text>
                <Text style={styles.timelineDate}>
                  {new Date(goalData.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
            {/* Add more timeline items */}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Mark as Complete</Text>
        </TouchableOpacity>
        <View style={styles.secondaryButtons}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Update Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Request Validation</Text>
          </TouchableOpacity>
        </View>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  shareButton: {
    padding: 8,
  },
  statusBadge: {
    backgroundColor: '#E6F9ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    color: '#00B341',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  progressSection: {
    padding: 24,
    alignItems: 'center',
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#8A2BE2',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  progressSubtext: {
    fontSize: 14,
    color: '#666',
  },
  timelineInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  daysRemaining: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  deadline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  stakeDetails: {
    gap: 12,
  },
  stakeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contractAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  validatorInfo: {
    gap: 12,
  },
  validatorAddress: {
    fontSize: 16,
    color: '#333',
  },
  contactButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  dateInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  timeline: {
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8A2BE2',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timelineDate: {
    fontSize: 14,
    color: '#666',
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  primaryButton: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GoalDetails;