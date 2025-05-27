import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const TopLevels = ({data, handleSelectEmployee}) => {
    return (
        data.map((employee) => (
            <TouchableOpacity key={employee.id} onPress={() =>  handleSelectEmployee(employee)}>
                <View key={employee.id} style={{
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
                                {employee.firstName} {employee.lastName}
                            </Text>
                            <Text>
                                {employee.role}
                            </Text>
                            <Text>
                                {employee.address.streetNumber} {employee.address.address1}, {employee.address.address2}, {employee.address.city}, {employee.address.country}
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
        ))
    )
}

export default TopLevels;
