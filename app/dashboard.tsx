import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data - replace with real data from your backend
const mockGoals = [
  {
    id: '1',
    title: 'Complete 30 Days of Coding',
    progress: 60,
    daysRemaining: 12,
    stake: '0.5',
    status: 'active',
  },
  {
    id: '2',
    title: 'Run 5km Every Day',
    progress: 30,
    daysRemaining: 20,
    stake: '0.3',
    status: 'active',
  },
  {
    id: '3',
    title: 'Learn Spanish',
    progress: 100,
    daysRemaining: 0,
    stake: '0.8',
    status: 'completed',
  },
];

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');

  const stats = {
    totalGoals: 3,
    activeGoals: 2,
    completedGoals: 1,
    totalStaked: '1.6',
    successRate: 80,
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Fetch new data here
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const renderGoalCard = (goal: typeof mockGoals[0]) => (
    <TouchableOpacity 
      key={goal.id}
      style={styles.goalCard}
      onPress={() => router.push(`/goal-details/${goal.id}`)}
    >
      <View style={styles.goalHeader}>
        <Text style={styles.goalTitle} numberOfLines={1}>
          {goal.title}
        </Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: goal.status === 'active' ? '#E6F9ED' : '#F0E6FF' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: goal.status === 'active' ? '#00B341' : '#8A2BE2' }
          ]}>
            {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[styles.progressFill, { width: `${goal.progress}%` }]} 
        />
      </View>

      <View style={styles.goalFooter}>
        <Text style={styles.daysText}>
          {goal.daysRemaining} days left
        </Text>
        <Text style={styles.stakeText}>
          {goal.stake} ETH
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Goals</Text>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Overview */}
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.activeGoals}</Text>
              <Text style={styles.statLabel}>Active Goals</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalStaked} ETH</Text>
              <Text style={styles.statLabel}>Total Staked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.successRate}%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/create')}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={styles.createButtonText}>Create New Goal</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'active' && styles.activeTab]}
            onPress={() => setSelectedTab('active')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'active' && styles.activeTabText
            ]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'completed' && styles.activeTab]}
            onPress={() => setSelectedTab('completed')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'completed' && styles.activeTabText
            ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Goals List */}
        <View style={styles.goalsList}>
          {mockGoals
            .filter(goal => 
              selectedTab === 'active' 
                ? goal.status === 'active' 
                : goal.status === 'completed'
            )
            .map(renderGoalCard)}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#8A2BE2" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/create')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#666" />
          <Text style={styles.navText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#666" />
          <Text style={styles.navText}>Validate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  activeTab: {
    backgroundColor: '#8A2BE2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  goalsList: {
    padding: 16,
    gap: 16,
  },
  goalCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A2BE2',
    borderRadius: 2,
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daysText: {
    fontSize: 14,
    color: '#666',
  },
  stakeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
});

export default Dashboard;