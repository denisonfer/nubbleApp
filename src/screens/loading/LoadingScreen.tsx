import { ActivityIndicator, Box } from '@components';

export function LoadingScreen() {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center">
      <ActivityIndicator size="large" color="primary" />
    </Box>
  );
}
