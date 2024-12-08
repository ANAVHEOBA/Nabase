import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CreateGoal: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stake, setStake] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!stake) {
      newErrors.stake = 'Stake amount is required';
    } else if (isNaN(Number(stake)) || Number(stake) <= 0) {
      newErrors.stake = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      router.push({
        pathname: '/validator-selection',
        params: { title, description, stake }
      });
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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Create Goal</Text>
          <Text style={styles.stepIndicator}>Step 1 of 3</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Goal Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Goal Title</Text>
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              placeholder="What do you want to achieve?"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (errors.title) {
                  setErrors({ ...errors, title: '' });
                }
              }}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          {/* Goal Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea, errors.description && styles.inputError]}
              placeholder="Describe your goal in detail..."
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (errors.description) {
                  setErrors({ ...errors, description: '' });
                }
              }}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>

          {/* Stake Amount */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stake Amount (ETH)</Text>
            <TextInput
              style={[styles.input, errors.stake && styles.inputError]}
              placeholder="0.0 ETH"
              keyboardType="decimal-pad"
              value={stake}
              onChangeText={(text) => {
                setStake(text);
                if (errors.stake) {
                  setErrors({ ...errors, stake: '' });
                }
              }}
            />
            {stake ? (
              <Text style={styles.helperText}>≈ ${(Number(stake) * 2000).toFixed(2)} USD</Text>
            ) : (
              <Text style={styles.helperText}>≈ $0.00 USD</Text>
            )}
            {errors.stake && <Text style={styles.errorText}>{errors.stake}</Text>}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>How it works</Text>
            <Text style={styles.infoText}>
              • Set your goal and stake ETH{'\n'}
              • Choose a trusted validator{'\n'}
              • Complete your goal and get verified{'\n'}
              • Get your stake back or donate it
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.costBreakdown}>
            <Text style={styles.costText}>Estimated Gas: 0.001 ETH</Text>
            <Text style={styles.costText}>Total: {stake || '0.0'} ETH</Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.nextButton,
              (!title || !description || !stake) && styles.disabledButton
            ]}
            onPress={handleNext}
            disabled={!title || !description || !stake}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40, // To offset the back button width
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stepIndicator: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  inputError: {
    borderColor: '#FF4444',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  costBreakdown: {
    marginBottom: 16,
  },
  costText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  nextButton: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#D1D1D1',
  },
});

export default CreateGoal;