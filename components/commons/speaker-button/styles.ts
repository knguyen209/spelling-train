import { StyleSheet } from 'react-native'
import { BORDER_RADIUS, COLORS } from '../../../constants'
import { newShade } from '../../../utils'

type Props = {
    width?: number
    height?: number
    elevated?: boolean
    pressed: boolean
    color?: string
}
const styles = ({
    width = 100,
    height = 100,
    elevated = true,
    pressed = false,
    color = COLORS.speakerColor,
}: Props) =>
    StyleSheet.create({
        darkerShade: {
            width: width,
            height: height,
            backgroundColor: newShade(color, -30),
            borderRadius: BORDER_RADIUS.lg,
        },
        container: {
            width: width,
            height: height,
            backgroundColor: color,
            borderRadius: BORDER_RADIUS.lg,
            position: 'absolute',
            top: elevated ? (pressed ? 0 : -5) : 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })

export default styles
