import React from 'react';

import { ActivityIndicator, Box, Button, Text } from '@components';

type TProps = {
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
};

export function HomeEmpty({ isLoading, error, refetch }: TProps) {
  const component = getComponent({ isLoading, error, refetch });
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      {component}
    </Box>
  );
}

function getComponent({ isLoading, error, refetch }: TProps) {
  switch (true) {
    case isLoading:
      return <ActivityIndicator color="primary" />;
    case error:
      return (
        <>
          <Text preset="paragraphMedium" bold>
            Ops! Algo deu errado 😢
          </Text>
          <Button
            title="Tentar novamente"
            onPress={refetch}
            preset="outline"
            mt="spc16"
          />
        </>
      );
    default:
      return (
        <Text preset="paragraphMedium" bold>
          Nenhum post encontrado
        </Text>
      );
  }
}
