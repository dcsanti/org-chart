import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ManagersList = ({managers, handleSelectEmployee}) => {
    return (
        <View style={{ padding: 10}}>
            {managers.map((manager) => (
                <TouchableOpacity key={manager.id} onPress={() => handleSelectEmployee(manager)}>
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderWidth: 1,
                        padding: 20,
                        marginVertical: 10,
                        borderRadius: 10,
                        display: 'flex',
                    }}>
                        <Text style={{fontWeight: 'light', fontSize: 15}}>{manager.firstName} {manager.lastName}</Text>
                        <Text style={{fontSize: 12, color: 'gray'}}>{manager.role}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default ManagersList;