import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Mock user data - replace with real data from your backend
const userData = {
  name: 'John Doe',
  walletAddress: '0x1234...5678',
  profileImage: 'https://via.placeholder.com/100',
  stats: {
    goalsCompleted: 12,
    successRate: 85,
    totalStaked: '2.5',
    totalEarned: '0.8',
    validatorRating: 4.8,
  },
  achievements: [
    { id: '1', title: 'Early Adopter', icon: '🏆' },
    { id: '2', title: 'Goal Crusher', icon: '🎯' },
    { id: '3', title: 'Super Validator', icon: '✅' },
  ],
  validationHistory: {
    total: 15,
    successful: 13,
    pending: 2,
    earnings: '0.3',
  },
};

const Profile: React.FC = () => {
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my profile on BlockGoals!`,
        url: 'https://blockgoals.app/profile/123',
      });
    } catch (error) {
      console.error(error);
    }
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
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: userData.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.walletAddress}>{userData.walletAddress}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.stats.goalsCompleted}</Text>
              <Text style={styles.statLabel}>Goals Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.stats.successRate}%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData.stats.totalStaked} ETH</Text>
              <Text style={styles.statLabel}>Total Staked</Text>
            </View>
          </View>
        </View>

        {/* Wallet Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wallet</Text>
          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Text style={styles.walletLabel}>Connected Wallet</Text>
              <TouchableOpacity style={styles.disconnectButton}>
                <Text style={styles.disconnectText}>Disconnect</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.walletBalance}>
              Balance: {userData.stats.totalStaked} ETH
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.achievementsScroll}
          >
            {userData.achievements.map(achievement => (
              <View key={achievement.id} style={styles.achievementCard}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Validation History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Validation History</Text>
          <View style={styles.validationCard}>
            <View style={styles.validationStat}>
              <Text style={styles.validationValue}>
                {userData.validationHistory.total}
              </Text>
              <Text style={styles.validationLabel}>Total Validations</Text>
            </View>
            <View style={styles.validationStat}>
              <Text style={styles.validationValue}>
                {userData.validationHistory.successful}
              </Text>
              <Text style={styles.validationLabel}>Successful</Text>
            </View>
            <View style={styles.validationStat}>
              <Text style={styles.validationValue}>
                {userData.validationHistory.earnings} ETH
              </Text>
              <Text style={styles.validationLabel}>Earnings</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/create')}
          >
            <Ionicons name="add-circle-outline" size={24} color="#8A2BE2" />
            <Text style={styles.actionButtonText}>Create Goal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/transactions')}
          >
            <Ionicons name="list-outline" size={24} color="#8A2BE2" />
            <Text style={styles.actionButtonText}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Ionicons name="share-social-outline" size={24} color="#8A2BE2" />
            <Text style={styles.actionButtonText}>Share Profile</Text>
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
  profileSection: {
    alignItems: 'center',
    padding: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  walletAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  editButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  walletCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletLabel: {
    fontSize: 14,
    color: '#666',
  },
  disconnectButton: {
    padding: 8,
  },
  disconnectText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  walletBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementsScroll: {
    flexDirection: 'row',
  },
  achievementCard: {
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 100,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  validationCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  validationStat: {
    alignItems: 'center',
  },
  validationValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  validationLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#8A2BE2',
  },
});

export default Profile;