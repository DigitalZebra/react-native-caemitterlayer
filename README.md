<h1 align="center">react-native-caemitterlayer</h1>

<p align="center">
A React Native wrapper for iOS's <a target="_blank" href="https://developer.apple.com/documentation/quartzcore/caemitterlayer">CAEmitterLayer</a></p>

<p align="center">Create powerful and performant particle effects for your React Native apps!
</p>

<p align="center">
   <img src=".github/images/fire.gif" width="200" alt= />
</p>

## 💿 Installation

> ⚠️ This module is built on [Expo Modules API](https://docs.expo.dev/modules/overview/) and thus requires Expo 47 or above.
> If your project is a "vanilla" React Native application, consider [adding Expo to it](https://docs.expo.dev/bare/installing-expo-modules/) to utilize the Expo ecosystem.

Add the package to your app with the following command:

```bash
npx expo install react-native-caemitterlayer
```

> ℹ️ If not already, you will have to adopt [Expo prebuild](https://docs.expo.dev/workflow/prebuild/) or [Expo dev builds](https://docs.expo.dev/develop/development-builds/introduction/) to make use of custom native modules.

## 🔥 Basic Usage

Check out the [example app](examples/) for more in depth and powerful examples.

## 📖 Documentation

### `EmitterView`

```tsx
import { EmitterView } from 'react-native-caemitterlayer';

<EmitterView
   emitterConfig={...}
   style={...}
/>
```

#### Props

##### `emitterConfig`

TODO

##### `style`

This is the normal [React Native `View` style prop](https://reactnative.dev/docs/view-style-props) and can be used to position/style the emitter view.

## 🗺️ Roadmap

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

Android support is not planned at this time. Android does not contain a built in particle emitter engine. I've explored various options but there's drawbacks to each. I've also investigated building one myself. However, it would take much effort reach parity with `CAEmitterLayer`.

## 🙌 Acknowledgements

A number of blog posts helped inspire and test the APIs via their helpful examples/explanations:

- https://nshipster.com/caemitterlayer/ by [@Mattt](https://github.com/mattt)
- https://bryce.co/caemitterbehavior/ by [@brycepauken](https://github.com/brycepauken)
- https://bryce.co/recreating-imessage-confetti/ by [@brycepauken](https://github.com/brycepauken)
- https://medium.com/@peteliev/what-do-you-know-about-caemitterlayer-368378d45c2e by [@peteliev](https://github.com/peteliev)

## ⚖️ License

MIT
