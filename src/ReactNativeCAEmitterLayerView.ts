import { requireNativeViewManager } from 'expo-modules-core'
import { ViewProps } from 'react-native'

export type ReactNativeCAEmitterLayerViewProps = {
  config: string
} & ViewProps

export const ReactNativeCAEmitterLayerView: React.ComponentType<ReactNativeCAEmitterLayerViewProps> =
  requireNativeViewManager('ReactNativeCAEmitterLayer')
