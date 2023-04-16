import { useWindowDimensions, View } from 'react-native'
import {
  EmitterLayer,
  EmitterConfigPropType,
  EmitterView,
} from 'react-native-caemitterlayer'

const snowflake =
  'iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAACXh5mhAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAADgUlEQVRIDZXWh3JVMQwE0LwQegs9wPD/X0YPvZfkscfcfTghEwbN7NjXlrSSLHvuamuR9Xq9WqZG2J5wZppbr+46czgMDo6NXTdurVar36OPhaxO6nAnW4iMZ5exa3QIJ4h+noA5gGxvrZHuTJlZbGYlOZc1uBCcX+bIG5TMkP0IvgVfg+8T7BHkq3CN6C2UiCMOS3Ix88vBpWX0jVhAhCNkiD4HnxaY8yWICt1hiKyEHHFYoquZXw92g2uBb9kKig0nnCJ6H7wL3gb2HQedWQ4QzGTN7ErWkdwKbi+4mRG5bOmxUzLZIUO0HwjW/nzOznqghG0O2Skhx3eCveB+cG/5FoR9ekSGyofwdSBQFeCPtHvpmR8iFAkFZaDMSDZIHgaPggeBABDKYC6pDD8EguxepiMYDeSM28WjpCVUBuVyTgjvBiWUpdLKjl4zUCYOBclWIMRaG8kIyDdnKFOOZKg5SriXOcjWepsh041YYzuTKfPHQKllr6mQbiMSLTBSEtEqz41A0xit2W8jZLoRzcMPW3bIdOurQLXaZIOLAwYILWgGCgh6DU4ji9oQPmSIFEnhCKwJlv/tEhottDxKi7jKJ2WW7SNS0gbN1pzPkV3GVQkpg+9mW6XqZOufwkftjYV1Mgh1GtlczmnedeP/yHFftV23VONSZtUFdWe0sCdrtHLGBpXpqcLelaitOX/Whw+EJSuR9v0SaOW2s71/CacC1KXsjHwhZw/jpcHcyChQ7iPsfdTqvRLOpOeR6UYEjczdYwN8uIOCt7chpOzDIkJKDPYDZLoVEdF5mqmkgmUvC2RsXi7wtrr4zVRS46UxKaFNhC6t+4egLwgdd9OVQUqamaogeBY8CZ4HyGVpT0DO88SSisr94biZ9Wx2s9aXQ5aCULIGifBx8DSYCf8qqUj74Ioe2sEqwKlAlFjmzrSEqmLvTfBigQxVaT7DTUmzPpqGA6kjKplAnKvz4VBJZajM9BuMfeVTVqDr23rLqRprmXCKgDGZySi1cznyNip1z5VNy825jGRrLvMjHZrvQZhxkBqJiAQBCH07eA2ETDl7ttURFCAAc3Y9O4Hp6N8/v9N/qTLJkEPZywSQgPl8vvMd5hz0Ql8YATd4upv71J9hawgRI53JfRf2yYg6oww474jE3Fid8fddw6xn58/vfs/xODn9YtgwC5pFCToeIWPwC4jBZOEHnWxoAAAAAElFTkSuQmCC'

const fallingSnow: EmitterLayer = {
  initialValues: {
    beginTime: 'currentTime',
  },
  emitterShape: 'rectangle',
  emitterCells: [
    {
      imageData: snowflake,
      color: '#FFFFFF7F',
      lifetime: 5.5,
      birthRate: 80,
      blueRange: 0.15,
      alphaRange: 0.5,
      velocity: 110,
      velocityRange: 60,
      scale: 0.24,
      scaleRange: 0.6,
      emissionRange: Math.PI / 4,
      emissionLongitude: Math.PI / 2,
      yAcceleration: 30,
      scaleSpeed: -0.07,
      alphaSpeed: -0.12,
    },
  ],
}

const snowLine: EmitterLayer = {
  initialValues: {
    beginTime: 'currentTime',
  },
  emitterShape: 'line',
  emitterCells: [
    {
      imageData: snowflake,
      color: '#FFFFFF5F',
      lifetime: 5,
      birthRate: 5,
      blueRange: 0.15,
      alphaRange: 0.6,
      scale: 0.4,
      scaleRange: 0.3,
      velocity: 0,
      emissionRange: Math.PI / 2,
      emissionLongitude: Math.PI,
      scaleSpeed: -0.1,
      alphaSpeed: -0.2,
      beginTime: 3.8, // give falling snow time to reach this view/layer
    },
  ],
}

// Uncomment for blizzard-like snow
// const busySnow: EmitterLayer = {
//   initialValues: {
//     beginTime: 'currentTime',
//   },
//   emitterShape: 'rectangle',
//   emitterCells: [
//     {
//       imageData: snowflake,
//       color: '#FFFFFF7F',
//       lifetime: 5.5,
//       birthRate: 200,
//       blueRange: 0.15,
//       alphaRange: 0.5,
//       velocity: 10,
//       velocityRange: 300,
//       scale: 0.2,
//       scaleRange: 0.8,
//       emissionRange: Math.PI / 2,
//       emissionLongitude: Math.PI,
//       yAcceleration: 40,
//       scaleSpeed: -0.1,
//       alphaSpeed: -0.2,
//     },
//   ],
// }

export function Snow() {
  const dimensions = useWindowDimensions()

  // For a more blizzard-like effect, check out this
  // const busySnowConfig: EmitterConfigPropType = {
  //   layer: {
  //     ...fallingSnow,
  //     emitterSize: { width: dimensions.width, height: dimensions.height },
  //     emitterPosition: { x: dimensions.width / 2, y: dimensions.height / 2 },
  //   },
  // }

  const fallingSnowConfig: EmitterConfigPropType = {
    layer: {
      ...fallingSnow,
      emitterSize: { width: dimensions.width, height: 200 },
      emitterPosition: { x: dimensions.width / 2, y: -100 },
    },
  }

  const snowLineEmitterConfig: EmitterConfigPropType = {
    layer: {
      ...snowLine,
      emitterSize: { width: 300, height: 1 },
      emitterPosition: { x: 150, y: 0 },
    },
  }

  return (
    <EmitterView
      emitterConfig={fallingSnowConfig}
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
      }}>
      <EmitterView emitterConfig={snowLineEmitterConfig}>
        <View
          style={{
            width: 300,
            height: 200,
            backgroundColor: 'skyblue',
            opacity: 0.9,
            borderRadius: 6,
          }}
        />
      </EmitterView>
    </EmitterView>
  )
}
