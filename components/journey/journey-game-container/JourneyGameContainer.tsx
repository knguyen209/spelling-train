import { ActivityIndicator, View } from 'react-native'
import STButton from '../../commons/st-button/STButton'
import MissingLetterGame from '../../games/missing-letter-game/MissingLetterGame'
import useJourneyGameContainerController from '../../../controllers/journey/useJourneyGameContainerController'
import SpokenWordGame from '../../games/spoken-word-game/SpokenWordGame'
import UsageGame from '../../games/usage-game/UsageGame'

const JourneyGameContainer = ({ id }: { id: string }) => {
    const {
        loading,
        gameRef,
        currentGame,
        handleNextButtonPress,
        handleRetryButtonPress,
    } = useJourneyGameContainerController(id)

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <View>
                    {currentGame?.gameType === 'find-missing-letter' && (
                        <MissingLetterGame
                            gameData={currentGame}
                            ref={gameRef}
                        />
                    )}
                    {currentGame?.gameType === 'choose-spoken-word' && (
                        <SpokenWordGame gameData={currentGame} ref={gameRef} />
                    )}
                    {currentGame?.gameType === 'right-usage' && (
                        <UsageGame gameData={currentGame} ref={gameRef} />
                    )}
                </View>
            )}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 20,
                    paddingBottom: 20,
                }}
            >
                <View style={{ flexGrow: 1 }}>
                    <STButton
                        text='Retry'
                        textCentered
                        onPress={handleRetryButtonPress}
                        disabled
                    />
                </View>
                <View style={{ flexGrow: 1 }}>
                    <STButton
                        text='Next'
                        textCentered
                        onPress={handleNextButtonPress}
                    />
                </View>
            </View>
        </View>
    )
}

export default JourneyGameContainer
