import React from 'react';

import { ActivityIndicator, Box, Button, Text } from '@components';

export type TEmptyListProps = {
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  emptyMessage?: string;
  errorMessage?: string;
};

export function EmptyList({
  isLoading,
  error,
  refetch,
  emptyMessage,
  errorMessage,
}: TEmptyListProps) {
  const component = getComponent({
    isLoading,
    error,
    refetch,
    emptyMessage,
    errorMessage,
  });
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      {component}
    </Box>
  );
}

function getComponent({
  isLoading,
  error,
  refetch,
  emptyMessage,
  errorMessage,
}: TEmptyListProps) {
  switch (true) {
    case isLoading:
      return <ActivityIndicator color="primary" />;
    case error:
      return (
        <>
          <Text preset="paragraphMedium" bold>
            {errorMessage}
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
          {emptyMessage}
        </Text>
      );
  }
}
