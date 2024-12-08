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
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const NotificationSettings: React.FC = () => {
  const router = useRouter();
  const [settings, setSettings] = useState({
    // General
    allNotifications: true,
    pushNotifications: true,
    emailNotifications: true,
    inAppNotifications: true,
    soundEffects: true,
    vibration: true,

    // Goals
    goalReminders: true,
    progressUpdates: true,
    deadlineAlerts: true,
    achievementNotifications: true,
    validationRequests: true,
    goalCompletion: true,

    // Transactions
    transactionConfirmations: true,
    stakeUpdates: true,
    gasPriceAlerts: false,
    walletActivity: true,
    smartContractEvents: true,
    networkUpdates: true,

    // Social
    validatorMessages: true,
    communityUpdates: false,
    friendActivities: true,
    mentions: true,
    comments: true,
    likes: false,
  });

  const [quietHoursStart, setQuietHoursStart] = useState(new Date());
  const [quietHoursEnd, setQuietHoursEnd] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState<'start' | 'end'>('start');

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSwitch = (
    title: string,
    key: keyof typeof settings,
    description?: string,
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={settings[key]}
        onValueChange={() => toggleSetting(key)}
        trackColor={{ false: '#D1D1D1', true: '#8A2BE2' }}
        thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : settings[key] ? '#FFFFFF' : '#F4F3F4'}
      />
    </View>
  );

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      if (timePickerMode === 'start') {
        setQuietHoursStart(selectedDate);
      } else {
        setQuietHoursEnd(selectedDate);
      }
    }
  };

  const showTimePick = (mode: 'start' | 'end') => {
    setTimePickerMode(mode);
    setShowTimePicker(true);
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all notification settings to default?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            // Reset logic here
            Alert.alert('Success', 'Settings have been reset to default');
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
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <TouchableOpacity onPress={() => Alert.alert('Success', 'Settings saved')}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          {renderSwitch('All Notifications', 'allNotifications')}
          {renderSwitch('Push Notifications', 'pushNotifications')}
          {renderSwitch('Email Notifications', 'emailNotifications')}
          {renderSwitch('In-App Notifications', 'inAppNotifications')}
          {renderSwitch('Sound Effects', 'soundEffects')}
          {renderSwitch('Vibration', 'vibration')}
        </View>

        {/* Goal Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goals</Text>
          {renderSwitch('Goal Reminders', 'goalReminders')}
          {renderSwitch('Progress Updates', 'progressUpdates')}
          {renderSwitch('Deadline Alerts', 'deadlineAlerts')}
          {renderSwitch('Achievements', 'achievementNotifications')}
          {renderSwitch('Validation Requests', 'validationRequests')}
          {renderSwitch('Goal Completion', 'goalCompletion')}
        </View>

        {/* Transaction Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          {renderSwitch('Transaction Confirmations', 'transactionConfirmations')}
          {renderSwitch('Stake Updates', 'stakeUpdates')}
          {renderSwitch('Gas Price Alerts', 'gasPriceAlerts')}
          {renderSwitch('Wallet Activity', 'walletActivity')}
          {renderSwitch('Smart Contract Events', 'smartContractEvents')}
          {renderSwitch('Network Updates', 'networkUpdates')}
        </View>

        {/* Social Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social</Text>
          {renderSwitch('Validator Messages', 'validatorMessages')}
          {renderSwitch('Community Updates', 'communityUpdates')}
          {renderSwitch('Friend Activities', 'friendActivities')}
          {renderSwitch('Mentions', 'mentions')}
          {renderSwitch('Comments', 'comments')}
          {renderSwitch('Likes', 'likes')}
        </View>

        {/* Quiet Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiet Hours</Text>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => showTimePick('start')}
          >
            <Text style={styles.timeButtonText}>
              Start Time: {quietHoursStart.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => showTimePick('end')}
          >
            <Text style={styles.timeButtonText}>
              End Time: {quietHoursEnd.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetSettings}
        >
          <Text style={styles.resetButtonText}>Reset to Default Settings</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={timePickerMode === 'start' ? quietHoursStart : quietHoursEnd}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
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
  saveText: {
    fontSize: 16,
    color: '#8A2BE2',
    fontWeight: '600',
  },
  content: {
    flex: 1,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timeButton: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  resetButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#FF4444',
    fontWeight: '600',
  },
});

export default NotificationSettings;