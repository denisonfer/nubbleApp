import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

type TProps = {
  children: ReactNode;
  backgroundColor: string;
};
export function ScrollViewContainer({ backgroundColor, children }: TProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor, flex: 1 }}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({ backgroundColor, children }: TProps) {
  return <View style={{ backgroundColor }}>{children}</View>;
}
