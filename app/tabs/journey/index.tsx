import { Link } from 'expo-router'
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import backgroundImage from '../../../assets/images/journey-bg-1.png'
import ViewContainer from '../../../components/commons/view-container/ViewContainer'
import STText from '../../../components/commons/st-text/STText'

export default function JourneyTab() {
    return (
        <ImageBackground source={backgroundImage}>
            <ScrollView style={{ height: '100%' }}>
                <STText>Index of Journey Tab</STText>
            </ScrollView>
        </ImageBackground>
    )
}
