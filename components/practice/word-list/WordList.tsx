import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import ViewContainer from '../../commons/view-container/ViewContainer'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'
import { SVGS } from '../../../constants'
import useWordListDetailsController from '../../../controllers/practice-list/useWordListDetailsController'

const WordList = ({ id }: { id: number }) => {
    const { wordList, onStartPracticePress, onEditPress, onDeletePress } =
        useWordListDetailsController(id)

    if (wordList)
        return (
            <ViewContainer>
                <View
                    style={{
                        paddingBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <STText weight='bold' size='xl'>
                        {wordList.title}
                    </STText>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity onPress={onEditPress}>
                            <SVGS.EditIcon width={30} height={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDeletePress}>
                            <SVGS.TrashIcon width={30} height={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={wordList.words}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View
                            style={[
                                {
                                    width: '50%',
                                    position: 'relative',
                                    paddingVertical: 5,
                                },
                                index % 2 === 0
                                    ? {
                                          paddingRight: 5,
                                      }
                                    : {
                                          paddingLeft: 5,
                                      },
                            ]}
                        >
                            <STButton
                                text={item.word}
                                textCentered
                                listItemType
                            />
                        </View>
                    )}
                    numColumns={2}
                />
                <STButton
                    text='Start'
                    textCentered
                    onPress={onStartPracticePress}
                />
            </ViewContainer>
        )
    else {
        return (
            <View>
                <Text>Hello, World</Text>
            </View>
        )
    }
}

export default WordList
