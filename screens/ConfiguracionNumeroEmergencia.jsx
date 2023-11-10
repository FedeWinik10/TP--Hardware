import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity } from "react-native"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { vibrar } from "../vibrar";

export default function ConfiguracionNumeroEmergencia() {
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(false);
  const [Validado, setValidado] = useState("");

  useEffect(() => {
    const getValidado = async () => {
      setValidado(await AsyncStorage.getItem("@numero"));
    }
    getValidado();
  }, []);

  const saveNumero = async () => {
    if (numero.length < 10) {
      setError(true);
      vibrar();
      alert("Ingresa al menos 10 dígitos");
    } else {
      setError(false);
      Keyboard.dismiss();
      await AsyncStorage.setItem('@numero', numero);
      setValidado(numero); 
    }
  }

  return (
    <View style={styles.container}>
      {numero ? (
        <Text style={styles.heading}>Número: {numero}</Text>
      ) : (
        <Text style={styles.heading}>Establecer Número de Emergencia:</Text>
      )}
      <Text style={styles.heading}>Último Número Guardado: {Validado}</Text>
      <TextInput
        placeholder="Número de Emergencia"
        style={styles.textInput}
        onChangeText={setNumero}
        value={numero}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        {}
        <TouchableOpacity style={styles.button} onPress={saveNumero}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008b8b",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  textInput: {
    width: 300,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    color: "black",
    backgroundColor: "white",
  },
  buttonContainer: {
    width: 240,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 15,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
