import React, { useState, useContext, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './result-dialog.styles'
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
    showResult: (title: string, message: string) => Promise<boolean>
}

type ResultModalContextProviderProps = { children: React.ReactNode }

const ResultModalContext = React.createContext<ModalContextType>(
    {} as ModalContextType
)

const ResultModalContextProvider: React.FC<ResultModalContextProviderProps> = (
    props
) => {
    const { show, setShow, onHide } = useModalShow()

    const [content, setContent] = useState<{
        title: string
        message: string
        alertOnly?: boolean
        confirmText?: string
        cancelText?: string
    } | null>()

    const resolver = useRef<Function>()

    const handleShow = (title: string, message: string): Promise<boolean> => {
        setContent({ title, message })
        setShow(true)

        return new Promise(function (resolve) {
            resolver.current = resolve
        })
    }

    const modalContext: ModalContextType = { showResult: handleShow }

    const handleOk = () => {
        resolver.current && resolver.current(true)
        onHide()
    }

    return (
        <ResultModalContext.Provider value={modalContext}>
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
                                from={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    opacity: {
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
                                    position: 'absolute',
                                    top: '40%',
                                    left: 0,
                                    right: 0,
                                    marginHorizontal: 20,
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
                                            <STText>{content.message}</STText>
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
                                                    text='Continue'
                                                    textTransformType='uppercase'
                                                    textCentered
                                                    onPress={handleOk}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </MotiView>
                        </>
                    )}
                </AnimatePresence>
            )}
        </ResultModalContext.Provider>
    )
}

const useResultModalContext = (): ModalContextType =>
    useContext(ResultModalContext)

export { useModalShow, useResultModalContext }

export default ResultModalContextProvider
