import STText from '../../commons/st-text/STText'
import STTextField from '../../commons/st-textfield/STTextField'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { COLORS } from '../../../constants'
import STButton from '../../commons/st-button/STButton'
import useWordListFormController from '../../../view-controllers/practice-list/useWordListFormController'

const WordListForm = () => {
    const { practiceList, onListTitleChanged, onSaveBtnPress } =
        useWordListFormController()

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
                    val={practiceList.title}
                    onChange={onListTitleChanged}
                    placeholder='Enter the list name'
                />
                <ScrollView contentContainerStyle={{ gap: 20 }}>
                    <STText color={COLORS.primary} weight='bold'>
                        Practice Words
                    </STText>
                    <STTextField placeholder='Enter a word' />
                </ScrollView>
                <STButton text='Save' textCentered onPress={onSaveBtnPress} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default WordListForm
