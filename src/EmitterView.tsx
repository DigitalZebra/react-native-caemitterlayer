import React from 'react'
import type { ImageResolvedAssetSource } from 'react-native'
import { Image, Platform, View, ViewProps } from 'react-native'

import { ReactNativeCAEmitterLayerView } from './ReactNativeCAEmitterLayerView'
import type {
  EmitterCellType,
  EmitterCellValues,
  EmitterLayer,
  ImageDataContentsOption,
  LegacyEmitterCellContents,
  StringContents,
  StringContentsOption,
} from './types'

type NativeCellContents =
  | StringContentsOption
  | LegacyEmitterCellContents
  | ImageDataContentsOption
  | {
      imageContents: ImageResolvedAssetSource
      stringContents?: never
      imageData?: never
      contents?: never
    }

type NativeCellType = Required<EmitterCellValues> & NativeCellContents

type NativeCellConfiguration = NativeCellType & {
  emitterCells: NativeCellType[]
}

type NativeLayerConfiguration = Required<EmitterLayer> & {
  emitterCells: NativeCellConfiguration[]
}

type NativeEmitterConfiguration = { layer: NativeLayerConfiguration }

export type EmitterConfigPropType = {
  layer: EmitterLayer
}

export type EmitterViewProps = {
  emitterConfig: EmitterConfigPropType
} & ViewProps

/**
 * @deprecated This and associated {@link StringContents} will be removed in a future release. Consider using {@link StringContentsOption} instead.
 */
export function stringContents(value: string): StringContents {
  return {
    type: 'string',
    value,
  }
}

function EmitterViewIOS({ emitterConfig, ...rest }: EmitterViewProps) {
  const layersWithDefaults: NativeLayerConfiguration = Object.assign(
    {},
    defaultLayerConfig,
    emitterConfig.layer,
    {
      emitterCells: recursivelyApplyDefaults(
        emitterConfig.layer?.emitterCells ?? [],
      ),
    },
  )

  const config: NativeEmitterConfiguration = {
    // TODO: fix this TS error - technically this is not safe, as keys can be present but values undefined.
    layer: layersWithDefaults,
  }

  return (
    <ReactNativeCAEmitterLayerView config={JSON.stringify(config)} {...rest} />
  )
}

function EmitterViewDefault({ emitterConfig, ...rest }: EmitterViewProps) {
  return <View {...rest} />
}

export const EmitterView = Platform.select({
  ios: EmitterViewIOS,
  default: EmitterViewDefault,
})

const defaultLayerConfig: Omit<Required<EmitterLayer>, 'emitterCells'> = {
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

const defaultCellConfig: Required<EmitterCellValues> = {
  color: 'white',
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

  cells.forEach(cell => {
    const subCells = cell.emitterCells ?? []

    // TODO: might be a cleaner way to do this...?
    const cellWithDefaults: NativeCellConfiguration = Object.assign(
      {},
      { emitterCells: [] },
      defaultCellConfig,
      cell,
      cell.imageContents
        ? { imageContents: Image.resolveAssetSource(cell.imageContents) }
        : {},
    )

    cellWithDefaults.emitterCells = recursivelyApplyDefaults(subCells)

    defaultedCells.push(cellWithDefaults)
  })

  return defaultedCells
}
