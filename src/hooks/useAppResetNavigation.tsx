import { useNavigation } from '@react-navigation/native';

import { TAuthStackParamList } from '@routes';

export function useAppResetNavigation() {
  const { reset: resetNavigation } = useNavigation();

  function reset(params: TAuthStackParamList['SuccessScreen']) {
    resetNavigation({
      index: 1,
      routes: [
        { name: 'LoginScreen' },
        {
          name: 'SuccessScreen',
          params,
        },
      ],
    });
  }

  return { reset };
}
