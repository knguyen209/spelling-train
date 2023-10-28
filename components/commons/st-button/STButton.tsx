import { Pressable, View, ViewStyle } from 'react-native'
import SBText from '../sb-text/SBText'
import { COLORS, SVGS } from '../../../constants'
import STText from '../st-text/STText'

type Props = {
    primary?: boolean
    text: string
    disabled?: boolean
    textCentered?: boolean
    textTransformType?: 'uppercase' | 'lowercase' | 'none' | 'capitalize'
    onPress?: () => void
    style?: ViewStyle
    listItemType?: boolean
    textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const STButton = ({
    primary = true,
    text,
    disabled = false,
    textCentered = false,
    textTransformType = 'capitalize',
    onPress,
    style,
    listItemType = false,
    textSize = 'md',
}: Props) => {
    const bgColor = disabled
        ? COLORS.disabledBtnColor
        : listItemType
        ? '#070A0C'
        : primary
        ? COLORS.primaryBtnColor
        : COLORS.secondaryBtnColor

    const shadowBgColor = disabled
        ? COLORS.disabledBtnShadowColor
        : listItemType
        ? '#000'
        : primary
        ? COLORS.primaryBtnShadowColor
        : COLORS.secondaryBtnShadowColor

    const stripes = disabled ? (
        <SVGS.ButtonDisabledStripes
            style={{ position: 'absolute', opacity: 0.7 }}
        />
    ) : primary ? (
        <SVGS.ButtonPrimaryStripes style={{ position: 'absolute' }} />
    ) : (
        <SVGS.ButtonSecondaryStripes style={{ position: 'absolute' }} />
    )

    return (
        <Pressable
            style={{ marginTop: 5 }}
            onPress={onPress}
            disabled={disabled}
        >
            {({ pressed }) => (
                <View style={{ width: '100%' }}>
                    <View
                        style={{
                            backgroundColor: shadowBgColor,
                            borderRadius: 12,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            width: '100%',
                            alignItems: textCentered ? 'center' : 'flex-start',
                            ...style,
                        }}
                    >
                        <STText
                            weight='bold'
                            color={listItemType ? COLORS.white : COLORS.black}
                            style={{
                                textTransform: textTransformType,
                                flexWrap: 'wrap',
                            }}
                            size={textSize}
                        >
                            {text}
                        </STText>
                    </View>

                    <View
                        style={{
                            backgroundColor: bgColor,
                            borderRadius: 12,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            width: '100%',
                            position: 'absolute',
                            bottom: pressed ? 0 : 5,
                            alignItems: textCentered ? 'center' : 'flex-start',
                            ...style,
                        }}
                    >
                        <SBText
                            weight='bold'
                            color={listItemType ? COLORS.white : COLORS.black}
                            style={{
                                textTransform: textTransformType,
                                zIndex: 1,
                                flexWrap: 'wrap',
                            }}
                            size={textSize}
                        >
                            {text}
                        </SBText>
                        {!listItemType && stripes}
                        {!listItemType && (
                            <SVGS.ButtonBorderStroke
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                }}
                            />
                        )}
                    </View>
                </View>
            )}
        </Pressable>
    )
}

export default STButton
