import STText from '../../commons/st-text/STText'
import STTextField from '../../commons/st-textfield/STTextField'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import STButton from '../../commons/st-button/STButton'
import useWordListFormController from '../../../controllers/practice-list/useWordListFormController'
import { MotiView } from 'moti'
import ConfirmationModalContextProvider from '../../../providers/modal-dialog/ModalDialogProvider'

type Props = {
    id: number | undefined
}

const WordListForm = ({ id = undefined }: Props) => {
    const {
        editMode,
        deleteMode,
        wordList,
        onListTitleChanged,
        onWordTextChanged,
        onSaveBtnPress,
        onDeleteBtnPress,
        onCancelBtnPress,
        onCheckboxPress,
        onDeleteSelectedWordsBtnPress,
        creatingCustomWordList,
        updatingWordList,
    } = useWordListFormController({ id })

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
                    List Name
                </STText>
                <STTextField
                    val={wordList.title}
                    onChange={onListTitleChanged}
                    placeholder='Enter the list name'
                    disabled={deleteMode}
                />
                <ScrollView contentContainerStyle={{ gap: 20 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <STText color={COLORS.primary} weight='bold'>
                            Practice Words
                        </STText>

                        {editMode && !deleteMode && (
                            <TouchableOpacity onPress={onDeleteBtnPress}>
                                <SVGS.TrashIcon width={30} height={30} />
                            </TouchableOpacity>
                        )}
                    </View>
                    {deleteMode && (
                        <STText>
                            Tap on the words you want to delete from the list.
                        </STText>
                    )}
                    {wordList &&
                        wordList.words.map((word) => (
                            <MotiView
                                key={word.id}
                                style={{ flex: 1 }}
                                onTouchEnd={() =>
                                    deleteMode && onCheckboxPress(word.id)
                                }
                                animate={{
                                    backgroundColor:
                                        deleteMode &&
                                        word.selected &&
                                        word.word.length > 0
                                            ? COLORS.incorrectAnswer
                                            : '#2C353A',
                                    borderRadius: BORDER_RADIUS.sm,
                                }}
                            >
                                <STTextField
                                    placeholder='Enter a word...'
                                    val={word.word}
                                    onChange={(newVal) => {
                                        onWordTextChanged(word.id, newVal)
                                    }}
                                    disabled={typeof word.id === 'number'}
                                    style={{
                                        backgroundColor: 'transparent',
                                        display:
                                            word.word.length === 0 && deleteMode
                                                ? 'none'
                                                : 'flex',
                                    }}
                                />
                            </MotiView>
                        ))}
                </ScrollView>
                {!deleteMode ? (
                    <STButton
                        text={'Save'}
                        textCentered
                        onPress={onSaveBtnPress}
                        disabled={creatingCustomWordList || updatingWordList}
                    />
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 20,
                        }}
                    >
                        <View style={{ flexGrow: 1 }}>
                            <STButton
                                text='Cancel'
                                textCentered
                                onPress={onCancelBtnPress}
                            />
                        </View>
                        <View style={{ flexGrow: 1 }}>
                            <STButton
                                text='Delete selected words'
                                textCentered
                                style={{
                                    backgroundColor: COLORS.incorrectAnswer,
                                }}
                                onPress={onDeleteSelectedWordsBtnPress}
                            />
                        </View>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}

export default WordListForm
