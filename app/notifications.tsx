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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock notification data
const notifications = [
  {
    id: '1',
    type: 'goal',
    title: 'Goal Deadline Approaching',
    description: 'Your "30 Days Coding Challenge" goal ends in 2 days',
    time: '2 hours ago',
    read: false,
    date: 'today',
  },
  {
    id: '2',
    type: 'transaction',
    title: 'Transaction Confirmed',
    description: 'Your stake of 0.5 ETH has been confirmed',
    time: '5 hours ago',
    read: false,
    date: 'today',
  },
  {
    id: '3',
    type: 'validation',
    title: 'New Validation Request',
    description: 'John Doe requested you to validate their goal',
    time: '1 day ago',
    read: true,
    date: 'yesterday',
  },
  {
    id: '4',
    type: 'achievement',
    title: 'New Achievement Unlocked',
    description: 'You've completed 5 goals! 🏆',
    time: '2 days ago',
    read: true,
    date: 'this_week',
  },
  // Add more notifications...
];

const filterOptions = [
  { id: 'all', title: 'All' },
  { id: 'goals', title: 'Goals' },
  { id: 'transactions', title: 'Transactions' },
  { id: 'validations', title: 'Validations' },
  { id: 'system', title: 'System' },
];

const NotificationsPage: React.FC = () => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notificationsList, setNotificationsList] = useState(notifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return 'trophy-outline';
      case 'transaction':
        return 'cash-outline';
      case 'validation':
        return 'checkmark-circle-outline';
      case 'achievement':
        return 'ribbon-outline';
      default:
        return 'notifications-outline';
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notificationsList.map(notification => ({
      ...notification,
      read: true,
    }));
    setNotificationsList(updatedNotifications);
    Alert.alert('Success', 'All notifications marked as read');
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => setNotificationsList([]),
        },
      ]
    );
  };

  const renderNotification = (notification: typeof notifications[0]) => (
    <TouchableOpacity 
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification,
      ]}
      onPress={() => {
        // Handle notification press
        router.push(`/notification-detail/${notification.id}`);
      }}
    >
      <View style={styles.notificationIcon}>
        <Ionicons 
          name={getNotificationIcon(notification.type)} 
          size={24} 
          color="#8A2BE2" 
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationDescription}>
          {notification.description}
        </Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.selectedFilter,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.selectedFilterText,
            ]}>
              {filter.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {notificationsList.length > 0 ? (
        <ScrollView style={styles.content}>
          {/* Today's Notifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>
            {notificationsList
              .filter(n => n.date === 'today')
              .map(renderNotification)}
          </View>

          {/* Earlier Notifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earlier This Week</Text>
            {notificationsList
              .filter(n => n.date === 'this_week')
              .map(renderNotification)}
          </View>

          {/* Clear All Button */}
          <TouchableOpacity 
            style={styles.clearAllButton}
            onPress={clearAll}
          >
            <Text style={styles.clearAllText}>Clear All Notifications</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off-outline" size={48} color="#666" />
          <Text style={styles.emptyStateTitle}>All Caught Up!</Text>
          <Text style={styles.emptyStateText}>
            You have no new notifications at this time
          </Text>
        </View>
      )}

      {/* Settings Button */}
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => router.push('/notification-settings')}
      >
        <Ionicons name="settings-outline" size={24} color="#8A2BE2" />
        <Text style={styles.settingsButtonText}>Notification Settings</Text>
      </TouchableOpacity>
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
  markReadText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  filterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
  },
  selectedFilter: {
    backgroundColor: '#8A2BE2',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  selectedFilterText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  unreadNotification: {
    backgroundColor: '#F8F9FA',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8A2BE2',
    alignSelf: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  clearAllButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  clearAllText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 8,
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#8A2BE2',
  },
});

export default NotificationsPage;