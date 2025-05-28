import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DirectReportsList from './DirectReportsList';
import PeersList from './PeersList';

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
                selectedEmployee.directReports.length > 0 && <DirectReportsList directReports={selectedEmployee.directReports} />
            }

            {
                selectedEmployee.peers.length > 0 && <PeersList selectedEmployee={selectedEmployee} />
            }
        </>
    )
}

export default EmployeeView
