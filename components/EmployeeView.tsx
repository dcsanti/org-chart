import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const EmployeeView = ({selectedEmployee}) => {
    return (
        <>
            <TouchableOpacity onPress={() => console.log('Employee pressed', selectedEmployee)}>
                <View key={selectedEmployee.details.id} style={{
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
                                {selectedEmployee.details.firstName} {selectedEmployee.details.lastName}
                            </Text>
                            <Text>
                                {selectedEmployee.details.role}
                            </Text>
                            <Text>
                                {selectedEmployee.details.address.streetNumber} {selectedEmployee.details.address.address1}, {selectedEmployee.details.address.address2}, {selectedEmployee.details.address.city}, {selectedEmployee.details.address.country}
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
            {
                selectedEmployee.directReports.length > 0 &&
                <View style={{
                    padding: 10,
                }}>
                    <Text>Direct Reports ({selectedEmployee.directReports.length})</Text>
                    <TouchableOpacity onPress={() => console.log('get employee')}>
                        {selectedEmployee.directReports.map((directReport) => (
                            <TouchableOpacity key={directReport.id} onPress={() => console.log('directReport pressed')}>
                                <View style={{
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 20,
                                    margin: 10,
                                    borderRadius: 10,
                                    display: 'flex',
                                }}>
                                    <Text>{directReport.firstName} {directReport.lastName}</Text>
                                    <Text>{directReport.role}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </TouchableOpacity>
                </View>
            }

            {
                selectedEmployee.peers.length > 0 &&
                <View style={{
                    padding: 10,
                }}>
                    <Text>
                        {selectedEmployee.details.firstName} {selectedEmployee.details.firstName} works with
                    </Text>
                    <TouchableOpacity onPress={() => console.log('get employee')}>
                        {selectedEmployee.peers.map((peer) => (
                            <TouchableOpacity key={peer.id} onPress={() => console.log('peer pressed')}>
                                <View style={{
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 20,
                                    margin: 10,
                                    borderRadius: 10,
                                    display: 'flex',
                                }}>
                                    <Text>{peer.firstName} {peer.lastName}</Text>
                                    <Text>{peer.role}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </TouchableOpacity>
                </View>
            }
        </>
    )
}

export default EmployeeView
