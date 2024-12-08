import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const categories = [
  { id: '1', title: 'Account Issues', icon: 'person' },
  { id: '2', title: 'Transaction Problems', icon: 'cash' },
  { id: '3', title: 'Goal Validation', icon: 'trophy' },
  { id: '4', title: 'Wallet Issues', icon: 'wallet' },
  { id: '5', title: 'Technical Support', icon: 'construct' },
  { id: '6', title: 'Other', icon: 'help-circle' },
];

const priorities = [
  { id: 'low', title: 'Low', color: '#00B341' },
  { id: 'medium', title: 'Medium', color: '#FFA000' },
  { id: 'high', title: 'High', color: '#FF4444' },
  { id: 'urgent', title: 'Urgent', color: '#FF0000' },
];

const ContactSupport: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachments([...attachments, result.assets[0].uri]);
    }
  };

  const submitTicket = () => {
    if (!selectedCategory || !selectedPriority || !title || !description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Submit ticket logic here
    Alert.alert(
      'Ticket Submitted',
      'We will get back to you shortly',
      [{ text: 'OK', onPress: () => router.back() }]
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
        <Text style={styles.headerTitle}>Contact Support</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Support Options */}
        <View style={styles.supportOptions}>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="chatbubbles" size={24} color="#8A2BE2" />
            <Text style={styles.optionText}>Live Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="mail" size={24} color="#8A2BE2" />
            <Text style={styles.optionText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="warning" size={24} color="#8A2BE2" />
            <Text style={styles.optionText}>Emergency</Text>
          </TouchableOpacity>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Category*</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={24} 
                  color={selectedCategory === category.id ? 'white' : '#8A2BE2'} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Priority Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Priority*</Text>
          <View style={styles.priorityButtons}>
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.id}
                style={[
                  styles.priorityButton,
                  selectedPriority === priority.id && {
                    backgroundColor: priority.color,
                  }
                ]}
                onPress={() => setSelectedPriority(priority.id)}
              >
                <Text style={[
                  styles.priorityText,
                  selectedPriority === priority.id && styles.selectedPriorityText
                ]}>
                  {priority.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Issue Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Details*</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.descriptionInput}
            placeholder="Describe your issue in detail"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />
        </View>

        {/* Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attachments</Text>
          <TouchableOpacity 
            style={styles.attachButton}
            onPress={pickImage}
          >
            <Ionicons name="image" size={24} color="#8A2BE2" />
            <Text style={styles.attachButtonText}>Add Screenshot</Text>
          </TouchableOpacity>
          {attachments.length > 0 && (
            <Text style={styles.attachmentsText}>
              {attachments.length} file(s) attached
            </Text>
          )}
        </View>

        {/* Support Status */}
        <View style={styles.statusSection}>
          <Text style={styles.statusTitle}>Current Support Status</Text>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Average Response Time:</Text>
            <Text style={styles.statusValue}>~2 hours</Text>
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Support Hours:</Text>
            <Text style={styles.statusValue}>24/7</Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={submitTicket}
        >
          <Text style={styles.submitButtonText}>Submit Ticket</Text>
        </TouchableOpacity>

        <Text style={styles.privacyText}>
          By submitting this ticket, you agree to our Terms of Service and Privacy Policy
        </Text>
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00B341',
  },
  statusText: {
    fontSize: 14,
    color: '#00B341',
  },
  content: {
    flex: 1,
  },
  supportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionButton: {
    alignItems: 'center',
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    gap: 8,
  },
  selectedCategory: {
    backgroundColor: '#8A2BE2',
  },
  categoryText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
  selectedCategoryText: {
    color: 'white',
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  priorityText: {
    fontSize: 14,
    color: '#333',
  },
  selectedPriorityText: {
    color: 'white',
  },
  titleInput: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  descriptionInput: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  attachButtonText: {
    fontSize: 16,
    color: '#8A2BE2',
  },
  attachmentsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  statusSection: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    margin: 16,
    borderRadius: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
  },
  statusValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacyText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
});

export default ContactSupport;