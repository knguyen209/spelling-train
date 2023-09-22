import { StyleSheet } from 'react-native'
import { COLORS, FONT } from '../../../constants'

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
        marginVertical: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heartContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    heartIcon: {
        width: 24,
        height: 24,
    },
    heartText: {
        fontFamily: FONT.bold,
        color: COLORS.heart,
        fontSize: 18,
    },
})

export default styles
