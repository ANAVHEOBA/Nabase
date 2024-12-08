import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock FAQ data
const faqData = [
  {
    id: '1',
    question: 'How do I create a new goal?',
    answer: 'To create a new goal, tap the "+" button on the dashboard and follow the step-by-step process to set up your goal details, stake amount, and validator.',
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'How do transactions work?',
    answer: 'Transactions are processed on the Ethereum network. When you stake ETH for a goal, it's locked in a smart contract until your goal is validated.',
    category: 'Wallet & Transactions',
  },
  // Add more FAQs...
];

const categories = [
  {
    id: '1',
    title: 'Getting Started',
    icon: 'rocket-outline',
    color: '#8A2BE2',
  },
  {
    id: '2',
    title: 'Wallet & Transactions',
    icon: 'wallet-outline',
    color: '#00B341',
  },
  {
    id: '3',
    title: 'Goals & Validation',
    icon: 'trophy-outline',
    color: '#FFA000',
  },
  {
    id: '4',
    title: 'Security & Privacy',
    icon: 'shield-checkmark-outline',
    color: '#FF4444',
  },
];

const HelpCenter: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Implement search functionality
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const contactSupport = () => {
    // Implement support chat or email
    router.push('/contact-support');
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
        <Text style={styles.headerTitle}>Help Center</Text>
        <TouchableOpacity onPress={() => handleSearch('')}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for help"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#666"
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Categories */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={styles.categoryCard}
              onPress={() => router.push(`/help/${category.title.toLowerCase()}`)}
            >
              <View style={[styles.iconCircle, { backgroundColor: category.color + '20' }]}>
                <Ionicons name={category.icon as any} size={24} color={category.color} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqData.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleFaq(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color="#666" 
                />
              </View>
              {expandedFaq === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Support */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need More Help?</Text>
          <Text style={styles.supportText}>
            Our support team is available 24/7 to assist you with any questions.
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={contactSupport}
          >
            <Ionicons name="chatbubbles-outline" size={24} color="white" />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          <View style={styles.resourceLinks}>
            <TouchableOpacity 
              style={styles.resourceLink}
              onPress={() => Linking.openURL('https://docs.example.com')}
            >
              <Ionicons name="document-text-outline" size={24} color="#8A2BE2" />
              <Text style={styles.resourceLinkText}>Documentation</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.resourceLink}
              onPress={() => Linking.openURL('https://community.example.com')}
            >
              <Ionicons name="people-outline" size={24} color="#8A2BE2" />
              <Text style={styles.resourceLinkText}>Community</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.resourceLink}
              onPress={() => router.push('/tutorials')}
            >
              <Ionicons name="play-circle-outline" size={24} color="#8A2BE2" />
              <Text style={styles.resourceLinkText}>Tutorials</Text>
            </TouchableOpacity>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    margin: 16,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  categoryCard: {
    width: '45%',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
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
  faqItem: {
    marginBottom: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  supportSection: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resourcesSection: {
    padding: 16,
  },
  resourceLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  resourceLink: {
    alignItems: 'center',
    gap: 8,
  },
  resourceLinkText: {
    fontSize: 14,
    color: '#8A2BE2',
  },
});

export default HelpCenter;