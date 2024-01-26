import { ReactNode, useReducer } from 'react'
import SBText from '../../commons/sb-text/SBText'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { COLORS, SVGS } from '../../../constants'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'
import ForgotPasswordModalContainer from '../forgot-password-modal-container/ForgotPasswordModalContainer'

import useLoginFormController from '../../../controllers/accounts/useLoginFormController'

const SignInView = () => {
    const {
        userCredential,
        showModal,
        toggleShowModal,
        onTextFieldChanged,
        onForgotPasswordPress,
        onLoginButtonPress,
    } = useLoginFormController()

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    {showModal && (
                        <TouchableWithoutFeedback onPress={toggleShowModal}>
                            <View
                                style={{
                                    flex: 1,
                                    position: 'absolute',
                                    backgroundColor: '#000',
                                    zIndex: 1,
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    opacity: 0.5,
                                }}
                            />
                        </TouchableWithoutFeedback>
                    )}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: COLORS.appBodyBg,
                            paddingVertical: 50,
                            paddingHorizontal: 20,
                            gap: 10,
                            justifyContent: 'center',
                            zIndex: 0,
                        }}
                    >
                        <STTextField
                            title='Email'
                            placeholder='Enter here'
                            type='emailAddress'
                            keyboardType='email-address'
                            val={userCredential.emailAddress}
                            onChange={(newVal) =>
                                onTextFieldChanged('emailAddress', newVal)
                            }
                        />
                        <STTextField
                            title='Password'
                            placeholder='Enter here'
                            type='password'
                            val={userCredential.password}
                            onChange={(newVal) =>
                                onTextFieldChanged('password', newVal)
                            }
                        />
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={toggleShowModal}>
                                <SBText color={COLORS.white} size='sm'>
                                    Forgot Password?
                                </SBText>
                            </TouchableOpacity>
                        </View>
                        <STButton
                            text='Login'
                            textCentered
                            onPress={onLoginButtonPress}
                        />
                        <View
                            style={{
                                alignItems: 'center',
                                paddingVertical: 20,
                            }}
                        >
                            <SBText color={COLORS.white}>Or login with</SBText>
                        </View>
                        <SignInProviderButton
                            icon={<SVGS.GoogleIcon width={30} height={30} />}
                            text='Sign in with Google'
                            onPress={() => {}}
                        />
                        <SignInProviderButton
                            icon={<SVGS.FacebookIcon width={30} height={30} />}
                            text='Continue with Facebook'
                            onPress={() => {}}
                        />
                        <SignInProviderButton
                            icon={<SVGS.AppleIcon width={30} height={30} />}
                            text='Sign in with Apple'
                            onPress={() => {}}
                        />
                    </View>
                    <View style={{ zIndex: 10 }}>
                        <ForgotPasswordModalContainer
                            showModal={showModal}
                            toggleShowModal={toggleShowModal}
                        />
                    </View>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

type SignInProviderButtonProps = {
    icon: ReactNode
    text: string
    onPress: () => void
}

const SignInProviderButton = ({
    icon,
    text,
    onPress,
}: SignInProviderButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    backgroundColor: '#090F12',
                    flexDirection: 'row',
                    gap: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 50,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}
            >
                {icon}
                <Text
                    style={{
                        color: COLORS.white,
                        fontWeight: 'bold',
                    }}
                >
                    {text}
                </Text>
                <View />
            </View>
        </TouchableOpacity>
    )
}

export default SignInView
