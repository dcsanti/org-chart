import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const TopLevels = ({data, handleSelectEmployee}) => {
    return (
        data.map((employee) => (
            <View key={employee.id} style={{
                alignItems: 'center',
                width: '100%',
            }}>
                <View style={{
                    width: 2,
                    height: 20,
                    backgroundColor: 'black',
                }}/>
                <TouchableOpacity onPress={() => handleSelectEmployee(employee)}>
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        padding: 20,
                        marginHorizontal: 10,
                        marginBottom: 10,
                        marginTop: 0,
                        borderRadius: 10,
                        width: 350,
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                display: 'flex',
                                flex: 1,
                                gap: 5
                            }}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                    {employee.firstName} {employee.lastName}
                                </Text>
                                <Text>
                                    {employee.role}
                                </Text>
                                <Text style={{fontSize: 12, color: 'gray'}}>
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
            </View>
        ))
    )
}

export default TopLevels;
