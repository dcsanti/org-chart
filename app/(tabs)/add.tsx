import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
    const [company, setCompany] = useState('');
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        role: '',
        reportsTo: '',
        companyId: '',
        address: {
            streetNumber: '',
            address1: '',
            address2: '',
            city: '',
            country: 'NZ'
        }
    });
    const [modalVisible, setModalVisible] = useState(false);
    const countries = ['NZ', 'AU', 'UK'];

    useEffect(() => {
        getFromAsyncStorage('companies')
            .then(existingCompanies => {
                console.log("onLoad", existingCompanies);
            });

        getFromAsyncStorage('employees')
            .then(existingCompanies => {
                console.log("onLoad", existingCompanies);
            });
    }, [])

    const storeInAsyncStorage = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error("Error saving data to AsyncStorage", e);
        }
    };

    const getFromAsyncStorage = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error("Error retrieving data from AsyncStorage", e);
            return null;
        }
    };

    const updateEmployee = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setEmployee(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setEmployee(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleAddCompany = () => {
        const companyData = {
            id: Date.now(),
            name: company.trim()
        }

        console.log(companyData);
        // get the existing companies from async storage and append the new company
        getFromAsyncStorage('companies')
            .then(existingCompanies => {
                const companies = existingCompanies || [];
                companies.push(companyData);
                return storeInAsyncStorage('companies', companies);
            })
            .catch(error => {
                console.error("Error retrieving or storing companies", error);
            });


        getFromAsyncStorage('employees')
            .then(existingEmployees => {
                console.log("Existing Companies:", existingEmployees);
            });
    };

    const handleAddEmployee = () => {
        const newEmployee = {
            id: Date.now(),
            firstName: employee.firstName.trim(),
            lastName: employee.lastName.trim(),
            role: employee.role.trim(),
            reportsTo: employee.reportsTo ? employee.reportsTo.trim() : null, // should be a valid employee ID under the same companyID
            companyId: employee.companyId ? employee.companyId.trim() : null, // should be a valid companyID
            address: {
                streetNumber: employee.address.streetNumber.trim(),
                address1: employee.address.address1.trim(),
                address2: employee.address.address2.trim(),
                city: employee.address.city.trim(),
                country: employee.address.country
            }
        };
        console.log(newEmployee);

        // get the existing employees from async storage and append the new employee
        getFromAsyncStorage('employees')
            .then(existingEmployees => {
                const employees = existingEmployees || [];
                employees.push(newEmployee);
                return storeInAsyncStorage('employees', employees);
            })
            .catch(error => {
                console.error("Error retrieving or storing employees", error);
            });
    }
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginBottom: 40 }}>
            <ScrollView style={styles.container}>
                <View style={styles.formSection}>
                    <Text style={styles.title}>Add New Company</Text>
                    <Text style={styles.label}>Company Name</Text>
                    <TextInput
                        style={styles.input}
                        value={company}
                        onChangeText={setCompany}
                        placeholder="Company Name"
                        placeholderTextColor="#888"
                    />
                </View>
                <Pressable 
                    style={styles.submitButton} 
                    onPress={handleAddCompany}
                    disabled={!company.trim()}>
                    <Text style={styles.buttonText}>Add Company</Text>
                </Pressable>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Employee Details</Text>

                    <Text style={styles.label}>Company</Text>
                    <TextInput
                        style={styles.input}
                        value={employee.companyId} // Assuming companyId is a string for simplicity
                        onChangeText={(value) => updateEmployee('companyId', value)}
                        placeholder="Company"
                        placeholderTextColor="#888"
                    />
                    
                    <Text style={styles.label}>Reports to</Text>
                    <TextInput
                        style={styles.input}
                        value={employee.reportsTo} // Assuming reportsTo is a string for simplicity
                        onChangeText={(value) => updateEmployee('reportsTo', value)}
                        placeholder="Reports to"
                        placeholderTextColor="#888"
                    />

                    {['firstName', 'lastName', 'role'].map((field) => (
                        <View key={field}>
                            <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                            <TextInput
                                style={styles.input}
                                value={employee[field]}
                                onChangeText={(value) => updateEmployee(field, value)}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                placeholderTextColor="#888"
                            />
                        </View>
                    ))}
                    
                    <Text style={styles.label}>Address</Text>
                    {['streetNumber', 'address1', 'address2', 'city'].map((field) => (
                        <TextInput
                            key={field}
                            style={styles.input}
                            value={employee.address[field]}
                            onChangeText={(value) => updateEmployee(`address.${field}`, value)}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            placeholderTextColor="#888"
                        />
                    ))}
                    
                    <Text style={styles.label}>Country</Text>
                    <Pressable 
                        style={styles.dropdownButton}
                        onPress={() => setModalVisible(true)}>
                        <Text>{employee.address.country}</Text>
                    </Pressable>
                </View>
                
                <Pressable 
                    style={styles.submitButton} 
                    onPress={handleAddEmployee}
                    disabled={!employee.companyId.trim() || !employee.reportsTo.trim() || !employee.firstName.trim() || !employee.lastName.trim()}>
                    <Text style={styles.buttonText}>Add Employee</Text>
                </Pressable>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Country</Text>
                        {countries.map((country) => (
                            <TouchableOpacity
                                key={country}
                                style={styles.countryItem}
                                onPress={() => {
                                    updateEmployee('address.country', country);
                                    setModalVisible(false);
                                }}>
                                <Text style={styles.countryText}>{country}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    formSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: 'teal',
        padding: 15,
        borderRadius: 8,
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    countryItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        alignItems: 'center',
    },
    countryText: {
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff3b30',
        borderRadius: 4,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
