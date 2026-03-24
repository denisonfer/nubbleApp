import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '@screens';

export type TOnboardingStackParamList = {
  OnboardingScreen: undefined;
};

const Stack = createNativeStackNavigator<TOnboardingStackParamList>();

export function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}
