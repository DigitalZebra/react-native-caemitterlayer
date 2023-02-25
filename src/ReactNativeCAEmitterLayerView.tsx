import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ReactNativeCAEmitterLayerViewProps } from './ReactNativeCAEmitterLayer.types';

const NativeView: React.ComponentType<ReactNativeCAEmitterLayerViewProps> =
  requireNativeViewManager('ReactNativeCAEmitterLayer');

export default function ReactNativeCAEmitterLayerView(props: ReactNativeCAEmitterLayerViewProps) {
  return <NativeView {...props} />;
}
