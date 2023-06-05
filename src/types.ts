import type { ImageRequireSource } from 'react-native'

export type RenderMode =
  | 'unordered'
  | 'oldestFirst'
  | 'oldestLast'
  | 'backToFront'
  | 'additive'

export type EmitterShape =
  | 'point'
  | 'line'
  | 'rectangle'
  | 'cuboid'
  | 'sphere'
  | 'circle'

export type EmitterMode = 'points' | 'outline' | 'surface' | 'volume'

export type EmitterLayer = {
  /**
   * `true` to emit particles, `false` to not emit particles.
   */
  enabled?: boolean

  /**
   * Values to be set on initial mount and whenever {@link EmitterLayer.enabled} flips from false to true.
   */
  initialValues?: {
    seed?: number

    // CAMediaTiming properties
    beginTime?: number | 'currentTime'
    timeOffset?: number
    repeatCount?: number
    repeatDuration?: number
    autoreverses?: boolean
    fillMode?: FillMode
    speed?: number
    duration?: number | null
  }

  scale?: number
  spin?: number
  velocity?: number
  birthRate?: number
  lifetime?: number
  preservesDepth?: boolean

  renderMode?: RenderMode
  emitterPosition?: { x: number; y: number }
  emitterZPosition?: number
  emitterDepth?: number

  emitterMode?: EmitterMode
  emitterShape?: EmitterShape
  emitterSize?: { width: number; height: number }

  /**
   * Particles to be emitted by this layer.
   */
  emitterCells?: EmitterCellType[]
}

export type FillMode = 'forwards' | 'backwards' | 'both' | 'removed'

/**
 * @deprecated Use {@link StringContentsOption} instead. Will be removed in a future release.
 */
export type StringContents = {
  type: 'string'
  value: string
}

/**
 * @deprecated Use {@link StringContentsOption} instead. Will be removed in a future release.
 */
export type ContentsType = StringContents

export type StringContentsOption = {
  stringContents?: {
    value: string
  }
  imageContents?: never
  imageData?: never
  contents?: never
}

export type ImageContentsOption = {
  imageContents?: ImageRequireSource
  stringContents?: never
  imageData?: never
  contents?: never
}

export type ImageDataContentsOption = {
  imageData?: string
  imageContents?: never
  stringContents?: never
  contents?: never
}

/**
 * @deprecated Use {@link ImageContentsOption.imageContents}, {@link StringContentsOption.stringContents} or {@link ImageDataContentsOption.imageData} instead. This type will be removed in a future release.
 */
export type LegacyEmitterCellContents = {
  /**
   * @deprecated Use {@link EmitterCellType.stringContents}, {@link EmitterCellType.imageContents} or {@link EmitterCellType.imageData} instead. Will be removed in a future release.
   */
  contents?: ContentsType | null
  imageContents?: never
  stringContents?: never
  imageData?: never
}

export type EmitterCellContents =
  | StringContentsOption
  | ImageContentsOption
  | ImageDataContentsOption
  | LegacyEmitterCellContents

export type EmitterCellValues = {
  color?: string
  contentsScale?: number

  isEnabled?: boolean

  emissionLatitude?: number
  emissionLongitude?: number
  emissionRange?: number

  redRange?: number
  greenRange?: number
  blueRange?: number
  alphaRange?: number

  redSpeed?: number
  greenSpeed?: number
  blueSpeed?: number
  alphaSpeed?: number

  scale?: number
  scaleRange?: number
  scaleSpeed?: number

  spin?: number
  spinRange?: number

  lifetime?: number
  lifetimeRange?: number

  birthRate?: number

  velocity?: number
  velocityRange?: number

  xAcceleration?: number
  yAcceleration?: number
  zAcceleration?: number

  /**
   * Maps to NSKeyValueCoding's `setValue` function:
   * https://developer.apple.com/documentation/objectivec/nsobject/1415969-setvalue
   */
  values?: { [key: string]: number | string }

  // CAMediaTiming properties
  beginTime?: number | null
  timeOffset?: number | null
  repeatCount?: number | null
  repeatDuration?: number | null
  autoreverses?: boolean | null
  fillMode?: FillMode | null
  speed?: number | null
  duration?: number | null
}

export type EmitterCellType = {
  /**
   * Sub particles to be emitted by this cell.
   */
  emitterCells?: EmitterCellType[]
} & EmitterCellContents &
  EmitterCellValues
