import React from 'react'
import { Platform, View, ViewProps } from 'react-native'

import { ReactNativeCAEmitterLayerView } from './ReactNativeCAEmitterLayerView'
import { EmitterCellType, EmitterLayer, StringContents } from './types'

type NativeCellConfiguration = Required<EmitterCellType> & {
  emitterCells: Required<EmitterCellType>[]
}

type NativeLayerConfiguration = Required<EmitterLayer> & {
  emitterCells: NativeCellConfiguration[]
}

type NativeEmitterConfiguration = { layer: NativeLayerConfiguration }

type NewNativeCellConfiguration = Omit<
  EmitterCellType,
  'values' | 'emitterCells'
> & {
  values?: { key: string; value: number | string }[]
  emitterCells: NewNativeCellConfiguration[]
}

type NewNativeLayerConfiguration = Omit<EmitterLayer, 'emitterCells'> & {
  emitterCells: NewNativeCellConfiguration[]
}

type NewNativeEmitterConfiguration = { layer: NewNativeLayerConfiguration }

export type EmitterConfigPropType = {
  layer: EmitterLayer
}

export type EmitterViewProps = {
  emitterConfig: EmitterConfigPropType
} & ViewProps

// TODO: not sure how I feel about this API
export function stringContents(value: string): StringContents {
  return {
    type: 'string',
    value,
  }
}

function EmitterViewIOS({ emitterConfig, ...rest }: EmitterViewProps) {
  const layersWithDefaults = Object.assign(
    {},
    defaultLayerConfig,
    emitterConfig.layer,
  )

  layersWithDefaults.emitterCells = recursivelyApplyDefaults(
    layersWithDefaults.emitterCells,
  )

  const config: NativeEmitterConfiguration = {
    // TODO: fix this TS error - technically this is not safe, as keys can be present but values undefined.
    // @ts-expect-error
    layer: layersWithDefaults,
  }

  const newLayer = {
    ...emitterConfig.layer,
    emitterCells: recursivelyMapCells(emitterConfig.layer.emitterCells ?? []),
  }

  const newConfig: NewNativeEmitterConfiguration = {
    layer: newLayer,
  }

  return (
    <ReactNativeCAEmitterLayerView
      config={JSON.stringify(config)}
      {...rest}
      recordTest={newConfig}
    />
  )
}

function EmitterViewDefault({ emitterConfig, ...rest }: EmitterViewProps) {
  return <View {...rest} />
}

export const EmitterView = Platform.select({
  ios: EmitterViewIOS,
  default: EmitterViewDefault,
})

const defaultLayerConfig: Required<EmitterLayer> = {
  scale: 1,
  spin: 1,
  velocity: 1,
  birthRate: 1,
  lifetime: 1,
  preservesDepth: false,
  renderMode: 'unordered',
  emitterPosition: {
    x: 0,
    y: 0,
  },
  emitterZPosition: 0,
  emitterDepth: 0,
  emitterShape: 'point',
  emitterMode: 'volume',
  emitterSize: {
    width: 0,
    height: 0,
  },
  emitterCells: [],
  enabled: true,
  initialValues: {
    seed: undefined,

    beginTime: undefined,
    timeOffset: undefined,
    repeatCount: undefined,
    repeatDuration: undefined,
    autoreverses: undefined,
    fillMode: undefined,
    speed: undefined,
    duration: undefined,
  },
}

const defaultCellConfig: Required<EmitterCellType> = {
  color: 'white',
  emitterCells: [],
  imageData: '',
  contents: null,
  isEnabled: true,
  contentsScale: 1,
  emissionLatitude: 0,
  emissionLongitude: 0,
  emissionRange: 0,
  redRange: 0,
  greenRange: 0,
  blueRange: 0,
  alphaRange: 0,
  redSpeed: 0,
  greenSpeed: 0,
  blueSpeed: 0,
  alphaSpeed: 0,
  scale: 1,
  scaleRange: 0,
  scaleSpeed: 0,
  spin: 0,
  spinRange: 0,
  lifetime: 0,
  lifetimeRange: 0,
  birthRate: 0,
  velocity: 0,
  velocityRange: 0,
  xAcceleration: 0,
  yAcceleration: 0,
  zAcceleration: 0,

  values: {},

  // CAMediaTiming properties
  beginTime: null,
  timeOffset: null,
  repeatCount: null,
  repeatDuration: null,
  duration: null,
  autoreverses: null,
  fillMode: null,
  speed: null,
}

function recursivelyApplyDefaults(
  cells: EmitterCellType[],
): NativeCellConfiguration[] {
  const defaultedCells: NativeCellConfiguration[] = []

  cells.forEach(x => {
    const cellWithDefaults = Object.assign({}, defaultCellConfig, x)
    cellWithDefaults.emitterCells = recursivelyApplyDefaults(
      cellWithDefaults.emitterCells,
    )

    // TODO: fix the emitter cell types - technically this is not safe, as keys can be present but values undefined.
    // @ts-expect-error
    defaultedCells.push(cellWithDefaults)
  })

  return defaultedCells
}

// Ugly and needs tests
function recursivelyMapCells(
  cells: EmitterCellType[],
): NewNativeCellConfiguration[] {
  return cells.map(cell => {
    const cellWithNoNulls = Object.keys(cell).reduce((acc, key) => {
      const value = cell[key]

      if (value === null || value === undefined) {
        return acc
      }

      acc[key] = cell[key]

      // values requires special handling/mapping due to native side conversion
      // Transform values object into an array of key/value pairs
      // { a: 1, b: 2 } => [{ key: 'a', value: 1 }, { key: 'b', value: 2 }]
      if (key === 'values' && typeof value === 'object') {
        // goofy but makes TS happy
        const valuesObject = cell[key] ?? {}
        acc[key] = Object.entries(valuesObject).map(([a, b]) => ({
          key: a,
          value: b,
        }))
      }
      return acc
    }, {} as NewNativeCellConfiguration)

    cellWithNoNulls.emitterCells = recursivelyMapCells(cell.emitterCells ?? [])

    return cellWithNoNulls
  })
}
