import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import GameProgressBar from '../../commons/game-progress-bar/GameProgressBar'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const CreateAccount = () => {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)

    const stages = [
        <CreateProfileSection />,
        <ReferralSourceSection />,
        <LearningObjectiveSection />,
        <LearningGoalSection />,
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#151F25' }}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (currentIndex > 0) {
                                setCurrentIndex(currentIndex - 1)
                            } else {
                                router.back()
                            }
                        }}
                    >
                        <SVGS.BackIcon />
                    </TouchableOpacity>
                    <GameProgressBar
                        progress={(currentIndex + 1) / stages.length}
                    />
                </View>
                <View style={{ paddingTop: 20 }}>{stages[currentIndex]}</View>
                <View
                    style={{
                        position: 'absolute',
                        zIndex: 5,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingHorizontal: 20,
                    }}
                >
                    <STButton
                        text='Continue'
                        textCentered
                        onPress={() => {
                            if (currentIndex + 1 < stages.length) {
                                setCurrentIndex(currentIndex + 1)
                            }
                            if (currentIndex === stages.length - 1) {
                                router.push('login')
                            }
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const CreateProfileSection = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <SBText color={COLORS.primary} weight='bold' size='xl'>
                        Create your profile
                    </SBText>
                    <View style={{ gap: 10 }}>
                        <STTextField
                            title='Name'
                            placeholder='Enter your name'
                        />
                        <STTextField
                            title='Phone'
                            placeholder='Enter your phone number'
                            onChange={(newVal) => {
                                console.log('New Phone number', newVal)
                            }}
                            type='telephoneNumber'
                            keyboardType='phone-pad'
                        />
                        <STTextField
                            title='Email'
                            placeholder='Enter your email address'
                            type='emailAddress'
                            keyboardType='email-address'
                        />
                        <STTextField
                            title='Password'
                            placeholder='Enter your password'
                            type='password'
                        />
                        <STTextField
                            title='Confirm Password'
                            placeholder='Confirm your password'
                            type='password'
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const ReferralSourceSection = () => {
    const sources = [
        'TV',
        'News / Article / Blog',
        'Google Search',
        'Tiktok',
        'Facebook / Instagram',
        'YouTube',
        'AppStore',
        'Family / Friends',
        'Others',
    ]
    const [selectedSource, setSelectedSource] = useState<string>('')

    return (
        <View>
            <SBText color={COLORS.primary} weight='bold' size='xl'>
                How did you know about spell train?
            </SBText>
            <FlatList
                style={{ marginBottom: 100 }}
                data={sources}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedSource(item)}>
                        <View
                            style={{
                                backgroundColor:
                                    selectedSource === item
                                        ? '#0D151A'
                                        : '#2C353A',
                                borderRadius: BORDER_RADIUS.md,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginVertical: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <SBText color='#FFF'>{item}</SBText>
                            {selectedSource === item && (
                                <SVGS.CheckMark width={20} height={20} />
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const LearningObjectiveSection = () => {
    const objectives = [
        {
            icon: <SVGS.Conversation width={30} height={30} />,
            primaryText: 'Converse with confidence',
            secondaryText: '2000+ words spell free interactive exercises.',
        },
        {
            icon: <SVGS.File width={30} height={30} />,
            primaryText: 'Build a large vocabulary',
            secondaryText: '500+ practical words.',
        },
        {
            icon: <SVGS.Clock width={30} height={30} />,
            primaryText: 'Develop a learning habit',
            secondaryText: 'Smart reminders, fun challenges and more.',
        },
    ]
    return (
        <View style={{ gap: 20 }}>
            <SBText color={COLORS.primary} weight='bold' size='xl'>
                What you can achieve
            </SBText>
            <View style={{ gap: 50 }}>
                {objectives.map((objective, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            gap: 20,
                        }}
                    >
                        <View style={{ paddingTop: 5 }}>{objective.icon}</View>
                        <View
                            style={{
                                alignItems: 'flex-start',
                                gap: 5,
                                flexWrap: 'nowrap',
                            }}
                        >
                            <SBText color={COLORS.white} weight='bold'>
                                {objective.primaryText}
                            </SBText>
                            <SBText color={COLORS.disabledBtnColor}>
                                {objective.secondaryText}
                            </SBText>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const LearningGoalSection = () => {
    const sources = [
        '5 mins / day',
        '10 mins / day',
        '15 mins / day',
        '20 mins / day',
        '30 mins / day',
        '1 hour / day',
        '2 hours / day',
    ]
    const [selectedSource, setSelectedSource] = useState<string>('')

    return (
        <View>
            <SBText color={COLORS.primary} weight='bold' size='xl'>
                What is your daily learning goal?
            </SBText>
            <FlatList
                style={{ marginBottom: 100 }}
                data={sources}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedSource(item)}>
                        <View
                            style={{
                                backgroundColor:
                                    selectedSource === item
                                        ? '#0D151A'
                                        : '#2C353A',
                                borderRadius: BORDER_RADIUS.md,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginVertical: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <SBText color='#FFF'>{item}</SBText>
                            {selectedSource === item && (
                                <SVGS.CheckMark width={20} height={20} />
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default CreateAccount
