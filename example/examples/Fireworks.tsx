import { useState } from 'react'
import { Button, useWindowDimensions, View } from 'react-native'
import {
  EmitterLayer,
  EmitterConfigPropType,
  EmitterView,
} from 'react-native-caemitterlayer'

const flameImage = require('../assets/contents/flame.png')

const layerConfig: EmitterLayer = {
  initialValues: {
    seed: 42,
    beginTime: 'currentTime',
  },
  renderMode: 'additive',
  emitterCells: [
    {
      imageContents: flameImage,
      color: '#7F7F7F',
      lifetime: 1.7,
      birthRate: 1,
      velocity: 350,
      velocityRange: 100,
      emissionRange: -Math.PI / 4,
      emissionLongitude: -Math.PI / 2,
      yAcceleration: 10,
      redRange: 0.9,
      greenRange: 0.9,
      blueRange: 0.9,
      emitterCells: [
        {
          imageContents: flameImage,
          lifetime: 0.5,
          birthRate: 45,
          velocity: 80,
          scale: 0.4,
          alphaSpeed: -0.7,
          scaleSpeed: -0.1,
          scaleRange: 0.1,
          emissionRange: Math.PI / 8,
          emissionLongitude: Math.PI * 2,
          yAcceleration: 350,
          beginTime: 0.01,
          duration: 1.7,
        },
        {
          imageContents: flameImage,
          lifetime: 5,
          birthRate: 4000,
          velocity: 130,
          scale: 0.6,
          spinRange: 3,
          alphaSpeed: -0.2,
          scaleSpeed: -0.1,
          emissionRange: Math.PI * 2,
          emissionLongitude: Math.PI * 2,
          yAcceleration: 80,
          beginTime: 1.5,
          duration: 0.1,
        },
      ],
    },
  ],
}

export function Fireworks() {
  const dimensions = useWindowDimensions()

  const [showFireworks, setShowFireworks] = useState(false)

  const emitterConfig: EmitterConfigPropType = {
    layer: {
      ...layerConfig,
      enabled: showFireworks,
      emitterPosition: { x: dimensions.width / 2, y: 0 },
    },
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
      }}>
      <Button
        title="Toggle Fireworks"
        onPress={() => setShowFireworks(!showFireworks)}
      />
      <View
        style={{
          width: 300,
          height: 200,
          backgroundColor: 'skyblue',
          opacity: 0.9,
          borderRadius: 6,
        }}
      />
      {/* {showFireworks && (
        <EmitterView
          emitterConfig={emitterConfig}
          style={{ backgroundColor: 'blue', width: '100%' }}
        />
      )} */}

      <EmitterView
        emitterConfig={emitterConfig}
        style={{ backgroundColor: 'blue', width: '100%' }}
      />
    </View>
  )
}
