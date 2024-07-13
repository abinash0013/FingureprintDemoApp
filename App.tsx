import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          setAuthenticated(true);
          Alert.alert(
            'Authentication Success',
            'Biometrics successfully provided',
          );
        } else {
          Alert.alert(
            'Authentication Failed',
            'User cancelled biometric prompt',
          );
        }
      })
      .catch(() => {
        Alert.alert('Authentication Error', 'Biometrics failed');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Biometric Authentication</Text>
        <Button title="Authenticate" onPress={authenticate} />
        {authenticated && (
          <Text style={styles.successText}>Authenticated!</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

export default App;
