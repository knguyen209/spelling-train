import { MotiView } from 'moti'

import { SVGS } from '../../../constants'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    useWindowDimensions,
} from 'react-native'

import STButton from '../../commons/st-button/STButton'
import ForgotPasswordView from '../forgot-password-view/ForgotPasswordView'
import ResetPasswordCodeView from '../reset-password-code-view/ResetPasswordCodeView'
import NewPasswordView from '../new-password-view/NewPasswordView'
import { useState } from 'react'

const views = [ForgotPasswordView, ResetPasswordCodeView, NewPasswordView]

const ForgotPasswordModalContainer = ({
    showModal,
    toggleShowModal,
}: {
    showModal?: boolean
    toggleShowModal: () => void
}) => {
    const { height } = useWindowDimensions()

    const [currentIndex, setCurrentIndex] = useState(0)

    const CurrentView = views[currentIndex]

    const onSubmitButtonPressed = () => {
        if (currentIndex === 0) {
            const newIndex = currentIndex + 1
            setCurrentIndex(newIndex)

            //
        }
        if (currentIndex === 1) {
            const newIndex = currentIndex + 1
            setCurrentIndex(newIndex)
        }
        if (currentIndex === 2) {
            // Save new password
            // show success popup
            // close modal
            closeModal()
        }
    }

    const closeModal = () => {
        Keyboard.dismiss()
        toggleShowModal()
    }

    return (
        <MotiView
            from={{ translateY: height }}
            animate={{ translateY: showModal ? 0 : height }}
            transition={{ type: 'timing' }}
            style={{
                flex: 1,
                backgroundColor: '#2C353A',
                padding: 20,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                gap: 10,
                height: height / 2,
            }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    flex: 1,
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            flex: 1,
                            gap: 10,
                        }}
                    >
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={closeModal}>
                                <SVGS.CloseIcon width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                        <CurrentView />
                        <STButton
                            text='Submit'
                            textCentered
                            onPress={onSubmitButtonPressed}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </MotiView>
    )
}

export default ForgotPasswordModalContainer
