import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
} from 'react-native'
import { COLORS } from '../../../constants'
import STText from '../../commons/st-text/STText'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'
import useAIWordListFormController from '../../../controllers/practice-list/useAIWordListFormController'
import AnimatedLottieView from 'lottie-react-native'
import { AnimatePresence, MotiView } from 'moti'

const AIWordListForm = () => {
    const {
        isLoading,
        generatingWordList,
        wordList,
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
                    disabled={isLoading}
                />
                <STButton
                    text='Generate'
                    textCentered
                    onPress={onGenerateBtnPress}
                    disabled={isLoading}
                />

                {isLoading ? (
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <ActivityIndicator size='large' />
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={wordList?.words}
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
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}

export default AIWordListForm
