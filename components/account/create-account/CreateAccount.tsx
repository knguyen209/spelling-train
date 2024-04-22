import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import SBText from '../../commons/sb-text/SBText'
import STTextField from '../../commons/st-textfield/STTextField'
import STButton from '../../commons/st-button/STButton'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import GameProgressBar from '../../commons/game-progress-bar/GameProgressBar'
import { LegacyRef, RefObject, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import useCreateAccountFormController from '../../../controllers/accounts/useCreateAccountFormController'

const CreateAccount = () => {
    const {
        registeringAccount,
        sources,
        objectives,
        goals,
        profile,
        noStages,
        currentIndex,
        handleContinuePress,
        handleGoBackPress,
        onTextFieldChanged,
        handleSourceSelected,
        handleGoalSelected,
    } = useCreateAccountFormController()

    const [selectedSource, setSelectedSource] = useState<string>('')

    const [selectedGoal, setSelectedGoal] = useState<string>('')

    const phoneTxtFieldRef: RefObject<TextInput> | null | undefined =
        useRef(null)

    const emailTxtFieldRef: RefObject<TextInput> | null | undefined =
        useRef(null)

    const passwordTxtFieldRef: RefObject<TextInput> | null | undefined =
        useRef(null)

    const confirmPasswordTxtFieldRef: RefObject<TextInput> | null | undefined =
        useRef(null)

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
                    <TouchableOpacity onPress={handleGoBackPress}>
                        <SVGS.BackIcon />
                    </TouchableOpacity>
                    <GameProgressBar progress={(currentIndex + 1) / noStages} />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ paddingTop: 20 }}>
                            {currentIndex == 0 && (
                                <View>
                                    <SBText
                                        color={COLORS.primary}
                                        weight='bold'
                                        size='xl'
                                    >
                                        Create your profile
                                    </SBText>
                                    <View style={{ gap: 10 }}>
                                        <STTextField
                                            title='Name'
                                            placeholder='Enter your name'
                                            maxLength={35}
                                            autoFocus={true}
                                            onSubmit={() => {
                                                phoneTxtFieldRef.current?.focus()
                                            }}
                                            returnKeyType='next'
                                            val={profile.name}
                                            onChange={(newVal) =>
                                                onTextFieldChanged(
                                                    'name',
                                                    newVal
                                                )
                                            }
                                        />
                                        <STTextField
                                            title='Phone'
                                            placeholder='Enter your phone number'
                                            type='telephoneNumber'
                                            keyboardType='number-pad'
                                            maxLength={10}
                                            onRef={phoneTxtFieldRef}
                                            onSubmit={() => {
                                                emailTxtFieldRef.current?.focus
                                            }}
                                            returnKeyType='next'
                                            val={profile.phone}
                                            onChange={(newVal) =>
                                                onTextFieldChanged(
                                                    'phone',
                                                    newVal
                                                )
                                            }
                                        />
                                        <STTextField
                                            title='Email'
                                            placeholder='Enter your email address'
                                            type='emailAddress'
                                            keyboardType='email-address'
                                            maxLength={50}
                                            onRef={emailTxtFieldRef}
                                            returnKeyType='next'
                                            onSubmit={() => {
                                                passwordTxtFieldRef.current
                                                    ?.focus
                                            }}
                                            val={profile.email}
                                            onChange={(newVal) =>
                                                onTextFieldChanged(
                                                    'email',
                                                    newVal
                                                )
                                            }
                                        />
                                        <STTextField
                                            title='Password'
                                            placeholder='Enter your password'
                                            type='password'
                                            maxLength={12}
                                            onRef={passwordTxtFieldRef}
                                            returnKeyType='next'
                                            onSubmit={() => {
                                                confirmPasswordTxtFieldRef
                                                    .current?.focus
                                            }}
                                            val={profile.password}
                                            onChange={(newVal) =>
                                                onTextFieldChanged(
                                                    'password',
                                                    newVal
                                                )
                                            }
                                        />
                                        <STTextField
                                            title='Confirm Password'
                                            placeholder='Confirm your password'
                                            type='password'
                                            maxLength={12}
                                            onRef={confirmPasswordTxtFieldRef}
                                            returnKeyType='done'
                                            val={profile.confirmPassword}
                                            onChange={(newVal) =>
                                                onTextFieldChanged(
                                                    'confirmPassword',
                                                    newVal
                                                )
                                            }
                                        />
                                    </View>
                                </View>
                            )}
                            {currentIndex == 1 && (
                                <View>
                                    <SBText
                                        color={COLORS.primary}
                                        weight='bold'
                                        size='xl'
                                    >
                                        How did you know about spell train?
                                    </SBText>
                                    <FlatList
                                        style={{ marginBottom: 100 }}
                                        data={sources}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleSourceSelected(item)
                                                }
                                            >
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            profile.source ===
                                                            item
                                                                ? '#0D151A'
                                                                : '#2C353A',
                                                        borderRadius:
                                                            BORDER_RADIUS.md,
                                                        paddingVertical: 10,
                                                        paddingHorizontal: 20,
                                                        marginVertical: 5,
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <SBText color='#FFF'>
                                                        {item}
                                                    </SBText>
                                                    {profile.source ===
                                                        item && (
                                                        <SVGS.CheckMark
                                                            width={20}
                                                            height={20}
                                                        />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            )}
                            {currentIndex == 2 && (
                                <View style={{ gap: 20 }}>
                                    <SBText
                                        color={COLORS.primary}
                                        weight='bold'
                                        size='xl'
                                    >
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
                                                <View style={{ paddingTop: 5 }}>
                                                    {objective.icon ==
                                                        'conversation' && (
                                                        <SVGS.Conversation
                                                            width={30}
                                                            height={30}
                                                        />
                                                    )}
                                                    {objective.icon ==
                                                        'file' && (
                                                        <SVGS.File
                                                            width={30}
                                                            height={30}
                                                        />
                                                    )}
                                                    {objective.icon ==
                                                        'clock' && (
                                                        <SVGS.Clock
                                                            width={30}
                                                            height={30}
                                                        />
                                                    )}
                                                </View>
                                                <View
                                                    style={{
                                                        alignItems:
                                                            'flex-start',
                                                        gap: 5,
                                                        flexWrap: 'nowrap',
                                                    }}
                                                >
                                                    <SBText
                                                        color={COLORS.white}
                                                        weight='bold'
                                                    >
                                                        {objective.primaryText}
                                                    </SBText>
                                                    <SBText
                                                        color={
                                                            COLORS.disabledBtnColor
                                                        }
                                                    >
                                                        {
                                                            objective.secondaryText
                                                        }
                                                    </SBText>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                            {currentIndex == 3 && (
                                <View>
                                    <SBText
                                        color={COLORS.primary}
                                        weight='bold'
                                        size='xl'
                                    >
                                        What is your daily learning goal?
                                    </SBText>
                                    <FlatList
                                        style={{ marginBottom: 100 }}
                                        data={goals}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleGoalSelected(item)
                                                }
                                            >
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            profile.learningGoal ===
                                                            item
                                                                ? '#0D151A'
                                                                : '#2C353A',
                                                        borderRadius:
                                                            BORDER_RADIUS.md,
                                                        paddingVertical: 10,
                                                        paddingHorizontal: 20,
                                                        marginVertical: 5,
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <SBText color='#FFF'>
                                                        {item}
                                                    </SBText>
                                                    {profile.learningGoal ===
                                                        item && (
                                                        <SVGS.CheckMark
                                                            width={20}
                                                            height={20}
                                                        />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
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
                        onPress={handleContinuePress}
                        disabled={registeringAccount}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CreateAccount
