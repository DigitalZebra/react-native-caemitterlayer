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

const circle =
  'iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABygAwAEAAAAAQAAABwAAAAAl4eZoQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KGV7hBwAAArtJREFUSA2tlr1uFDEQx7ncJQEJJL4qoIQyNQ3wAigFTZrwAql4BGjzDqmoaNJQnAQ1SFTwBugqIkFDmkCS++D383pyZtm7C7cZ6W97xuOZnbE93s6lBTSZTFZQ6YJRp9MZN6mj00HeA2N0Rk06IVNxJmFoDQMnpQKya/BXgWuPmP9Zm1+DP0U+KeUxbnSYv1hnxyrCb9A9BY/AfXALGPkhGIBPoI/+B3r1V+kWRquuyh1gehw/AK/BL3AeeofSY9dKjN2K2YSCzvxylbfBIQg6ZqDj3+Ako5QhOqOX4QVJs1MmyshenC2dOihEjcNTpGUm9uY6RXk9R/a8MGcE/0tGP8qLdrPNLvz0vMB4smLPIo3LOMt+UspjvJltJx86SXuWhR4QyX1qS5HezxiK7PV06BG23wChZFrakmmN1G5lHz2ji8rgPbsMvOjpI+jbkLajaDzTEPd0uEIT5cpLLQVfce3a2K6HRHtdU0kAY7mygkjT01TxbdpweA8jdzQUAmuj5UoKWcW1a8OWW3RDUyEwqhgrv0iKIp7KZTg5woOFWAqFimvXastgPJjpVUkOOTgyAyBd5KGJG/ADuwcaX+HAxCHxiZGCr7h2bXz8F4L6rikjTLml7yuArArDNGrXmM54Kd5qiuC6VZMNI3gPpKg4FbdcG+VxwPLb2WEVHIIo3k8K223K2xA7UdZ2srNp9WKyfAtfZacuWMapzuKl2c/J+yuTSYZS5NvJPRBkeuNrQ9bUjxGaRh1KH8GVf6KLL8gTpdPdtKxqdKhjv9yXXV5ENM6V2diHn+8sHKNYOt2E9z2rk9GIOnlA0p7NjSycRc8ifwmSY/p1sAXegK8g9odhivIbfR/sgHQa5zmbeclZ7NwqFzbeNPfWJ+YuuAm8w1aog7jUjNXxNJ7vn9QFdcJAT9TldR4ds7JQ7w+9Y9X6UdlxpAAAAABJRU5ErkJggg=='
const rectangle =
  'iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABSgAwAEAAAAAQAAAA0AAAAALBdoDQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KGV7hBwAAANdJREFUOBGtkzsOwjAYgxveQjzEAVg4EYflRgyUjaGCAdHgL2CpSyERWHKdJrHzt0lCJcQYN5IhTTGIJbDnIdMlKGysxkHciVdxIOaCxe/iQjyKewKnapzFtfgLbjJvR3pQci0S2IjuY3XGPsEVLjWJjBYzmL2kmktLPhlbNyPY7Eqs7/wssSepA0t3tnclB3qV3om5Aw78R4Upwz+UQwlQBlyx21bmAL+jeDjLKcOB3uWJBkphb1ICqaYWV2L3HOr1K6iQm8I5PIktHdxlOnyX6SqFP715Av15NSXpAC4/AAAAAElFTkSuQmCC'

const shapes = [circle, rectangle]

const confettiLifetime = 6

const allCells: EmitterCellType[] = shapes.flatMap((shape, index) =>
  colors.map((color): EmitterCellType => {
    return {
      imageData: shape,
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
