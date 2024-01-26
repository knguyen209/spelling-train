import STText from '../../commons/st-text/STText'
import STTextField from '../../commons/st-textfield/STTextField'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { COLORS } from '../../../constants'
import STButton from '../../commons/st-button/STButton'
import useWordListFormController from '../../../controllers/practice-list/useWordListFormController'

type Props = {
    id: number | undefined
}

const WordListForm = ({ id = undefined }: Props) => {
    const { wordList, onListTitleChanged, onWordTextChanged, onSaveBtnPress } =
        useWordListFormController({ id })

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
                />
                <ScrollView contentContainerStyle={{ gap: 20 }}>
                    <STText color={COLORS.primary} weight='bold'>
                        Practice Words
                    </STText>
                    {wordList &&
                        wordList.words.map((word) => (
                            <STTextField
                                key={word.id}
                                placeholder='Enter a word'
                                val={word.word}
                                onChange={(newVal) => {
                                    onWordTextChanged(word.id, newVal)
                                }}
                            />
                        ))}
                </ScrollView>
                <STButton text='Save' textCentered onPress={onSaveBtnPress} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default WordListForm
