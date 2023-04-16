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
  enabled?: boolean

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

  emitterCells?: EmitterCellType[]
}

export type FillMode = 'forwards' | 'backwards' | 'both' | 'removed'

export type EmitterCellType = {
  // name?: string
  emitterCells?: EmitterCellType[]

  color?: string
  imageData?: string

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
