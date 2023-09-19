import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import store from '../../store'

export default function Layout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name='index' />
                <Stack.Screen name='practice-list-details/[id]' />
                <Stack.Screen name='practice-game-selection/[id]' />
                <Stack.Screen
                    name='listen-game/index'
                    options={{
                        presentation: 'fullScreenModal',
                        headerShown: false,
                    }}
                />
            </Stack>
        </Provider>
    )
}
