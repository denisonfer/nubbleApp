import Reactotron from 'reactotron-react-native';

import { storage } from '@services';

if (__DEV__) {
  Reactotron.onCustomCommand({
    command: 'ShowStorage',
    description: 'Show storage items',
    handler: async () => {
      const keys = await storage.getAllKeys();
      if (!keys.length) return;
      keys.forEach(async key => {
        const value = await storage.getItem(key);
        console.log(key, value);
      });
    },
  });

  Reactotron.configure({}) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
}
