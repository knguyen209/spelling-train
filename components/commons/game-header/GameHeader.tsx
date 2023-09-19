import { Text, View, Image } from 'react-native'
import BackButton from '../back-button/BackButton'
import styles from './game-header.styles'
import { icons } from '../../../constants'
import GameProgressBar from '../game-progress-bar/GameProgressBar'

const GameHeader = () => {
    return (
        <View style={styles.container}>
            <BackButton icon='close' />
            <GameProgressBar />
            <View style={styles.heartContainer}>
                <Text style={styles.heartText} allowFontScaling={false}>
                    5
                </Text>
                <Image
                    source={icons.heartIcon}
                    style={styles.heartIcon}
                    resizeMode='cover'
                />
            </View>
        </View>
    )
}

export default GameHeader
