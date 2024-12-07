import type { ReactotronReactNative } from 'reactotron-react-native';
import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import { storageMMKV } from '@services';

if (__DEV__) {
  Reactotron.configure({}) // controls connection & communication settings
    .useReactNative()
    .use(mmkvPlugin<ReactotronReactNative>({ storage: storageMMKV })) // add all built-in react native plugins
    .connect(); // let's connect!
}
