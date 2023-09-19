import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const styles = StyleSheet.create({
    listTitle: {
        fontWeight: 'bold',
        fontSize: SIZES.xl,
        paddingVertical: 16,
    },
    container: {
        padding: 20,
        height: '100%',
        backgroundColor: COLORS.white,
    },
})

export default styles
