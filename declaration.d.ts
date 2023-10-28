declare module '*.png' {
    import { ImageSourcePropType } from 'react-native'
    const value: ImageSourcePropType
    export default value
}

declare module '*.gif' {
    import { ImageSourcePropType } from 'react-native'
    const value: ImageSourcePropType
    export default value
}

declare module '*.mp3' {
    import { AVPlaybackSource } from 'expo-av'
    const value: AVPlaybackSource
    export default value
}

declare module '*.svg' {
    import React from 'react'
    import { SvgProps } from 'react-native-svg'
    const content: React.FC<SvgProps>
    export default content
}
