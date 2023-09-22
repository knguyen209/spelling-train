import { Audio } from 'expo-av'
import { sounds } from '../constants'

/*
 * Source: https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
 */
export const newShade = (hexColor: string, magnitude: number) => {
    hexColor = hexColor.replace(`#`, ``)
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16)
        let r = (decimalColor >> 16) + magnitude
        r > 255 && (r = 255)
        r < 0 && (r = 0)
        let g = (decimalColor & 0x0000ff) + magnitude
        g > 255 && (g = 255)
        g < 0 && (g = 0)
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude
        b > 255 && (b = 255)
        b < 0 && (b = 0)
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`
    } else {
        return hexColor
    }
}

export const shuffleArray = (array: Array<string>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

export const playCorrectSound = async () => {
    const { sound } = await Audio.Sound.createAsync(sounds.CorrectSound)
    await sound.playAsync()
}

export const playIncorrectSound = async () => {
    const { sound } = await Audio.Sound.createAsync(sounds.IncorrectSound)
    await sound.playAsync()
}
