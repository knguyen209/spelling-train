import React from 'react'
import ViewContainer from '../../commons/view-container/ViewContainer'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'
import { View, ViewStyle } from 'react-native'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import { Link } from 'expo-router'

const ProfileDetails = () => {
    return (
        <ViewContainer style={{ gap: 20 }}>
            <ProfileSectionContainer style={{ gap: 10 }}>
                <STText weight='bold' size='xl'>
                    Kenny Nguyen
                </STText>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link href='/tabs/profile/followers'>
                        <STText weight='semibold' color={COLORS.primary}>
                            10 Followers
                        </STText>
                    </Link>
                    <Link href='/tabs/profile/followers'>
                        <STText weight='semibold' color={COLORS.primary}>
                            5 Following
                        </STText>
                    </Link>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <STText weight='semibold'>Journey</STText>
                    <STText>2</STText>
                </View>
            </ProfileSectionContainer>
            <ProfileSectionContainer
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <STText weight='bold'>Join School</STText>
                <SVGS.GreaterThanIcon width={30} height={30} />
            </ProfileSectionContainer>
            <ProfileSectionContainer
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <STText weight='bold'>Add additional information</STText>
                <SVGS.GreaterThanIcon width={30} height={30} />
            </ProfileSectionContainer>
            <ProfileSectionContainer style={{ gap: 10 }}>
                <STText weight='bold'>Achievements</STText>
                <View
                    style={{ gap: 10, flexDirection: 'row', flexWrap: 'wrap' }}
                >
                    <SVGS.AchievementIcons.star width={40} height={40} />
                    <SVGS.AchievementIcons.diamond width={40} height={40} />
                </View>
            </ProfileSectionContainer>
            <STButton text='Log out' textCentered />
        </ViewContainer>
    )
}

const ProfileSectionContainer = ({
    children,
    style,
}: {
    children: React.ReactNode
    style?: ViewStyle
}) => {
    return (
        <View
            style={{
                width: '100%',
                padding: 20,
                borderRadius: BORDER_RADIUS.md,
                backgroundColor: '#070A0C',
                ...style,
            }}
        >
            {children}
        </View>
    )
}

export default ProfileDetails
