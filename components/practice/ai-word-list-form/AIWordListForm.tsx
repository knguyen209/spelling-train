import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { COLORS } from '../../../constants'
import STText from '../../commons/st-text/STText'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'

const AIWordListForm = () => {
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
                <STTextField placeholder='Enter a topic' />
                <STButton text='Generate' textCentered />
                <ScrollView contentContainerStyle={{ gap: 20 }}></ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AIWordListForm
