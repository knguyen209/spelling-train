import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { COLORS, FONT, SIZES } from '../../constants'

interface IStyleSheet {
    containerStyle: ViewStyle
    textStyle: TextStyle
}

const styles = () =>
    StyleSheet.create<IStyleSheet>({
        containerStyle: {
            backgroundColor: getBackgroundColor(),
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 8,
            marginBottom: 8,
        },
        textStyle: {
            color: COLORS.black,
            fontSize: SIZES.lg,
            fontWeight: '600',
            fontFamily: FONT.bold,
        },
    })

const backgroundColors = ['#F7B8BA', '#DFCCFB', '#FFB4B4', '#C3EDC0']

const getBackgroundColor = () => {
    const index = Math.floor(Math.random() * backgroundColors.length)
    return backgroundColors[index]
}

export default styles
