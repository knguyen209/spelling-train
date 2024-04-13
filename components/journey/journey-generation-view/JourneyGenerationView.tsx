import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { COLORS } from '../../../constants'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'
import useJourneyGenerationController from '../../../controllers/journey/useJourneyGenerationController'
import { Skeleton } from 'moti/skeleton'
import STText from '../../commons/st-text/STText'

const JourneyGenerationView = () => {
    const {
        topicName,
        onTopicNameChanged,
        onGenerateButtonPressed,
        generatingJourneyLevels,
        wordLists,
        fetchingWordLists,
        onWordListItemPressed,
    } = useJourneyGenerationController()

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={{
                        backgroundColor: COLORS.appBodyBg,
                        flex: 1,
                        gap: 16,
                    }}
                >
                    <View style={{ gap: 16, padding: 20 }}>
                        <STTextField
                            placeholder='Enter a topic name...'
                            val={topicName}
                            onChange={onTopicNameChanged}
                            disabled={generatingJourneyLevels}
                        />

                        <STButton
                            text={
                                generatingJourneyLevels
                                    ? 'Generating...'
                                    : 'Generate'
                            }
                            onPress={onGenerateButtonPressed}
                            disabled={generatingJourneyLevels}
                        />
                        <STText>Or, select one of the below word lists:</STText>
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
                                <STButton
                                    text={item.title}
                                    key={item.id}
                                    style={{ marginBottom: 16 }}
                                    listItemType
                                    onPress={() => onWordListItemPressed(item)}
                                />
                            )}
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 20,
                            }}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default JourneyGenerationView
