import { ActivityIndicator, View } from 'react-native'
import STButton from '../../commons/st-button/STButton'
import MissingLetterGame from '../../games/missing-letter-game/MissingLetterGame'
import useJourneyGameContainerController from '../../../controllers/journey/useJourneyGameContainerController'
import SpokenWordGame from '../../games/spoken-word-game/SpokenWordGame'
import UsageGame from '../../games/usage-game/UsageGame'
import FindCorrectWordGame from '../../games/find-correct-word-game/FindCorrectWordGame'
import {
    IFindCorrectWord,
    IFindMissingLetterGame,
    IHangmanGame,
    IMatchingPairGame,
    IQuizOriginGame,
    ISpellWordGame,
    ISpokenWordGame,
} from '../../../types/genericTypes'
import SpellWordGame from '../../games/spell-word-game/SpellWordGame'
import QuizOriginGame from '../../games/quiz-origin-game/QuizOriginGame'
import HangmanGame from '../../games/hangman-game/HangmanGame'
import MatchingPairGame from '../../games/matching-pair-game/MatchingPairGame'

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
                    {currentGame?.gameType === 'findMissingLetter' && (
                        <MissingLetterGame
                            gameData={currentGame as IFindMissingLetterGame}
                            ref={gameRef}
                        />
                    )}
                    {currentGame?.gameType === 'chooseSpokenWord' && (
                        <SpokenWordGame
                            gameData={currentGame as ISpokenWordGame}
                            ref={gameRef}
                        />
                    )}
                    {currentGame?.gameType === 'right-usage' && (
                        <UsageGame gameData={currentGame} ref={gameRef} />
                    )}
                    {currentGame?.gameType === 'findCorrectWord' && (
                        <FindCorrectWordGame
                            gameData={currentGame as IFindCorrectWord}
                            ref={gameRef}
                        />
                    )}
                    {currentGame?.gameType === 'spellWord' && (
                        <SpellWordGame
                            gameData={currentGame as ISpellWordGame}
                            ref={gameRef}
                        />
                    )}
                    {currentGame?.gameType === 'quizOrigin' && (
                        <QuizOriginGame
                            gameData={currentGame as IQuizOriginGame}
                            ref={gameRef}
                        />
                    )}
                    {currentGame?.gameType === 'hangman' && (
                        <HangmanGame
                            gameData={currentGame as IHangmanGame}
                            ref={gameRef}
                        />
                    )}
                    {currentGame?.gameType === 'matchingPair' && (
                        <MatchingPairGame
                            gameData={currentGame as IMatchingPairGame}
                            ref={gameRef}
                        />
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
