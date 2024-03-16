import { View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import backgroundImage from '../../../assets/images/journey-bg-1.png'
import { COLORS } from '../../../constants'
import JourneyListView from '../../../components/journey/journey-list-view/JourneyListView'

export default function JourneyTab() {
    return (
        // <ImageBackground source={backgroundImage}>
        // <ScrollView
        //     style={{ height: '100%', backgroundColor: COLORS.appBodyBg }}
        // >
        <JourneyListView />
        // </ScrollView>
        // </ImageBackground>
    )
}
