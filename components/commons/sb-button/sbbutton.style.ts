import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { COLORS, BORDER_RADIUS } from '../../../constants'

interface IStyleSheet {
    containerStyle: ViewStyle
    textStyle: TextStyle
}

type Props = {
    type: 'text' | 'contained' | 'outlined'
    pressed: boolean
    textCentered?: boolean
    primary?: boolean
    disabled?: boolean
}

const styles = ({ type, pressed, textCentered, disabled = false }: Props) => {
    return StyleSheet.create<IStyleSheet>({
        containerStyle: buildContainerStyle({
            type,
            pressed,
            textCentered,
            disabled,
        }),
        textStyle: {
            textAlign: textCentered ? 'center' : 'left',
            textTransform: 'uppercase',
            fontWeight: '500',
            fontSize: 16,
            fontFamily: 'NunitoBold',
            color: disabled
                ? COLORS.disabledTxtColor
                : type === 'contained'
                ? COLORS.white
                : COLORS.black,
        },
    })
}

const buildContainerStyle = ({
    type,
    pressed,
    textCentered,
    disabled = false,
}: Props): ViewStyle => {
    let containerBuildStyle: ViewStyle = {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: BORDER_RADIUS.sm,
    }

    let backgroundColor: ColorValue | undefined

    switch (type) {
        case 'text':
        case 'outlined':
            backgroundColor = pressed
                ? COLORS.disabledBtnColor
                : COLORS.transparent
            break
        case 'contained':
            backgroundColor = pressed
                ? COLORS.primaryBtnPressedColor
                : COLORS.primaryBtnColor

            break
    }

    if (disabled) {
        backgroundColor = COLORS.disabledBtnColor
    }

    if (type === 'outlined') {
        containerBuildStyle = {
            ...containerBuildStyle,
            borderWidth: 2,
            borderColor: COLORS.disabledBtnColor,
        }
    }

    return {
        ...containerBuildStyle,
        backgroundColor: backgroundColor,
    }
}

export default styles
