declare module '*.png' {
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
    import { ImageSourcePropType } from 'react-native'
    import { Svg } from 'react-native-svg'
    const value: Svg
    export default value
}
