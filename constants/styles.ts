import { StyleSheet } from 'react-native'
import { SIZES, FONT } from './theme'

const commonStyles = StyleSheet.create({
    container: {
        padding: 16,
    },
    gameText: {
        fontSize: SIZES.xl,
        fontFamily: FONT.bold,
    },
})

export default commonStyles
