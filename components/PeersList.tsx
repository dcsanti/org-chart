import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PeersList = ({selectedEmployee, handleSelectEmployee}) => {
    return (
        <View style={{
            padding: 10,
            display: 'flex',
            width: '100%',
        }}>
            <Text>
                {selectedEmployee.details.firstName} {selectedEmployee.details.firstName} works with
            </Text>
            {selectedEmployee.peers.map((peer) => (
                <View style={{ alignItems: 'center', width: '100%' }} key={peer.id}>
                    <TouchableOpacity onPress={() => handleSelectEmployee(peer)}>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: 'black',
                            borderWidth: 1,
                            padding: 20,
                            marginVertical: 10,
                            borderRadius: 10,
                            display: 'flex',
                            width: 350,
                        }}>
                            <Text style={{fontWeight: 'light', fontSize: 15}}>{peer.firstName} {peer.lastName}</Text>
                            <Text style={{fontSize: 12, color: 'gray'}}>{peer.role}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

export default PeersList;

