import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const DirectReportsList = ({directReports}) => {
  return (
    <View style={{
        padding: 10,
    }}>
        <Text>Direct Reports ({directReports.length})</Text>
        <TouchableOpacity onPress={() => console.log('get employee')}>
            {directReports.map((directReport) => (
                <TouchableOpacity key={directReport.id} onPress={() => console.log('directReport pressed')}>
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        padding: 20,
                        marginVertical: 10,
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
  )
}

export default DirectReportsList
