import { Animated, StyleSheet, View } from 'react-native'
import styles from './game-progress-bar.styles'

const GameProgressBar = () => {
    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    flex: 1,
                    borderRadius: 100,
                    backgroundColor: '#58CC03',
                    width: '75%',
                }}
            />
        </View>
    )
}

export default GameProgressBar
