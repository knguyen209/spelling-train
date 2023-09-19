import { StyleSheet } from 'react-native'
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../constants'

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        height: '100%',
    },
    pageTitle: {
        fontSize: SIZES.xl,
        fontFamily: FONT.bold,
    },
    gameContainer: {
        backgroundColor: '#4BB3FD',
        marginVertical: 6,
        padding: 40,
        borderRadius: BORDER_RADIUS.md,
        borderBottomColor: '#000',
    },
    gameName: {
        textAlign: 'center',
        fontSize: SIZES.xl,
        fontFamily: FONT.bold,
        color: COLORS.white,
    },
})

export default styles
