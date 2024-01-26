import { FlatList, Pressable, Text, View } from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import STButton from '../../commons/st-button/STButton'
import { BORDER_RADIUS, COLORS } from '../../../constants'

import { PracticeListType, WordListType } from '../../../types/genericTypes'

import STText from '../../commons/st-text/STText'
import useWordListHomeController from '../../../controllers/practice-list/useWordListHomeController'

const PracticeList = () => {
    const {
        wordLists,
        fetchingWordLists,
        onListItemPress,
        onAddNewListPress,
        onGenerateNewListPress,
    } = useWordListHomeController()

    return (
        <View
            style={{
                backgroundColor: COLORS.appBodyBg,
                flex: 1,
                gap: 20,
            }}
        >
            <View style={{ paddingHorizontal: 20, gap: 10 }}>
                <STButton
                    text='Generate Word List'
                    textCentered
                    onPress={onGenerateNewListPress}
                />
                <STButton
                    text='New Word List'
                    textCentered
                    onPress={onAddNewListPress}
                    primary={false}
                />
            </View>
            {fetchingWordLists ? (
                <STText>Loading</STText>
            ) : (
                <FlatList
                    data={wordLists}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <ListItem
                            listItem={item}
                            onItemClick={onListItemPress}
                        />
                    )}
                    style={{ paddingHorizontal: 20 }}
                />
            )}
        </View>
    )
}

type ListItemProps = {
    listItem: WordListType
    onItemClick: (listItem: WordListType) => void
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
                        <SBText weight='bold'>{listItem.title}</SBText>
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
