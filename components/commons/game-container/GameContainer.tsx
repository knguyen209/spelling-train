import React, { ReactNode, useReducer, useRef } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import GameHeader from '../game-header/GameHeader'
import SBButton from '../sb-button/SBButton'
import { COLORS } from '../../../constants'
import { MotiView } from 'moti'

const GameContainer = ({ children }: { children: ReactNode }) => {
    const [visible, toggle] = useReducer((s) => !s, false)

    return (
        <View style={{ height: '100%', justifyContent: 'space-between' }}>
            {/* <SafeAreaView> */}
            <ScrollView
                style={{
                    paddingHorizontal: 20,
                    zIndex: 0,
                }}
                contentContainerStyle={{ justifyContent: 'flex-start' }}
            >
                {children}
            </ScrollView>
            {/* </SafeAreaView> */}
            <View
                style={{
                    paddingHorizontal: 20,
                    zIndex: 1,

                    paddingBottom: 30,
                }}
            >
                <View style={{ zIndex: 10 }}>
                    <SBButton title='Check' type='contained' onPress={toggle} />
                </View>
                {visible && (
                    <MotiView
                        from={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        style={{
                            backgroundColor: COLORS.incorrectAnswer,
                            padding: 20,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 0,
                            minHeight: 150,
                        }}
                        transition={{ translateY: { type: 'timing' } }}
                    >
                        <Text>Correct</Text>
                        <Text>Correct Answer</Text>
                    </MotiView>
                )}
            </View>
        </View>
    )
}

export default GameContainer
