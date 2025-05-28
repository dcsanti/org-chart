import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const PeersList = ({selectedEmployee}) => {
    return (
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
                            marginVertical: 10,
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
    )
}

export default PeersList

