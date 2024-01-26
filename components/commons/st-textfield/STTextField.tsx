import {
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    View,
    ViewStyle,
} from 'react-native'
import SBText from '../sb-text/SBText'
import { COLORS, FONT, SIZES, SVGS } from '../../../constants'
import { useState } from 'react'

type Props = {
    title?: string
    placeholder?: string
    val?: string
    disabled?: boolean
    onChange?: (newVal: string) => void
    keyboardType?: KeyboardTypeOptions
    style?: ViewStyle
    maxLength?: number | undefined
    onSubmit?: () => void
    type?:
        | 'none'
        | 'URL'
        | 'addressCity'
        | 'addressCityAndState'
        | 'addressState'
        | 'countryName'
        | 'creditCardNumber'
        | 'emailAddress'
        | 'familyName'
        | 'fullStreetAddress'
        | 'givenName'
        | 'jobTitle'
        | 'location'
        | 'middleName'
        | 'name'
        | 'namePrefix'
        | 'nameSuffix'
        | 'nickname'
        | 'organizationName'
        | 'postalCode'
        | 'streetAddressLine1'
        | 'streetAddressLine2'
        | 'sublocality'
        | 'telephoneNumber'
        | 'username'
        | 'password'
        | 'newPassword'
        | 'oneTimeCode'
        | undefined
}

const STTextField = ({
    title = '',
    type = 'none',
    placeholder = '',
    keyboardType = 'default',
    disabled = false,
    val,
    onChange,
    style,
    maxLength,
    onSubmit,
}: Props) => {
    const handleTextChanged = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        const newVal = e.nativeEvent.text
        onChange && onChange(newVal)
    }

    return (
        <View style={{ gap: 5 }}>
            {title && (
                <SBText style={{ color: COLORS.disabledBtnColor }}>
                    {title}
                </SBText>
            )}
            <View
                style={{
                    backgroundColor: '#2C353A',
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    ...style,
                }}
            >
                <TextInput
                    textContentType={type}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.disabledBtnColor}
                    value={val}
                    onChange={handleTextChanged}
                    style={{
                        fontFamily: FONT.medium,
                        color: COLORS.white,
                        fontSize: SIZES.md,
                        // width: '100%',
                    }}
                    secureTextEntry={type === 'password'}
                    maxLength={maxLength}
                    blurOnSubmit
                    onSubmitEditing={onSubmit}
                    editable={!disabled}
                />
                {type === 'password' && (
                    <SVGS.PasswordShow width={20} height={20} fill='#FFF' />
                )}
            </View>
        </View>
    )
}

export default STTextField
