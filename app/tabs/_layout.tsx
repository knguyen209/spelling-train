import { Tabs } from 'expo-router/tabs'
import { Provider } from 'react-redux'
import store from '../../store'

import { COLORS, icons } from '../../constants'
import { Image, ImageStyle } from 'react-native'
import SBText from '../../components/commons/sb-text/SBText'

export const unstable_settings = {
    initialRouteName: 'journey',
}

const PageLayout = () => {
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
                    },
                    tabBarActiveTintColor: COLORS.primary,
                    headerShadowVisible: false,
                    tabBarShowLabel: false,
                    headerTitle: (title) => (
                        <SBText weight='bold' color={COLORS.primaryBtnColor}>
                            {title.children}
                        </SBText>
                    ),
                }}
            >
                <Tabs.Screen
                    name='journey'
                    options={{
                        href: '/tabs/journey',
                        title: 'Journey',
                        tabBarIcon: ({ focused, size }) => (
                            <Image
                                source={icons.trainIcon}
                                style={getTabBarIconStyle(focused, size)}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        href: '/tabs/profile',
                        title: 'Profile',
                        tabBarIcon: ({ focused, size }) => (
                            <Image
                                source={icons.profileIcon}
                                style={getTabBarIconStyle(focused, size)}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='practice'
                    options={{
                        href: '/tabs/practice',
                        title: 'Practice',
                        tabBarIcon: ({ focused, size }) => (
                            <Image
                                source={icons.practiceIcon}
                                style={getTabBarIconStyle(focused, size)}
                            />
                        ),
                    }}
                />
            </Tabs>
        </Provider>
    )
}

const getTabBarIconStyle = (focused: boolean, size: number): ImageStyle => {
    return {
        width: focused ? size * 1.1 : size,
        height: focused ? size * 1.1 : size,
    }
}

export default PageLayout
