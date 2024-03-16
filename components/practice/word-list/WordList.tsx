import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'
import { COLORS, SVGS } from '../../../constants'
import useWordListDetailsController from '../../../controllers/practice-list/useWordListDetailsController'

const WordList = ({ id }: { id: number }) => {
    const { wordList, onStartPracticePress, onEditPress, onDeletePress } =
        useWordListDetailsController(id)

    if (wordList)
        return (
            <View style={{ backgroundColor: COLORS.appBodyBg, height: '100%' }}>
                <View
                    style={{
                        padding: 20,
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
                    style={{ paddingHorizontal: 20, paddingBottom: 20 }}
                />
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingBottom: 40,
                        paddingTop: 20,
                        zIndex: 10,
                    }}
                >
                    <STButton
                        text='Start'
                        textCentered
                        onPress={onStartPracticePress}
                    />
                </View>
            </View>
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
