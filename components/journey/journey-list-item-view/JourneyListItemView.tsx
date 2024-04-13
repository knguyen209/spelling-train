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
}: {
    journeyId: string
    item: JourneyStationLevelType
}) => {
    let position: FlexAlignType = 'center'

    const { handleItemPressed } = useJourneyListItemController(journeyId, item)

    return (
        <View style={{ alignItems: position, padding: 24 }}>
            <Pressable onPress={handleItemPressed}>
                {({ pressed }) => (
                    <View>
                        <View
                            style={{
                                ...styles.buttonContainer,
                                backgroundColor: item.isCompleted
                                    ? COLORS.primaryBtnShadowColor
                                    : COLORS.disabledBtnShadowColor,
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
                                <SVGS.IncompleteLevelStripes
                                    width='90%'
                                    height='90%'
                                    style={{ position: 'absolute' }}
                                />
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

export default JourneyListItemView
