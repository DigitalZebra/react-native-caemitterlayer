import { View, ViewStyle } from 'react-native'
import {
  EmitterCellType,
  EmitterConfigPropType,
  EmitterLayer,
  EmitterView,
} from 'react-native-caemitterlayer'

const flame = require('../assets/contents/flame.png')

const flameCell: EmitterCellType = {
  imageContents: flame,
  color: '#EE8130',
  lifetime: 1.2,
  birthRate: 120,
  blueRange: 0.15,
  velocity: 4,
  velocityRange: 2,
  scale: 0.6,
  yAcceleration: -8,
  xAcceleration: 2,
  alphaSpeed: 0.4,
  emitterCells: [
    {
      imageContents: flame,
      lifetime: 1.4,
      beginTime: 1.18,
      yAcceleration: -14,
      scale: 1.0,
      scaleSpeed: -0.08,
      velocity: 20,
      birthRate: 1,
      alphaSpeed: -1.0,
    },
  ],
}

const layerConfig: EmitterLayer = {
  renderMode: 'additive',
  emitterPosition: {
    x: 50,
    y: 0,
  },
  emitterSize: {
    width: 100,
    height: 100,
  },
  emitterShape: 'line',
  emitterCells: [flameCell],
}

const emitterConfig: EmitterConfigPropType = {
  layer: layerConfig,
}

export function Fire() {
  return (
    <View style={$containerStyle}>
      <EmitterView emitterConfig={emitterConfig} style={$emitterViewStyle} />
    </View>
  )
}

const $containerStyle: ViewStyle = {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#E8EAEC',
}

const $emitterViewStyle: ViewStyle = {
  width: 100,
  height: 100,
  backgroundColor: 'white',
  borderRadius: 4,
}
