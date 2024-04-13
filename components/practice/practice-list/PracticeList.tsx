import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import STButton from '../../commons/st-button/STButton'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'

import { PracticeListType, WordListType } from '../../../types/genericTypes'

import STText from '../../commons/st-text/STText'
import useWordListHomeController from '../../../controllers/practice-list/useWordListHomeController'
import { MotiView } from 'moti'

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
                    text='AI Generate Word List'
                    textCentered
                    onPress={onGenerateNewListPress}
                    textTransformType='none'
                />
                <STButton
                    text='Make Your Own List'
                    textCentered
                    onPress={onAddNewListPress}
                    primary={false}
                />
            </View>
            {fetchingWordLists ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator />
                </View>
            ) : (
                <FlatList
                    data={wordLists}
                    keyExtractor={(item) => item.id.toString()}
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
                <MotiView
                    style={{
                        backgroundColor: '#0D1519',
                        paddingVertical: 20,
                        paddingHorizontal: 30,
                        borderRadius: BORDER_RADIUS.md,
                        marginTop: 10,
                    }}
                    animate={{
                        translateY: pressed ? 5 : 0,
                    }}
                    transition={{ type: 'timing', duration: 50 }}
                >
                    <STText weight='bold' size='lg'>
                        {listItem.title}
                    </STText>
                    {listItem.isAIGenerated && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                                justifyContent: 'flex-end',
                            }}
                        >
                            <STText size='xs' style={{ opacity: 0.5 }}>
                                AI Generated
                            </STText>
                            <SVGS.GenerativeAIIcon
                                width={12}
                                height={12}
                                fill='red'
                            />
                        </View>
                    )}
                </MotiView>
            )}
        </Pressable>
    )
}

export default PracticeList
