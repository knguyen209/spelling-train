import { View, StyleSheet, FlexAlignType, Pressable } from 'react-native'

import { COLORS, SVGS } from '../../../constants'
import STText from '../../commons/st-text/STText'
import { JourneyLevelType } from '../../../types/genericTypes'
import { useRouter } from 'expo-router'
import useJourneyListItemController from '../../../controllers/journey/useJourneyListItemController'

const JourneyListItemView = ({ item }: { item: JourneyLevelType }) => {
    let position: FlexAlignType = 'center'

    const { handleItemPressed } = useJourneyListItemController(item)

    return (
        <View style={{ alignItems: position, padding: 10 }}>
            <Pressable onPress={handleItemPressed}>
                {({ pressed }) => (
                    <View>
                        <View
                            style={{
                                ...styles.buttonContainer,
                                backgroundColor: COLORS.disabledBtnShadowColor,
                            }}
                        >
                            <STText color='#000' weight='bold' size='lg'>
                                {item.level.toString()}
                            </STText>
                        </View>
                        <View
                            style={{
                                ...styles.buttonContainer,
                                backgroundColor: COLORS.disabledBtnColor,
                                position: 'absolute',
                                bottom: pressed ? 0 : 5,
                            }}
                        >
                            <SVGS.IncompleteLevelStripes
                                width='90%'
                                height='90%'
                                style={{ position: 'absolute' }}
                            />
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
