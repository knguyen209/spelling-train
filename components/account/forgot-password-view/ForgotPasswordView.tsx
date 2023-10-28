import { View } from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import { COLORS } from '../../../constants'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'

const ForgotPasswordView = () => {
    return (
        <View style={{ gap: 10 }}>
            <SBText color='#FFF' weight='semibold'>
                Forgot Password
            </SBText>
            <SBText size='sm' color={COLORS.disabledTxtColor}>
                Please enter your registered email to reset the password.
            </SBText>
            <STTextField
                title='Email address'
                placeholder='Enter here'
                style={{ backgroundColor: COLORS.appBarBg }}
            />
        </View>
    )
}

export default ForgotPasswordView
