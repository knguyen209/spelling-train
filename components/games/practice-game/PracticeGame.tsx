import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import usePracticeGameController from '../../../view-controllers/practice-list/usePracticeGameController'
import { MessageType } from '../../../types/genericTypes'
import STTextField from '../../commons/st-textfield/STTextField'
import { useRef } from 'react'

const PracticeGame = ({ practiceListId }: { practiceListId: string }) => {
    const {
        isLoading,
        wordData,
        playerAnswer,
        setPlayerAnswer,
        messages,
        speakCurrentWord,
        onDefinitionHintPress,
        onPartOfSpeechHintPress,
        onSynonymHintPress,
        onShowAnswerPress,
        onAnotherWordPress,
        onSendAnswerPress,
        onEndPracicePress,
    } = usePracticeGameController(practiceListId)

    const scrollViewRef = useRef<ScrollView>(null)
    if (wordData) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View
                    style={{
                        height: '100%',
                        backgroundColor: COLORS.appBodyBg,
                    }}
                >
                    <TouchableOpacity onPress={speakCurrentWord}>
                        <SVGS.GenieSpeaker width={150} height={150} />
                    </TouchableOpacity>
                    <ScrollView
                        ref={scrollViewRef}
                        style={{ paddingHorizontal: 20 }}
                        onContentSizeChange={() => {
                            scrollViewRef.current?.scrollToEnd()
                        }}
                    >
                        {messages.map((message, index) => (
                            <Message key={index} message={message} />
                        ))}
                    </ScrollView>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            gap: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#2C353A',
                                flex: 1,
                                borderRadius: BORDER_RADIUS.xl,
                            }}
                        >
                            <STTextField
                                placeholder='Enter your answer...'
                                val={playerAnswer}
                                onChange={setPlayerAnswer}
                                onSubmit={onSendAnswerPress}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={onSendAnswerPress}
                        >
                            <SVGS.SendIcon
                                width={30}
                                height={30}
                                fill={COLORS.primary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#2C353A',
                            flexDirection: 'row',
                            paddingVertical: 20,
                            paddingHorizontal: 30,
                            gap: 5,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <STButton
                            listItemType
                            text='Definition'
                            textSize='xs'
                            onPress={onDefinitionHintPress}
                        />
                        <STButton
                            listItemType
                            text='Parts of Speech'
                            textTransformType='none'
                            textSize='xs'
                            onPress={onPartOfSpeechHintPress}
                        />
                        <STButton
                            listItemType
                            text='Synonyms'
                            textSize='xs'
                            onPress={onSynonymHintPress}
                            disabled={wordData?.meaning.synonyms.length == 0}
                        />
                        <STButton
                            listItemType
                            text='Another word'
                            textSize='xs'
                            onPress={onAnotherWordPress}
                        />
                        <STButton
                            listItemType
                            text='Show answer'
                            textSize='xs'
                            onPress={onShowAnswerPress}
                        />
                        <STButton
                            listItemType
                            text='End'
                            textSize='xs'
                            onPress={onEndPracicePress}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const Message = ({ message }: { message: MessageType }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 20,
                justifyContent:
                    message.type === 'ai' ? 'flex-start' : 'flex-end',
            }}
        >
            {message.type === 'ai' && <SVGS.GenieMale width={40} height={40} />}
            <View
                style={{
                    flexShrink: 1,
                    backgroundColor:
                        message.type === 'ai'
                            ? COLORS.messageAIBg
                            : COLORS.messagePlayerBg,
                    borderRadius: 50,
                }}
            >
                <STText
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 50,
                    }}
                    size='sm'
                >
                    {message.text}
                </STText>
            </View>
        </View>
    )
}

export default PracticeGame
