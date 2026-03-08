import type { ReactotronReactNative } from 'reactotron-react-native';
import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import { storageMMKV } from '@services';
import { Platform } from 'react-native';

const host = Platform.select({
  ios: process.env.IP_ADDRESS,
  android: '10.0.2.2',
});

if (__DEV__) {
  Reactotron.configure({ host }) // controls connection & communication settings
    .useReactNative()
    .use(mmkvPlugin<ReactotronReactNative>({ storage: storageMMKV })) // add all built-in react native plugins
    .connect(); // let's connect!
}
