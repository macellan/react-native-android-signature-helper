import { NativeModules, Platform } from 'react-native'

const LINKING_ERROR =
    `The package 'react-native-android-signature-helper' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n'

const AndroidSignatureHelper = NativeModules.AndroidSignatureHelper
    ? NativeModules.AndroidSignatureHelper
    : new Proxy(
          {},
          {
              get() {
                  throw new Error(LINKING_ERROR)
              },
          }
      )

export type GetSignatureHashFunction = () => Promise<string | null>

export const getSignatureHash: GetSignatureHashFunction = () => {
    return Platform.OS === 'android'
        ? AndroidSignatureHelper.getSignatureHash()
        : null
}

export default {
    getSignatureHash: getSignatureHash,
}
