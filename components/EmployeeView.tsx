import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DirectReportsList from './DirectReportsList';
import ManagersList from './ManagersList';
import PeersList from './PeersList';

const EmployeeView = ({selectedEmployee, handleSelectEmployee}) => {
    return (
        <>
            {
                selectedEmployee.managers.length > 0 && (
                    <>
                        <ManagersList managers={selectedEmployee.managers} handleSelectEmployee={handleSelectEmployee}/>
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            <View style={{
                                width: 2,
                                height: 20,
                                backgroundColor: 'black',
                            }}/>
                        </View>
                    </>
                )
            }

            <View style={{ alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => handleSelectEmployee(selectedEmployee)}>
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: 'royalblue',
                        borderWidth: 2,
                        padding: 20,
                        marginHorizontal: 10,
                        marginVertical: 0,
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
                                    {selectedEmployee.details.firstName} {selectedEmployee.details.lastName}
                                </Text>
                                <Text>
                                    {selectedEmployee.details.role}
                                </Text>
                                <Text style={{fontSize: 12, color: 'gray'}}>
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
            </View>

            {
                selectedEmployee.directReports.length > 0 && (
                    <DirectReportsList directReports={selectedEmployee.directReports} handleSelectEmployee={handleSelectEmployee} />
                )
            }

            {
                selectedEmployee.peers.length > 0 && <PeersList selectedEmployee={selectedEmployee} handleSelectEmployee={handleSelectEmployee} />
            }
        </>
    )
}

export default EmployeeView
