import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vibrar } from '../vibrar';

export default function Contactos() {
    const [contacts, setContacts] = useState([]);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [emergencyContact, setEmergencyContact] = useState(null);

    useEffect(() => {
        const getGuardado = async () => {
            const guardado = await AsyncStorage.getItem("@numero"); 
            if (guardado) {
                const normalizedGuardado = normalizePhoneNumber(guardado);
                const contact = findContactByEmergencyNumber(contacts, normalizedGuardado);
                setEmergencyContact(contact);
            }
        }
        getGuardado();
    }, [contacts]);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                });
                setContacts(data);
            } else {
                setPermissionGranted(false);
                alert('No se permitió el acceso a contactos');
                vibrar();
            }
        })();
    }, []);

    
    const normalizePhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/\D/g, ''); 
    };

    
    const findContactByEmergencyNumber = (contacts, guardado) => {
        if (guardado && contacts) {
            return contacts.find((contact) => {
                if (contact.phoneNumbers) {
                    return contact.phoneNumbers.some((phoneNumber) => {
                        const normalizedContactNumber = normalizePhoneNumber(phoneNumber.number);
                        return normalizedContactNumber.includes(guardado);
                    });
                }
                return false;
            });
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {permissionGranted ? (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Número de Emergencia Guardado:</Text>
                        <Text style={[styles.emergencyContactName, { color: 'white' }]}>
                            {emergencyContact ? emergencyContact.name : 'No coincide con ningún contacto'}
                        </Text>
                    </View>
                    <FlatList
                        data={contacts}
                        renderItem={({ item }) => (
                            <View style={styles.contactItem}>
                                <Text
                                    style={[
                                        styles.contactName,
                                        emergencyContact && emergencyContact.id === item.id
                                            ? { color: 'green' }
                                            : null
                                    ]}
                                >
                                    {item.name}
                                </Text>
                                {item.phoneNumbers && item.phoneNumbers.length > 0 ? (
                                    <Text style={styles.contactPhoneNumber}>
                                        {item.phoneNumbers[0].number}
                                    </Text>
                                ) : null}
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : (
                <Text style={styles.permissionDeniedText}>No se permitió el acceso a contactos</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        backgroundColor: '#008b8b',
        padding: 15,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    emergencyContactName: {
        fontSize: 18,
        textAlign: 'center',
    },
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactPhoneNumber: {
        fontSize: 14,
        color: 'gray',
    },
    permissionDeniedText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
    },
});
