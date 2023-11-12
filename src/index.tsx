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

export type GetSignatureHashFunction = () => Promise<string>

export const getSignatureHash: GetSignatureHashFunction = async () => {
    return await AndroidSignatureHelper.getSignatureHash()
}

export default {
    getSignatureHash: getSignatureHash,
}
