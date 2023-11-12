# @macellan/react-native-android-signature-helper

React Native package for Android app signature helper.

## Installation

```sh
yarn add @macellan/react-native-android-signature-helper
```

## Usage

```tsx
import * as React from 'react'
import { Platform, View, Text } from 'react-native'

import { getSignatureHash } from '@macellan/react-native-android-signature-helper'

const App: React.FC = () => {
    const [hash, setHash] = React.useState<string>('')

    React.useEffect(() => {
        if (Platform.OS !== 'android') return
        getSignatureHash().then(hash => {
            setHash(hash)
        })
    }, [])

    return (
        <View>
            <Text>App Hash: {hash}</Text>
        </View>
    )
}

export default App
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
