import { Tabs } from 'expo-router/tabs'
import STText from '../../components/commons/st-text/STText'
import { COLORS, SVGS } from '../../constants'
import { Provider } from 'react-redux'
import store from '../../store'
import { usePathname } from 'expo-router'

export default function TabLayout() {
    const pathName = usePathname()
    const hideTabBarRoutes = [
        '/tabs/practice/word-list',
        '/tabs/practice/practice-game',
        '/tabs/practice/practice-result',
    ]
    return (
        <Provider store={store}>
            <Tabs
                initialRouteName='journey'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.appBarBg,
                    },
                    tabBarStyle: {
                        backgroundColor: COLORS.appBarBg,
                        display: hideTabBarRoutes.includes(pathName)
                            ? 'none'
                            : 'flex',
                    },
                    tabBarActiveTintColor: COLORS.primary,
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarShowLabel: false,
                    headerTitle: (title) => (
                        <STText weight='bold' color={COLORS.appBarTitle}>
                            {title.children}
                        </STText>
                    ),
                }}
            >
                <Tabs.Screen
                    name='journey'
                    options={{
                        tabBarLabel: 'Journey',
                        title: 'Journey',
                        tabBarIcon: ({ focused, size }) => (
                            <SVGS.HomeTabIcon
                                width={focused ? size * 1.2 : size}
                                height={focused ? size * 1.2 : size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='practice'
                    options={{
                        tabBarLabel: 'Practice',
                        title: 'Practice',
                        tabBarIcon: ({ focused, size }) => (
                            <SVGS.PracticeTabIcon
                                width={focused ? size * 1.2 : size}
                                height={focused ? size * 1.2 : size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        tabBarLabel: 'Profile',
                        title: 'Profile',
                        tabBarIcon: ({ focused, size }) => (
                            <SVGS.ProfileTabIcon
                                width={focused ? size * 1.2 : size}
                                height={focused ? size * 1.2 : size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='daily-challenge'
                    options={{
                        tabBarLabel: 'Daily Challenge',
                        title: 'Daily Challenge',
                        tabBarIcon: ({ focused, size }) => (
                            <SVGS.DailyChallengeTabIcon
                                width={focused ? size * 1.2 : size}
                                height={focused ? size * 1.2 : size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='feed'
                    options={{
                        tabBarLabel: 'Feed',
                        title: 'Feed',
                        tabBarIcon: ({ focused, size }) => (
                            <SVGS.FeedTabIcon
                                width={focused ? size * 1.2 : size}
                                height={focused ? size * 1.2 : size}
                            />
                        ),
                    }}
                />
            </Tabs>
        </Provider>
    )
}
