import { useWindowDimensions } from 'react-native'
import {
  EmitterCellType,
  EmitterConfigPropType,
  EmitterLayer,
  EmitterView,
} from 'react-native-caemitterlayer'

const circle =
  'iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABygAwAEAAAAAQAAABwAAAAAl4eZoQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KGV7hBwAAArtJREFUSA2tlr1uFDEQx7ncJQEJJL4qoIQyNQ3wAigFTZrwAql4BGjzDqmoaNJQnAQ1SFTwBugqIkFDmkCS++D383pyZtm7C7cZ6W97xuOZnbE93s6lBTSZTFZQ6YJRp9MZN6mj00HeA2N0Rk06IVNxJmFoDQMnpQKya/BXgWuPmP9Zm1+DP0U+KeUxbnSYv1hnxyrCb9A9BY/AfXALGPkhGIBPoI/+B3r1V+kWRquuyh1gehw/AK/BL3AeeofSY9dKjN2K2YSCzvxylbfBIQg6ZqDj3+Ako5QhOqOX4QVJs1MmyshenC2dOihEjcNTpGUm9uY6RXk9R/a8MGcE/0tGP8qLdrPNLvz0vMB4smLPIo3LOMt+UspjvJltJx86SXuWhR4QyX1qS5HezxiK7PV06BG23wChZFrakmmN1G5lHz2ji8rgPbsMvOjpI+jbkLajaDzTEPd0uEIT5cpLLQVfce3a2K6HRHtdU0kAY7mygkjT01TxbdpweA8jdzQUAmuj5UoKWcW1a8OWW3RDUyEwqhgrv0iKIp7KZTg5woOFWAqFimvXastgPJjpVUkOOTgyAyBd5KGJG/ADuwcaX+HAxCHxiZGCr7h2bXz8F4L6rikjTLml7yuArArDNGrXmM54Kd5qiuC6VZMNI3gPpKg4FbdcG+VxwPLb2WEVHIIo3k8K223K2xA7UdZ2srNp9WKyfAtfZacuWMapzuKl2c/J+yuTSYZS5NvJPRBkeuNrQ9bUjxGaRh1KH8GVf6KLL8gTpdPdtKxqdKhjv9yXXV5ENM6V2diHn+8sHKNYOt2E9z2rk9GIOnlA0p7NjSycRc8ifwmSY/p1sAXegK8g9odhivIbfR/sgHQa5zmbeclZ7NwqFzbeNPfWJ+YuuAm8w1aog7jUjNXxNJ7vn9QFdcJAT9TldR4ds7JQ7w+9Y9X6UdlxpAAAAABJRU5ErkJggg=='

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

const burstCells: EmitterCellType[] = colors.map((color): EmitterCellType => {
  return {
    imageData: circle,
    beginTime: 0.1,
    scale: 0.3,
    color,
    lifetime: 5.0,
    birthRate: 300,
    alphaSpeed: -0.21,
    scaleSpeed: -0.06,
    velocity: 50,
    emissionRange: Math.PI * 2,
    emissionLongitude: Math.PI * 2,
    duration: 0.24,
  }
})

const layerConfig: EmitterLayer = {
  emitterShape: 'rectangle',
  emitterCells: [
    {
      lifetime: 0.3,
      birthRate: 0.5,
      emitterCells: shuffle(burstCells),
    },
  ],
}

export function BurstEffect() {
  const dimensions = useWindowDimensions()

  const emitterConfig: EmitterConfigPropType = {
    layer: {
      ...layerConfig,
      emitterSize: { width: dimensions.width, height: dimensions.height },
      emitterPosition: { x: 0, y: dimensions.height / 2 },
    },
  }

  return <EmitterView emitterConfig={emitterConfig} style={{ flex: 1 }} />
}

function shuffle<T>(array: T[]) {
  const result = [...array]
  let currentIndex = result.length,
    temporaryValue,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = result[currentIndex]
    result[currentIndex] = result[randomIndex]
    result[randomIndex] = temporaryValue
  }

  return result
}
