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
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    headerTitle: 'Profile',
                    headerLeft: () => null,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <SVGS.EditProfileIcon width={40} height={40} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    )
}
