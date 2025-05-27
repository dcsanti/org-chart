import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const EmployeeView = ({selectedEmployee}) => {
    console.log('EmployeeView', selectedEmployee);
    return (
        <TouchableOpacity onPress={() => console.log('Employee pressed')}>
            <View key={selectedEmployee.selected.id} style={{
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                padding: 20,
                margin: 10,
                borderRadius: 10,
                display: 'flex',
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        display: 'flex',
                        flex: 1,
                    }}>
                        <Text>
                            {selectedEmployee.selected.firstName} {selectedEmployee.selected.lastName}
                        </Text>
                        <Text>
                            {selectedEmployee.selected.role}
                        </Text>
                        <Text>
                            {selectedEmployee.selected.address.streetNumber} {selectedEmployee.selected.address.address1}, {selectedEmployee.selected.address.address2}, {selectedEmployee.selected.address.city}, {selectedEmployee.selected.address.country}
                        </Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Entypo name="chevron-thin-right" size={24} color="black" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

export default EmployeeView
