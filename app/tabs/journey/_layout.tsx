import { Stack, useRouter } from 'expo-router'
import { COLORS, SVGS } from '../../../constants'
import { TouchableOpacity } from 'react-native'

export default function Layout() {
    const router = useRouter()
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.appBarBg },
                headerTintColor: COLORS.primary,
                headerBackTitleVisible: false,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {
                            router.back()
                        }}
                    >
                        <SVGS.BackIcon width={40} height={40} />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name='index'
                options={{ headerTitle: 'Journey', headerLeft: () => null }}
            />
        </Stack>
    )
}
