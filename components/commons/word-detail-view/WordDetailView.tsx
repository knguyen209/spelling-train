import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import useWordDetailController from '../../../controllers/practice-list/useWordDetailController'
import STText from '../st-text/STText'
import { COLORS, SVGS } from '../../../constants'
import STButton from '../st-button/STButton'
import { Skeleton } from 'moti/skeleton'

const WordDetailView = ({ id }: { id: string }) => {
    if (!id) {
        return (
            <View style={{ flexGrow: 1 }}>
                <ActivityIndicator size='large' />
            </View>
        )
    } else {
        const { wordData, fetchingWordData, closeModal, speak } =
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
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        gap: 20,
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ gap: 16 }}>
                        <Skeleton.Group show={fetchingWordData}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton width={200} height={30}>
                                    <STText size='2xl' weight='bold'>
                                        {wordData?.word || ''}
                                    </STText>
                                </Skeleton>
                                {!fetchingWordData && (
                                    <TouchableOpacity onPress={speak}>
                                        <SVGS.SpeakerIcon
                                            width={30}
                                            height={30}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
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
                        </Skeleton.Group>
                    </View>
                    <STButton
                        text='Close'
                        textCentered
                        textTransformType='uppercase'
                        onPress={closeModal}
                    />
                </View>
            </View>
        )
    }
}

const DataDisplayView = ({ name, value }: { name: string; value: string }) => {
    return (
        <View style={{ gap: 10 }}>
            <STText color={COLORS.primary} weight='bold'>
                {name}:
            </STText>
            <Skeleton height={24}>
                <STText>{value}</STText>
            </Skeleton>
        </View>
    )
}

export default WordDetailView
