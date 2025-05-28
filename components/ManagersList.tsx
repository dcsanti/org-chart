import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ManagersList = ({managers, handleSelectEmployee}) => {
    return (
        <>
            {managers.map((manager, index) => (
                <View key={manager.id} style={{ alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={() => handleSelectEmployee(manager)}>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1,
                            padding: 20,
                            marginHorizontal: 10,
                            marginVertical: 0,
                            borderRadius: 10,
                            width: 350,
                        }}>
                            <Text style={{fontWeight: 'light', fontSize: 15}}>{manager.firstName} {manager.lastName}</Text>
                            <Text style={{fontSize: 12, color: 'gray'}}>{manager.role}</Text>
                        </View>
                    </TouchableOpacity>
                    {index !== managers.length - 1 && (
                        <View style={{
                            width: 2,
                            height: 20,
                            backgroundColor: 'black',
                        }}/>
                    )}
                </View>
            ))}
        </>
    )
}

export default ManagersList;