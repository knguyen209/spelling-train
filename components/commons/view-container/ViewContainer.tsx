import { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ViewContainer = ({
    children,
    style,
}: {
    children: ReactNode
    style?: ViewStyle
}) => {
    return (
        <View
            style={{
                backgroundColor: '#151F25',
                height: '100%',
                paddingHorizontal: 20,
                paddingVertical: 20,
                ...style,
            }}
        >
            {children}
        </View>
    )
}

export default ViewContainer
