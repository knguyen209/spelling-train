import { FlatList, View } from 'react-native'
import ViewContainer from '../../commons/view-container/ViewContainer'
import usePracticeListDetailsController from '../../../view-controllers/practice-list/usePracticeListDetailsController'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'
import { SVGS } from '../../../constants'

const WordList = ({ id }: { id: string }) => {
    const { practiceList, onStartPracticePress } =
        usePracticeListDetailsController(id)
    if (practiceList)
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
                        {practiceList.title}
                    </STText>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <SVGS.EditIcon width={30} height={30} />
                        <SVGS.TrashIcon width={30} height={30} />
                    </View>
                </View>

                <FlatList
                    data={practiceList.words}
                    keyExtractor={(item) => item.id}
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
                                text={item.text}
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
}

export default WordList
