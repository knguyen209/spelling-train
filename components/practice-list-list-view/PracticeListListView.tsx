import { FlatList, View, Text } from 'react-native'
import { PracticeListType } from '../../types/genericTypes'
import PracticeListListViewItem from '../practice-list-list-item/PracticeListListViewItem'
import { COLORS } from '../../constants'
import styles from './practice-list-list-view.style'

type Props = {
    data: Array<PracticeListType>
    type?: 'list' | 'grid'
    onListItemPressed: (item: PracticeListType) => void
}

const PracticeListListView = ({
    data = [],
    type = 'list',
    onListItemPressed,
}: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.listTitle}>Your Practice Word List</Text>
            <FlatList
                numColumns={type === 'list' ? 1 : 2}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PracticeListListViewItem
                        item={item}
                        onItemPressed={onListItemPressed}
                    />
                )}
            />
        </View>
    )
}

export default PracticeListListView
