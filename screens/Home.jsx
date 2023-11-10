import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Clima')}
        >
          <Text style={styles.buttonText}>Hora y clima</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Qr')}
        >
          <Text style={styles.buttonText}>Identificación</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Contactos')}
        >
          <Text style={styles.buttonText}>Contactos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ConfiguracionNumeroEmergencia')}
        >
          <Text style={styles.buttonText}>Número de Emergencia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008b8b', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'lightblue', 
    borderRadius: 10,
    padding: 15,
    width: 200, 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
});
