import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    body: {
        flexDirection: 'column',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    optionsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        padding: 20,
    },
    resultContainer: {
        zIndex: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.lightWhite,
        height: 200,
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
