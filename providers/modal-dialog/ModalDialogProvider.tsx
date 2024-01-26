import React, { useState, useContext, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './modal-dialog.styles'
import STButton from '../../components/commons/st-button/STButton'
import STText from '../../components/commons/st-text/STText'
import { AnimatePresence, MotiView } from 'moti'

type UseModalShowReturnType = {
    show: boolean
    setShow: (value: boolean) => void
    onHide: () => void
}

const useModalShow = (): UseModalShowReturnType => {
    const [show, setShow] = useState(false)

    const handleOnHide = () => {
        setShow(false)
    }

    return { show, setShow, onHide: handleOnHide }
}

type ModalContextType = {
    showConfirmation: (title: string, message: string) => Promise<boolean>
}

type ConfirmationModalContextProviderProps = { children: React.ReactNode }

const ConfirmationModalContext = React.createContext<ModalContextType>(
    {} as ModalContextType
)

const ConfirmationModalContextProvider: React.FC<
    ConfirmationModalContextProviderProps
> = (props) => {
    const { show, setShow, onHide } = useModalShow()

    const [content, setContent] = useState<{
        title: string
        message: string
    } | null>()

    const resolver = useRef<Function>()

    const handleShow = (title: string, message: string): Promise<boolean> => {
        setContent({ title, message })
        setShow(true)
        return new Promise(function (resolve) {
            resolver.current = resolve
        })
    }

    const modalContext: ModalContextType = { showConfirmation: handleShow }

    const handleOk = () => {
        resolver.current && resolver.current(true)
        onHide()
    }

    const handleCancel = () => {
        resolver.current && resolver.current(false)
        onHide()
    }

    return (
        <ConfirmationModalContext.Provider value={modalContext}>
            {props.children}
            {content && (
                <AnimatePresence>
                    {show && (
                        <MotiView
                            from={{ translateY: 500 }}
                            animate={{ translateY: 0 }}
                            transition={{
                                translateY: {
                                    type: 'timing',
                                    duration: 300,
                                },
                            }}
                            exit={{ translateY: 500 }}
                            exitTransition={{
                                translateY: { type: 'timing', duration: 300 },
                            }}
                            style={{
                                zIndex: 0,
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                minHeight: 200,
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <STText size='lg' weight='bold'>
                                        {content.title}
                                    </STText>
                                    <STText>{content.message}</STText>
                                    <View
                                        style={{
                                            width: '100%',
                                            margin: 20,
                                            gap: 20,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <View style={{ width: '100%' }}>
                                            <STButton
                                                text='Yes'
                                                textTransformType='uppercase'
                                                textCentered
                                                onPress={handleOk}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={handleCancel}
                                        >
                                            <STText weight='semibold'>
                                                CANCEL
                                            </STText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </MotiView>
                    )}
                </AnimatePresence>
            )}
        </ConfirmationModalContext.Provider>
    )
}

const useConfirmationModalContext = (): ModalContextType =>
    useContext(ConfirmationModalContext)

export { useModalShow, useConfirmationModalContext }

export default ConfirmationModalContextProvider
