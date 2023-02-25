import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ReactNativeCAEmitterLayer.web.ts
// and on native platforms to ReactNativeCAEmitterLayer.ts
import ReactNativeCAEmitterLayerModule from './ReactNativeCAEmitterLayerModule';
import ReactNativeCAEmitterLayerView from './ReactNativeCAEmitterLayerView';
import { ChangeEventPayload, ReactNativeCAEmitterLayerViewProps } from './ReactNativeCAEmitterLayer.types';

// Get the native constant value.
export const PI = ReactNativeCAEmitterLayerModule.PI;

export function hello(): string {
  return ReactNativeCAEmitterLayerModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReactNativeCAEmitterLayerModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReactNativeCAEmitterLayerModule ?? NativeModulesProxy.ReactNativeCAEmitterLayer);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ReactNativeCAEmitterLayerView, ReactNativeCAEmitterLayerViewProps, ChangeEventPayload };
