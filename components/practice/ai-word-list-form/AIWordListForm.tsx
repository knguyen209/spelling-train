import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    View,
} from 'react-native'
import { COLORS } from '../../../constants'
import STText from '../../commons/st-text/STText'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'
import useAIWordListFormController from '../../../controllers/practice-list/useAIWordListFormController'

import { MotiView } from 'moti'

const AIWordListForm = () => {
    const {
        isRequestMade,
        generatingWordList,
        generatedWordList,
        topicName,
        onTopicNameChanged,
        onGenerateBtnPress,
    } = useAIWordListFormController()
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View
                style={{
                    height: '100%',
                    backgroundColor: COLORS.appBodyBg,
                    padding: 20,
                    gap: 20,
                }}
            >
                <STText color={COLORS.primary} weight='bold'>
                    Topic Name
                </STText>
                <STTextField
                    placeholder='Enter a topic'
                    val={topicName}
                    onChange={onTopicNameChanged}
                    disabled={generatingWordList}
                />
                {isRequestMade && topicName.length === 0 && (
                    <STText>Please enter a topic name</STText>
                )}
                <STButton
                    text='Generate'
                    textCentered
                    onPress={onGenerateBtnPress}
                    disabled={generatingWordList}
                />

                {isRequestMade &&
                    generatingWordList &&
                    topicName.length > 0 && (
                        <View
                            style={{
                                flexGrow: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                        >
                            <ActivityIndicator size='large' />
                        </View>
                    )}

                {isRequestMade &&
                    !generatingWordList &&
                    topicName.length > 0 && (
                        <FlatList
                            data={generatedWordList?.words}
                            renderItem={({ item, index }) => (
                                <MotiView
                                    from={{ translateX: 800 }}
                                    animate={{ translateX: 0 }}
                                    transition={{
                                        type: 'timing',
                                        duration: 500,
                                        delay: index * 100,
                                    }}
                                    style={{ paddingBottom: 10 }}
                                >
                                    <STButton text={item.word} listItemType />
                                </MotiView>
                            )}
                        />
                    )}
            </View>
        </KeyboardAvoidingView>
    )
}

export default AIWordListForm
