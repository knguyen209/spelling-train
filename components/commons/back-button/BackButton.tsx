import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '../../../constants'
import { useRouter } from 'expo-router'

type Props = {
    icon?: 'close' | 'back'
}

const BackButton = ({ icon = 'back' }: Props) => {
    const iconSize = 20
    const router = useRouter()
    return (
        <View>
            <TouchableOpacity onPress={() => router.back()}>
                <Image
                    source={icon === 'close' ? icons.closeIcon : icons.backIcon}
                    style={{ width: iconSize, height: iconSize }}
                    resizeMode='cover'
                />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton
