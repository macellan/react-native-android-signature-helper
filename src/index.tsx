import { NativeModules } from 'react-native'

const LINKING_ERROR =
    `The package 'react-native-android-signature-helper' doesn't seem to be linked. Make sure: \n\n` +
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

export type GetSignatureHashesFunction = () => Promise<string[] | null>

export type GetSignatureHashFunction = () => Promise<string | null>

export const getSignatureHashes: GetSignatureHashesFunction = async () => {
    try {
        const hashes = await AndroidSignatureHelper.getSignatureHashes()
        return hashes || null
    } catch (error) {
        console.error('Error getting signature hashes:', error)
        return null
    }
}

export const getSignatureHash: GetSignatureHashFunction = async () => {
    try {
        const hashes = await getSignatureHashes()
        return hashes?.[0] || null
    } catch (error) {
        console.error('Error getting signature hash:', error)
        return null
    }
}

export default {
    getSignatureHash: getSignatureHash,
    getSignatureHashes: getSignatureHashes,
}
