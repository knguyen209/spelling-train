import { FlatList, View } from 'react-native'
import { COLORS } from '../../../constants'
import JourneyListItemView from '../journey-list-item-view/JourneyListItemView'
import useJourneyListController from '../../../controllers/journey/useJourneyListController'
import STButton from '../../commons/st-button/STButton'
import STText from '../../commons/st-text/STText'

const JourneyListView = () => {
    const {
        generatingJourneyLevels,
        loading,
        journeyLevels,
        onGenerateButtonPress,
    } = useJourneyListController()

    return (
        <View
            style={{
                backgroundColor: COLORS.appBodyBg,
                flex: 1,
                justifyContent: 'space-between',
                gap: 20,
            }}
        >
            <View style={{ flex: 1 }}>
                <FlatList
                    data={journeyLevels}
                    keyExtractor={(item) =>
                        `${item.stationNumber}-${item.gameId}-${item.level}`
                    }
                    renderItem={({ item, index }) => (
                        <JourneyListItemView
                            journeyId={item.gameId.toString()}
                            item={item}
                            index={index}
                        />
                    )}
                    inverted={true}
                />
            </View>
            <View style={{ padding: 20 }}>
                <STButton
                    text='Generate Journey Games'
                    textCentered
                    onPress={onGenerateButtonPress}
                    disabled={loading || generatingJourneyLevels}
                />
            </View>
        </View>
    )
}

export default JourneyListView
