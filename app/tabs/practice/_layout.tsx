import { Stack, Tabs, useRouter } from 'expo-router'
import { COLORS, SVGS } from '../../../constants'
import { TouchableOpacity } from 'react-native'

export default function PracticeTabLayout() {
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
                    headerTitle: 'Practice',
                    headerLeft: () => null,
                }}
            />
            <Stack.Screen
                name='word-list'
                options={{ headerTitle: 'Practice' }}
            />
            <Stack.Screen
                name='practice-game'
                options={{
                    headerTitle: 'Practice',
                    presentation: 'fullScreenModal',
                }}
            />
            <Stack.Screen
                name='practice-result'
                options={{
                    headerTitle: 'Practice Result',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='word-list-modal'
                options={{
                    presentation: 'fullScreenModal',
                    headerTitle: 'Word List',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <SVGS.CloseIcon
                                width={30}
                                height={30}
                                fill={COLORS.primary}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name='word-detail-modal'
                options={{
                    presentation: 'modal',
                    headerTitle: '',
                    headerLeft: undefined,
                }}
            />
            <Stack.Screen
                name='ai-word-list-modal'
                options={{
                    presentation: 'fullScreenModal',
                    headerTitle: 'Generate Word List by AI',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <SVGS.CloseIcon
                                width={30}
                                height={30}
                                fill={COLORS.primary}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    )
}
