import { View, Text, ScrollView } from 'react-native'
import useWordDetailController from '../../../controllers/practice-list/useWordDetailController'
import STText from '../st-text/STText'
import { COLORS } from '../../../constants'
import STButton from '../st-button/STButton'

const WordDetailView = ({ id }: { id: string }) => {
    if (!id) {
        return (
            <View>
                <Text>Error Loading Word Detail</Text>
            </View>
        )
    } else {
        const { wordData, fetchingWordData, closeModal } =
            useWordDetailController(parseInt(id))

        return (
            <View
                style={{
                    backgroundColor: COLORS.appBodyBg,
                    flex: 1,
                    padding: 32,
                    gap: 16,
                }}
            >
                {fetchingWordData ? (
                    <STText size='xl'>Loading...</STText>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            gap: 20,
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={{ gap: 16 }}>
                            <STText size='2xl' weight='bold'>
                                {wordData?.word || ''}
                            </STText>
                            <DataDisplayView
                                name='Definition'
                                value={wordData?.definition || ''}
                            />
                            <DataDisplayView
                                name='Language Origin'
                                value={wordData?.languageOrigin || ''}
                            />
                            <DataDisplayView
                                name='Root Origin'
                                value={wordData?.rootOrigin || ''}
                            />
                            <DataDisplayView
                                name='Parts of Speech'
                                value={wordData?.partsOfSpeech || ''}
                            />
                            <DataDisplayView
                                name='Alternate Pronunciation'
                                value={wordData?.alternatePronunciation || ''}
                            />
                            <DataDisplayView
                                name='Usage'
                                value={wordData?.usage || ''}
                            />
                        </View>
                        <STButton
                            text='Close'
                            textCentered
                            textTransformType='uppercase'
                            onPress={closeModal}
                        />
                    </View>
                )}
            </View>
        )
    }
}

const DataDisplayView = ({ name, value }: { name: string; value: string }) => {
    return (
        <View>
            <STText color={COLORS.primary} weight='bold'>
                {name}:
            </STText>
            <View>
                <STText>{value}</STText>
            </View>
        </View>
    )
}

export default WordDetailView
