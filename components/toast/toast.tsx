import Toast from 'react-native-root-toast'

export const Alert = (message: string, delayTime?: number) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    backgroundColor: "#5b21b6",
    textColor: "#FFFFFF",
    delay: delayTime || 0,
  })
}
