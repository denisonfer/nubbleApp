import React from 'react';

import { Path, Svg } from 'react-native-svg';

import { TBasicIconProps } from '../../components/Icon/types';

export function ProfileIcon({ size = 20, color = 'black' }: TBasicIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 12.3982 19.1558 14.5993 17.7483 16.3222C17.7364 16.3379 17.7238 16.3533 17.7105 16.3682C15.8763 18.5865 13.1032 20 10 20C4.47715 20 0 15.5228 0 10ZM18.5898 10C18.5898 11.791 18.0416 13.454 17.1039 14.8304C16.8034 14.5744 16.3918 14.2678 15.8595 13.9636C14.6007 13.2441 12.6847 12.5481 10.0005 12.5481C7.31633 12.5481 5.40033 13.2441 4.14153 13.9636C3.60882 14.268 3.19701 14.5748 2.89644 14.831C1.95851 13.4545 1.41021 11.7913 1.41021 10C1.41021 5.25599 5.25599 1.41021 10 1.41021C14.744 1.41021 18.5898 5.25599 18.5898 10ZM10 18.5898C7.55462 18.5898 5.34791 17.5679 3.78356 15.9279C4.02445 15.7199 4.3737 15.4552 4.84129 15.1879C5.89646 14.5849 7.57247 13.9583 10.0005 13.9583C12.4285 13.9583 14.1045 14.5849 15.1597 15.1879C15.627 15.455 15.976 15.7195 16.2169 15.9274C14.6525 17.5677 12.4456 18.5898 10 18.5898ZM9.99943 3.71796C8.06993 3.71796 6.50586 5.28209 6.50586 7.21153C6.50586 9.14102 8.06994 10.7051 9.99943 10.7051C11.9289 10.7051 13.493 9.14102 13.493 7.21153C13.493 5.28209 11.9289 3.71796 9.99943 3.71796ZM7.91607 7.21153C7.91607 6.06092 8.84879 5.12817 9.99943 5.12817C11.1501 5.12817 12.0828 6.06092 12.0828 7.21153C12.0828 8.36218 11.1501 9.29489 9.99943 9.29489C8.84878 9.29489 7.91607 8.36218 7.91607 7.21153Z"
      />
    </Svg>
  );
}
