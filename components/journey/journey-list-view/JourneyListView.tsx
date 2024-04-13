import { FlatList, View } from 'react-native'
import { COLORS } from '../../../constants'
import JourneyListItemView from '../journey-list-item-view/JourneyListItemView'
import useJourneyListController from '../../../controllers/journey/useJourneyListController'
import STButton from '../../commons/st-button/STButton'

const JourneyListView = () => {
    const { journeyLevels, onGenerateButtonPress } = useJourneyListController()

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
                {/* {journeyLevels.length > 0 && journeyLevels[0] !== undefined && ( */}
                <FlatList
                    data={journeyLevels}
                    keyExtractor={(item, idx) =>
                        `${item.stationNumber}-${item.gameId}-${item.level}`
                    }
                    renderItem={({ item }) => (
                        <JourneyListItemView
                            journeyId={item.gameId.toString()}
                            item={item}
                        />
                        // <STButton
                        //     text={`Level ${item.level}`}
                        //     listItemType
                        //     style={{ marginTop: 10 }}
                        // />
                    )}
                    inverted={true}
                />
                {/* )} */}
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
