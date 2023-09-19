import { Pressable, View, Text, StyleSheet } from 'react-native'

import styles from './sbbutton.style'

type Props = {
    type?: 'text' | 'contained' | 'outlined'
    title: string

    disabled?: boolean
    textCentered?: boolean
    onPress?: () => void
}

const SBButton = ({
    type = 'text',
    title,

    disabled = false,
    textCentered = false,
    onPress,
}: Props) => {
    return (
        <Pressable onPress={() => onPress} disabled={disabled}>
            {({ pressed }) => {
                const style = styles({ type, pressed, textCentered, disabled })
                return (
                    <View style={style.containerStyle}>
                        <Text style={style.textStyle}>{title}</Text>
                    </View>
                )
            }}
        </Pressable>
    )
}

export default SBButton
