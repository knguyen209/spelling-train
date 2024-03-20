import { FlatList, View } from 'react-native'
import { COLORS } from '../../../constants'
import JourneyListItemView from '../journey-list-item-view/JourneyListItemView'
import useJourneyListController from '../../../controllers/journey/useJourneyListController'
import STButton from '../../commons/st-button/STButton'

const JourneyListView = () => {
    const { journeys, onGenerateButtonPress } = useJourneyListController()

    return (
        <View
            style={{
                backgroundColor: COLORS.appBodyBg,
                flex: 1,
                padding: 20,
                justifyContent: 'space-between',
                gap: 20,
            }}
        >
            <View style={{ flex: 1 }}>
                {journeys.length > 0 && journeys[0] !== undefined && (
                    <FlatList
                        data={journeys[0].levels}
                        keyExtractor={(item, idx) => item.id.toString()}
                        renderItem={({ item }) => (
                            <JourneyListItemView
                                journeyId={journeys[0].id}
                                item={item}
                            />
                        )}
                        inverted={true}
                    />
                )}
            </View>
            <STButton
                text='Generate Journey Games'
                textCentered
                onPress={onGenerateButtonPress}
            />
        </View>
    )
}

export default JourneyListView
