import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const DirectReportsList = ({directReports, handleSelectEmployee}) => {
    return (
        <View style={{
            padding: 10,
            display: 'flex',
            marginTop: 10,
        }}>
            <Text>Direct Reports ({directReports.length})</Text>
            {directReports.map((employee) => (
                <View key={employee.id} style={{ alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={() => handleSelectEmployee(employee)}>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1,
                            padding: 20,
                            marginHorizontal: 10,
                            marginVertical: 10,
                            borderRadius: 10,
                            width: 350,
                        }}>
                            <Text style={{fontWeight: 'light', fontSize: 15}}>{employee.firstName} {employee.lastName}</Text>
                            <Text style={{fontSize: 12, color: 'gray'}}>{employee.role}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

export default DirectReportsList;
