import { View, StyleSheet, FlexAlignType, Pressable } from 'react-native'

import { COLORS, SVGS } from '../../../constants'
import STText from '../../commons/st-text/STText'
import {
    JourneyLevelType,
    JourneyStationLevelType,
} from '../../../types/genericTypes'
import { useRouter } from 'expo-router'
import useJourneyListItemController from '../../../controllers/journey/useJourneyListItemController'

const JourneyListItemView = ({
    journeyId,
    item,
    index,
}: {
    journeyId: string
    item: JourneyStationLevelType
    index: number
}) => {
    let position: FlexAlignType = 'center'

    const { isCurrentLevel, handleItemPressed } = useJourneyListItemController(
        journeyId,
        item,
        index
    )

    return (
        <View
            style={{
                alignItems: position,
                padding: 24,
                marginLeft: findValue(item.level - 1) * 150,
            }}
        >
            <Pressable onPress={handleItemPressed}>
                {({ pressed }) => (
                    <View>
                        <View
                            style={{
                                ...styles.buttonContainer,
                                backgroundColor: item.isCompleted
                                    ? COLORS.primaryBtnShadowColor
                                    : isCurrentLevel
                                    ? COLORS.correctAnswer
                                    : COLORS.disabledBtnColor,
                            }}
                        >
                            <STText color='#000' weight='bold' size='lg'>
                                {item.level.toString()}
                            </STText>
                        </View>
                        <View
                            style={{
                                ...styles.buttonContainer,
                                backgroundColor: item.isCompleted
                                    ? COLORS.primaryBtnColor
                                    : isCurrentLevel
                                    ? COLORS.correctAnswerBg
                                    : COLORS.disabledBtnColor,
                                position: 'absolute',
                                bottom: pressed ? 0 : 5,
                            }}
                        >
                            {item.isCompleted ? (
                                <>
                                    <SVGS.CompleteLevelStripes
                                        width='90%'
                                        height='90%'
                                        style={{ position: 'absolute' }}
                                    />
                                    <SVGS.CompleleLevelStars
                                        width={80}
                                        height={80}
                                        style={{
                                            position: 'absolute',
                                            top: -50,
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    {!isCurrentLevel && (
                                        <SVGS.IncompleteLevelStripes
                                            width='90%'
                                            height='90%'
                                            style={{ position: 'absolute' }}
                                        />
                                    )}
                                </>
                            )}

                            <STText color='#000' weight='bold' size='lg'>
                                {item.level.toString()}
                            </STText>
                        </View>
                    </View>
                )}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const findValue = (n: number) => {
    // Calculate the index within one complete cycle of the pattern
    let indexWithinCycle = n % 8

    // Define the values in one cycle of the pattern
    let cycleValues = [0, 1, 2, 1, 0, -1, -2, -1]

    // Return the value at the calculated index
    return cycleValues[indexWithinCycle]
}

export default JourneyListItemView
