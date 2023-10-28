const COLORS = {
    primary: '#FCD600',
    secondary: '#003FFB',
    tertiary: '#FF7754',

    transparent: 'transparent',

    gray: '#83829A',
    gray2: '#C1C0C8',

    lightWhite: '#FAFAFC',

    primaryBtnColor: '#FCD600',
    primaryBtnShadowColor: '#FA9901',

    secondaryBtnColor: '#2DBD1E',
    secondaryBtnShadowColor: '#166F05',

    disabledBtnColor: '#D7D7D7',
    disabledBtnShadowColor: '#C0C0C0',
    disabledTxtColor: '#AEAEAE',
    appBarTitle: '#FCD600',
    appBarBg: '#151F25',
    appBodyBg: '#151F25',

    black: '#000000',
    white: '#FEFFFE',

    heart: '#F04350',

    speakerColor: '#32B0F6',

    correctAnswer: '#58A700',
    incorrectAnswer: '#EA2B2B',

    correctAnswerBg: '#D6FDB8',
    incorrectAnswerBg: '#FDDFDF',

    messageAIBg: '#2C353A',
    messagePlayerBg: '#8F26FF',
}

const FONT = {
    regular: 'NunitoRegular',
    medium: 'NunitoMedium',
    bold: 'NunitoBold',
    semibold: 'NunitoSemiBold',
}

const BORDER_RADIUS = {
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
}

const SIZES = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 28,
    xxxl: 32,
}

const SHADOWS = {
    small: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
}

export { COLORS, FONT, SIZES, SHADOWS, BORDER_RADIUS }
