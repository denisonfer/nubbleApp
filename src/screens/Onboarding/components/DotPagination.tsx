import { Box } from '@components';
import React from 'react';

type TProps = {
  totalPages: number;
  activeIndex: number;
};

export function DotPagination({ totalPages, activeIndex }: TProps) {
  return (
    <Box flexDirection="row" alignItems="center" mt="spc24">
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = index === activeIndex;
        const isLast = index === totalPages - 1;
        return (
          <Box
            key={index}
            width={isActive ? 14 : 10}
            height={isActive ? 14 : 10}
            borderRadius="br16"
            backgroundColor={isActive ? 'primary' : 'onBackgroundGray2'}
            marginRight={isLast ? undefined : 'spc8'}
          />
        );
      })}
    </Box>
  );
}
