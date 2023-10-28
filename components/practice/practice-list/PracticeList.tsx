import { FlatList, Pressable, View } from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import STButton from '../../commons/st-button/STButton'
import { BORDER_RADIUS, COLORS } from '../../../constants'

import { PracticeListType } from '../../../types/genericTypes'
import usePracticeListHomeController from '../../../view-controllers/practice-list/usePracticeListHomeController'

const PracticeList = () => {
    const { practiceLists, onListItemPress, onAddNewListPress } =
        usePracticeListHomeController()

    return (
        <View
            style={{
                backgroundColor: COLORS.appBodyBg,
                flex: 1,
                gap: 20,
            }}
        >
            <View style={{ paddingHorizontal: 20 }}>
                <STButton
                    text='New Word List'
                    textCentered
                    onPress={onAddNewListPress}
                />
            </View>
            <FlatList
                data={practiceLists}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <ListItem listItem={item} onItemClick={onListItemPress} />
                )}
                style={{ paddingHorizontal: 20 }}
            />
        </View>
    )
}

type ListItemProps = {
    listItem: PracticeListType
    onItemClick: (listItem: PracticeListType) => void
}

const ListItem = ({ listItem, onItemClick }: ListItemProps) => {
    return (
        <Pressable onPress={() => onItemClick(listItem)}>
            {({ pressed }) => (
                <View style={{ width: '100%', marginTop: 10 }}>
                    <View
                        style={{
                            backgroundColor: '#000',
                            paddingVertical: 20,
                            paddingHorizontal: 40,
                            borderRadius: BORDER_RADIUS.md,
                            width: '100%',
                        }}
                    >
                        <SBText weight='bold'>German Words</SBText>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#0D1519',
                            paddingVertical: 20,
                            paddingHorizontal: 40,
                            borderRadius: BORDER_RADIUS.md,

                            width: '100%',
                            position: 'absolute',
                            bottom: pressed ? 0 : 5,
                        }}
                    >
                        <SBText weight='bold'>{listItem.title}</SBText>
                    </View>
                </View>
            )}
        </Pressable>
    )
}

export default PracticeList
