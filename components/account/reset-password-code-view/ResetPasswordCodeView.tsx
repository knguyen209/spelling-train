import { View } from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import { COLORS } from '../../../constants'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'

const ResetPasswordCodeView = () => {
    return (
        <View style={{ gap: 10 }}>
            <SBText color='#FFF' weight='semibold'>
                Reset Password
            </SBText>
            <SBText size='sm' color={COLORS.disabledTxtColor}>
                We have sent a 6 digit code to your regestered mobile. To reset
                the password please enter the code
            </SBText>
            <STTextField
                title='6-digit code'
                placeholder='Enter here'
                style={{ backgroundColor: COLORS.appBarBg }}
                type='telephoneNumber'
                keyboardType='number-pad'
                maxLength={6}
            />
        </View>
    )
}

export default ResetPasswordCodeView
