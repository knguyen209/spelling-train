import ViewContainer from '../../commons/view-container/ViewContainer'
import STText from '../../commons/st-text/STText'
import STTextField from '../../commons/st-textfield/STTextField'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { COLORS } from '../../../constants'
import STButton from '../../commons/st-button/STButton'

const WordListForm = () => {
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
                <STTextField placeholder='Enter the list name' />
                <ScrollView contentContainerStyle={{ gap: 20 }}>
                    <STText color={COLORS.primary} weight='bold'>
                        Practice Words
                    </STText>
                    <STTextField placeholder='Enter a word' />
                    <STTextField placeholder='Enter a word' />
                    <STTextField placeholder='Enter a word' />
                    <STTextField placeholder='Enter a word' />
                    <STTextField placeholder='Enter a word' />
                </ScrollView>
                <STButton text='Save' textCentered />
            </View>
        </KeyboardAvoidingView>
    )
}

export default WordListForm
