import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const DirectReportsList = ({directReports, handleSelectEmployee}) => {
    return (
        <View style={{
            padding: 10,
            display: 'flex',
        }}>
            <Text>Direct Reports ({directReports.length})</Text>
            {directReports.map((directReport) => (
                <TouchableOpacity key={directReport.id} onPress={() => handleSelectEmployee(directReport)}>
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        padding: 20,
                        marginVertical: 10,
                        borderRadius: 10,
                        display: 'flex',
                    }}>
                        <Text style={{fontWeight: 'light', fontSize: 15}}>{directReport.firstName} {directReport.lastName}</Text>
                        <Text style={{fontSize: 12, color: 'gray'}}>{directReport.role}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default DirectReportsList;
