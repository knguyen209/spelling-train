import { Text, View, Image } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import { Tabs } from 'expo-router/tabs'
import icons from '../../constants/icons'
const Journey = () => {
    return (
        <View>
            <Text>Journey Tab</Text>
            <Link href='/modals/new-list'>Present modal</Link>
        </View>
    )
}

export default Journey
