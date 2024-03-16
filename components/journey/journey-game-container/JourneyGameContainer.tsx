import { View } from 'react-native'
import STButton from '../../commons/st-button/STButton'
import MissingLetterGame from '../../games/missing-letter-game/MissingLetterGame'
import {
    IMissingLetterGame,
    ISpokenWordGame,
} from '../../../types/genericTypes'

import useJourneyGameContainerController from '../../../controllers/journey/useJourneyGameContainerController'
import SpokenWordGame from '../../games/spoken-word-game/SpokenWordGame'

const JourneyGameContainer = ({ id }: { id: string }) => {
    const {
        missingGameRef,
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
            <View>
                {currentGame?.gameType === 'find-missing-letter' && (
                    <MissingLetterGame
                        gameData={currentGame as IMissingLetterGame}
                        ref={missingGameRef}
                    />
                )}
                {currentGame?.gameType === 'choose-spoken-word' && (
                    <SpokenWordGame
                        gameData={currentGame as ISpokenWordGame}
                        ref={missingGameRef}
                    />
                )}
            </View>
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
