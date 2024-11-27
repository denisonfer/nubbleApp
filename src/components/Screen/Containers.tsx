import React, { ReactNode } from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';

type TProps = {
  children: ReactNode;
  backgroundColor: string;
};

export function ScrollViewContainer({ backgroundColor, children }: TProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={[$container, { backgroundColor }]}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({ backgroundColor, children }: TProps) {
  return <View style={[$container, { backgroundColor }]}>{children}</View>;
}

const $container: StyleProp<ViewStyle> = { flex: 1 };
