import { FlatList, View } from 'react-native'
import { COLORS } from '../../../constants'
import JourneyListItemView from '../journey-list-item-view/JourneyListItemView'
import useJourneyListController from '../../../controllers/journey/useJourneyListController'

const JourneyListView = () => {
    const { journeys } = useJourneyListController()

    return (
        <View>
            <FlatList
                data={journeys[0].levels}
                keyExtractor={(item, idx) => item.id.toString()}
                renderItem={({ item }) => <JourneyListItemView item={item} />}
                inverted={true}
                style={{
                    backgroundColor: COLORS.appBodyBg,
                    height: '100%',
                    padding: 20,
                }}
            />
        </View>
    )
}

export default JourneyListView
