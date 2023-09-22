import { Text, View, Image } from 'react-native'
import BackButton from '../back-button/BackButton'
import styles from './game-header.styles'
import { icons } from '../../../constants'
import GameProgressBar from '../game-progress-bar/GameProgressBar'
import { MotiImage } from 'moti'

type Props = {
    progress: number
}
const GameHeader = ({ progress }: Props) => {
    return (
        <View style={styles.container}>
            <BackButton icon='close' />
            <GameProgressBar progress={progress} />
            <View style={styles.heartContainer}>
                <Text style={styles.heartText} allowFontScaling={false}>
                    5
                </Text>
                <MotiImage
                    from={{ scale: 0.8 }}
                    animate={{ scale: 1.1 }}
                    source={icons.heartIcon}
                    style={styles.heartIcon}
                    resizeMode='cover'
                    transition={{
                        repeat: Infinity,
                        duration: 1000,
                        type: 'timing',
                    }}
                />
            </View>
        </View>
    )
}

export default GameHeader
