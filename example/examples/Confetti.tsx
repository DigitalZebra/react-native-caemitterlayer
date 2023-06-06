import { useRef, useState } from 'react'
import {
  Animated,
  Button,
  Easing,
  useWindowDimensions,
  View,
} from 'react-native'
import {
  EmitterLayer,
  EmitterConfigPropType,
  EmitterView,
  EmitterCellType,
} from 'react-native-caemitterlayer'

// Much of this pulled from: https://bryce.co/recreating-imessage-confetti/
// https://github.com/bryce-co/RecreatingiMessageConfetti/blob/master/RecreatingiMessageConfetti.playground/Pages/Step%208.xcplaygroundpage/Contents.swift

const colors = [
  '#953aff',
  '#ffc329',
  '#ff651a',
  '#7b5cff',
  '#4c7eff',
  '#47c0ff',
  '#ff5b86',
  '#e97ad0',
  '#ff2f27',
]

const circle = require('../assets/contents/circle.png')
const rectangle = require('../assets/contents/rectangle.png')

const shapes = [circle, rectangle]

const confettiLifetime = 6

const allCells: EmitterCellType[] = shapes.flatMap((shape, index) =>
  colors.map((color): EmitterCellType => {
    return {
      imageContents: shape,
      beginTime: 0.1,
      scale: index === 0 ? 0.6 : 1,
      color,
      lifetime: confettiLifetime,
      birthRate: 20,
      spin: 4,
      spinRange: 8,
      velocity: 900,
      velocityRange: 150,
      xAcceleration: 50,
      emissionRange: Math.PI / 8,
      emissionLongitude: Math.PI * 1.5,
      yAcceleration: 500,
      values: {
        particleType: 'plane',
        orientationRange: Math.PI,
        orientationLongitude: Math.PI / 2,
        orientationLatitude: Math.PI / 2,
      },
    }
  }),
)

const layerConfig: EmitterLayer = {
  emitterShape: 'point',
  emitterCells: allCells,
}

export function Confetti() {
  const dimensions = useWindowDimensions()

  const animatedScaleRef = useRef(new Animated.Value(0))

  const [showingConfetti, setShowingConfetti] = useState(false)
  const [birthRate, setBirthRate] = useState(1)

  const emitterConfig: EmitterConfigPropType = {
    layer: {
      ...layerConfig,
      birthRate,
      emitterCells: allCells.map(cell => ({
        ...cell,
      })),
      emitterPosition: { x: dimensions.width / 2, y: dimensions.height },
    },
  }

  return (
    <>
      {showingConfetti && (
        <Animated.View
          style={{
            width: '100%',
            transform: [{ scale: animatedScaleRef.current }],
          }}>
          <EmitterView
            emitterConfig={emitterConfig}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Animated.View>
      )}
      <View style={{ position: 'absolute', top: 100 }}>
        <Button
          title="Fire confetti"
          onPress={() => {
            if (showingConfetti) {
              return
            }

            setShowingConfetti(true)
            setBirthRate(2)
            Animated.timing(animatedScaleRef.current, {
              toValue: 1,
              duration: 1000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }).start()

            setTimeout(() => {
              setBirthRate(0)
              setTimeout(() => {
                setShowingConfetti(false)
                animatedScaleRef.current.setValue(0)
              }, confettiLifetime * 1000 + 300)
            }, 300)
          }}
        />
      </View>
    </>
  )
}
