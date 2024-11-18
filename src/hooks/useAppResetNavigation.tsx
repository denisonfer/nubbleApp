import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/Routes';

export function useAppResetNavigation() {
  const { reset: resetNavigation } = useNavigation();

  function reset(params: RootStackParamList['SuccessScreen']) {
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

  console.log('reset: ', reset);

  return { reset };
}
