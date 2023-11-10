import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Vibration, ScrollView } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

export default function Clima() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [clima, setClima] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        alert('Ubicación no autorizada');
        Vibration.vibrate(3 * 1000);
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync();

      setLocation(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
      }
    })();
  };

  const traerClima = async () => {
    try {
      if (!location || !address) return;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=f20492a9c67baeac96fa4b2b4f3d8620&units=metric`
      );

      if (response.data) {
        setClima(response.data);
      }
    } catch (error) {
      console.log(error.message);
      Vibration.vibrate();
    }
  };

  const getCurrentDateTime = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/ip');

      if (response.data) {
        const dateTime = new Date(response.data.utc_datetime);

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        
        setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes}`);
      }
    } catch (error) {
      console.log(error.message);
      Vibration.vibrate();
    }
  };

  useEffect(() => {
    if (location && address) {
      traerClima();
    }

    getCurrentDateTime();
  }, [location, address]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.heading}>
            {!clima
              ? 'Cargando...'
              : `Clima: ${clima.main.temp}°C\nCiudad: ${address.city}`}
          </Text>

          <Text style={styles.dateTime}>
            Fecha y Hora Actual: {currentDateTime}
          </Text>

          <TouchableOpacity onPress={getLocation}>
            <View style={styles.button}>
              <Text style={styles.buttonText}> Obtener Ubicación </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={getLocation}>
      
            <View style={styles.button}>
              <Text style={styles.buttonText}> Recargar </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container2: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateTime: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'teal',
    borderRadius: 10,
    padding: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

