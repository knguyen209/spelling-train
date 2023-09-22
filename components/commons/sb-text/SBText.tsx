import { Text, TextStyle } from 'react-native'
import { COLORS, FONT } from '../../../constants'

type Props = {
    children?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    weight?: 'regular' | 'medium' | 'semibold' | 'bold'
    color?: string
    style?: TextStyle | undefined
}

const SBText = ({
    children,
    size = 'md',
    weight = 'regular',
    color = '#000',
    style,
}: Props) => {
    const fontSize = getFontSizeNumber(size)
    const fontFamily = getFontWeight(weight)

    return (
        <Text
            allowFontScaling={false}
            style={{
                fontSize: fontSize,
                fontFamily: fontFamily,
                color: color,
                ...style,
            }}
        >
            {children}
        </Text>
    )
}

const getFontSizeNumber = (size: string) => {
    if (size === 'xs') return 14
    if (size === 'sm') return 16
    if (size === 'md') return 18
    if (size === 'lg') return 20
    if (size === 'xl') return 24
    if (size === '2xl') return 28
    if (size === '3xl') return 32
    return 14
}

const getFontWeight = (weight: string) => {
    if (weight === 'medium') return FONT.medium
    if (weight === 'semibold') return FONT.semibold
    if (weight === 'bold') return FONT.bold
    return FONT.regular
}

export default SBText
