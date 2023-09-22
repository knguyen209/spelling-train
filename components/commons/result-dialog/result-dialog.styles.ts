import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
    resultContainer: {
        zIndex: 0,
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        backgroundColor: COLORS.lightWhite,
        minHeight: 180,
        padding: 20,
    },
    resultStatusContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    statusImage: {
        width: 20,
        height: 20,
    },
    statusText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.lg,
    },
    answerText: {
        fontFamily: FONT.semibold,
        fontSize: SIZES.md,
    },
})

export default styles
