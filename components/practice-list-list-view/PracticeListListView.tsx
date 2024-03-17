import { FlatList, View } from 'react-native'
import { PracticeListType } from '../../types/genericTypes'

import styles from './practice-list-list-view.style'
import SBText from '../commons/sb-text/SBText'
import PracticeListListItemView from '../practice-list-list-item/PracticeListListViewItem'

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
            <SBText weight='bold' size='xl' style={{ paddingBottom: 10 }}>
                Your Practice Word List
            </SBText>
            <FlatList
                numColumns={type === 'list' ? 1 : 2}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PracticeListListItemView
                        item={item}
                        onItemPressed={onListItemPressed}
                    />
                )}
            />
        </View>
    )
}

export default PracticeListListView
