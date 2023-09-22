import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { COLORS, BORDER_RADIUS } from '../../../constants'
import { newShade } from '../../../utils'

interface IStyleSheet {
    darkerShadeStyle: ViewStyle
    containerStyle: ViewStyle
    textStyle: TextStyle
}

type Props = {
    type: 'text' | 'contained' | 'outlined'
    pressed: boolean
    textCentered?: boolean
    textTransformType?: 'uppercase' | 'lowercase' | 'none' | 'capitalize'
    primary?: boolean
    disabled?: boolean
    color?: string
}

const styles = ({
    type,
    pressed,
    textCentered,
    textTransformType,
    disabled = false,
    color = COLORS.primaryBtnColor,
}: Props) => {
    return StyleSheet.create<IStyleSheet>({
        containerStyle: buildContainerStyle({
            type,
            pressed,
            disabled,
            color,
        }),
        textStyle: {
            textAlign: textCentered ? 'center' : 'left',
            textTransform: textTransformType,
            fontFamily: 'NunitoBold',
            color: disabled
                ? COLORS.disabledTxtColor
                : type === 'contained'
                ? COLORS.white
                : COLORS.black,
        },
        darkerShadeStyle: {
            backgroundColor: newShade('#FF044D', -30),
            borderRadius: BORDER_RADIUS.lg,
            flex: 1,
        },
    })
}

const buildContainerStyle = ({
    type,
    pressed,
    disabled = false,
    color = COLORS.primaryBtnColor,
}: Props): ViewStyle => {
    let containerBuildStyle: ViewStyle = {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: BORDER_RADIUS.sm,
    }

    let backgroundColor: ColorValue | undefined = getButtonColor(
        type,
        pressed,
        disabled,
        color
    )

    if (type === 'outlined') {
        containerBuildStyle = {
            ...containerBuildStyle,
            borderWidth: 2,
            borderColor: backgroundColor,
        }
    }

    return {
        ...containerBuildStyle,
        backgroundColor:
            type === 'contained' ? backgroundColor : COLORS.transparent,
    }
}

const getButtonColor = (
    type: string,
    pressed: boolean,
    disabled: boolean,
    color: string
) => {
    let backgroundColor: ColorValue | undefined

    switch (type) {
        case 'text':
            backgroundColor = COLORS.transparent
            break

        case 'outlined':
        case 'contained':
            backgroundColor = pressed ? newShade(color, -20) : color
            break
    }

    if (disabled) {
        backgroundColor = COLORS.disabledBtnColor
    }

    return backgroundColor
}

export default styles
