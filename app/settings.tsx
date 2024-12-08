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

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
            router.replace('/');
          },
        },
      ]
    );
  };

  const renderSettingItem = (
    title: string,
    icon: string,
    onPress?: () => void,
    value?: boolean,
    onValueChange?: (value: boolean) => void,
  ) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color="#333" />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {onValueChange ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D1D1', true: '#8A2BE2' }}
          thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : value ? '#FFFFFF' : '#F4F3F4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="#666" />
      )}
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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for alignment */}
      </View>

      <ScrollView style={styles.content}>
        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderSettingItem('Edit Profile', 'person-outline', () => router.push('/edit-profile'))}
          {renderSettingItem('Wallet Settings', 'wallet-outline', () => router.push('/wallet-settings'))}
          {renderSettingItem('Email & Password', 'mail-outline', () => router.push('/security'))}
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {renderSettingItem(
            'Push Notifications',
            'notifications-outline',
            undefined,
            notifications,
            setNotifications
          )}
          {renderSettingItem(
            'Email Notifications',
            'mail-outline',
            undefined,
            emailNotifications,
            setEmailNotifications
          )}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSettingItem(
            'Dark Mode',
            'moon-outline',
            undefined,
            darkMode,
            setDarkMode
          )}
          {renderSettingItem('Language', 'language-outline', () => router.push('/language'))}
          {renderSettingItem(
            'Sound Effects',
            'volume-high-outline',
            undefined,
            soundEffects,
            setSoundEffects
          )}
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          {renderSettingItem(
            'Biometric Authentication',
            'finger-print-outline',
            undefined,
            biometrics,
            setBiometrics
          )}
          {renderSettingItem('Privacy Settings', 'lock-closed-outline', () => router.push('/privacy'))}
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderSettingItem('Help Center', 'help-circle-outline', () => router.push('/help'))}
          {renderSettingItem('Contact Us', 'mail-outline', () => router.push('/contact'))}
          {renderSettingItem('About', 'information-circle-outline', () => router.push('/about'))}
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
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
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
  },
  deleteText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    padding: 16,
  },
});

export default SettingsPage;