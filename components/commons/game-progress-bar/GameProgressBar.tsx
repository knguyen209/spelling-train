import { View } from 'react-native'

import { MotiView } from 'moti'

const GameProgressBar = ({ progress = 0.0 }: { progress?: number }) => {
    const getWidth = () => `${progress * 100}%`

    return (
        <View
            style={{
                backgroundColor: '#E5E5E5',
                borderRadius: 100,
                flex: 1,
                marginHorizontal: 10,
                maxHeight: 18,
                width: '100%',
            }}
        >
            <MotiView
                from={{ width: '0%' }}
                animate={{
                    width: getWidth(),
                }}
                style={{
                    flex: 1,
                    borderRadius: 100,
                    backgroundColor: '#58CC03',
                }}
                transition={{ type: 'timing', duration: 500 }}
            >
                <MotiView
                    style={{
                        backgroundColor: '#FFFFFF',
                        opacity: 0.3,
                        height: 5,
                        borderRadius: 10,
                        marginTop: 4,
                        marginHorizontal: 8,
                    }}
                />
            </MotiView>
        </View>
    )
}

export default GameProgressBar
