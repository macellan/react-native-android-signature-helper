import * as React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import SignatureHelper from 'react-native-android-signature-helper'

export default function App() {
    const [result, setResult] = React.useState<string>('')

    React.useEffect(() => {
        SignatureHelper.getSignatureHash().then(hash => {
            if (typeof hash !== 'string') return
            setResult(hash)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Result: {result}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
})
