import { useWindowDimensions, View } from 'react-native'
import {
  EmitterLayer,
  EmitterConfigPropType,
  EmitterView,
} from 'react-native-caemitterlayer'

const snowflake = require('../assets/contents/snowflake.png')

const fallingSnow: EmitterLayer = {
  initialValues: {
    beginTime: 'currentTime',
  },
  emitterShape: 'rectangle',
  emitterCells: [
    {
      imageContents: snowflake,
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
      imageContents: snowflake,
      color: '#FFFFFF5F',
      lifetime: 5,
      birthRate: 5,
      blueRange: 0.15,
      alphaRange: 0.6,
      scale: 0.3,
      scaleRange: 0.2,
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
//       imageContents: snowflake,
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
