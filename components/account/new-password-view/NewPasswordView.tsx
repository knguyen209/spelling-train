import { View } from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import { COLORS } from '../../../constants'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'

const NewPasswordView = () => {
    return (
        <View style={{ gap: 10 }}>
            <SBText color='#FFF' weight='semibold'>
                Create New Password
            </SBText>
            <SBText size='sm' color={COLORS.disabledTxtColor}>
                Choose a word or phrase that helps you remember your password.
            </SBText>
            <STTextField
                title='Password'
                placeholder='Enter here'
                style={{ backgroundColor: COLORS.appBarBg }}
                type='newPassword'
            />
            <STTextField
                title='Confirm Password'
                placeholder='Enter here'
                style={{ backgroundColor: COLORS.appBarBg }}
                type='newPassword'
            />
        </View>
    )
}

export default NewPasswordView
