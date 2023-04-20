# React Native CAEmitterLayer

A React Native wrapper for iOS's [CAEmitterLayer](https://developer.apple.com/documentation/quartzcore/caemitterlayer)

## Installation

> This module is built on [Expo Modules API](https://docs.expo.dev/modules/overview/) and thus requires Expo 47 or above.
> If your project is a "vanilla" React Native application, consider [adding Expo to it](https://docs.expo.dev/bare/installing-expo-modules/) to utilize the Expo ecosystem.

Add the package to your app with the following command:
```bash
npx expo install react-native-caemitterlayer
```

## Roadmap
Future plans for features/enhancements/fixes (in no particular order/priority):

- **Better image support**

   This library currently requires inlining of the images used in emitter cells. The images must be represented as base64 strings on the JS side. This isn't ideal for performance or developer ergonomics. A better way of handling images is high priority.

- **Better animation support**

   It's currently not possible to directly animate the `<EmitterView>` via RN Animated or Reanmiated. Will be looking at ways to support this to avoid having to wrap the `<EmitterView>` in an `<Animated.View>` or similar.

- **Support placeholders for `emitterPosition` and `emitterSize`.**

   `emitterPosition` and `emitterSize` require specifying exact coordinates/sizes. For some uses, `useWindowDimensions` may be sufficient. However, due to the nature of how React Native renders things, you may have to wait until `onLayout` is called before knowing what to set these values to. Adding placeholder values/strings could reduce the need for `onLayout`/`useWindowDimensions` as we could then set `emitterSize`/`emitterPosition` on the native side. 

- Support drawing basic images to be used in emitter cells (circle, oval, rect, triangle, etc)
- Possible animation support of layer or cell properties - either via Animated/Reanimated or basic `CAAnimation`s

### Not planned/Out of scope

#### Android support

No Android support is planned at this time. Unfortunately, Android does not contain a built in particle emitter engine. I've explored various options but there's drawbacks to each. I've also explored building one myself - however, it's a lot of effort to match the feature set `CAEmitterLayer` provides out of the box.
