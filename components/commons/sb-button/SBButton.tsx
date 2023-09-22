import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native'

import styles from './sbbutton.style'
import { COLORS } from '../../../constants'
import SBText from '../sb-text/SBText'

type Props = {
    type?: 'text' | 'contained' | 'outlined'
    title: string
    disabled?: boolean
    textCentered?: boolean
    textTransformType?: 'uppercase' | 'lowercase' | 'none' | 'capitalize'
    onPress?: () => void
    color?: string
    style?: ViewStyle
}

const SBButton = ({
    type = 'text',
    title,
    disabled = false,
    textCentered = false,
    textTransformType = 'uppercase',
    onPress,
    color = COLORS.primaryBtnColor,
    style,
}: Props) => {
    return (
        <Pressable onPress={onPress} disabled={disabled}>
            {({ pressed }) => {
                const styleSheet = styles({
                    type,
                    pressed,
                    textCentered,
                    disabled,
                    textTransformType,
                    color,
                })
                return (
                    <View>
                        <View
                            style={{ ...style, ...styleSheet.containerStyle }}
                        >
                            <SBText style={styleSheet.textStyle}>
                                {title}
                            </SBText>
                        </View>
                    </View>
                )
            }}
        </Pressable>
    )
}

export default SBButton
