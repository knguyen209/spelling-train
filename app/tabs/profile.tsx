import { Text, View } from 'react-native'
import { Tabs } from 'expo-router/tabs'
import SBButton from '../../components/commons/sb-button/SBButton'

const Profile = () => {
    return (
        <View>
            <Tabs.Screen
                options={{
                    title: 'Profile',
                }}
            />

            <View style={{ padding: 8 }}>
                <SBButton
                    type='contained'
                    title='Contained Button'
                    textCentered
                    onPress={() => {}}
                />
            </View>
            <View style={{ padding: 8 }}>
                <SBButton type='text' title='Text Button' onPress={() => {}} />
            </View>
            <View style={{ padding: 8 }}>
                <SBButton
                    type='outlined'
                    title='Outlined Button'
                    onPress={() => {}}
                />
            </View>
            <View style={{ padding: 8 }}>
                <SBButton
                    type='outlined'
                    disabled
                    title='Disabled'
                    onPress={() => {}}
                />
            </View>
        </View>
    )
}

export default Profile
