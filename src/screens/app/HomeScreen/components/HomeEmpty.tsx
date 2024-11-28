import React from 'react';

import { ActivityIndicator, Box, Button, Text } from '@components';

type TProps = {
  loading: boolean;
  error: unknown;
  refetch: () => void;
};

export function HomeEmpty({ loading, error, refetch }: TProps) {
  const component = getComponent({ loading, error, refetch });
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      {component}
    </Box>
  );
}

function getComponent({ loading, error, refetch }: TProps) {
  switch (true) {
    case loading:
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
