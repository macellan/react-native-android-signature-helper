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

export type GetSignatureHashesFunction = () => Promise<string[]>

export type GetSignatureHashFunction = () => Promise<string | undefined>

export const getSignatureHashes: GetSignatureHashesFunction = async () => {
    return await AndroidSignatureHelper.getSignatureHashes()
}

export const getSignatureHash: GetSignatureHashFunction = async () => {
    return await getSignatureHashes()
        .then(hashes => hashes?.[0])
        .catch(() => undefined)
}

export default {
    getSignatureHash: getSignatureHash,
    getSignatureHashes: getSignatureHashes,
}
