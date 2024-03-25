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
    showConfirmation: (
        title: string,
        message: string | React.ReactNode,
        alertOnly?: boolean,
        confirmText?: string,
        cancelText?: string
    ) => Promise<boolean>
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
        message: string | React.ReactNode
        alertOnly?: boolean
        confirmText?: string
        cancelText?: string
    } | null>()

    const resolver = useRef<Function>()

    const handleShow = (
        title: string,
        message: string | React.ReactNode,
        alertOnly?: boolean,
        confirmText?: string,
        cancelText?: string
    ): Promise<boolean> => {
        setContent({ title, message, alertOnly, confirmText, cancelText })
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
                        <>
                            <MotiView
                                from={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                transition={{
                                    translateY: {
                                        type: 'timing',
                                        duration: 300,
                                    },
                                }}
                                exit={{ opacity: 0 }}
                                exitTransition={{
                                    opacity: {
                                        type: 'timing',
                                        duration: 300,
                                    },
                                }}
                                style={{
                                    zIndex: 0,
                                    backgroundColor: '#000',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                }}
                            ></MotiView>
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
                                    translateY: {
                                        type: 'timing',
                                        duration: 300,
                                    },
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
                                        <View
                                            style={{
                                                alignItems: 'flex-start',
                                                width: '100%',
                                                paddingLeft: 10,
                                                gap: 20,
                                            }}
                                        >
                                            <STText size='lg' weight='bold'>
                                                {content.title}
                                            </STText>
                                            {typeof content.message ===
                                            'string' ? (
                                                <STText>
                                                    {content.message}
                                                </STText>
                                            ) : (
                                                content.message
                                            )}
                                        </View>

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
                                                    text={
                                                        content.confirmText ||
                                                        'Yes'
                                                    }
                                                    textTransformType='uppercase'
                                                    textCentered
                                                    onPress={handleOk}
                                                />
                                            </View>
                                            {!content.alertOnly && (
                                                <TouchableOpacity
                                                    onPress={handleCancel}
                                                >
                                                    <STText weight='semibold'>
                                                        {content.cancelText ||
                                                            'Cancel'}
                                                    </STText>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </MotiView>
                        </>
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
