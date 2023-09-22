import {
    Pressable,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native'

import { Link } from 'expo-router'

import * as Speech from 'expo-speech'

import { playCorrectSound, playIncorrectSound } from '../../utils'

const Journey = () => {
    return (
        <View style={styles.container}>
            <Link href='/screens/demo'>Demo</Link>
            <TouchableOpacity onPress={() => Speech.speak('Good morning')}>
                <Text>Say something</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playIncorrectSound}>
                <Text>Play sound effect</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    box: {
        height: 200,
        width: 200,
        borderRadius: 20,
    },
    navigateButton: {
        padding: 8,
        backgroundColor: '#B3A3FF',
        borderRadius: 10,
    },
    navigateButtonContainer: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default Journey
