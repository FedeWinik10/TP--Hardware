import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { vibrar } from '../vibrar';

const { width, height } = Dimensions.get('window');

export default function QR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data}`);
    setCameraOpen(false); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image style={styles.imagen} source={require('../assets/QR.png')} />
      </View>
      <View style={styles.openCameraButtonContainer}>
        <TouchableHighlight
          underlayColor="#005880" 
          style={styles.openCameraButton}
          onPress={() => setCameraOpen(true)}
        >
          <Text style={styles.openCameraButtonText}>Abrir cámara</Text>
        </TouchableHighlight>
      </View>
      {cameraOpen && (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      {scanned && (
        <TouchableHighlight
          underlayColor="#005880" 
          style={styles.scanButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.scanButtonText}>Toca para scanear denuevo</Text>
        </TouchableHighlight>
      )}
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
  cameraContainer: {
    width: width - 40,
    height: width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  image: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagen: {
    height: 150,
    width: 150,
  },
  openCameraButtonContainer: {
    marginTop: 20,
  },
  openCameraButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  openCameraButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
