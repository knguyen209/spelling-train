import { Text, View } from 'react-native'
import { Tabs } from 'expo-router/tabs'
import SBButton from '../../components/commons/sb-button/SBButton'

const Profile = () => {
    return (
        <View>
            <View style={{ padding: 20, gap: 20 }}>
                <SBButton
                    type='contained'
                    title='Contained Button'
                    textCentered
                    onPress={() => {}}
                />

                <SBButton type='text' title='Text Button' onPress={() => {}} />
                <SBButton
                    type='outlined'
                    title='Outlined Button'
                    onPress={() => {}}
                />

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
